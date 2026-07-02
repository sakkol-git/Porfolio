import fs from 'fs';
import path from 'path';
import * as yaml from 'js-yaml';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Paths
const DESIGN_PATH = path.resolve(__dirname, '../sakkol_dark_dev/DESIGN.md');
const GLOBALS_CSS_PATH = path.resolve(__dirname, '../src/app/globals.css');

async function syncTheme() {
  try {
    // 1. Read DESIGN.md
    const designFile = fs.readFileSync(DESIGN_PATH, 'utf8');
    
    // Extract YAML frontmatter
    const match = designFile.match(/^---\n([\s\S]*?)\n---/);
    if (!match) {
      throw new Error("Could not find YAML frontmatter in DESIGN.md");
    }
    
    const parsed = yaml.load(match[1]);
    
    // 2. Build the CSS variables string
    let cssVars = '';
    
    // Colors
    cssVars += '  /* ---- Colors ---- */\n';
    if (parsed.colors) {
      for (const [key, value] of Object.entries(parsed.colors)) {
        cssVars += `  --color-${key}: ${value};\n`;
      }
    }
    
    cssVars += '\n  /* Semantic aliases for DESIGN.md Brand section */\n';
    cssVars += '  --color-card-bg: #232323;\n';
    cssVars += '  --color-card-border: #3A3A3A;\n';
    cssVars += '  --color-body-text: #B8B8B8;\n';
    
    // Spacing
    cssVars += '\n  /* ---- Spacing ---- */\n';
    if (parsed.spacing) {
      for (const [key, value] of Object.entries(parsed.spacing)) {
        cssVars += `  --spacing-${key}: ${value};\n`;
      }
    }
    
    // Rounded
    cssVars += '\n  /* ---- Border Radius ---- */\n';
    if (parsed.rounded) {
      for (const [key, value] of Object.entries(parsed.rounded)) {
        cssVars += `  --radius-${key}: ${value};\n`;
      }
    }
    
    // Fonts
    cssVars += '\n  /* ---- Font Family ---- */\n';
    cssVars += '  --font-display: "Sora", sans-serif;\n';
    cssVars += '  --font-body: "Inter", sans-serif;\n';
    
    cssVars += '\n  /* ---- Font Size ---- */\n';
    if (parsed.typography) {
      for (const [key, config] of Object.entries(parsed.typography)) {
        cssVars += `  --font-size-${key}: ${config.fontSize};\n`;
      }
    }
    
    // 3. Update globals.css
    let globalsCss = fs.readFileSync(GLOBALS_CSS_PATH, 'utf8');
    
    // Replace everything inside @theme { ... }
    // Using regex to match @theme { ... anything ... }
    const themeRegex = /(@theme\s*{)([\s\S]*?)(^})/m;
    
    if (themeRegex.test(globalsCss)) {
      globalsCss = globalsCss.replace(themeRegex, `$1\n${cssVars}$3`);
      fs.writeFileSync(GLOBALS_CSS_PATH, globalsCss, 'utf8');
      console.log('✅ Successfully synced tokens from DESIGN.md to globals.css');
    } else {
      console.error('❌ Could not find @theme block in globals.css');
    }
    
  } catch (err) {
    console.error('Error syncing theme:', err);
    process.exit(1);
  }
}

syncTheme();
