import React from "react";
import HeaderPages from "../../components/HeaderPages/HeaderPages";
import ConsumeFilamentModal from "../../features/stock/components/ConsumeFilament/ConsumeFilamentForm/ConsumeFilamentModal";
import { filamentivePla } from "../../features/stock/fixtures/mocksfilaments";

const HistoryPage: React.FC = () => {
  return (
    <>
      <HeaderPages
        title="Historial de impresiones"
        subtitle="Gestión y seguimiento detallado de piezas impresas"
      />
      <ConsumeFilamentModal
        filament={filamentivePla}
        isOpen={true}
        onClose={() => {}}
      />
    </>
  );
};

export default HistoryPage;
