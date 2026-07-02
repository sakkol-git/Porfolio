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
      value: "hello@sakkol.dev",
      href: "mailto:hello@sakkol.dev",
    },
    {
      type: "phone",
      label: "Phone",
      value: "+855 12 345 678",
      href: "tel:+85512345678",
    },
    {
      type: "telegram",
      label: "Telegram",
      value: "@chensakkol",
      href: "https://t.me/chensakkol",
    },
    {
      type: "github",
      label: "GitHub",
      value: "github.com/chensakkol",
      href: "https://github.com/chensakkol",
    },
    {
      type: "location",
      label: "Location",
      value: "Phnom Penh, Cambodia",
    },
  ],
  socials: [
    {
      platform: "github",
      href: "https://github.com/chensakkol",
      label: "GitHub",
    },
    {
      platform: "linkedin",
      href: "https://linkedin.com/in/chensakkol",
      label: "LinkedIn",
    },
    {
      platform: "telegram",
      href: "https://t.me/chensakkol",
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
