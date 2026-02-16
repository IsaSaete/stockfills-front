import { useMemo, useState } from "react";
import type { FilamentDto, FiltersState } from "../types/types";
import { filterFilaments, getActiveFilterLabels } from "../helpers/filters";
import { filamentMaterials } from "../components/FilamentForm/constans/filamentOption";

export const useFilters = (filamentData: FilamentDto[]) => {
  const [filters, setFilters] = useState<FiltersState>({
    showFavorites: false,
    showLowStock: false,
    selectedMaterial: "",
    searchTerm: "",
  });

  const setFilter = <K extends keyof FiltersState>(
    key: K,
    value: FiltersState[K],
  ) => {
    setFilters((previousFilters) => ({ ...previousFilters, [key]: value }));
  };

  const clearFilters = () => {
    setFilters({
      showFavorites: false,
      showLowStock: false,
      selectedMaterial: "",
      searchTerm: "",
    });
  };

  const filteredFilamentData = useMemo(
    () => filterFilaments(filamentData, filters),
    [filamentData, filters],
  );

  const activeFilterLabels = useMemo(
    () => getActiveFilterLabels(filters),
    [filters],
  );

  const removeFilter = (filterLabel: string) => {
    if (filterLabel === "Favoritos") setFilter("showFavorites", false);
    else if (filterLabel === "Stock bajo") setFilter("showLowStock", false);
    else {
      const material = filamentMaterials.find(
        (material) => material.label === filterLabel,
      );
      if (material) setFilter("selectedMaterial", "");
    }
  };

  return {
    filters,
    setFilter,
    clearFilters,
    filteredFilamentData,
    activeFilterLabels,
    removeFilter,
  };
};

export default useFilters;
