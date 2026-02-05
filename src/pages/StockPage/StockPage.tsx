import HeaderPages from "../../components/HeaderPages/HeaderPages";
import { FilamentsTable } from "../../features/stock/components/FilamentsTable/FilamentsTable";
import useStock from "../../features/stock/hooks/useStock";

const StockPage: React.FC = () => {
  const { filaments } = useStock();

  return (
    <>
      <HeaderPages
        title="Stock de Filamentos"
        subtitle="Sistema de control de stock para materiales de impresión 3D"
        buttonLabel="Añadir bobina"
      />
      <FilamentsTable filaments={filaments} />
    </>
  );
};

export default StockPage;
