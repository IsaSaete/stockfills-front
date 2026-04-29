import { useState } from "react";
import useStock from "../../hooks/useStock/useStock";
import type { FilamentDto } from "../../types/types";
import BrandCell from "./cells/BrandCell/BrandCell";
import ColorCell from "./cells/ColorCell/ColorCell";
import ConsumeCell from "./cells/ConsumeCell/ConsumeCell";
import DateCell from "./cells/DateCell/DateCell";
import DiameterCell from "./cells/DiameterCell/DiameterCell";
import FavoriteCell from "./cells/FavoriteCell/FavoriteCell";
import InfoCell from "./cells/InfoCell/InfoCell";
import MaterialCell from "./cells/MaterialCell/MaterialCell";
import PriceCell from "./cells/PriceCell/PriceCell";
import WeightCell from "./cells/WeightCell/WeightCell";
import ConsumeFilamentModal from "../ConsumeFilament/ConsumeFilamentForm/ConsumeFilamentModal";
import FilamentMobileCard from "./FilamentMobileCard";

interface Props {
  filaments: FilamentDto[];
}

const tableHeaders = [
  { key: "favoritos", label: "FAVORITOS" },
  { key: "color", label: "COLOR" },
  { key: "tipo", label: "TIPO" },
  { key: "marca", label: "MARCA" },
  { key: "cantidad", label: "CANTIDAD (g)" },
  { key: "diametro", label: "DIÁMETRO" },
  { key: "precio", label: "PRECIO" },
  { key: "fecha", label: "FECHA" },
  { key: "info", label: "MÁS INFO" },
  { key: "restar", label: "RESTAR" },
];

export const FilamentsTable: React.FC<Props> = ({ filaments }) => {
  const { updateFavoriteFilament } = useStock();
  const [modalState, setModalState] = useState({
    isOpen: false,
    filament: null as FilamentDto | null,
  });

  const handleOpenModal = (filament: FilamentDto) => {
    setModalState({ isOpen: true, filament });
  };

  const handleCloseModal = () => {
    setModalState({ isOpen: false, filament: null });
  };

  const handleFavoriteFilament = (filamentId: string) => {
    updateFavoriteFilament(filamentId);
  };

  const isFilamentsEmpty = filaments.length === 0;

  return (
    <>
      <ConsumeFilamentModal
        filament={modalState.filament}
        isOpen={modalState.isOpen}
        onClose={handleCloseModal}
      />
      <div className="md:hidden space-y-3">
        {filaments.map((filament) => (
          <FilamentMobileCard
            key={filament.id}
            filament={filament}
            onFavorite={handleFavoriteFilament}
            onConsume={handleOpenModal}
          />
        ))}
        {isFilamentsEmpty && (
          <div className="flex items-center justify-center rounded-lg border border-border bg-card">
            <p className="py-4">No se ha registrado ninguna bobina</p>
          </div>
        )}
      </div>
      <div className="hidden md:block w-full rounded-xl overflow-hidden border border-border bg-card">
        <table className="min-w-full table-fixed">
          <thead>
            <tr className="border-b border-border bg-panel">
              {tableHeaders.map((header) => (
                <th
                  key={header.key}
                  className="px-5 py-3 text-center text-sm font-bold text-muted-foreground align-top leading-tight"
                >
                  {header.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filaments.map((filament) => (
              <tr
                className="border-b border-border bg-transparent transition-colors hover:bg-muted"
                key={filament.id}
              >
                <FavoriteCell
                  isFavorite={filament.isFavorite}
                  action={() => handleFavoriteFilament(filament.id)}
                />
                <ColorCell colorHex={filament.colorHex} />
                <MaterialCell
                  material={filament.material}
                  customMaterial={filament.customMaterial}
                />
                <BrandCell brand={filament.brand} />
                <WeightCell
                  currentGrams={filament.currentWeightGrams}
                  initialGrams={filament.initialWeightGrams}
                />
                <DiameterCell diameter={filament.diameter} />
                <PriceCell price={filament.priceEurs!} />
                <DateCell date={filament.createdAt!} />
                <InfoCell filamentId={filament.id} />
                <ConsumeCell onConsume={handleOpenModal} filament={filament} />
              </tr>
            ))}
          </tbody>
        </table>
        {isFilamentsEmpty && (
          <div className="flex items-center justify-center">
            <p className="pt-4 pb-4">No se ha registrado ninguna bobina</p>
          </div>
        )}
      </div>
    </>
  );
};
