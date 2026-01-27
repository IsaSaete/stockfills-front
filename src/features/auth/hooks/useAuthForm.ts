import { useState } from "react";

export const useAuthForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  return {
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
  };
};
