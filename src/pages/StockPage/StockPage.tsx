import { NavLink } from "react-router";
import { CirclePlus } from "lucide-react";
import { useEffect, useState } from "react";
import HeaderPages from "../../components/HeaderPages/HeaderPages";
import { FilamentsTable } from "../../features/stock/components/FilamentsTable/FilamentsTable";
import useStock from "../../features/stock/hooks/useStock/useStock";
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
            to="/stock/nuevo"
            className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-4 py-3 text-base font-semibold text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 md:w-auto"
          >
            <CirclePlus className="h-5 w-5" />
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
