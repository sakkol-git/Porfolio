import { ProjectSchema, type Project } from "@/domain/entities/Project";
import { z } from "zod";

const projectsData: Project[] = [
  {
    id: "plant-lab",
    title: "Plant Lab Laboratory",
    slug: "plant-lab-laboratory",
    description: "Full-stack CRUD internal lab system.",
    techStack: ["Laravel", "React.js", "MySQL"],
    year: 2024,
    role: "Full-Stack Developer",
    overview: "A comprehensive internal laboratory management system built for Plant Lab. This system handles everything from sample tracking to automated reporting, drastically reducing manual paperwork and improving data accuracy.",
    highlights: [
      "Architected the database schema using MySQL",
      "Developed a robust API using Laravel",
      "Built a highly responsive frontend with React.js",
    ],
    gallery: [
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDFCMIU5kRX9uD4xmEkOcBW63qqJ2PGHzs_z96NYgtJP6-74Qk-jxUUXs1fmW9QanMVjEnzm6MCCXxEPV11RoUO97F-2Z3zGxceYUx0VcHJmPm8V6PUXvgXasw8NWe3FJ-YaPxre_xStO_MscX3oOUplg8CUPmLYxEVnb1A3SELYHjSp4CEDH4zXcCgqKGgdKDFiADusEa645Nc9uA19PRxdEgIZ5fXgX1zMtCNLrF4kP6D01MbmFCYAVBd7UpqJbMqBbGF8Og2330",
    ],
    links: {
      detailHref: "/projects/plant-lab-laboratory",
      productionUrl: "#",
      repoUrl: "#",
    },
    thumbnailUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDFCMIU5kRX9uD4xmEkOcBW63qqJ2PGHzs_z96NYgtJP6-74Qk-jxUUXs1fmW9QanMVjEnzm6MCCXxEPV11RoUO97F-2Z3zGxceYUx0VcHJmPm8V6PUXvgXasw8NWe3FJ-YaPxre_xStO_MscX3oOUplg8CUPmLYxEVnb1A3SELYHjSp4CEDH4zXcCgqKGgdKDFiADusEa645Nc9uA19PRxdEgIZ5fXgX1zMtCNLrF4kP6D01MbmFCYAVBd7UpqJbMqBbGF8Og2330",
    thumbnailAlt: "Plant Lab Laboratory dashboard preview screenshot",
  },
  {
    id: "yad",
    title: "Youth Advancement For Development (YAD)",
    slug: "youth-advancement-development",
    description: "Official NGO web platform.",
    techStack: ["Next.js", "PostgreSQL"],
    year: 2025,
    role: "Lead Developer",
    overview: "The official web platform for the Youth Advancement For Development NGO. This platform serves as the central hub for their initiatives, volunteer onboarding, and donation processing.",
    highlights: [
      "Implemented a scalable architecture using Next.js App Router",
      "Integrated secure payment processing for donations",
      "Optimized the site for maximum accessibility and SEO",
    ],
    gallery: [
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAHkui4gfo1oIsEzR8d_7SDUsGpC79Fm8dqq4O4X0DID1IpEno078gp5kdVmBLdBqyfCbIr42Z8x-93x_CKLF_1nhbCcGMGcm-oCBbt2WKnkWZHFd-TjU-u4sILOz1nO5Oc35mUQ21GP6B-knrmoIO7fG-hjGjrPG6kWoxu_TvtYyVb1SCb2Qtui6sC6yY5_Rfyqc0oJCXwNztmcBtg_coD-c55sei2LiqMIfbMCj_E6DYWydRp8Ce0Mq9EPdjWg7WYxNZ9xLN9fvw",
    ],
    links: {
      detailHref: "/projects/youth-advancement-development",
      productionUrl: "#",
      repoUrl: "#",
    },
    thumbnailUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAHkui4gfo1oIsEzR8d_7SDUsGpC79Fm8dqq4O4X0DID1IpEno078gp5kdVmBLdBqyfCbIr42Z8x-93x_CKLF_1nhbCcGMGcm-oCBbt2WKnkWZHFd-TjU-u4sILOz1nO5Oc35mUQ21GP6B-knrmoIO7fG-hjGjrPG6kWoxu_TvtYyVb1SCb2Qtui6sC6yY5_Rfyqc0oJCXwNztmcBtg_coD-c55sei2LiqMIfbMCj_E6DYWydRp8Ce0Mq9EPdjWg7WYxNZ9xLN9fvw",
    thumbnailAlt: "Youth Advancement For Development website preview screenshot",
  },
  {
    id: "wizard",
    title: "Wizard Online Commercial Website",
    slug: "wizard-online-commercial",
    description: "E-commerce architecture.",
    techStack: ["Spring Boot", "Flutter", "Stripe"],
    year: 2025,
    role: "Backend Architect",
    overview: "A robust e-commerce architecture powering the Wizard Online Commercial Website. The system handles complex inventory management, real-time sync, and multi-currency transactions.",
    highlights: [
      "Designed a microservices-ready architecture in Spring Boot",
      "Developed a cross-platform mobile app using Flutter",
      "Integrated Stripe for seamless payment processing",
    ],
    gallery: [
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDrkMri41ei1YBTclpC0CumVbR_TxcpDttHC4Hj-2ufzcY93ar4761OS6CpT0atRctNrEixbZWvyR_ZZLJEw-tFNiAC5od1ABgvla5rgf-yVafVrNF9jfDiu6l17_JAukPrXY7-TkQgLjr7rgy-npMSkCRgNDFU9TQaWmlvlM52HR3AeHBgEaF6KFosd-XkJpoVnL-Ngxa20-7QG0CpLrxAcPBz-k_c9-HAdWTuCsutiE-Vwxld_Bh-JyVHTGGRQzEoqMoeT_zAPlM",
    ],
    links: {
      detailHref: "/projects/wizard-online-commercial",
      productionUrl: "#",
      repoUrl: "#",
    },
    thumbnailUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDrkMri41ei1YBTclpC0CumVbR_TxcpDttHC4Hj-2ufzcY93ar4761OS6CpT0atRctNrEixbZWvyR_ZZLJEw-tFNiAC5od1ABgvla5rgf-yVafVrNF9jfDiu6l17_JAukPrXY7-TkQgLjr7rgy-npMSkCRgNDFU9TQaWmlvlM52HR3AeHBgEaF6KFosd-XkJpoVnL-Ngxa20-7QG0CpLrxAcPBz-k_c9-HAdWTuCsutiE-Vwxld_Bh-JyVHTGGRQzEoqMoeT_zAPlM",
    thumbnailAlt: "Wizard e-commerce platform preview screenshot",
  },
  {
    id: "royal-elegance",
    title: "Royal Elegance",
    slug: "royal-elegance",
    description: "Luxury hotel booking website.",
    techStack: ["Next.js", "PostgreSQL", "Stripe"],
    year: 2024,
    role: "Full-Stack Developer",
    overview: "A premium luxury hotel booking website for Royal Elegance. Features include real-time room availability, dynamic pricing, and an immersive user interface.",
    highlights: [
      "Built an intuitive booking flow maximizing conversion rates",
      "Developed an admin dashboard for room management",
      "Ensured sub-second page loads using Next.js Static Generation",
    ],
    gallery: [
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDbsKY8vCvG-a1tFWUkBrjst8IaPN_oxdWSkWP-6Fx7oovdiTlsMM0ePzv68bH6zgvRGb823O-vEo4nRqIrM4wGB4wxFpgZPFfl00bNbABcGtbXw9Hvm43z2d6YSEv842vtDhv6Ea2jMCGTDwQHGy4VXRVP9r56RZiry68JnYkJXphTlh4hHYgKpr7Byz289j_t5E84sRRCg3gXq4RilQbY8jYshOsw4eUYRSjY10sqWcdjnz83JPRY2BepUD5Q7hzFAGwJjueMfNQ",
    ],
    links: {
      detailHref: "/projects/royal-elegance",
      productionUrl: "#",
      repoUrl: "#",
    },
    thumbnailUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDbsKY8vCvG-a1tFWUkBrjst8IaPN_oxdWSkWP-6Fx7oovdiTlsMM0ePzv68bH6zgvRGb823O-vEo4nRqIrM4wGB4wxFpgZPFfl00bNbABcGtbXw9Hvm43z2d6YSEv842vtDhv6Ea2jMCGTDwQHGy4VXRVP9r56RZiry68JnYkJXphTlh4hHYgKpr7Byz289j_t5E84sRRCg3gXq4RilQbY8jYshOsw4eUYRSjY10sqWcdjnz83JPRY2BepUD5Q7hzFAGwJjueMfNQ",
    thumbnailAlt: "Royal Elegance hotel booking website preview screenshot",
  },
];

// Build-time validation
z.array(ProjectSchema).parse(projectsData);

export const projects = projectsData;
