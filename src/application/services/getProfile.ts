import type { Profile } from "@/domain/entities/Profile";
import { profile } from "@/infrastructure/data/profile.data";

export function getProfile(): Profile {
  return profile;
}
