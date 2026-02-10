import { NavLink } from "react-router";
import { CirclePlus } from "lucide-react";
import HeaderPages from "../../components/HeaderPages/HeaderPages";
import { FilamentsTable } from "../../features/stock/components/FilamentsTable/FilamentsTable";
import useStock from "../../features/stock/hooks/useStock";
import { useEffect } from "react";

const StockPage: React.FC = () => {
  const { filaments, loadStock } = useStock();

  useEffect(() => {
    loadStock();
  }, [loadStock]);

  return (
    <>
      <HeaderPages
        title="Stock de Filamentos"
        subtitle="Sistema de control de stock para materiales de impresión 3D"
        action={
          <NavLink
            to="/stock/new"
            className="bg-primary text-primary-foreground text-base py-2 px-4 rounded-lg flex items-center gap-3 transition-all shadow-2xs shadow-primary/30 hover:bg-primary/50 hover:cursor-pointer"
          >
            <span className="text-xl">
              <CirclePlus className="fill-white text-primary" />
            </span>
            <span>Añadir bobina</span>
          </NavLink>
        }
      />
      <FilamentsTable filaments={filaments} />
    </>
  );
};

export default StockPage;
