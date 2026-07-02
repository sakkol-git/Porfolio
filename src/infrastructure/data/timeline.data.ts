import { TimelineEntrySchema, type TimelineEntry } from "@/domain/entities/TimelineEntry";
import { z } from "zod";

const timelineData: TimelineEntry[] = [
  {
    id: "yad-fullstack",
    kind: "work",
    title: "Full Stack Web Developer",
    org: "Youth Advancement for Development (YAD)",
    dateRange: "Jan 2026 – Present",
    description:
      "Leading the development of a comprehensive web platform for youth engagement. Responsible for both frontend architecture and backend API design using modern frameworks.",
  },
  {
    id: "cita-it-support",
    kind: "work",
    title: "IT Support Training",
    org: "Cambodia Institute of Technology & Agriculture (CITA)",
    dateRange: "Dec 2025 – June 2026",
    description:
      "Intensive practical training in network infrastructure, hardware maintenance, and enterprise system support. Developed strong troubleshooting and diagnostic methodologies.",
  },
  {
    id: "rupp-bsc",
    kind: "education",
    title: "B.Sc. IT Engineering (Year 3)",
    org: "Royal University of Phnom Penh (RUPP)",
    dateRange: "Feb 2024 – Present",
    description:
      "Core coursework focusing on software engineering, database design, advanced algorithms, and system architecture. Maintaining top-tier academic standing.",
  },
];

// Build-time validation
z.array(TimelineEntrySchema).parse(timelineData);

export const timeline = timelineData;
