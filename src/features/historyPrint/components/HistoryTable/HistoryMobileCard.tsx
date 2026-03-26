import { ImageOff, Pencil, Trash2 } from "lucide-react";
import type { FilamentMaterial } from "../../../stock/types/types";
import type { PrintingHistoryDto } from "../../types";
import { capitalizeInitial } from "../../../../utils/strings";

interface HistoryMobileCardProps {
  entry: PrintingHistoryDto;
}

const materialLabels: Record<FilamentMaterial, string> = {
  PLA: "PLA",
  PETG: "PETG",
  ASA: "ASA",
  PET: "PET",
  ABS: "ABS",
  TPU: "TPU",
  NYLON: "NYLON",
  PLA_WOOD: "PLA WOOD",
  OTHER: "OTRO",
  FLEXIBLE: "FLEXIBLE",
};

const formatDate = (value?: string): string => {
  if (value === undefined) return "-";

  return new Date(value).toLocaleDateString("es-ES");
};

const HistoryMobileCard: React.FC<HistoryMobileCardProps> = ({ entry }) => {
  const capitalizedBrand = capitalizeInitial(entry.filament.brand);
  const pieceTitle = entry.pieceName?.trim() || "-";
  const materialLabel =
    entry.filament.material === "OTHER"
      ? entry.filament.customMaterial || "OTRO"
      : materialLabels[entry.filament.material];

  const costDisplay =
    entry.costPerPiece === undefined || entry.costPerPiece === 0
      ? "-"
      : `${entry.costPerPiece.toFixed(2)} €`;

  return (
    <article className="rounded-lg border border-border-primary bg-section-background p-4">
      <header className="flex gap-3">
        <div className="shrink-0">
          {entry.imageUrl ? (
            <img
              src={entry.imageUrl}
              alt={pieceTitle}
              className="h-16 w-16 rounded-lg border border-border-primary object-cover"
            />
          ) : (
            <div
              className="flex h-16 w-16 items-center justify-center rounded-lg border border-border-primary bg-card-background text-muted-foreground"
              aria-label="Sin imagen"
            >
              <ImageOff className="h-7 w-7 opacity-60" aria-hidden="true" />
            </div>
          )}
        </div>
        <div className="min-w-0 flex-1">
          <h3 className="text-lg font-bold leading-tight">{pieceTitle}</h3>
          <div className="mt-2 flex flex-wrap items-center gap-2">
            <div
              className="h-5 w-5 rounded-full border border-foreground"
              style={{ backgroundColor: entry.filament.colorHex }}
              title={entry.filament.colorHex}
            />
            <span className="text-sm font-medium text-foreground">
              {capitalizedBrand}
            </span>
            <span className="text-muted-foreground">•</span>
            <span className="text-xs font-semibold uppercase tracking-wide text-foreground">
              {materialLabel}
            </span>
          </div>
        </div>
      </header>
      <div className="mt-4 grid grid-cols-2 gap-x-4 gap-y-4 text-sm">
        <div className="col-span-2 space-y-1">
          <span className="text-header">Fecha</span>
          <p className="font-semibold">{formatDate(entry.createdAt)}</p>
        </div>
        <div className="space-y-1">
          <span className="text-header">Consumo</span>
          <p className="font-semibold">{entry.gramsConsumed} g</p>
        </div>
        <div className="space-y-1 text-right">
          <span className="text-header">Coste pieza</span>
          <p className="font-semibold">{costDisplay}</p>
        </div>
      </div>
      <footer className="mt-4 flex items-center justify-between gap-2 border-t border-border-primary pt-3">
        <button
          type="button"
          disabled
          className="inline-flex items-center gap-2 rounded-lg border border-border-primary px-3 py-1.5 text-sm font-semibold opacity-50 disabled:cursor-not-allowed"
        >
          <Pencil className="h-4 w-4" aria-hidden="true" />
          Editar
        </button>
        <button
          type="button"
          disabled
          className="inline-flex items-center gap-2 rounded-lg border border-red-500/50 px-3 py-1.5 text-sm font-semibold text-red-400 opacity-50 disabled:cursor-not-allowed"
        >
          <Trash2 className="h-4 w-4" aria-hidden="true" />
          Eliminar
        </button>
      </footer>
    </article>
  );
};

export default HistoryMobileCard;
