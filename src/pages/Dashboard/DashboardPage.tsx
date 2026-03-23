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
            className="flex w-full items-center justify-center gap-3 rounded-lg bg-primary px-4 py-2 text-base text-primary-foreground transition-all shadow-2xs shadow-primary/30 hover:cursor-pointer hover:bg-primary/50 focus:outline-none focus:ring-2 focus:ring-foreground focus:border-foreground md:w-auto"
          >
            <span className="text-xl">
              <CirclePlus className="fill-white text-primary" />
            </span>
            <span>Añadir bobina</span>
          </NavLink>
        }
      />
      <DashboardSummary />
    </>
  );
};

export default DashboardPage;
