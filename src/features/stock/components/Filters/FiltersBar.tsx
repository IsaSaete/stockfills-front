import { useEffect, useId, useRef, useState } from "react";
import { X } from "lucide-react";
import FavoriteFilter from "./FavoriteFilter";
import LowStockFilter from "./LowStockFilter";
import MaterialFilter from "./MaterialFilter";
import SearchBox from "./SearchBox";
import SortFilter from "./SortFilter";
import type { SortOption } from "../../hooks/useSort";
import type { FiltersState } from "../../types/types";

interface FiltersBarProps {
  filters: FiltersState;
  setFilter: <K extends keyof FiltersState>(
    key: K,
    value: FiltersState[K],
  ) => void;
  sortBy: SortOption;
  onSortChange: (value: SortOption) => void;
  activeFilterLabels: string[];
  onRemoveFilter: (filterLabel: string) => void;
  onClearFilters: () => void;
}

const FiltersBar: React.FC<FiltersBarProps> = ({
  filters,
  setFilter,
  sortBy,
  onSortChange,
  activeFilterLabels,
  onRemoveFilter,
  onClearFilters,
}) => {
  const sortOptionLabels: Record<Exclude<SortOption, "none">, string> = {
    "date-desc": "Fecha: más reciente",
    "date-asc": "Fecha: más antigua",
    "weight-desc": "Cantidad: mayor a menor",
    "weight-asc": "Cantidad: menor a mayor",
    "brand-asc": "Marca: A-Z",
    "brand-desc": "Marca: Z-A",
    "price-desc": "Precio: mayor primero",
    "price-asc": "Precio: menor primero",
    "material-asc": "Material: A-Z",
    "material-desc": "Material: Z-A",
  };
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);
  const mobileFiltersTitleId = useId();
  const mobileFiltersTriggerRef = useRef<HTMLButtonElement>(null);
  const sortLabel = sortBy !== "none" ? sortOptionLabels[sortBy] : null;
  const activeFiltersCount = activeFilterLabels.length + (sortLabel ? 1 : 0);

  useEffect(() => {
    if (!isMobileFiltersOpen) {
      return;
    }

    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsMobileFiltersOpen(false);
      }
    };

    document.addEventListener("keydown", handleEsc);

    return () => {
      document.removeEventListener("keydown", handleEsc);
    };
  }, [isMobileFiltersOpen]);

  const closeMobileFilters = () => {
    setIsMobileFiltersOpen(false);
    mobileFiltersTriggerRef.current?.focus();
  };

  return (
    <div className="mb-8 space-y-4">
      <div className="space-y-4 lg:hidden">
        <SearchBox
          value={filters.searchTerm}
          onChange={(value) => setFilter("searchTerm", value)}
        />
        <button
          ref={mobileFiltersTriggerRef}
          type="button"
          className="flex h-14 w-full items-center justify-between rounded-lg border border-border-primary bg-card-background px-4 font-mono text-lg hover:bg-card-background/50 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
          onClick={() => setIsMobileFiltersOpen(true)}
          aria-expanded={isMobileFiltersOpen}
          aria-haspopup="dialog"
          aria-controls="mobile-filters-dialog"
        >
          <span>Filtros</span>
          <span className="rounded bg-primary px-2 py-0.5 text-sm font-bold text-white">
            {activeFiltersCount}
          </span>
        </button>
      </div>

      {isMobileFiltersOpen && (
        <div
          className="fixed inset-0 z-40 lg:hidden"
          role="dialog"
          aria-modal="true"
          aria-labelledby={mobileFiltersTitleId}
          id="mobile-filters-dialog"
        >
          <button
            type="button"
            aria-label="Cerrar filtros"
            className="absolute inset-0 bg-black/70"
            onClick={closeMobileFilters}
          />
          <div className="absolute inset-x-2 bottom-2 rounded-2xl border border-border-primary bg-background p-5 shadow-lg">
            <div className="mb-4 flex items-center justify-between">
              <h3
                id={mobileFiltersTitleId}
                className="font-mono text-xl font-bold"
              >
                Filtros
              </h3>
              <button
                type="button"
                onClick={closeMobileFilters}
                className="rounded p-2 hover:bg-card-background/80 focus:outline-none focus:ring-1 focus:ring-primary"
                aria-label="Cerrar filtros"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <FavoriteFilter
                onToggle={() =>
                  setFilter("showFavorites", !filters.showFavorites)
                }
                isActive={filters.showFavorites}
              />
              <LowStockFilter
                isActive={filters.showLowStock}
                onToggle={() =>
                  setFilter("showLowStock", !filters.showLowStock)
                }
              />
              <MaterialFilter
                value={filters.selectedMaterial}
                onChange={(material) => setFilter("selectedMaterial", material)}
              />
              <SortFilter value={sortBy} onChange={onSortChange} />
            </div>

            <div className="mt-4 flex items-center gap-2 border-t border-border-primary pt-4">
              <button
                type="button"
                onClick={onClearFilters}
                className="h-12 rounded-lg border border-border-primary px-4 text-base font-semibold hover:bg-card-background/70 focus:outline-none focus:ring-1 focus:ring-primary"
              >
                Limpiar
              </button>
              <button
                type="button"
                onClick={closeMobileFilters}
                className="ml-auto h-12 rounded-lg bg-primary px-4 text-base font-semibold text-white hover:bg-primary/80 focus:outline-none focus:ring-1 focus:ring-primary"
              >
                Aplicar
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="hidden gap-4 lg:grid lg:grid-cols-15">
        <SearchBox
          value={filters.searchTerm}
          onChange={(value) => setFilter("searchTerm", value)}
        />
        <FavoriteFilter
          onToggle={() => setFilter("showFavorites", !filters.showFavorites)}
          isActive={filters.showFavorites}
        />
        <LowStockFilter
          isActive={filters.showLowStock}
          onToggle={() => setFilter("showLowStock", !filters.showLowStock)}
        />
        <MaterialFilter
          value={filters.selectedMaterial}
          onChange={(material) => setFilter("selectedMaterial", material)}
        />
        <SortFilter value={sortBy} onChange={onSortChange} />
      </div>
      {activeFiltersCount > 0 && (
        <div className="space-y-3">
          <div className="flex justify-end">
            <button
              onClick={() => {
                onClearFilters();
                onSortChange("none");
              }}
              className="text-base font-semibold text-foreground underline hover:text-primary cursor-pointer"
            >
              Limpiar todos
            </button>
          </div>
          <div className="grid grid-cols-2 gap-2 lg:flex lg:flex-wrap lg:items-start">
            {sortLabel && (
              <button
                onClick={() => onSortChange("none")}
                className="flex w-full items-center justify-between gap-2 rounded-md border border-border-primary bg-primary px-3 py-2 font-mono text-base text-white lg:w-auto lg:justify-start"
              >
                {sortLabel}
                <X className="h-4 w-4 cursor-pointer" />
              </button>
            )}
            {activeFilterLabels.map((label, index) => (
              <button
                key={index}
                onClick={() => onRemoveFilter(label)}
                className="flex w-full items-center justify-between gap-2 rounded-md border border-border-primary bg-primary px-3 py-2 font-mono text-base text-white lg:w-auto lg:justify-start"
              >
                {label}
                <X className="h-4 w-4 cursor-pointer" />
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default FiltersBar;
