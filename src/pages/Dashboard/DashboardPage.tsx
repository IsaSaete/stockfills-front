import { NavLink } from "react-router";
import { CirclePlus } from "lucide-react";
import HeaderPages from "../../components/HeaderPages/HeaderPages";
import { useAuth } from "../../features/auth/hooks/useAuth";
import DashboardSummary from "../../features/dashboard/components/summary/DashboardSummary";

const DashboardPage: React.FC = () => {
  const { userInfo } = useAuth();

  return (
    <>
      <HeaderPages
        title={`¡Hola de nuevo ${userInfo?.username || ""}!`}
        subtitle="Aquí tienes el resumen de tu inventario"
        action={
          <NavLink
            to="/stock/nuevo"
            className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-4 py-3 text-base font-semibold text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 md:w-auto"
          >
            <CirclePlus className="h-5 w-5" />
            <span>Añadir bobina</span>
          </NavLink>
        }
      />
      <DashboardSummary />
    </>
  );
};

export default DashboardPage;
