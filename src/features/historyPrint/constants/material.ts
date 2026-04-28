import type { FilamentMaterial } from "../../stock/types/types";

const historyMaterialLabels: Record<FilamentMaterial, string> = {
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

export const getHistoryMaterialLabel = (
  material: FilamentMaterial,
  customMaterial?: string,
): string => {
  if (material === "OTHER") {
    return customMaterial || historyMaterialLabels.OTHER;
  }

  return historyMaterialLabels[material];
};
