import { ChevronDown } from "lucide-react";
import { filamentMaterials } from "../FilamentForm/constans/filamentOption";
import type { FilamentMaterial } from "../../types/types";

interface MaterialFilterProps {
  value: FilamentMaterial | "";
  onChange: (value: FilamentMaterial | "") => void;
}

const MaterialFilter: React.FC<MaterialFilterProps> = ({ onChange, value }) => {
  const handleMaterial = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newValue = event.target.value as FilamentMaterial;

    onChange(newValue);
  };

  return (
    <div className="lg:col-span-2 relative">
      <label htmlFor="material" className="sr-only">
        Tipo de material
      </label>
      <div className="relative">
        <select
          value={value}
          onChange={handleMaterial}
          id="material"
          className="w-full h-14 px-4 appearance-none bg-card-background border border-border-primary rounded-lg font-mono text-foreground text-base hover:bg-card-background/50  focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary cursor-pointer"
        >
          <option value="" selected disabled>
            Materiales
          </option>
          {filamentMaterials.map((material) => (
            <option key={material.value} value={material.value}>
              {material.label}
            </option>
          ))}
        </select>
        <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-foreground/50 pointer-events-none" />
      </div>
    </div>
  );
};

export default MaterialFilter;
