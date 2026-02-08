import { Palette } from "lucide-react";
import { useState } from "react";
import ColorPicker from "../ColorPIcker/ColorPicker";
import type { FilamentDiameter } from "../../../types/types";

const SpecificationsSection: React.FC = () => {
  const [weight, setWeight] = useState<number | string>("");
  const [diameter, setDiameter] = useState<FilamentDiameter | string>("");
  const [price, setPrice] = useState("");

  const diameterOptions = [
    { value: "1.75", label: "1.75 mm" },
    { value: "2.85", label: "2.85 mm" },
  ] as const;

  const weightOptions = [
    { value: "500", label: "500" },
    { value: "750", label: "750" },
    { value: "1000", label: "1000" },
    { value: "2000", label: "2000" },
  ];

  const labelsClass =
    "font-bold uppercase tracking-wider text-header font-mono";
  const inputClass =
    "form-input w-full bg-card-background border border-border-primary rounded h-12 px-4 text-base focus:border-primary";

  const handleWeightChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const weight = event.target.value;

    setWeight(weight);
  };

  const handleDiameterChange = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    const diameter = event.target.value;

    setDiameter(diameter);
  };

  const hanldePriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const price = event.target.value;

    setPrice(price);
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
            <label className={labelsClass} htmlFor="weight">
              Peso Total (g)
            </label>
            <select
              id="weight"
              value={weight}
              onChange={handleWeightChange}
              className={inputClass}
              required
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
            <label className={labelsClass} htmlFor="diameter">
              Diámetro (mm)
            </label>
            <select
              id="diameter"
              value={diameter}
              onChange={handleDiameterChange}
              className={inputClass}
              required
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
            <label className={labelsClass} htmlFor="price">
              Precio de compra (€)
            </label>
            <div className="relative">
              <input
                id="price"
                type="text"
                value={price}
                onChange={hanldePriceChange}
                className={inputClass}
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-header font-medium">
                €
              </span>
            </div>
          </div>
        </div>
        <ColorPicker />
      </div>
    </section>
  );
};

export default SpecificationsSection;
