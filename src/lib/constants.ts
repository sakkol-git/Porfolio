export const SITE_URL = "https://sakkoldev.com";
export const SITE_NAME = "SakkolDev";

export const NAV_ITEMS = [
  { href: "/projects", label: "Projects" },
  { href: "/about", label: "About" },
  { href: "/skills", label: "Skills" },
  { href: "/contact", label: "Contact" },
] as const;

export const ROUTES = {
  home: "/",
  projects: "/projects",
  about: "/about",
  skills: "/skills",
  contact: "/contact",
} as const;
