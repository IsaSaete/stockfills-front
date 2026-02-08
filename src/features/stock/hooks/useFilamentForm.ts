import { useState } from "react";
import type { FilamentForm } from "../types/types";

const initialFormFilamentData: FilamentForm = {
  brand: "",
  material: "",
  colorHex: "#000000",
  diameter: "1.75",
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
  };

  const resetForm = () => {
    setFormFilamentData(initialFormFilamentData);
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
    resetForm,
    setFormField,
  };
};

export default useFilamentForm;
