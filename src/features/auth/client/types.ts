import type {
  AuthResponse,
  LoginCredentials,
  RegisterCredentials,
} from "../types";

export interface AuthClientStructure {
  registerUser: (credentials: RegisterCredentials) => Promise<AuthResponse>;
  loginUser: (credential: LoginCredentials) => Promise<AuthResponse>;
}
