import { useMemo } from "react";
import { Target, Server, LayoutTemplate, Activity, Zap, Layers, LucideIcon } from "lucide-react";
import type { Project } from "@/domain/entities/Project";

interface ProjectSnapshotCardProps {
  project: Project;
  className?: string;
}

export function ProjectSnapshotCard({ project, className = "" }: ProjectSnapshotCardProps) {
  // Memoize extracted data to prevent recalculation on re-renders
  const { purpose, backendTech, metrics, architecture, keySkill } = useMemo(() => {
    const extractedPurpose = project.overview.split(".")[0] || project.overview;
    
    const backendKeywords = ["spring", "laravel", "node", "next.js", "django", "express"];
    const extractedBackendTech = project.techDetails.find(t => 
      backendKeywords.some(keyword => t.name.toLowerCase().includes(keyword))
    )?.name ?? project.techStack[0] ?? "Backend Service";
    
    const extractedMetrics = project.metrics && project.metrics.length > 0 ? project.metrics[0] : null;
    const extractedArchitecture = (project.architectureOverview?.keyComponents && project.architectureOverview.keyComponents[0]) ?? "Monolith / Microservices";
    const extractedKeySkill = (project.learnings && project.learnings[0]) ?? "Full-stack development";

    return {
      purpose: extractedPurpose,
      backendTech: extractedBackendTech,
      metrics: extractedMetrics,
      architecture: extractedArchitecture,
      keySkill: extractedKeySkill
    };
  }, [project]);

  return (
    <aside className={`glass-card border border-card-border rounded-md p-6 flex flex-col gap-5 ${className}`}>
      <h3 className="text-headline-sm font-bold text-primary flex items-center gap-2 border-b border-outline-variant pb-3 mb-1">
        <Layers className="text-primary-fixed" size={20} />
        Project Snapshot
      </h3>
      
      <div className="flex flex-col gap-4">
        <SnapshotRow 
          icon={Target} 
          label="Purpose" 
          value={purpose} 
          className="line-clamp-2" 
        />
        
        <SnapshotRow 
          icon={Server} 
          label="Core Tech" 
          value={backendTech} 
        />
        
        <SnapshotRow 
          icon={LayoutTemplate} 
          label="Architecture" 
          value={architecture} 
          className="line-clamp-1" 
        />

        {metrics && (
          <SnapshotRow 
            icon={Activity} 
            label="Scale / Impact" 
            value={`${metrics.label}: ${metrics.value}`} 
          />
        )}
        
        <SnapshotRow 
          icon={Zap} 
          label="Key Skill" 
          value={keySkill} 
        />
      </div>
    </aside>
  );
}

// --- Helper Components ---

interface SnapshotRowProps {
  icon: LucideIcon;
  label: string;
  value: string;
  className?: string;
}

function SnapshotRow({ icon: Icon, label, value, className = "" }: SnapshotRowProps) {
  return (
    <div className="flex items-start gap-3">
      <Icon className="text-primary-fixed shrink-0 mt-0.5" size={18} />
      <div className="flex flex-col">
        <span className="text-meta uppercase tracking-wider text-on-surface-variant font-semibold">
          {label}
        </span>
        <span className={`text-body-sm text-primary ${className}`}>
          {value}
        </span>
      </div>
    </div>
  );
}

