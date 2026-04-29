import { AlertTriangle, Info, Star } from "lucide-react";
import { Link } from "react-router";
import { ProgressBar } from "../../../../components/ProgressBar/ProgressBar";
import { stockColorMap } from "../../constanst/stockColors";
import { getStockInfo } from "../../domain/stock.logic";
import { stockPresentation } from "../../domain/stock.presentation";
import type { FilamentDto } from "../../types/types";

interface FilamentMobileCardProps {
  filament: FilamentDto;
  onFavorite: (filamentId: string) => void;
  onConsume: (filament: FilamentDto) => void;
}

const FilamentMobileCard: React.FC<FilamentMobileCardProps> = ({
  filament,
  onFavorite,
  onConsume,
}) => {
  const { percentage, status } = getStockInfo(
    filament.currentWeightGrams,
    filament.initialWeightGrams,
  );
  const presentation = stockPresentation[status];
  const uiColors = stockColorMap[presentation.color];
  const materialLabel =
    filament.material === "OTHER"
      ? filament.customMaterial || "OTRO"
      : filament.material;

  return (
    <article className="rounded-lg border border-border-primary bg-section-background p-4">
      <header className="flex items-start justify-between gap-3">
        <div className="flex items-start gap-3">
          <div
            className="mt-1 h-6 w-6 rounded-full border border-foreground"
            style={{ backgroundColor: filament.colorHex }}
            title={filament.colorHex}
          />
          <div>
            <div className="flex items-center gap-1.5">
              <h3 className="text-lg font-bold">{filament.brand}</h3>
              {status === "critical" && (
                <span
                  className={`inline-flex ${uiColors.text}`}
                  aria-label="Stock crítico"
                  title="Stock crítico"
                >
                  <AlertTriangle className="h-5 w-5" aria-hidden="true" />
                </span>
              )}
            </div>
            <span className="inline-flex items-center rounded bg-secondary px-2.5 py-1 text-sm font-semibold uppercase tracking-wide text-foreground">
              {materialLabel}
            </span>
          </div>
        </div>
        <button
          onClick={() => onFavorite(filament.id)}
          type="button"
          className="flex items-center justify-center"
          aria-label={
            filament.isFavorite ? "Quitar de favoritos" : "Añadir a favoritos"
          }
        >
          <Star
            className={`h-5 w-5 transition-colors ${
              filament.isFavorite
                ? "fill-amber-400 stroke-1 stroke-foreground dark:stroke-none"
                : "text-muted-foreground"
            }`}
          />
        </button>
      </header>

      <div className="mt-4 space-y-3">
        <div className="flex items-center justify-between text-sm">
          <span className="text-header">Stock actual</span>
          <span className="font-semibold">
            <span className={uiColors.text}>
              {filament.currentWeightGrams} g
            </span>
            <span className="text-foreground">
              {" "}
              / {filament.initialWeightGrams} g
            </span>
          </span>
        </div>
        <ProgressBar
          percentage={percentage}
          colorClass={uiColors.progress}
          currentGrams={filament.currentWeightGrams}
        />
      </div>

      <footer className="mt-4 flex items-center gap-2 border-t border-border-primary pt-3">
        <Link
          to={`/stock/filamento/${filament.id}`}
          className="inline-flex items-center gap-2 rounded-lg border border-foreground px-3 py-1.5 text-sm font-semibold transition-colors hover:border-primary hover:text-primary"
          aria-label="Ver detalles"
        >
          <Info className="h-4 w-4" />
          Más info
        </Link>
        <button
          onClick={() => onConsume(filament)}
          type="button"
          className="ml-auto rounded-lg border border-primary bg-primary px-3 py-1.5 text-xs font-semibold uppercase tracking-wide text-primary-foreground transition-colors hover:bg-transparent hover:text-foreground"
        >
          Consumir
        </button>
      </footer>
    </article>
  );
};

export default FilamentMobileCard;
