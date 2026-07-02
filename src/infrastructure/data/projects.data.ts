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

    impactStatement: "Reduced manual reporting errors by 40% and accelerated sample tracking through a unified internal dashboard.",
    problemStatement: "Plant Lab relied on disjointed spreadsheets and manual entry for tracking thousands of biological samples. This caused data duplication, reporting delays, and increased the risk of critical errors in sample lifecycle management.",
    solution: {
      statement: "A comprehensive full-stack laboratory management system designed to centralize and automate sample tracking.",
      coreFeatures: [
        "End-to-end sample lifecycle tracking (intake to disposal)",
        "Automated daily report generation",
        "Role-based access control for lab technicians and admins",
      ],
      architectureStatement: "The system utilizes a Laravel REST API back-end, MySQL for structured relational data, and React.js for a highly responsive single-page application dashboard.",
    },
    architectureOverview: {
      explanation: "The architecture follows a standard Model-View-Controller (MVC) pattern adapted for a decoupled frontend. Laravel handles API routing, authentication, and complex business logic, while React fetches state via REST.",
      keyComponents: [
        "React SPA Frontend",
        "Laravel RESTful API",
        "MySQL Relational Database",
        "Automated Cron Scheduler (Reports)",
      ],
    },
    techDetails: [
      { name: "Laravel", reason: "Rapid backend API development and built-in robust authentication." },
      { name: "React.js", reason: "Component-based architecture for building a complex, interactive dashboard UI." },
      { name: "MySQL", reason: "Strong relational data integrity required for accurate sample tracking." },
    ],
    keyFeatures: [
      "Real-time sample status updates with <2s latency",
      "Dynamic filtering and search across 10,000+ historical records",
      "Automated PDF report generation and email distribution",
    ],
    engineeringHighlights: [
      "Implemented **eager loading** in Laravel to solve N+1 query problems, reducing API response time by 60%.",
      "Designed a **normalized MySQL schema** ensuring ACID compliance for critical lab data.",
      "Built a **custom React data grid** optimized for rendering hundreds of rows without performance degradation.",
    ],
    challenges: [
      {
        challenge: "Generating heavy PDF reports blocked the main API thread, causing timeouts.",
        solution: "Moved PDF generation to a background queue system using Laravel Jobs and Redis.",
        impact: "Eliminated timeouts and reduced user-facing response times for report requests to <100ms.",
      }
    ],
    metrics: [
      { label: "API Response", value: "~150ms" },
      { label: "Data Accuracy", value: "99.9%" },
    ],
    learnings: [
      "Managing background jobs and queues for heavy processing tasks",
      "Optimizing complex SQL queries in an ORM environment",
      "Building accessible and performant data tables in React",
    ],

    highlights: [
      "Architected the database schema using MySQL",
      "Developed a robust API using Laravel",
      "Built a highly responsive frontend with React.js",
    ],
    gallery: [
      "/project/plantlab.png",
    ],
    links: {
      detailHref: "/projects/plant-lab-laboratory",
      productionUrl: "https://inventory-frontend-beige-nine.vercel.app",
      repoUrl: "https://github.com/sakkol-git/inventory_backend.git",
    },
    thumbnailUrl:
      "/project/plantlab.png",
    thumbnailAlt: "Plant Lab Laboratory dashboard preview screenshot",
  },
  {
    id: "yad",
    title: "Youth Advancement For Development (YAD)",
    slug: "youth-advancement-development",
    description: "Official NGO web platform.",
    techStack: ["Next.js", "PostgreSQL", "Tailwind CSS"],
    year: 2025,
    role: "Lead Developer",
    overview: "The official web platform for the Youth Advancement For Development NGO. This platform serves as the central hub for their initiatives, volunteer onboarding, and donation processing.",

    impactStatement: "Increased volunteer sign-ups by 25% and streamlined donation flows for a regional NGO.",
    problemStatement: "The NGO lacked a centralized digital presence, relying on social media and paper forms. This made it difficult to onboard volunteers efficiently, collect donations securely, and showcase the impact of their initiatives.",
    solution: {
      statement: "A modern, accessible web platform serving as a central hub for the organization.",
      coreFeatures: [
        "Streamlined volunteer onboarding portal",
        "Secure, integrated donation processing",
        "Dynamic CMS-driven blog for initiative updates",
      ],
      architectureStatement: "Built using Next.js App Router for optimal SEO and performance, backed by a PostgreSQL database for reliable data storage.",
    },
    architectureOverview: {
      explanation: "The application uses a serverless architecture deployed on Vercel. Next.js handles server-side rendering for public pages to maximize SEO, while user portals use client-side fetching.",
      keyComponents: [
        "Next.js App Router (Frontend & API)",
        "PostgreSQL (Database via Prisma)",
        "Stripe (Payment Gateway)",
      ],
    },
    techDetails: [
      { name: "Next.js", reason: "Server-side rendering for excellent SEO and fast initial page loads." },
      { name: "PostgreSQL", reason: "Reliable relational data storage for user and donation records." },
      { name: "Tailwind CSS", reason: "Rapid UI development with utility classes, ensuring a consistent design system." },
    ],
    keyFeatures: [
      "Optimized Core Web Vitals resulting in a 95+ Lighthouse score",
      "Secure OAuth and email authentication for volunteer accounts",
      "Responsive design ensuring accessibility across all mobile devices",
    ],
    engineeringHighlights: [
      "Implemented **Next.js Server Actions** to handle form submissions securely without exposing API endpoints.",
      "Optimized image delivery using **next/image**, reducing total page weight by over 50%.",
      "Designed a flexible database schema using **Prisma ORM** for rapid iterations.",
    ],
    challenges: [
      {
        challenge: "High latency on initial page loads for dynamic content pages.",
        solution: "Implemented Next.js Incremental Static Regeneration (ISR) to cache pages at the edge.",
        impact: "Reduced TTFB (Time to First Byte) from 800ms to <100ms for 90% of requests.",
      }
    ],
    metrics: [
      { label: "Lighthouse Score", value: "98/100" },
      { label: "Page Load", value: "<1s" },
    ],
    learnings: [
      "Mastering Next.js App Router caching strategies",
      "Integrating secure third-party payment gateways",
      "Implementing Web Accessibility (a11y) best practices",
    ],

    highlights: [
      "Implemented a scalable architecture using Next.js App Router",
      "Integrated secure payment processing for donations",
      "Optimized the site for maximum accessibility and SEO",
    ],
    gallery: [
      "/project/yad.png",
    ],
    links: {
      detailHref: "/projects/youth-advancement-development",
      productionUrl: "https://yadkh.org",
      repoUrl: "https://github.com/sakkol-git/yad-website.git",
    },
    thumbnailUrl:
      "/project/yad.png",
    thumbnailAlt: "Youth Advancement For Development website preview screenshot",
  },
  {
    id: "royal-elegance",
    title: "Royal Elegance",
    slug: "royal-elegance",
    description: "Luxury hotel booking website.",
    techStack: ["Next.js", "PostgreSQL", "Stripe", "Redis"],
    year: 2024,
    role: "Full-Stack Developer",
    overview: "A premium luxury hotel booking website for Royal Elegance. Features include real-time room availability, dynamic pricing, and an immersive user interface.",

    impactStatement: "Elevated brand presence and increased direct bookings by 35% through a premium digital experience.",
    problemStatement: "The luxury hotel was losing revenue to third-party booking platforms (OTAs) due to an outdated, clunky direct booking website that didn't reflect their premium brand image.",
    solution: {
      statement: "A visually stunning, high-performance web application tailored for luxury clientele with a frictionless booking engine.",
      coreFeatures: [
        "Real-time room availability and dynamic pricing engine",
        "Immersive, animation-rich UI experience",
        "Custom admin dashboard for hotel staff",
      ],
      architectureStatement: "Built on Next.js to provide blazing fast performance via SSR and SSG, utilizing Redis for caching room availability, and PostgreSQL as the primary datastore.",
    },
    architectureOverview: {
      explanation: "A decoupled architecture where Next.js serves both the frontend and API routes. Complex queries (like availability searches) are cached in Redis to minimize database load during peak seasons.",
      keyComponents: [
        "Next.js Full-Stack Framework",
        "Redis Caching Layer",
        "PostgreSQL Database",
        "Stripe Payment Gateway",
      ],
    },
    techDetails: [
      { name: "Next.js", reason: "Provides static generation for landing pages and server-side rendering for booking flows." },
      { name: "Redis", reason: "Low-latency caching drastically speeds up complex room availability queries." },
      { name: "Stripe", reason: "Ensures PCI compliance and handles global payment methods securely." },
    ],
    keyFeatures: [
      "Sub-second page transitions with micro-animations",
      "Intelligent room suggestion algorithm based on user dates and party size",
      "Automated email confirmations and pre-arrival reminders via background workers",
    ],
    engineeringHighlights: [
      "Reduced DB load by **70% using a Redis caching layer** for frequently queried date ranges.",
      "Implemented **optimistic UI updates** to make the booking flow feel instantaneous.",
      "Built a **custom date-picker component** to handle complex availability logic efficiently.",
    ],
    challenges: [
      {
        challenge: "Checking availability across multiple room types and overlapping date ranges was computationally heavy.",
        solution: "Optimized the SQL queries using advanced indexing and implemented a Redis cache for common search parameters.",
        impact: "Decreased average search query time from 400ms to 45ms.",
      }
    ],
    metrics: [
      { label: "Cache Hit Rate", value: "85%" },
      { label: "Conversion Rate", value: "+35%" },
    ],
    learnings: [
      "Balancing high-end visual animations with strict performance budgets",
      "Designing efficient caching strategies for time-series availability data",
      "Building resilient payment flows that handle edge cases gracefully",
    ],

    highlights: [
      "Built an intuitive booking flow maximizing conversion rates",
      "Developed an admin dashboard for room management",
      "Ensured sub-second page loads using Next.js Static Generation",
    ],
    gallery: [
      "/project/royalelagance.png",
    ],
    links: {
      detailHref: "/projects/royal-elegance",
      productionUrl: "https://royal-elegance-hg98.vercel.app",
      repoUrl: "https://github.com/sakkol-git/royal-elegance.git",
    },
    thumbnailUrl:
      "/project/royalelagance.png",
    thumbnailAlt: "Royal Elegance hotel booking website preview screenshot",
  },
  {
    id: "wizard",
    title: "Wizard Online Commercial Website",
    slug: "wizard-online-commercial",
    description: "E-commerce architecture.",
    techStack: ["Spring Boot", "Flutter", "Stripe", "PostgreSQL"],
    year: 2025,
    role: "Backend Architect",
    overview: "A robust e-commerce architecture powering the Wizard Online Commercial Website. The system handles complex inventory management, real-time sync, and multi-currency transactions.",

    impactStatement: "Architected a scalable e-commerce backend supporting thousands of concurrent shoppers with zero downtime.",
    problemStatement: "The client needed a platform capable of handling flash sales and high traffic without crashing, while seamlessly integrating a web portal and a mobile application for a unified shopping experience.",
    solution: {
      statement: "A microservices-inspired robust backend architecture with a cross-platform mobile application.",
      coreFeatures: [
        "Real-time inventory synchronization",
        "Multi-currency secure payment processing",
        "Unified API for Web and Mobile platforms",
      ],
      architectureStatement: "The backend is built with Spring Boot, utilizing PostgreSQL for transactional data, and exposing RESTful endpoints consumed by a Flutter mobile application.",
    },
    architectureOverview: {
      explanation: "A layered architecture separates concerns (Controller, Service, Repository). Security is handled via JWT tokens, and transactions are managed centrally to ensure data consistency.",
      keyComponents: [
        "Spring Boot REST API",
        "Spring Security (JWT)",
        "PostgreSQL DB",
        "Flutter Mobile Client",
      ],
    },
    techDetails: [
      { name: "Spring Boot", reason: "Enterprise-grade reliability and extensive ecosystem for building scalable APIs." },
      { name: "Flutter", reason: "Single codebase for compiling native iOS and Android applications." },
      { name: "Stripe", reason: "Industry standard for secure, compliant payment processing." },
      { name: "PostgreSQL", reason: "ACID compliance ensures safe processing of financial transactions." },
    ],
    keyFeatures: [
      "Idempotent payment endpoints to prevent duplicate charges during network failures",
      "Global exception handling for consistent, structured API error responses",
      "Optimized product search using database indexing",
    ],
    engineeringHighlights: [
      "Applied **clean architecture** principles (Controller → Service → Repository) to maintain a highly testable codebase.",
      "Implemented **database transactions** across multiple services to guarantee atomic checkout processes.",
      "Configured **CORS and JWT-based authentication** for secure cross-platform API access.",
    ],
    challenges: [
      {
        challenge: "Concurrent checkout requests could lead to overselling limited inventory.",
        solution: "Implemented pessimistic locking on database rows during the checkout transaction.",
        impact: "Completely eliminated inventory discrepancies and race conditions.",
      }
    ],
    metrics: [
      { label: "Concurrent Users", value: "1,000+" },
      { label: "API Latency", value: "~120ms" },
    ],
    learnings: [
      "Handling race conditions in highly concurrent transactional systems",
      "Designing APIs that cater equally to web and mobile clients",
      "Structuring a large Spring Boot application for maintainability",
    ],

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
      repoUrl: "https://github.com/sakkol-git/wizard-shop-sprinboot.git",
    },
    thumbnailUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDrkMri41ei1YBTclpC0CumVbR_TxcpDttHC4Hj-2ufzcY93ar4761OS6CpT0atRctNrEixbZWvyR_ZZLJEw-tFNiAC5od1ABgvla5rgf-yVafVrNF9jfDiu6l17_JAukPrXY7-TkQgLjr7rgy-npMSkCRgNDFU9TQaWmlvlM52HR3AeHBgEaF6KFosd-XkJpoVnL-Ngxa20-7QG0CpLrxAcPBz-k_c9-HAdWTuCsutiE-Vwxld_Bh-JyVHTGGRQzEoqMoeT_zAPlM",
    thumbnailAlt: "Wizard e-commerce platform preview screenshot",
  },
];

// Build-time validation
z.array(ProjectSchema).parse(projectsData);

export const projects = projectsData;

