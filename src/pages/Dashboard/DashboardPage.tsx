import { NavLink } from "react-router";
import { CirclePlus } from "lucide-react";
import HeaderPages from "../../components/HeaderPages/HeaderPages";
import { useAuth } from "../../features/auth/hooks/useAuth";

const DashboardPage: React.FC = () => {
  const { userInfo } = useAuth();

  return (
    <>
      <HeaderPages
        title={`¡Hola de nuevo ${userInfo?.username || ""}!`}
        subtitle="Aquí puedes ver tu resumen"
        action={
          <NavLink
            to="/stock/nuevo"
            className="bg-primary text-primary-foreground text-base py-2 px-4 rounded-lg flex items-center gap-3 transition-all shadow-2xs shadow-primary/30 hover:bg-primary/50 hover:cursor-pointer"
          >
            <span className="text-xl">
              <CirclePlus className="fill-white text-primary" />
            </span>
            <span>Añadir bobina</span>
          </NavLink>
        }
      />
    </>
  );
};

export default DashboardPage;
