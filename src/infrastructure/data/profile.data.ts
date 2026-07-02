import { ProfileSchema, type Profile } from "@/domain/entities/Profile";

const profileData: Profile = {
  name: "Chen Sakkol",
  roles: ["Backend", "Full Stack", "Mobile", "IT Support"],
  summary:
    "I am a dedicated full-stack developer with a strong foundation in IT Engineering. Passionate about building robust backend architectures and seamless user experiences, I bridge the gap between complex technical requirements and elegant digital solutions. Currently pursuing my degree while actively contributing to real-world development projects.",
  avatarUrl:
    "./sakkol.png",
  resumeUrl: "#",
  contact: [
    {
      type: "email",
      label: "Email",
      value: "chensakkol2024@gmail.com",
      href: "mailto:chensakkol2024@gmail.com",
    },
    {
      type: "phone",
      label: "Phone",
      value: "+855 96 474 7120",
      href: "tel:+855964747120",
    },
    {
      type: "telegram",
      label: "Telegram",
      value: "@sakkol",
      href: "https://t.me/sakkol",
    },
    {
      type: "github",
      label: "GitHub",
      value: "github.com/chensakkol",
      href: "https://github.com/sakkol-git",
    }
  ],
  socials: [
    {
      platform: "github",
      href: "https://github.com/sakkol-git",
      label: "GitHub",
    },
    {
      platform: "linkedin",
      href: "https://www.linkedin.com/in/chen-sakkol-542155327",
      label: "LinkedIn",
    },
    {
      platform: "telegram",
      href: "https://t.me/sakkol",
      label: "Telegram",
    },
  ],
  languages: [
    { language: "Khmer", level: "Native", percentage: 100 },
    { language: "English", level: "Good", percentage: 75 },
    { language: "Chinese", level: "Beginner", percentage: 30 },
  ],
};

// Build-time validation
ProfileSchema.parse(profileData);

export const profile = profileData;
