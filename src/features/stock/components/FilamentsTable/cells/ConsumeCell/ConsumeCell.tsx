import FilamentConsumeAction from "../../../FilamentConsumeAction/FilamentConsumeAction";
import type { FilamentDto } from "../../../../types/types";

interface ConsumeCellProps {
  filament: FilamentDto;
  onConsume: (filament: FilamentDto) => void;
}

const ConsumeCell: React.FC<ConsumeCellProps> = ({ onConsume, filament }) => {
  return (
    <td className="px-5 py-3.5">
      <div className="flex items-center justify-center">
        <FilamentConsumeAction
          filament={filament}
          onConsume={onConsume}
          variant="table"
        />
      </div>
    </td>
  );
};

export default ConsumeCell;
