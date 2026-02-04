interface WeigthCellProps {
  currentGrams: number;
  initialGrams: number;
  thresholdGrams: number;
}

const WeightCell: React.FC<WeigthCellProps> = ({
  currentGrams,
  thresholdGrams,
  initialGrams,
}) => {
  const percentage = Math.round((currentGrams / initialGrams) * 100);
  const isLow = currentGrams <= thresholdGrams;
  const isCritical = currentGrams <= thresholdGrams * 0.5;

  const getBarColor = (): string => {
    if (isCritical) return "bg-red-500";

    if (isLow) return "bg-amber-500";

    return "bg-green-500";
  };

  const getTextColor = (): string => {
    if (isCritical) return "text-red-500";

    if (isLow) return "text-amber-500";

    return "text-foreground";
  };

  return (
    <td>
      <div className="flex items-center justify-center gap-3 ">
        <div className="flex flex-col gap-1">
          <span
            className={`text-sm font-semibold text-right ${getTextColor()}`}
          >
            {currentGrams} g
          </span>
          <div className="h-1.5 w-24 overflow-hidden rounded-full bg-secondary">
            <div
              className={`h-full rounded-full transition-all duration-300 ${getBarColor()}`}
              style={{ width: `${Math.min(percentage, 100)}%` }}
            />
          </div>
        </div>
      </div>
    </td>
  );
};

export default WeightCell;
