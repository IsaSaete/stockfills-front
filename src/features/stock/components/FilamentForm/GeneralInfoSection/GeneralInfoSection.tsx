import { AlertCircle, Info } from "lucide-react";
import { filamentMaterials } from "../constans/filamentOption";
import type { FilamentForm, FilamentFormErrors } from "../../../types/types";

interface GeneralInfoSectionProps {
  formValues: FilamentForm;
  onChange: (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => void;
  errors: FilamentFormErrors;
}

const GeneralInfoSection: React.FC<GeneralInfoSectionProps> = ({
  formValues,
  onChange,
  errors,
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
          <div className="flex justify-between items-center">
            <label htmlFor="brand" className={labelsClass}>
              Marca
            </label>
            {errors.brand && (
              <div className="flex justify-end gap-2">
                <AlertCircle className="h-5 w-5 text-destructive" />
                <p role="alert" className="text-sm text-destructive">
                  {errors.brand}
                </p>
              </div>
            )}
          </div>
          <input
            id="brand"
            value={formValues.brand}
            onChange={onChange}
            className={inputClass}
            type="text"
          />
        </div>
        <div className="flex flex-col gap-2">
          <div className="flex justify-between items-center">
            <label htmlFor="material" className={labelsClass}>
              Tipo (Material)
            </label>
            {errors.material && (
              <div className="flex justify-end gap-2">
                <AlertCircle className="h-5 w-5 text-destructive" />
                <p role="alert" className="text-sm text-destructive">
                  {errors.material}
                </p>
              </div>
            )}
          </div>
          <select
            id="material"
            value={formValues.material}
            className={inputClass}
            onChange={onChange}
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
          {formValues.material === "OTHER" && (
            <>
              <label htmlFor="customMaterial" className="sr-only">
                Material personalizado
              </label>
              <input
                id="customMaterial"
                name="customMaterial"
                type="text"
                value={formValues.customMaterial || ""}
                onChange={onChange}
                placeholder="Escribe el material"
                className={inputClass}
              />
              {errors.customMaterial && (
                <div className="flex justify-end gap-2 mt-1">
                  <AlertCircle className="h-5 w-5 text-destructive" />
                  <p role="alert" className="text-sm text-destructive">
                    {errors.customMaterial}
                  </p>
                </div>
              )}
            </>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <div className="flex justify-between">
            <label htmlFor="supplier" className={labelsClass}>
              Proveedor
            </label>
            <span className="font-mono italic text-ms text-header">
              (Opcional)
            </span>
          </div>
          <input
            id="supplier"
            value={formValues.supplier}
            onChange={onChange}
            className={inputClass}
            type="text"
          />
        </div>
        <div className="flex flex-col gap-2">
          <div className="flex justify-between">
            <label htmlFor="purchaseUrl" className={labelsClass}>
              Enlace a la tienda
            </label>
            <span className="font-mono italic text-ms text-header">
              (Opcional)
            </span>
          </div>
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
