import { ChevronDown } from "lucide-react";
import type { SortOption } from "../../hooks/useSort";

interface SortFilterProps {
  value: SortOption;
  onChange: (value: SortOption) => void;
}

const SortFilter: React.FC<SortFilterProps> = ({ value, onChange }) => {
  const handleSortOptions = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newValue = event.target.value as SortOption;

    onChange(newValue);
  };

  return (
    <div className="col-span-2 relative lg:col-span-2">
      <label htmlFor="sort" className="sr-only">
        Ordeanar por
      </label>
      <select
        id="sort"
        value={value}
        onChange={handleSortOptions}
        className="w-full h-14 px-4 pl-4 pr-10 appearance-none bg-card-background border border-border-primary rounded-lg font-mono text-foreground text-[17px] hover:bg-card-background/50  focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary cursor-pointer"
      >
        <option value="none">Ordenar por:</option>
        <option value="date-desc">Fecha: más reciente</option>
        <option value="date-asc">Fecha: más antigua</option>
        <option value="weight-desc">Cantidad: mayor a menor</option>
        <option value="weight-asc">Cantidad: menor a mayor</option>
        <option value="brand-asc">Marca: A-Z</option>
        <option value="brand-desc">Marca: Z-A</option>
        <option value="price-desc">Precio: mayor primero</option>
        <option value="price-asc">Precio: menor primero</option>
        <option value="material-asc">Material: A-Z</option>
        <option value="material-desc">Material: Z-A</option>
      </select>
      <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-foreground/50 pointer-events-none" />
    </div>
  );
};

export default SortFilter;
