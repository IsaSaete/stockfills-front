import { useState } from "react";

export const useAuthForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formError, setFormError] = useState("");

  return {
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
  };
};
