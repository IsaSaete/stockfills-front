import { X } from "lucide-react";
import FavoriteFilter from "./FavoriteFilter";
import LowStockFilter from "./LowStockFilter";
import MaterialFilter from "./MaterialFilter";
import type { FilamentMaterial } from "../../types/types";
import SearchBox from "./SearchBox";
import SortFilter from "./SortFilter";

interface FiltersBarProps {
  showFavorites: boolean;
  onToggleFavorites: () => void;
  showLowStock: boolean;
  onToggleLowStock: () => void;
  showTerms: string;
  onChangeTerms: (value: string) => void;
  selectMaterial: FilamentMaterial | "";
  onChangeMaterial: (value: FilamentMaterial | "") => void;
  activeFilterLabels: string[];
  onRemoveFilter: (filterName: string) => void;
  onClearFilters: () => void;
}

const FiltersBar: React.FC<FiltersBarProps> = ({
  showFavorites,
  onToggleFavorites,
  showLowStock,
  onToggleLowStock,
  selectMaterial,
  onChangeMaterial,
  showTerms,
  onChangeTerms,
  activeFilterLabels,
  onRemoveFilter,
  onClearFilters,
}) => {
  return (
    <div className="mb-8 space-y-4">
      <div className="grid grid-cols-1 lg:grid-cols-15 gap-4">
        <SearchBox onChange={onChangeTerms} value={showTerms} />
        <FavoriteFilter onToggle={onToggleFavorites} isActive={showFavorites} />
        <LowStockFilter onToggle={onToggleLowStock} isActive={showLowStock} />
        <MaterialFilter value={selectMaterial} onChange={onChangeMaterial} />
        <SortFilter />
      </div>
      {activeFilterLabels.length > 0 && (
        <div className="flex flex-wrap items-center gap-2 ">
          <span className="text-xs font-bold text-foreground uppercase">
            Filtros activos:
          </span>

          {activeFilterLabels.map((label, index) => (
            <button
              key={index}
              onClick={() => onRemoveFilter(label)}
              className="flex items-center font-mono gap-2 px-3 py-1.5 bg-card-background hover:bg-card-background/50 border border-border-primary rounded-xl text-foreground text-xs"
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
