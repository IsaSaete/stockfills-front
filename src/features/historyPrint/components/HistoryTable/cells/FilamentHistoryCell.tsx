import { capitalizeInitial } from "../../../../../utils/strings";
import type { FilamentMaterial } from "../../../../stock/types/types";
import { getHistoryMaterialLabel } from "../../../constants/material";

interface FilamentHistoryCellProps {
  brand: string;
  material: FilamentMaterial;
  customMaterial?: string;
  colorHex: string;
}

const FilamentHistoryCell: React.FC<FilamentHistoryCellProps> = ({
  brand,
  material,
  customMaterial,
  colorHex,
}) => {
  const capitalizedBrand = capitalizeInitial(brand);
  const displayLabel = getHistoryMaterialLabel(material, customMaterial);

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
