import HeaderPages from "../../components/HeaderPages/HeaderPages";
import { FilamentsTable } from "../../features/stock/components/FilamentsTable/FilamentsTable";

const StockPage: React.FC = () => {
  return (
    <>
      <HeaderPages
        title="Stock de Filamentos"
        subtitle="Sistema de control de stock para materiales de impresión 3D"
        buttonLabel="Añadir bobina"
      />
      <FilamentsTable filaments={[]} />
    </>
  );
};

export default StockPage;
