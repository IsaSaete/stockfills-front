import useStock from "../../hooks/useStock";
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

  const handleFavoriteFilament = (filamentId: string) => {
    updateFavoriteFilament(filamentId);
  };

  const isFilamentsEmpty = filaments.length === 0;

  return (
    <div className="w-full">
      <table className="min-w-full table-fixed border-4 rounded-lg border-border-primary">
        <thead>
          <tr className="border-b-5 border-border-primary bg-card-background font-mono">
            {tableHeaders.map((header) => (
              <th
                key={header.key}
                className="px-5 py-3 text-base font-medium tracking-wider "
              >
                {header.label}
              </th>
            ))}
          </tr>
        </thead>

        {filaments && (
          <tbody>
            {filaments.map((filament) => (
              <tr
                className="border-b border-border-primary bg-section-background  transition-colors hover:bg-card-background"
                key={filament.id}
              >
                <FavoriteCell
                  isFavorite={filament.isFavorite}
                  action={() => handleFavoriteFilament(filament.id)}
                />
                <ColorCell colorHex={filament.colorHex} />
                <MaterialCell material={filament.material} />
                <BrandCell brand={filament.brand} />
                <WeightCell
                  currentGrams={filament.currentWeightGrams}
                  initialGrams={filament.initialWeightGrams}
                  thresholdGrams={filament.lowStockThresholdGrams}
                />
                <DiameterCell diameter={filament.diameter} />
                <PriceCell price={filament.priceEurs!} />
                <DateCell date={filament.createdAt!} />
                <InfoCell />
                <ConsumeCell />
              </tr>
            ))}
          </tbody>
        )}
      </table>
      {isFilamentsEmpty && (
        <div className="flex items-center justify-center ">
          <p className="pt-4">No se ha registrado ninguna bobina</p>
        </div>
      )}
    </div>
  );
};
