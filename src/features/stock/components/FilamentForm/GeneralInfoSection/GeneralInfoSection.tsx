import { Info } from "lucide-react";
import { filamentMaterials } from "../constans/filamentOption";
import type { FilamentForm } from "../../../types/types";

interface GeneralInfoSectionProps {
  formValues: FilamentForm;
  onChange: (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => void;
}

const GeneralInfoSection: React.FC<GeneralInfoSectionProps> = ({
  formValues,
  onChange,
}) => {
  const labelsClass =
    "font-bold uppercase tracking-wider text-header font-mono";
  const inputClass =
    "form-input w-full bg-card-background border border-border-primary rounded h-12 px-4 text-base focus:border-primary";

  return (
    <section className="bg-section-background border border-border-primary rounded-xl overflow-hidden shadow-sm">
      <div className="border-b border-border-primary bg-card-background px-6 py-4 flex items-center gap-3">
        <Info className="text-primary" />
        <h3 className="text-lg font-bold font-mono">Información General</h3>
      </div>
      <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="flex flex-col gap-2">
          <label htmlFor="brand" className={labelsClass}>
            Marca
          </label>
          <input
            value={formValues.brand}
            onChange={onChange}
            id="brand"
            className={inputClass}
            type="text"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="material" className={labelsClass}>
            Tipo (Material)
          </label>
          <select
            id="material"
            value={formValues.material}
            className={inputClass}
            onChange={onChange}
            required
          >
            <option value="" disabled>
              Selecciona un material
            </option>
            {filamentMaterials.map((material) => (
              <option key={material.value} value={material.value}>
                {material.label}
              </option>
            ))}
          </select>
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="supplier" className={labelsClass}>
            Proveedor
          </label>
          <input
            id="supplier"
            value={formValues.supplier}
            onChange={onChange}
            className={inputClass}
            type="text"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="purchaseUrl" className={labelsClass}>
            Enlace a la tienda
          </label>
          <div className="relative">
            <input
              id="purchaseUrl"
              value={formValues.purchaseUrl}
              onChange={onChange}
              className={inputClass}
              type="url"
              pattern="https://.*"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default GeneralInfoSection;
