import { z } from "zod";

export const ContactChannelSchema = z.object({
  type: z.enum(["email", "phone", "telegram", "github", "linkedin", "location"]),
  label: z.string(),
  value: z.string(),
  href: z.string().optional(),
});

export type ContactChannel = z.infer<typeof ContactChannelSchema>;
