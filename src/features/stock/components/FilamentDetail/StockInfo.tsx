import { Gauge } from "lucide-react";
import { getStockInfo } from "../../domain/stock.logic";
import { stockPresentation } from "../../domain/stock.presentation";
import { stockColorMap } from "../../constanst/stockColors";
import { ProgressBar } from "../../../../components/ProgressBar/ProgressBar";

interface StockInfoProps {
  currentWeightGrams: number;
  initialWeightGrams: number;
  lowStockThresholdGrams?: number;
}

const StockInfo: React.FC<StockInfoProps> = ({
  currentWeightGrams,
  initialWeightGrams,
  lowStockThresholdGrams = 200,
}) => {
  const { percentage, status } = getStockInfo(
    currentWeightGrams,
    initialWeightGrams,
    lowStockThresholdGrams,
  );

  const presentation = stockPresentation[status];
  const uiColors = stockColorMap[presentation.color];

  return (
    <section className="bg-section-background p-6 border border-border-primary rounded-xl h-full justify-between flex flex-col gap-3">
      <div className="flex items-center justify-between ">
        <div className="flex items-center gap-2">
          <Gauge className={`${uiColors.text} `} />
          <h3 className="text-lg font-bold font-mono uppercase tracking-widest">
            Nivel de Stock
          </h3>
        </div>
        <span
          className={`px-2 py-1 text-sm tracking-wider font-black rounded border  ${uiColors.badge}`}
        >
          {presentation.label}
        </span>
      </div>
      <div className="flex flex-col gap-1">
        <div className="flex justify-between items-end">
          <div>
            <p className={`text-5xl font-black flex items-baseline`}>
              {currentWeightGrams}
              <span className={`text-xl font-medium ml-1`}>g</span>
            </p>
            <p className="font-medium mt-1">
              Disponible de {initialWeightGrams}g totales
            </p>
          </div>
          <div className="text-right">
            <p className={`text-3xl font-black ${uiColors.text}`}>
              {percentage} %
            </p>
          </div>
        </div>
        <ProgressBar
          percentage={percentage}
          colorClass={uiColors.progress}
          currentGrams={currentWeightGrams}
        />
      </div>
    </section>
  );
};

export default StockInfo;
