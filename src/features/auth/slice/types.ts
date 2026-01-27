import type { User } from "../types";

export interface AuthState {
  isLoading: boolean;
  isInitialized: boolean;
  userInfo: User | null;
  token: string | null;
  error: string | null;
}
