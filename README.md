# Portfolio Website

A modern, interactive portfolio website built with Next.js, Three.js, and Framer Motion.

## Features

- 🎨 Modern UI with glassmorphism effects
- 🌊 Smooth animations with Framer Motion
- 🎮 Interactive 3D elements with Three.js
- 📱 Fully responsive design
- 🌙 Dark mode support
- ⚡ Optimized performance

## Tech Stack

- **Framework:** Next.js 16
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **3D Graphics:** Three.js, React Three Fiber
- **Animations:** Framer Motion, GSAP
- **UI Components:** Radix UI
- **Package Manager:** pnpm

## Getting Started

### Prerequisites

- Node.js 18+ 
- pnpm (recommended) or npm

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd sakkol-dev-portfolio
```

2. Install dependencies:
```bash
pnpm install
```

3. Create environment file:
```bash
cp .env.example .env.local
```

4. Run the development server:
```bash
pnpm dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Deployment

### Deploy to Vercel

The easiest way to deploy this Next.js app is to use the [Vercel Platform](https://vercel.com).

#### Method 1: Deploy via Vercel Dashboard

1. Push your code to GitHub/GitLab/Bitbucket
2. Import your repository on [Vercel](https://vercel.com/new)
3. Vercel will automatically detect Next.js and configure the build settings
4. Click "Deploy"

#### Method 2: Deploy via Vercel CLI

1. Install Vercel CLI:
```bash
pnpm install -g vercel
```

2. Login to Vercel:
```bash
vercel login
```

3. Deploy:
```bash
vercel
```

4. For production deployment:
```bash
vercel --prod
```

### Environment Variables

If you need to add environment variables for production:

1. Go to your project on Vercel Dashboard
2. Navigate to Settings → Environment Variables
3. Add your variables (e.g., API keys, analytics IDs)

Or using CLI:
```bash
vercel env add VARIABLE_NAME
```

## Project Structure

```
├── app/                    # Next.js app directory
│   ├── about/             # About page
│   ├── contact/           # Contact page
│   ├── resume/            # Resume page
│   ├── works/             # Works/Projects page
│   └── page.tsx           # Home page
├── components/            # React components
│   ├── sections/          # Page sections
│   ├── three/             # Three.js components
│   └── ui/                # UI components
├── config/                # Configuration files
├── hooks/                 # Custom React hooks
├── lib/                   # Utility functions
├── public/                # Static assets
└── styles/                # Global styles
```

## Scripts

- `pnpm dev` - Start development server
- `pnpm build` - Build for production
- `pnpm start` - Start production server
- `pnpm lint` - Run ESLint

## Customization

### Site Configuration

Edit `config/site.ts` to update site metadata, navigation, and social links.

### Projects

Edit `config/projects.ts` to add or modify your projects.

### Skills

Edit `config/skills.ts` to update your skills and technologies.

### Design Tokens

Edit `config/design-tokens.ts` to customize colors, animations, and other design properties.

## License

MIT License - feel free to use this project for your own portfolio!

## Support

If you have any questions or run into issues, please open an issue on GitHub.
