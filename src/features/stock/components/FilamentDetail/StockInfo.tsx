import { Gauge } from "lucide-react";

interface StockInfoProps {
  currentWeightGrams: number;
  initialWeightGrams: number;
}

const StockInfo: React.FC<StockInfoProps> = ({
  currentWeightGrams,
  initialWeightGrams,
}) => {
  const filamentPercentage = Math.round(
    (currentWeightGrams / initialWeightGrams) * 100,
  );
  const isStockLow = filamentPercentage < 50;
  const isStockCritical = filamentPercentage <= 30;

  const statusClasses = {
    critical: {
      bg: "bg-red-600",
      text: "text-red-600",
      icon: "text-red-600",
      badge: "bg-red-600 text-white",
    },
    low: {
      bg: "bg-amber-600",
      text: "text-amber-600",
      icon: "text-amber-600",
      badge: "bg-amber-600 text-black",
    },
    normal: {
      bg: "bg-lime-500",
      text: "text-lime-500",
      icon: "text-lime-500",
      badge: "bg-lime-500 text-black",
    },
  };

  const statusLabels = {
    critical: "Stock crítico",
    low: "Stock bajo",
    normal: "Stock óptimo",
  };

  const status = isStockCritical ? "critical" : isStockLow ? "low" : "normal";

  const classes = statusClasses[status];
  const labels = statusLabels[status];

  return (
    <section className="bg-section-background p-6 border border-border-primary rounded-xl h-full justify-between flex flex-col gap-3">
      <div className="flex items-center justify-between ">
        <div className="flex items-center gap-2">
          <Gauge className={classes.icon} />
          <h3 className="text-lg font-bold font-mono uppercase tracking-widest">
            Nivel de Stock
          </h3>
        </div>
        <span
          className={`px-2 py-1 text-sm tracking-wider font-black rounded border  ${classes.badge}`}
        >
          {labels}
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
            <p className={`text-3xl font-black ${classes.text}`}>
              {filamentPercentage} %
            </p>
          </div>
        </div>
        <div className="h-6 w-full overflow-hidden rounded-full bg-section border-2 border-border-primary">
          <div
            className={`h-full rounded-full transition-all duration-300 ${classes.bg}`}
            style={{ width: `${Math.min(filamentPercentage, 100)}%` }}
          />
        </div>
      </div>
    </section>
  );
};

export default StockInfo;
