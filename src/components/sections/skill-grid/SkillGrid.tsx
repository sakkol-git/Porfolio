import type { SkillCategory } from "@/domain/entities/SkillCategory";
import { SkillCategoryCard } from "./SkillCategoryCard";
import { StaggerContainer, StaggerItem } from "@/components/animations/StaggerContainer";

interface SkillGridProps {
  categories: SkillCategory[];
}

export function SkillGrid({ categories }: SkillGridProps) {
  return (
    <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-start">
      {categories.map((category) => (
        <StaggerItem key={category.id}>
          <SkillCategoryCard category={category} />
        </StaggerItem>
      ))}
    </StaggerContainer>
  );
}
