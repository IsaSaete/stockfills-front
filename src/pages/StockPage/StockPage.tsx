import { NavLink } from "react-router";
import { CirclePlus } from "lucide-react";
import { useEffect, useState } from "react";
import HeaderPages from "../../components/HeaderPages/HeaderPages";
import { FilamentsTable } from "../../features/stock/components/FilamentsTable/FilamentsTable";
import useStock from "../../features/stock/hooks/useStock";
import FiltersBar from "../../features/stock/components/Filters/FiltersBar";

const StockPage: React.FC = () => {
  const { filaments, loadStock } = useStock();
  const [showFavorites, setShowFavorites] = useState(false);

  useEffect(() => {
    loadStock();
  }, [loadStock]);

  const filteredFilaments = filaments.filter((filament) => {
    const matchesFavorites = !showFavorites || filament.isFavorite;

    return matchesFavorites;
  });

  const activeFilterLabels = [];

  if (showFavorites) activeFilterLabels.push("Favoritos");

  const handleRemoveFilter = (filterName: string) => {
    if (filterName === "Favoritos") {
      setShowFavorites(false);
    }
  };

  const handleClearFilters = () => {
    setShowFavorites(false);
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
        activeFilterLabels={activeFilterLabels}
        onClearFilters={handleClearFilters}
        onRemoveFilter={handleRemoveFilter}
      />
      <FilamentsTable filaments={filteredFilaments} />
    </>
  );
};

export default StockPage;
