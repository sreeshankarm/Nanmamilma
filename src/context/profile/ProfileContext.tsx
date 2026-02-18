






import { createContext } from "react";
import type { UserProfile } from "../../types/profile";

export interface ProfileContextType {
  profile: UserProfile | null;
  loading: boolean;
  fetchProfile : () => Promise<void>;
}

export const ProfileContext =
  createContext<ProfileContextType | null>(null);

