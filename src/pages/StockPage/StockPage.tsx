import { NavLink } from "react-router";
import { CirclePlus } from "lucide-react";
import { useEffect, useState } from "react";
import HeaderPages from "../../components/HeaderPages/HeaderPages";
import { FilamentsTable } from "../../features/stock/components/FilamentsTable/FilamentsTable";
import useStock from "../../features/stock/hooks/useStock";
import FiltersBar from "../../features/stock/components/Filters/FiltersBar";
import { filamentMaterials } from "../../features/stock/components/FilamentForm/constans/filamentOption";
import type { FilamentMaterial } from "../../features/stock/types/types";
import useSort, { type SortOption } from "../../features/stock/hooks/useSort";

const StockPage: React.FC = () => {
  const { filaments, loadStock } = useStock();
  const [showFavorites, setShowFavorites] = useState(false);
  const [showLowStock, setShowLowStock] = useState(false);
  const [selectedMaterial, setSelectedMaterial] = useState<
    FilamentMaterial | ""
  >("");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState<SortOption>("none");

  useEffect(() => {
    loadStock();
  }, [loadStock]);

  const filteredFilaments = filaments.filter((filament) => {
    const matchesFavorites = !showFavorites || filament.isFavorite;
    const matchesLowStock =
      !showLowStock ||
      filament.currentWeightGrams < filament.lowStockThresholdGrams;
    const matchesMaterial =
      !selectedMaterial || filament.material === selectedMaterial;
    const matchesSearch =
      filament.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
      filament.material.toLowerCase().includes(searchTerm.toLowerCase()) ||
      filament.priceEurs?.toString().includes(searchTerm);

    return (
      matchesFavorites && matchesLowStock && matchesMaterial && matchesSearch
    );
  });

  const sortedFilaments = useSort(filteredFilaments, sortBy);

  const activeFilterLabels = [];

  if (showFavorites) activeFilterLabels.push("Favoritos");
  if (showLowStock) activeFilterLabels.push("Stock bajo");
  if (selectedMaterial) {
    const materialLabel = filamentMaterials.find(
      (material) => material.value === selectedMaterial,
    )?.label;

    if (materialLabel) activeFilterLabels.push(materialLabel);
  }

  const handleRemoveFilter = (filterName: string) => {
    if (filterName === "Favoritos") {
      setShowFavorites(false);
    } else if (filterName === "Stock bajo") {
      setShowLowStock(false);
    } else {
      const material = filamentMaterials.find(
        (material) => material.label === filterName,
      );

      if (material) {
        setSelectedMaterial("");
      }
    }
  };

  const handleClearFilters = () => {
    setShowFavorites(false);
    setShowLowStock(false);
    setSelectedMaterial("");
  };

  return (
    <>
      <HeaderPages
        title="Stock de Filamentos"
        subtitle="Sistema de control de stock para materiales de impresión 3D"
        action={
          <NavLink
            to="/stock/new"
            className="bg-primary text-primary-foreground text-base py-2 px-4 rounded-lg flex items-center gap-3 transition-all shadow-2xs shadow-primary/30 hover:bg-primary/50 hover:cursor-pointer focus:outline-none focus:ring-2 focus:ring-foreground focus:border-foreground"
          >
            <span className="text-xl">
              <CirclePlus className="fill-white text-primary" />
            </span>
            <span>Añadir bobina</span>
          </NavLink>
        }
      />
      <FiltersBar
        onToggleFavorites={() => setShowFavorites(!showFavorites)}
        showFavorites={showFavorites}
        onToggleLowStock={() => setShowLowStock(!showLowStock)}
        showLowStock={showLowStock}
        activeFilterLabels={activeFilterLabels}
        onClearFilters={handleClearFilters}
        onRemoveFilter={handleRemoveFilter}
        setSelectedMaterial={setSelectedMaterial}
        selectedMaterial={selectedMaterial}
        setSearchTerm={setSearchTerm}
        searchTerms={searchTerm}
        sortBy={sortBy}
        onSortChange={setSortBy}
      />
      <FilamentsTable filaments={sortedFilaments} />
    </>
  );
};

export default StockPage;
