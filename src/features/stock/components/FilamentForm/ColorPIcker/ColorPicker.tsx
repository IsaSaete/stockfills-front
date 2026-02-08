import { useState } from "react";

const ColorPicker: React.FC = () => {
  const [color, setColor] = useState("#ffffff");

  const colorButtonClass =
    "size-8 rounded-full border border-foreground/40 hover:scale-110 transition-transform active:scale-95 focus:border-primary";

  const handleChangeColor = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;

    setColor(value);
  };

  return (
    <div className="flex flex-col gap-2">
      <label
        className="font-bold uppercase tracking-wider text-header font-mono"
        htmlFor="color"
      >
        Color del Filamento
      </label>
      <div className="bg-card-background flex flex-col lg:flex-row justify-between gap-6 items-start lg:items-center p-4 rounded-lg border border-border">
        <div className="flex items-center gap-4">
          <div className="relative flex items-center justify-center size-14 rounded-full border-2 border-border">
            <input
              id="color"
              className="color-circle-input absolute z-10 opacity-0 cursor-pointer w-10 h-10"
              type="color"
              value={color}
              onChange={handleChangeColor}
            />
            <div
              className="size-10 rounded-full shadow-inner"
              style={{ background: color }}
            ></div>
          </div>
          <div className="flex flex-col">
            <span className="text-base font-bold">Selector Personalizado</span>
            <span className="text-sm text-header">
              Pulsa para abrir el panel
            </span>
          </div>
        </div>
        <div className="hidden lg:block h-12 w-px"></div>
        <div className="flex flex-col gap-1">
          <span className="text-base font-semibold text-secondary-foreground uppercase text-right">
            Paleta rápida
          </span>
          <div className="flex flex-wrap gap-4">
            <button
              className={`${colorButtonClass} bg-black`}
              title="Negro"
              type="button"
              onClick={() => setColor("#000000")}
            ></button>
            <button
              className={`${colorButtonClass} bg-white`}
              title="Blanco"
              type="button"
              onClick={() => setColor("#ffffff")}
            ></button>
            <button
              className={`${colorButtonClass} bg-neutral-500`}
              title="Gris"
              type="button"
              onClick={() => setColor("#737373")}
            ></button>
            <button
              className={`${colorButtonClass} bg-red-600`}
              title="Rojo"
              type="button"
              onClick={() => setColor("#e7070c")}
            ></button>
            <button
              className={`${colorButtonClass} bg-blue-600`}
              title="Azul"
              type="button"
              onClick={() => setColor("#175dfc")}
            ></button>
            <button
              className={`${colorButtonClass} bg-green-600`}
              title="Verde"
              type="button"
              onClick={() => setColor("#0fa63e")}
            ></button>
            <button
              className={`${colorButtonClass} bg-yellow-400`}
              title="Amarillo"
              type="button"
              onClick={() => setColor("#ffea00")}
            ></button>
            <button
              className={`${colorButtonClass} bg-orange-500`}
              title="Naranja"
              type="button"
              onClick={() => setColor("#fd6900")}
            ></button>
            <button
              className={`${colorButtonClass} bg-purple-600`}
              title="Morado"
              type="button"
              onClick={() => setColor("#991efa")}
            ></button>
            <button
              className={`${colorButtonClass} bg-pink-500`}
              title="Rosa"
              type="button"
              onClick={() => setColor("#f6329bb")}
            ></button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ColorPicker;
