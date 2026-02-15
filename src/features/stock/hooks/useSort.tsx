import { useMemo } from "react";
import type { FilamentDto } from "../types/types";

export type SortOption =
  | "none"
  | "date-desc"
  | "date-asc"
  | "weight-desc"
  | "weight-asc"
  | "brand-asc"
  | "brand-desc"
  | "price-desc"
  | "price-asc"
  | "material-asc"
  | "material-desc";

const useSort = (filaments: FilamentDto[], sortBy: SortOption) => {
  return useMemo(() => {
    if (sortBy === "none") return filaments;

    const sorted = [...filaments];

    switch (sortBy) {
      case "date-desc":
        return sorted.sort(
          (dateA, dateB) =>
            new Date(dateB.createdAt!).getTime() -
            new Date(dateA.createdAt!).getTime(),
        );

      case "date-asc":
        return sorted.sort(
          (filamentA, filamentB) =>
            new Date(filamentA.createdAt!).getTime() -
            new Date(filamentB.createdAt!).getTime(),
        );

      case "weight-desc":
        return sorted.sort(
          (filamentA, filamentB) =>
            filamentB.currentWeightGrams - filamentA.currentWeightGrams,
        );

      case "weight-asc":
        return sorted.sort(
          (filamentA, filamentB) =>
            filamentA.currentWeightGrams - filamentB.currentWeightGrams,
        );

      case "brand-desc":
        return sorted.sort((filamentA, filamentB) =>
          filamentB.brand.localeCompare(filamentA.brand),
        );

      case "brand-asc":
        return sorted.sort((filamentA, filamentB) =>
          filamentA.brand.localeCompare(filamentB.brand),
        );

      case "price-desc":
        return sorted.sort(
          (filamentA, filamentB) =>
            (filamentB.priceEurs || 0) - (filamentA.priceEurs || 0),
        );

      case "price-asc":
        return sorted.sort(
          (filamentA, filamentB) =>
            (filamentA.priceEurs || 0) - (filamentB.priceEurs || 0),
        );

      case "material-desc":
        return sorted.sort((filamentA, filamentB) =>
          filamentB.material.localeCompare(filamentA.material),
        );

      case "material-asc":
        return sorted.sort((filamentA, filamentB) =>
          filamentA.material.localeCompare(filamentB.material),
        );

        return sorted;
    }
  }, [filaments, sortBy]);
};

export default useSort;
