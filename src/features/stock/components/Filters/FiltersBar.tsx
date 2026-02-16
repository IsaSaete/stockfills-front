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
  return (
    <div className="mb-8 space-y-4">
      <div className="grid grid-cols-1 lg:grid-cols-15 gap-4">
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
      {activeFilterLabels.length > 0 && (
        <div className="flex flex-wrap items-start gap-2 ">
          <span className="text-xs font-bold text-foreground uppercase">
            Filtros activos:
          </span>
          {activeFilterLabels.map((label, index) => (
            <button
              key={index}
              onClick={() => onRemoveFilter(label)}
              className="flex items-center font-mono gap-2 px-3 py-1.5 bg-primary border border-border-primary rounded-md text-white text-sm"
            >
              {label}
              <X className="h-3.5 w-3.5 cursor-pointer" />
            </button>
          ))}
          <button
            onClick={onClearFilters}
            className="ml-auto text-xs text-foreground hover:text-primary underline cursor-pointer"
          >
            Limpiar todos
          </button>
        </div>
      )}
    </div>
  );
};

export default FiltersBar;
