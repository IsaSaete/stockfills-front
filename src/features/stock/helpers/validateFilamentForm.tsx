import type { FilamentForm, FilamentFormErrors } from "../types/types";

export const validateFilamentForm = (
  formData: FilamentForm,
): FilamentFormErrors => {
  const errors: FilamentFormErrors = {};

  if (!formData.brand.trim()) {
    errors.brand = "La marca es obligatoria";
  }

  if (formData.material === "OTHER" && !formData.customMaterial?.trim()) {
    errors.customMaterial = "Debes indicar un material personalizado";
  }
  if (!formData.material) {
    errors.material = "El material es obligatorio";
  }

  if (!formData.colorHex) {
    errors.colorHex = "El color es obligatorio";
  }

  if (!formData.initialWeightGrams) {
    errors.initialWeightGrams = "El peso es obligatorio";
  }

  if (!formData.diameter) {
    errors.diameter = "El diámetro es obligatorio";
  }

  if (formData.priceEurs) {
    const price = Number(formData.priceEurs);

    if (isNaN(price)) {
      errors.priceEurs = "El precio debe ser un número";
    } else if (price < 0) {
      errors.priceEurs = "El precio no puede ser negativo";
    }
  }

  return errors;
};

export const isValidDecimalInput = (value: string): boolean =>
  /^[0-9]*([.,][0-9]{0,2})?$/.test(value);
