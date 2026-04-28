import { capitalizeInitial } from "../../../../../utils/strings";
import type { FilamentMaterial } from "../../../../stock/types/types";

interface FilamentHistoryCellProps {
  brand: string;
  material: FilamentMaterial;
  customMaterial?: string;
  colorHex: string;
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

const FilamentHistoryCell: React.FC<FilamentHistoryCellProps> = ({
  brand,
  material,
  customMaterial,
  colorHex,
}) => {
  const capitalizedBrand = capitalizeInitial(brand);
  const displayLabel =
    material === "OTHER" ? customMaterial || "OTRO" : materialLabels[material];

  return (
    <td className="px-4 py-3">
      <div className="flex items-center justify-center gap-3">
        <div
          className="h-6 w-6 shrink-0 rounded-full border border-foreground"
          style={{ backgroundColor: colorHex }}
          title={colorHex}
        />

        <div className="flex min-w-0 items-center gap-2">
          <span
            className="min-w-0 truncate text-sm font-semibold text-foreground"
            title={capitalizedBrand}
          >
            {capitalizedBrand}
          </span>
          <span className="text-muted-foreground">•</span>
          <span
            className="shrink-0 text-xs font-semibold uppercase tracking-wide text-foreground"
            title={displayLabel}
          >
            {displayLabel}
          </span>
        </div>
      </div>
    </td>
  );
};

export default FilamentHistoryCell;
