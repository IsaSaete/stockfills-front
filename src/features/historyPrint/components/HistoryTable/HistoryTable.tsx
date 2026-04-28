import type { PrintingHistoryDto } from "../../types";
import CostPerPieceCell from "./cells/CostPerPieceCell";
import FilamentHistoryCell from "./cells/FilamentHistoryCell";
import GramsConsumedCell from "./cells/GramsConsumedCell";
import HistoryActionsCell from "./cells/HistoryActionsCell";
import HistoryDateCell from "./cells/HistoryDateCell";
import ImageCell from "./cells/ImageCell";
import PieceNameCell from "./cells/PieceNameCell";
import HistoryMobileCard from "./HistoryMobileCard";
import HistoryStatusCell from "./cells/HistoryStatusCell";

interface HistoryTableProps {
  entries: PrintingHistoryDto[];
  isLoading: boolean;
}

const tableHeaders = [
  { key: "foto", label: "FOTO" },
  { key: "fecha", label: "FECHA" },
  { key: "pieza", label: "PIEZA" },
  { key: "filamento", label: "FILAMENTO" },
  { key: "cantidad", label: "CANTIDAD (g)" },
  { key: "coste", label: "COSTE PIEZA" },
  { key: "estado", label: "ESTADO" },
  { key: "acciones", label: "ACCIONES" },
];

export const HistoryTable: React.FC<HistoryTableProps> = ({
  entries,
  isLoading,
}) => {
  const rows = entries ?? [];
  const isEmpty = rows.length === 0;
  const showLoading = isLoading && isEmpty;
  const showEmpty = !isLoading && isEmpty;

  const loadingContent = (
    <div
      className="flex flex-col items-center justify-center gap-3 py-8"
      role="status"
      aria-live="polite"
      aria-busy="true"
    >
      <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      <p className="text-sm font-medium text-muted-foreground">
        Cargando historial…
      </p>
    </div>
  );

  return (
    <>
      <div className="md:hidden space-y-3">
        {rows.map((entry) => (
          <HistoryMobileCard key={entry.id} entry={entry} />
        ))}
        {showLoading && (
          <div className="rounded-lg border-3 border-border-primary bg-section-background">
            {loadingContent}
          </div>
        )}
        {showEmpty && (
          <div className="flex items-center justify-center rounded-lg border-3 border-border-primary bg-section-background">
            <p className="py-4">No hay registros en el historial</p>
          </div>
        )}
      </div>
      <div className="hidden md:block w-full rounded-lg overflow-hidden border-3 border-border-primary">
        <table className="min-w-full table-fixed">
          <thead>
            <tr className="border-b-3 border-border-primary bg-card-background font-mono">
              {tableHeaders.map((header) => (
                <th
                  key={header.key}
                  className="px-5 py-3 text-center text-base font-medium tracking-wider align-top leading-tight"
                >
                  {header.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((entry) => (
              <tr
                className="border-b border-border-primary bg-section-background transition-colors hover:bg-card-background"
                key={entry.id}
              >
                <ImageCell
                  imageUrl={entry.imageUrl}
                  alt={entry.pieceName ?? "Pieza impresa"}
                />
                <HistoryDateCell date={entry.createdAt} />
                <PieceNameCell entry={entry} />
                <FilamentHistoryCell
                  brand={entry.filament.brand}
                  material={entry.filament.material}
                  customMaterial={entry.filament.customMaterial}
                  colorHex={entry.filament.colorHex}
                />
                <GramsConsumedCell grams={entry.gramsConsumed} />
                <CostPerPieceCell cost={entry.costPerPiece} />
                <HistoryStatusCell status={entry.status} />
                <HistoryActionsCell entryId={entry.id} />
              </tr>
            ))}
          </tbody>
        </table>
        {showLoading && (
          <div className="border-t border-border-primary bg-section-background">
            {loadingContent}
          </div>
        )}
        {showEmpty && (
          <div className="flex items-center justify-center">
            <p className="pt-4 pb-4">No hay registros en el historial</p>
          </div>
        )}
      </div>
    </>
  );
};
