import type {
  FilamentDiameter,
  FilamentForm,
  FilamentMaterial,
  CreateFilamentDto,
} from "../types/types";

export const mapFilamentFormToFilamentSend = (
  filamentFormData: FilamentForm,
): CreateFilamentDto => {
  const parseNumber = (value: string): number => {
    const parsed = parseFloat(value);

    return isNaN(parsed) ? 0 : parsed;
  };

  const initialWeight = parseNumber(filamentFormData.initialWeightGrams);

  return {
    brand: filamentFormData.brand.trim(),
    material: filamentFormData.material as FilamentMaterial,
    color: filamentFormData.colorHex,
    diameter: parseFloat(filamentFormData.diameter) as FilamentDiameter,
    initialWeightGrams: initialWeight,
    isFavorite: false,
    priceEurs: parseNumber(filamentFormData.priceEurs),
    supplier: filamentFormData.supplier.trim() || undefined,
    purchaseUrl: filamentFormData.purchaseUrl.trim() || undefined,
    notes: filamentFormData.notes.trim() || undefined,
  };
};
