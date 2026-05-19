import { depletedFilamentBadgeClassName } from "../../constanst/depletedFilamentBadge";
import { isFilamentDepleted } from "../../domain/stock.logic";
import type { FilamentDto } from "../../types/types";

interface FilamentConsumeActionProps {
  filament: FilamentDto;
  onConsume: (filament: FilamentDto) => void;
  variant: "table" | "mobile";
}

const FilamentConsumeAction: React.FC<FilamentConsumeActionProps> = ({
  filament,
  onConsume,
  variant,
}) => {
  const isDepleted = isFilamentDepleted(filament.currentWeightGrams);

  if (isDepleted) {
    return (
      <span
        role="status"
        aria-label="Bobina agotada. No se puede registrar consumo."
        className={
          variant === "mobile"
            ? `${depletedFilamentBadgeClassName} ml-auto uppercase tracking-wider`
            : `${depletedFilamentBadgeClassName} uppercase tracking-wider`
        }
      >
        Agotada
      </span>
    );
  }

  if (variant === "mobile") {
    return (
      <button
        onClick={() => onConsume(filament)}
        type="button"
        className="ml-auto rounded-lg border border-primary bg-primary px-3 py-1.5 text-xs font-semibold uppercase tracking-wide text-primary-foreground transition-colors hover:bg-transparent hover:text-foreground"
      >
        Consumir
      </button>
    );
  }

  return (
    <button
      onClick={() => onConsume(filament)}
      type="button"
      className="inline-flex items-center justify-center rounded-lg border border-border bg-card px-3 py-1.5 text-sm font-semibold text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
    >
      Consumir
    </button>
  );
};

export default FilamentConsumeAction;
