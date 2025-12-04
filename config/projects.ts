/**
 * Projects Configuration
 * Centralized data for all portfolio projects
 */

export interface Project {
  id: string
  title: string
  category: string
  year: string
  description: string
  image: string
  technologies: string[]
  link?: string
  github?: string
  featured?: boolean
}

export const projects: Project[] = [
  {
    id: "k8s-microservices",
    title: "Kubernetes Microservices Platform",
    category: "DevOps / Cloud",
    year: "2024",
    description:
      "Production-ready Kubernetes cluster with auto-scaling microservices, Helm charts, and complete CI/CD pipeline using GitHub Actions.",
    image: "/dark-web3-blockchain-interface.jpg",
    technologies: ["Kubernetes", "Docker", "Helm", "GitHub Actions", "Terraform"],
    featured: true,
  },
  {
    id: "ci-cd-pipeline",
    title: "Enterprise CI/CD Pipeline",
    category: "DevOps",
    year: "2024",
    description:
      "Automated deployment pipeline with multi-stage environments, automated testing, security scanning, and infrastructure provisioning.",
    image: "/futuristic-dashboard-ui-dark-theme-analytics.jpg",
    technologies: ["Jenkins", "Docker", "AWS", "Terraform", "SonarQube"],
    featured: true,
  },
  {
    id: "blockchain-identity",
    title: "Blockchain Digital Identity",
    category: "Web3 / Blockchain",
    year: "2024",
    description:
      "A decentralized identity management system built on blockchain technology for secure and verifiable digital identities.",
    image: "/creative-3d-portfolio-website-colorful-particles.jpg",
    technologies: ["React", "Solidity", "Ethers.js", "Web3.js"],
    featured: true,
  },
  {
    id: "infrastructure-iac",
    title: "Cloud Infrastructure as Code",
    category: "DevOps / Cloud",
    year: "2024",
    description:
      "Complete AWS infrastructure automation using Terraform with VPC, ECS, RDS, and monitoring stack. Fully version-controlled and reproducible.",
    image: "/ai-art-generation-interface-dark-theme-creative.jpg",
    technologies: ["Terraform", "AWS", "Docker", "Prometheus", "Grafana"],
  },
  {
    id: "royal-elegance",
    title: "Royal Elegance Hotel",
    category: "Web Development",
    year: "2024",
    description:
      "A luxurious hotel website with elegant design, booking system, and stunning visual presentation.",
    image: "/creative-3d-portfolio-website.jpg",
    technologies: ["Next.js", "Tailwind CSS", "Framer Motion", "TypeScript"],
  },
  {
    id: "docker-compose-stack",
    title: "Multi-Container Docker Stack",
    category: "DevOps",
    year: "2023",
    description:
      "Containerized full-stack application with Redis caching, PostgreSQL, Nginx reverse proxy, and monitoring using Docker Compose.",
    image: "/modern-ecommerce-website-minimal-design-products.jpg",
    technologies: ["Docker", "Docker Compose", "Nginx", "PostgreSQL", "Redis"],
  },
] as const

export const featuredProjects = projects.filter((p) => p.featured)
export const projectCategories = [...new Set(projects.map((p) => p.category))]
