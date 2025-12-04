/**
 * Skills Configuration
 * Centralized data for skills and expertise
 */

export interface SkillCategory {
  category: string
  items: string[]
  color: string
  bgColor: string
}

export const skillCategories: SkillCategory[] = [
  {
    category: "Frontend",
    items: ["React", "Next.js", "TypeScript", "Tailwind CSS"],
    color: "#3b82f6", // blue-500
    bgColor: "bg-blue-500/10",
  },
  {
    category: "DevOps & CI/CD",
    items: ["Docker", "Kubernetes", "Jenkins", "GitHub Actions"],
    color: "#f97316", // orange-500
    bgColor: "bg-orange-500/10",
  },
  {
    category: "Cloud & Infrastructure",
    items: ["AWS", "Terraform", "Linux", "Nginx"],
    color: "#22c55e", // green-500
    bgColor: "bg-green-500/10",
  },
  {
    category: "Monitoring & Tools",
    items: ["Prometheus", "Grafana", "Git", "VS Code"],
    color: "#a855f7", // purple-500
    bgColor: "bg-purple-500/10",
  },
]

// Backward compatible alias
export const skills = skillCategories

export const timeline = [
  {
    year: "2024 - Present",
    title: "Frontend Developer & DevOps Engineer",
    company: "Freelance / Open to Opportunities",
    description:
      "Building modern web applications and automating deployment pipelines with Docker, Kubernetes, and CI/CD",
    type: "work" as const,
  },
  {
    year: "2022 - Present",
    title: "Information Technology Engineering",
    company: "Royal University of Phnom Penh",
    description:
      "3rd year student focusing on web development, DevOps practices, and cloud infrastructure",
    type: "education" as const,
  },
] as const

export const terminalContent = [
  { type: "normal" as const, content: "Hi, I'm Chen Sakkol." },
  { type: "normal" as const, content: "Frontend Developer & DevOps Engineer." },
  { type: "blank" as const, content: "" },
  { type: "highlight" as const, content: "I build modern web experiences" },
  { type: "highlight" as const, content: "and automate infrastructure—" },
  { type: "highlight" as const, content: "bridging dev and ops seamlessly." },
  { type: "blank" as const, content: "" },
  { type: "normal" as const, content: "Passionate about CI/CD, containers," },
  { type: "normal" as const, content: "cloud infrastructure, and scalable systems." },
] as const

export type TimelineItem = (typeof timeline)[number]
export type TerminalLine = (typeof terminalContent)[number]
