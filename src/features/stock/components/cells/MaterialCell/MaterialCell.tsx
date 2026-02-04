import type { FilamentMaterial } from "../../../types/types";

interface MaterialBadgeProps {
  material: FilamentMaterial;
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

const MaterialCell: React.FC<MaterialBadgeProps> = ({ material }) => {
  return (
    <td className="px-4 py-4">
      <div className="flex items-center justify-center">
        <span className="inline-flex items-center rounded bg-secondary px-2.5 py-1 text-xs font-semibold uppercase tracking-wide text-foreground">
          {materialLabels[material]}
        </span>
      </div>
    </td>
  );
};

export default MaterialCell;
