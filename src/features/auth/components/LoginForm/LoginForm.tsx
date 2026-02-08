import { Mail, Lock, Eye, EyeOff, LogIn, AlertCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuthForm } from "../../hooks/useAuthForm";
import { Button } from "../../../../components/shared/Button/Button";
import { useAuth } from "../../hooks/useAuth";

export const LoginForm = () => {
  const navigate = useNavigate();
  const { loginUser } = useAuth();
  const {
    email,
    password,
    showPassword,
    isLoading,
    formError,
    setEmail,
    setPassword,
    setShowPassword,
    setIsLoading,
    setFormError,
  } = useAuthForm();

  const [rememberMe, setRememberMe] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setFormError("");
    setIsLoading(true);

    try {
      await loginUser({ email, password });

      navigate("/dashboard");
    } catch (error) {
      if (error instanceof Error) {
        setFormError("Error al iniciar sesión. Inténtelo de nuevo más tarde.");

        setPassword("");
      } else {
        setFormError("Credenciales incorrectas");

        setPassword("");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      {formError && (
        <div
          role="alert"
          className="rounded-lg bg-destructive/10 border border-destructive/30 px-4 py-3 text-sm font-bold text-destructive"
        >
          <div className="flex items-center gap-2">
            <AlertCircle className="h-5 w-5" />
            <span>{formError}</span>
          </div>
        </div>
      )}
      <div className="flex flex-col gap-2">
        <label className="text-xs font-semibold tracking-wider text-muted-foreground">
          CORREO ELECTRÓNICO
        </label>
        <div className="flex items-center gap-3 rounded-lg border border-border bg-input px-4 py-3 focus-within:border-primary">
          <Mail className="h-5 w-5 text-muted-foreground" aria-hidden="true" />
          <input
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
        <div className="flex items-center justify-between">
          <label className="text-xs font-semibold tracking-wider text-muted-foreground">
            CONTRASEÑA
          </label>
          <button
            type="button"
            className="text-xs font-medium text-primary hover:underline"
          >
            ¿OLVIDASTE TU CONTRASEÑA?
          </button>
        </div>
        <div className="flex items-center gap-3 rounded-lg border border-border bg-input px-4 py-3 focus-within:border-primary">
          <Lock className="h-5 w-5 text-muted-foreground" aria-hidden="true" />
          <input
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="contraseña"
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
              <EyeOff aria-hidden="true" />
            ) : (
              <Eye aria-hidden="true" />
            )}
          </button>
        </div>
      </div>
      <label className="flex items-center gap-3 cursor-pointer">
        <input
          type="checkbox"
          checked={rememberMe}
          onChange={(e) => setRememberMe(e.target.checked)}
          className="h-4 w-4 rounded border-border bg-input accent-primary"
        />
        <span className="text-sm text-muted-foreground">
          Recordar sesión en este equipo
        </span>
      </label>
      <Button
        type="submit"
        variant="primary"
        size="lg"
        isLoading={isLoading}
        rightIcon={<LogIn className="h-5 w-5" />}
        className="mt-2 w-full tracking-wider"
      >
        INICIAR SESIÓN
      </Button>
    </form>
  );
};
