import { useState } from "react";
import { LoginForm } from "../LoginForm/LoginForm";
import { RegisterForm } from "../RegisterForm/RegisterForm";

type Tab = "login" | "register";

export const AuthPanel = () => {
  const [activeTab, setActiveTab] = useState<Tab>("login");

  return (
    <div className="flex w-full max-w-md flex-col justify-center rounded-lg border border-border bg-panel px-6 py-8 sm:px-8 lg:max-w-lg lg:px-14">
      <p className="mb-6 text-sm text-muted-foreground md:hidden">
        Accede a tu inventario y controla tu stock de filamentos en segundos.
      </p>
      <div className="mb-8 flex border-b border-border">
        <button
          type="button"
          onClick={() => setActiveTab("login")}
          className={`flex-1 pb-3 text-sm font-semibold tracking-wider transition-colors ${
            activeTab === "login"
              ? "border-b-2 border-primary text-primary"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          ENTRAR
        </button>
        <button
          type="button"
          onClick={() => setActiveTab("register")}
          className={`flex-1 pb-3 text-sm font-semibold tracking-wider transition-colors ${
            activeTab === "register"
              ? "border-b-2 border-primary text-primary"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          REGISTRO
        </button>
      </div>

      {activeTab === "login" ? <LoginForm /> : <RegisterForm />}
    </div>
  );
};
