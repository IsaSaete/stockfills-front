import { MessageCircleWarningIcon, XCircle } from "lucide-react";
import type { FilamentDto } from "../../../types/types";
import { getStockInfo } from "../../../domain/stock.logic";
import { ProgressBar } from "../../../../../components/ProgressBar/ProgressBar";
import { stockPresentation } from "../../../domain/stock.presentation";
import { stockColorMap } from "../../../constanst/stockColors";
import { useState } from "react";

interface ConsumeFilamentModalProps {
  filament: FilamentDto | null;
  onClose: () => void;
  isOpen: boolean;
}

const ConsumeFilamentModal: React.FC<ConsumeFilamentModalProps> = ({
  filament,
  onClose,
  isOpen,
}) => {
  const [gramsToConsume, setGramsToConsume] = useState<number | "">("");

  if (!isOpen || !filament) return null;

  const handleGramsToConsume = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;

    if (value === "") {
      setGramsToConsume("");

      return;
    }

    const numValue = parseFloat(value);

    if (!isNaN(numValue) && numValue >= 0) {
      setGramsToConsume(numValue);
    }
  };

  const handleCloseModal = () => {
    setGramsToConsume("");
    onClose();
  };

  const gramsRequested =
    typeof gramsToConsume === "number" ? gramsToConsume : 0;

  const stockAfterConsumption =
    filament.currentWeightGrams - gramsRequested < 0
      ? 0
      : filament.currentWeightGrams - gramsRequested;

  const isGramsExceedingStock =
    gramsRequested > 0 && gramsRequested > filament.currentWeightGrams;

  const { percentage, status: currentStatus } = getStockInfo(
    filament.currentWeightGrams,
    filament.initialWeightGrams,
  );

  const presentation = stockPresentation[currentStatus];
  const currentUiColors = stockColorMap[presentation.color];

  const { status: newStatus, percentage: newPercentage } = getStockInfo(
    stockAfterConsumption,
    filament.initialWeightGrams,
  );

  const newPresentation = stockPresentation[newStatus];
  const newUiColors = stockColorMap[newPresentation.color];

  const numberPiecesWithNewStock = Math.trunc(
    stockAfterConsumption / gramsRequested,
  );

  return (
    <>
      <div
        className="fixed inset-0 bg-black/90 z-1"
        onClick={handleCloseModal}
        aria-hidden="true"
      />
      <div className="fixed inset-0 z-3 flex items-center justify-center pointer-events-none p-2">
        <div className="pointer-events-auto bg-section-background border border-border-primary rounded-xl shadow-lg w-full max-w-2xl mx-4 flex flex-col">
          <div className="flex justify-between px-6 py-4 border-b-2 border-border-primary bg-card-background rounded-t-xl">
            <div className="flex flex-col gap-1">
              <h2 className="text-2xl font-bold font-mono">
                Registrar consumo de filamento:
              </h2>
              <div className="flex items-center gap-1">
                <span className="px-2 py-1 bg-primary text-white text-sm font-bold uppercase tracking-widest rounded">
                  {filament.material}
                </span>
                <p className="text-base font-bold">
                  • {filament.brand} • {filament.diameter} mm
                </p>
              </div>
            </div>
            <button
              onClick={handleCloseModal}
              aria-label="Cerrar formulario"
              type="button"
              className="hover:text-primary transition-colors"
            >
              <XCircle className="h-8 w-8 cursor-pointer" />
            </button>
          </div>
          <div className="p-6 overflow-y-auto max-h-[calc(100vh-200px)] bg-background">
            <form className="">
              <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
                <div className="col-span-5 lg:col-span-2 lg:col-start-1 lg:row-start-1">
                  <div className="flex flex-col gap-2">
                    <label
                      htmlFor="gramsFilament"
                      className="text-base font-bold font-mono uppercase tracking-wider"
                    >
                      Cantidad a consumir
                      <span className="sr-only"> en gramos</span>
                    </label>
                    <div className="relative">
                      <input
                        id="gramsFilament"
                        className="form-input w-full bg-card-background border border-border-primary rounded h-12 px-4 text-base focus:border-primary"
                        placeholder="0"
                        type="text"
                        inputMode="decimal"
                        value={gramsToConsume}
                        onChange={handleGramsToConsume}
                      />
                      <span className="absolute right-4 top-1/2 -translate-y-1/2 text-header font-medium">
                        g
                      </span>
                    </div>
                  </div>
                </div>
                <div className="col-span-5 lg:col-span-2 lg:col-start-1 lg:row-start-2">
                  <div className="flex flex-col gap-2">
                    <span className="sr-only">
                      Nombre de la pieza o proyecto
                    </span>
                    <label
                      htmlFor="printName"
                      className="text-base font-bold font-mono uppercase tracking-wider"
                    >
                      Pieza / Proyecto
                    </label>
                    <input
                      id="printName"
                      className="form-input w-full bg-card-background border border-border-primary rounded h-12 px-4 text-base focus:border-primary"
                      placeholder="Ej: Soporte Articulado V2"
                    />
                  </div>
                </div>
                <div className="col-span-5 lg:col-span-2 lg:col-start-1 lg:row-start-3">
                  <div className="flex flex-col gap-2">
                    <label
                      htmlFor="notes"
                      className="text-base font-bold font-mono uppercase tracking-wider"
                    >
                      Notas opcionales
                    </label>
                    <textarea
                      id="notes"
                      className="form-input w-full bg-card-background border border-border-primary rounded p-4 text-base focus:border-primary custom-scrollbar resize-none"
                      placeholder="Detalles técnicos de la impresión..."
                      rows={6}
                    ></textarea>
                  </div>
                </div>
                <div className="col-span-5 lg:col-span-3 lg:col-start-3 lg:row-start-1 lg:row-span-3">
                  <div
                    aria-live="polite"
                    className="bg-card-background rounded border border-border-primary p-6 flex flex-col justify-between h-full gap-4"
                  >
                    <h3 className="text-lg font-bold font-mono uppercase tracking-widest">
                      Resumen de stock
                    </h3>
                    {isGramsExceedingStock && (
                      <div className="flex gap-2">
                        <MessageCircleWarningIcon
                          className={newUiColors.text}
                        />
                        <span className={newUiColors.text}>
                          Solo dispones de {filament.currentWeightGrams} g.
                        </span>
                      </div>
                    )}
                    <div className="flex flex-col gap-4">
                      <div className="flex flex-col gap-1">
                        <div className="flex justify-between text-sm">
                          <span>Stock disponible actual</span>
                          <span className="font-medium">
                            {filament.currentWeightGrams} g
                          </span>
                        </div>
                        <ProgressBar
                          percentage={percentage}
                          currentGrams={filament.currentWeightGrams}
                          colorClass={currentUiColors.progress}
                        />
                      </div>
                      <div className="flex flex-col gap-1">
                        <div className="flex justify-between text-sm">
                          <span>Stock tras consumo</span>
                          {stockAfterConsumption <= 0 && (
                            <span className="font-medium">
                              {stockAfterConsumption} g
                            </span>
                          )}
                        </div>
                        <ProgressBar
                          percentage={newPercentage}
                          currentGrams={filament.currentWeightGrams}
                          colorClass={newUiColors.progress}
                        />
                      </div>
                    </div>
                    <div className="bg-background border border-border-primary rounded-lg px-3 py-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Consumo solicitado:</span>
                        {isGramsExceedingStock ? (
                          <span>0 g</span>
                        ) : (
                          <span className="font-bold">{gramsRequested} g</span>
                        )}
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">
                          Porcentaje de la bobina:
                        </span>
                        <span className="font-bold">
                          {newPercentage <= 0 ? 0 : newPercentage} %
                        </span>
                      </div>
                    </div>
                    <div className="border-t-2 border-border-primary" />
                    {gramsRequested !== 0 && (
                      <div className="flex items-center gap-3">
                        <div className="flex flex-col gap-2">
                          <span className="text-sm font-bold uppercase tracking-wider">
                            Capacidad estimada:
                          </span>
                          {numberPiecesWithNewStock > 0 ? (
                            <span className="text-sm font-medium">
                              Suficiente para {numberPiecesWithNewStock}{" "}
                              {numberPiecesWithNewStock === 1
                                ? "pieza similar"
                                : "piezas similares"}
                            </span>
                          ) : (
                            <div className="flex items-center gap-2">
                              <span className="text-sm font-medium">
                                No te queda suficiente filamento
                              </span>
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </form>
          </div>
          <div className="flex justify-between px-6 py-4 border-t border-border-primary bg-card-background rounded-b-xl">
            <button
              type="button"
              onClick={handleCloseModal}
              className="px-8 py-2 bg-foreground rounded font-bold text-background cursor-pointer hover:opacity-80 transition-opacity"
            >
              Cancelar
            </button>
            <button
              disabled={isGramsExceedingStock}
              type="submit"
              className="px-8 py-2 bg-primary hover:bg-primary/80 text-white rounded font-bold transition-all cursor-pointer disabled:cursor-not-allowed disabled:bg-primary/50"
            >
              Confirmar
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ConsumeFilamentModal;
