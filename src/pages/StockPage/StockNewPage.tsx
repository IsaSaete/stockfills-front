import HeaderPages from "../../components/HeaderPages/HeaderPages";
import FilamentForm from "../../features/stock/components/FilamentForm/FilamentForm";

const StockNewPage: React.FC = () => {
  return (
    <>
      <HeaderPages
        title="Añadir nueva bobina"
        subtitle="Añade una bobina y mantén tu stock actualizado"
      />
      <FilamentForm />
    </>
  );
};

export default StockNewPage;
