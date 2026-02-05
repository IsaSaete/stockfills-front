import type {
  AuthResponse,
  LoginCredentials,
  RegisterCredentials,
} from "../types";

export default class AuthClient {
  private readonly apiUrl = import.meta.env.VITE_API_URL;

  public registerUser = async (
    credentials: RegisterCredentials,
  ): Promise<AuthResponse> => {
    const response = await fetch(`${this.apiUrl}/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(credentials),
    });

    if (!response.ok) {
      if (response.status === 409) {
        throw new Error("El usuario ya existe");
      }

      throw new Error("Error al registrar usuario");
    }

    return (await response.json()) as AuthResponse;
  };

  public loginUser = async (
    credentials: LoginCredentials,
  ): Promise<AuthResponse> => {
    const response = await fetch(`${this.apiUrl}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(credentials),
    });

    if (!response.ok) {
      if (response.status === 401) {
        throw new Error("Email o contraseña incorrectos");
      }

      if (response.status === 404) {
        throw new Error("Cuenta no encontrada. ¿Quieres registrarte?");
      }

      throw new Error("Error al autenticar");
    }

    return (await response.json()) as AuthResponse;
  };

  public verifyToken = async (token: string): Promise<AuthResponse> => {
    const response = await fetch(`${this.apiUrl}/auth/verify`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error("Token inválido");
    }

    return (await response.json()) as AuthResponse;
  };
}
