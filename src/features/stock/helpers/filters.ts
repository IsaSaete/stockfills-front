import { filamentMaterials } from "../components/FilamentForm/constans/filamentOption";
import type { FilamentDto, FiltersState } from "../types/types";

export const filterFilaments = (
  filaments: FilamentDto[],
  filters: FiltersState,
) => {
  if (!filaments) return [];

  return filaments.filter((filament) => {
    if (filters.showFavorites && !filament.isFavorite) return false;

    if (
      filters.showLowStock &&
      filament.currentWeightGrams >= filament.lowStockThresholdGrams
    )
      return false;

    if (
      filters.selectedMaterial &&
      filament.material !== filters.selectedMaterial
    )
      return false;

    if (filters.searchTerm) {
      const term = filters.searchTerm.toLowerCase();

      if (
        !filament.brand.toLowerCase().includes(term) &&
        !filament.material.toLowerCase().includes(term) &&
        !filament.customMaterial?.toLowerCase().includes(term) &&
        !filament.priceEurs?.toString().includes(term)
      )
        return false;
    }
    return true;
  });
};

export const getActiveFilterLabels = (filters: FiltersState): string[] => {
  const labels: string[] = [];

  if (filters.showFavorites) labels.push("Favoritos");
  if (filters.showLowStock) labels.push("Stock bajo");
  if (filters.selectedMaterial) {
    const materialLabel = filamentMaterials.find(
      (material) => material.value === filters.selectedMaterial,
    )?.label;

    if (materialLabel) labels.push(materialLabel);
  }

  return labels;
};

export const getMaterialSortValue = (filament: FilamentDto): string => {
  if (filament.material === "OTHER") {
    return filament.customMaterial ?? "";
  }

  return filament.material;
};
