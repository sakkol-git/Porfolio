/**
 * Site Configuration
 * Centralized configuration for the entire portfolio
 */

export const siteConfig = {
  name: "Chen Sakkol",
  title: "Chen Sakkol | Frontend Developer & DevOps Engineer",
  description:
    "Frontend developer and DevOps engineer specializing in React, Three.js, CI/CD, and cloud infrastructure. Based in Phnom Penh, Cambodia.",
  url: "https://chensakkol.dev",
  ogImage: "/og-image.jpg",
  author: {
    name: "Chen Sakkol",
    firstName: "Sakkol",
    lastName: "Chen",
    email: "chensakkol1124@gmail.com",
    phone: "+855 96 474 7120",
    location: "Phnom Penh, Cambodia",
    role: "Frontend Developer & DevOps Engineer",
    bio: "3rd year IT Engineering student at Royal University of Phnom Penh. Passionate about building immersive web experiences and automating infrastructure with Docker, Kubernetes, and CI/CD pipelines.",
  },
  stats: {
    projects: "10+",
    clients: "5+",
    experience: "2+",
  },
  links: {
    github: "https://github.com/chensakkol",
    linkedin: "https://linkedin.com/in/chensakkol",
    twitter: "https://twitter.com/chensakkol",
    dribbble: "https://dribbble.com/chensakkol",
  },
  keywords: [
    "Frontend Developer",
    "DevOps Engineer",
    "React Developer",
    "Three.js",
    "WebGL",
    "CI/CD",
    "Docker",
    "Kubernetes",
    "AWS",
    "Cloud Infrastructure",
    "Cambodia",
    "Phnom Penh",
    "Web Development",
    "TypeScript",
    "Next.js",
  ] as string[],
} as const

export const navItems = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Works", href: "/works" },
  { label: "Contact", href: "/contact" },
] as const

export const socialLinks = [
  { label: "GitHub", href: siteConfig.links.github, icon: "github" },
  { label: "LinkedIn", href: siteConfig.links.linkedin, icon: "linkedin" },
  { label: "Twitter", href: siteConfig.links.twitter, icon: "twitter" },
  { label: "Dribbble", href: siteConfig.links.dribbble, icon: "dribbble" },
] as const

export const stats = [
  { value: "10+", label: "Projects" },
  { value: "5+", label: "Clients" },
  { value: "2+", label: "Years" },
] as const

export type NavItem = (typeof navItems)[number]
export type SocialLink = (typeof socialLinks)[number]
export type Stat = (typeof stats)[number]
