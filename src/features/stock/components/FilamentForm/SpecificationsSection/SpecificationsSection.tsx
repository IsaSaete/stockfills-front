import { AlertCircle, Palette } from "lucide-react";
import ColorPicker from "../ColorPIcker/ColorPicker";
import type { FilamentForm, FilamentFormErrors } from "../../../types/types";
import { diameterOptions, weightOptions } from "../constans/filamentOption";
import { isValidDecimalInput } from "../../../helpers/validateFilamentForm";

interface SpecificationsSectionProps {
  formValues: FilamentForm;
  onChange: (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => void;
  onColorButtonClick: (colorHex: string) => void;
  errors: FilamentFormErrors;
}

const SpecificationsSection: React.FC<SpecificationsSectionProps> = ({
  formValues,
  onChange,
  onColorButtonClick,
  errors,
}) => {
  const labelsClass =
    "font-bold uppercase tracking-wider text-header font-mono";
  const inputClass =
    "form-input w-full bg-card-background border border-border-primary rounded h-12 px-4 text-base focus:border-primary";

  const handlePriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;

    if (isValidDecimalInput(value)) {
      onChange(event);
    }
  };

  return (
    <section className="bg-section-background border border-border-primary rounded-xl overflow-hidden shadow-sm">
      <div className="border-b border-border-primary bg-card-background px-6 py-4 flex items-center gap-3">
        <Palette className="text-primary" />

        <h3 className="text-lg font-bold font-mono">
          Especificaciones y Color
        </h3>
      </div>
      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="flex flex-col gap-2">
            <div className="flex justify-between items-center">
              <label className={labelsClass} htmlFor="initialWeightGrams">
                Peso Total (g)
              </label>
              {errors.initialWeightGrams && (
                <div className="flex justify-end gap-2">
                  <AlertCircle className="h-5 w-5 text-destructive" />
                  <p role="alert" className="text-sm text-destructive">
                    {errors.initialWeightGrams}
                  </p>
                </div>
              )}
            </div>
            <select
              id="initialWeightGrams"
              value={formValues.initialWeightGrams}
              onChange={onChange}
              className={inputClass}
            >
              <option value="" disabled>
                Selecciona el peso
              </option>
              {weightOptions.map((weight) => (
                <option key={weight.value} value={weight.value}>
                  {weight.label}
                </option>
              ))}
            </select>
          </div>
          <div className="flex flex-col gap-2">
            <div className="flex justify-between items-center">
              <label className={labelsClass} htmlFor="diameter">
                Diámetro (mm)
              </label>
              {errors.diameter && (
                <div className="flex justify-end gap-2">
                  <AlertCircle className="h-5 w-5 text-destructive" />
                  <p role="alert" className="text-sm text-destructive">
                    {errors.diameter}
                  </p>
                </div>
              )}
            </div>
            <select
              id="diameter"
              value={formValues.diameter}
              onChange={onChange}
              className={inputClass}
            >
              <option value="" disabled>
                Selecciona el diámetro
              </option>
              {diameterOptions.map((diameter) => (
                <option key={diameter.value} value={diameter.value}>
                  {diameter.label}
                </option>
              ))}
            </select>
          </div>
          <div className="flex flex-col gap-2">
            <div className="flex justify-between">
              <label className={labelsClass} htmlFor="priceEurs">
                Precio de compra (€)
              </label>{" "}
              <span className="font-mono italic text-ms text-header">
                (Opcional)
              </span>
            </div>
            <div className="relative">
              <input
                id="priceEurs"
                type="text"
                inputMode="decimal"
                value={formValues.priceEurs}
                onChange={handlePriceChange}
                className={inputClass}
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-header font-medium">
                €
              </span>
              {errors.priceEurs && (
                <div className="flex justify-end gap-2">
                  <AlertCircle className="h-5 w-5 text-destructive" />
                  <p role="alert" className="text-sm text-destructive">
                    {errors.priceEurs}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
        <ColorPicker
          formValues={formValues}
          onChange={onChange}
          onColorButtonClick={onColorButtonClick}
        />
      </div>
    </section>
  );
};

export default SpecificationsSection;
