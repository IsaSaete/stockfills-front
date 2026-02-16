import { NavLink } from "react-router";
import { CirclePlus } from "lucide-react";
import { useEffect, useState } from "react";
import HeaderPages from "../../components/HeaderPages/HeaderPages";
import { FilamentsTable } from "../../features/stock/components/FilamentsTable/FilamentsTable";
import useStock from "../../features/stock/hooks/useStock";
import FiltersBar from "../../features/stock/components/Filters/FiltersBar";
import useSort, { type SortOption } from "../../features/stock/hooks/useSort";
import useFilters from "../../features/stock/hooks/useFilters";

const StockPage: React.FC = () => {
  const { filaments, loadStock } = useStock();
  const {
    filters,
    setFilter,
    filteredFilamentData,
    activeFilterLabels,
    removeFilter,
    clearFilters,
  } = useFilters(filaments);
  const [sortBy, setSortBy] = useState<SortOption>("none");

  useEffect(() => {
    loadStock();
  }, [loadStock]);

  const sortedFilaments = useSort(filteredFilamentData, sortBy);

  const handleClearFilters = () => {
    clearFilters();
    setSortBy("none");
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
        filters={filters}
        setFilter={setFilter}
        sortBy={sortBy}
        onSortChange={setSortBy}
        activeFilterLabels={activeFilterLabels}
        onClearFilters={handleClearFilters}
        onRemoveFilter={removeFilter}
      />
      <FilamentsTable filaments={sortedFilaments} />
    </>
  );
};

export default StockPage;
