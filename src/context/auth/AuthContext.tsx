



import { createContext } from "react";

export interface AuthContextType {
  isAuth: boolean;
  userName: string | null;
  login: (mobile: string, password: string) => Promise<void>;
  // logout: () => void;
    logout: () => Promise<void>; // 👈 async now

}

export const AuthContext =
  createContext<AuthContextType | null>(null);
