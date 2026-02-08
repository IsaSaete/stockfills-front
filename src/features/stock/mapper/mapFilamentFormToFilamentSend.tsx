import type {
  FilamentDiameter,
  FilamentForm,
  FilamentMaterial,
  FilamentSendDto,
} from "../types/types";

export const mapFilamentFormToFilamentSend = (
  filamentFormData: FilamentForm,
): FilamentSendDto => {
  const parseNumber = (value: string): number => {
    const parsed = parseFloat(value);

    return isNaN(parsed) ? 0 : parsed;
  };

  const defaultLowStockThresHold = 200;
  const initialWeight = parseNumber(filamentFormData.initialWeightGrams);

  return {
    brand: filamentFormData.brand.trim(),
    material: filamentFormData.material as FilamentMaterial,
    color: filamentFormData.colorHex,
    diameter: parseFloat(filamentFormData.diameter) as FilamentDiameter,
    initialWeightGrams: initialWeight,
    currentWeightGrams: initialWeight,
    lowStockThresholdGrams: defaultLowStockThresHold,
    isFavorite: false,
    priceEurs: parseNumber(filamentFormData.priceEurs),
    supplier: filamentFormData.supplier.trim(),
    purchaseUrl: filamentFormData.purchaseUrl.trim(),
    notes: filamentFormData.notes.trim(),
  };
};
