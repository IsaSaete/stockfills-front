import { Info } from "lucide-react";
import { useState } from "react";

const GeneralInfoSection: React.FC = () => {
  const [material, setMaterial] = useState("");

  const filamentMaterials = [
    { value: "PLA", label: "PLA" },
    { value: "ABS", label: "ABS" },
    { value: "ASA", label: "ASA" },
    { value: "PETG", label: "PETG" },
    { value: "TPU", label: "TPU" },
    { value: "PET", label: "PET" },
    { value: "NYLON", label: "Nylon" },
    { value: "PLA_WOOD", label: "PLA Madera" },
    { value: "FLEXIBLE", label: "Flexible" },
    { value: "OTHER", label: "Otro" },
  ] as const;

  const labelsClass =
    "font-bold uppercase tracking-wider text-header font-mono";
  const inputClass =
    "form-input w-full bg-card-background border border-border-primary rounded h-12 px-4 text-base focus:border-primary";

  const handleMaterialChange = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    const material = event.target.value;

    setMaterial(material);
  };

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
          <input id="brand" className={inputClass} type="text" />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="material" className={labelsClass}>
            Tipo (Material)
          </label>
          <select
            id="material"
            value={material}
            className={inputClass}
            onChange={handleMaterialChange}
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
          <input id="supplier" className={inputClass} type="text" />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="purchaseUrl" className={labelsClass}>
            Enlace a la tienda
          </label>
          <div className="relative">
            <input id="purchaseUrl" className={inputClass} type="url" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default GeneralInfoSection;
