import { SkillCategorySchema, type SkillCategory } from "@/domain/entities/SkillCategory";
import { z } from "zod";

const skillsData: SkillCategory[] = [
  {
    id: "languages",
    label: "Languages",
    icon: "Code",
    skills: [
      { name: "PHP", proficiency: "proficient" },
      { name: "Java", proficiency: "proficient" },
      { name: "Dart" },
      { name: "JS" },
      { name: "Python" },
      { name: "HTML5" },
      { name: "CSS3" },
    ],
    proficiencyBars: [
      { label: "PHP", percentage: 95 },
      { label: "Java", percentage: 90 },
    ],
  },
  {
    id: "frameworks",
    label: "Frameworks",
    icon: "Puzzle",
    skills: [
      { name: "Laravel", proficiency: "proficient" },
      { name: "Spring Boot", proficiency: "proficient" },
      { name: "Flutter" },
      { name: "React.js" },
      { name: "Next.js" },
      { name: "Tailwind" },
    ],
    proficiencyBars: [
      { label: "Laravel", percentage: 92 },
      { label: "Spring Boot", percentage: 88 },
    ],
  },
  {
    id: "api-architecture",
    label: "API Architecture",
    icon: "GitBranch",
    skills: [
      { name: "MVC" },
      { name: "MVVM" },
      { name: "RESTful API" },
      { name: "CRUD" },
      { name: "Data Modeling" },
    ],
  },
  {
    id: "databases",
    label: "Databases",
    icon: "Database",
    skills: [{ name: "MySQL" }, { name: "PostgreSQL" }, { name: "Redis" }],
  },
  {
    id: "devops-tools",
    label: "DevOps & Tools",
    icon: "Terminal",
    skills: [
      { name: "Docker" },
      { name: "Git" },
      { name: "Linux" },
      { name: "Nginx" },
      { name: "Postman" },
    ],
  },
  {
    id: "security",
    label: "Security",
    icon: "Shield",
    skills: [{ name: "JWT" }, { name: "RBAC" }],
  },
  {
    id: "networking",
    label: "Networking",
    icon: "Router",
    skills: [{ name: "IT Support" }, { name: "Hardware/Software Maintenance" }],
  },
];

// Build-time validation
z.array(SkillCategorySchema).parse(skillsData);

export const skillCategories = skillsData;
