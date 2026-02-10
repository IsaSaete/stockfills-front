import { useState } from "react";
import type { FilamentForm, FilamentFormErrors } from "../types/types";
import { validateFilamentForm } from "../helpers/validateFilamentForm";

const initialFormFilamentData: FilamentForm = {
  brand: "",
  material: "",
  colorHex: "#000000",
  diameter: "",
  initialWeightGrams: "",
  isFavorite: false,
  priceEurs: "",
  supplier: "",
  purchaseUrl: "",
  notes: "",
};

const useFilamentForm = (
  initialData: FilamentForm = initialFormFilamentData,
) => {
  const [formFilamentData, setFormFilamentData] =
    useState<FilamentForm>(initialData);
  const [formErrors, setFormErrors] = useState<FilamentFormErrors>({});

  const changeFilamentData = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    const { id, value } = event.target;

    setFormFilamentData((formFilamentData) => ({
      ...formFilamentData,
      [id]: value,
    }));

    if (formErrors[id as keyof FilamentForm]) {
      setFormErrors((prev) => ({
        ...prev,
        [id]: "",
      }));
    }
  };

  const validateForm = (): boolean => {
    const errors = validateFilamentForm(formFilamentData);

    setFormErrors(errors);

    return Object.keys(errors).length === 0;
  };

  const setFormField = (fieldName: string, value: string | boolean) => {
    setFormFilamentData((prev) => ({
      ...prev,
      [fieldName]: value,
    }));
  };

  return {
    changeFilamentData,
    formFilamentData,
    setFormFilamentData,
    setFormField,
    validateForm,
    formErrors,
    setFormErrors,
  };
};

export default useFilamentForm;
