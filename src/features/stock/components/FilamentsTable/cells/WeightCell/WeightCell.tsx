import { ProgressBar } from "../../../../../../components/ProgressBar/ProgressBar";
import { stockColorMap } from "../../../../constanst/stockColors";
import { getStockInfo } from "../../../../domain/stock.logic";
import { stockPresentation } from "../../../../domain/stock.presentation";

interface WeigthCellProps {
  currentGrams: number;
  initialGrams: number;
}

const WeightCell: React.FC<WeigthCellProps> = ({
  currentGrams,
  initialGrams,
}) => {
  const { percentage, status } = getStockInfo(currentGrams, initialGrams);

  const presentation = stockPresentation[status];
  const uiColors = stockColorMap[presentation.color];

  return (
    <td>
      <div className="flex items-center justify-center gap-3 ">
        <div className="flex flex-col gap-1">
          <span className={`text-sm font-semibold text-right ${uiColors.text}`}>
            {currentGrams} g
          </span>
          <ProgressBar
            percentage={percentage}
            colorClass={uiColors.progress}
            height="h-1.5"
            width="w-24"
            currentGrams={currentGrams}
          />
        </div>
      </div>
    </td>
  );
};

export default WeightCell;
