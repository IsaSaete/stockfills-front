import { useState } from "react";
import { Mail, Lock, Eye, EyeOff, LogIn } from "lucide-react";
import { useNavigate } from "react-router-dom";

import { useAuthForm } from "../../hooks/useAuthForm";
import { Button } from "../../../../components/shared/Button/Button";
import { useAuth } from "../../hooks/useAuth";

export const RegisterForm = () => {
  const navigate = useNavigate();
  const { registerUser } = useAuth();

  const {
    email,
    password,
    showPassword,
    isLoading,
    error,
    setEmail,
    setPassword,
    setShowPassword,
    setIsLoading,
    setError,
  } = useAuthForm();

  const [username, setUsername] = useState("");

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError("");
    setIsLoading(true);

    const success = await registerUser({ email, password, username });

    if (success) {
      navigate("/dashboard");
    } else {
      setError("Error al crear la cuenta");
    }

    setIsLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      {error && (
        <div
          role="alert"
          className="rounded-lg bg-destructive/10 border border-destructive/30 px-4 py-3 text-sm text-destructive"
        >
          {error}
        </div>
      )}
      <div className="flex flex-col gap-2">
        <label
          htmlFor="register-name"
          className="text-xs font-semibold tracking-wider text-muted-foreground"
        >
          NOMBRE
        </label>
        <div className="flex items-center gap-3 rounded-lg border border-border bg-input px-4 py-3 focus-within:border-primary">
          <Mail className="h-5 w-5 text-muted-foreground" aria-hidden="true" />
          <input
            id="register-name"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Tu nombre"
            className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
            required
          />
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <label
          htmlFor="register-email"
          className="text-xs font-semibold tracking-wider text-muted-foreground"
        >
          CORREO ELECTRÓNICO
        </label>
        <div className="flex items-center gap-3 rounded-lg border border-border bg-input px-4 py-3 focus-within:border-primary">
          <Mail className="h-5 w-5 text-muted-foreground" aria-hidden="true" />
          <input
            id="register-email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="usuario@ejemplo.com"
            className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
            required
          />
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <label
          htmlFor="register-password"
          className="text-xs font-semibold tracking-wider text-muted-foreground"
        >
          CONTRASEÑA
        </label>
        <div className="flex items-center gap-3 rounded-lg border border-border bg-input px-4 py-3 focus-within:border-primary">
          <Lock className="h-5 w-5 text-muted-foreground" aria-hidden="true" />
          <input
            id="register-password"
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••••••"
            className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
            required
            autoComplete="off"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="text-muted-foreground hover:text-foreground"
            aria-pressed={showPassword}
            aria-label={
              showPassword ? "Ocultar contraseña" : "Mostrar contraseña"
            }
          >
            {showPassword ? (
              <EyeOff className="h-5 w-5" />
            ) : (
              <Eye className="h-5 w-5" />
            )}
          </button>
        </div>
      </div>
      <Button
        type="submit"
        variant="primary"
        size="lg"
        isLoading={isLoading}
        rightIcon={<LogIn className="h-5 w-5" />}
        className="mt-2 w-full tracking-wider"
      >
        CREAR CUENTA
      </Button>
    </form>
  );
};
