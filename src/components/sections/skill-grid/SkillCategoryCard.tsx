import type { SkillCategory } from "@/domain/entities/SkillCategory";
import { Pill } from "@/components/ui/Pill";
import { ProgressBar } from "@/components/ui/ProgressBar";
import {
  Code,
  Puzzle,
  GitBranch,
  Database,
  Terminal,
  Shield,
  Router,
} from "lucide-react";
import type { ReactNode } from "react";

const ICON_MAP: Record<string, ReactNode> = {
  Code: <Code size={28} strokeWidth={1.5} />,
  Puzzle: <Puzzle size={28} strokeWidth={1.5} />,
  GitBranch: <GitBranch size={28} strokeWidth={1.5} />,
  Database: <Database size={28} strokeWidth={1.5} />,
  Terminal: <Terminal size={28} strokeWidth={1.5} />,
  Shield: <Shield size={28} strokeWidth={1.5} />,
  Router: <Router size={28} strokeWidth={1.5} />,
};

interface SkillCategoryCardProps {
  category: SkillCategory;
}

export function SkillCategoryCard({ category }: SkillCategoryCardProps) {
  return (
    <div className="bg-card-bg border border-card-border rounded-[16px] p-[32px]">
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <span className="text-primary-fixed">
          {ICON_MAP[category.icon] ?? <Code size={28} strokeWidth={1.5} />}
        </span>
        <h2 className="text-headline-md text-primary">{category.label}</h2>
      </div>

      {/* Skill Pills */}
      <div className="flex flex-wrap gap-2">
        {category.skills.map((skill) => (
          <Pill
            key={skill.name}
            variant={skill.proficiency === "proficient" ? "proficient" : "default"}
          >
            {skill.name}
          </Pill>
        ))}
      </div>

      {/* Proficiency Bars */}
      {category.proficiencyBars && category.proficiencyBars.length > 0 && (
        <div className="mt-6 space-y-3">
          {category.proficiencyBars.map((bar) => (
            <ProgressBar
              key={bar.label}
              label={bar.label}
              percentage={bar.percentage}
            />
          ))}
        </div>
      )}
    </div>
  );
}
