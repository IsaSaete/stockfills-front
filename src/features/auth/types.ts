export interface User {
  id: string;
  email: string;
  username: string;
  avatar?: string;
}

export interface AuthResponse {
  token: string;
  user: User;
}

export interface RegisterCredentials {
  username: string;
  email: string;
  password: string;
}

export interface FormCredentials extends RegisterCredentials {
  repeatPassword: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}
