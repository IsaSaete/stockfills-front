import type { FilamentDto } from "../../../../types/types";

interface ConsumeCellProps {
  filament: FilamentDto;
  onConsume: (filament: FilamentDto) => void;
}

const ConsumeCell: React.FC<ConsumeCellProps> = ({ onConsume, filament }) => {
  return (
    <td className="px-5 py-3.5">
      <div className="flex items-center justify-center">
        <button
          onClick={() => onConsume(filament)}
          type="button"
          className="inline-flex items-center justify-center rounded-lg border border-border bg-card px-3 py-1.5 text-sm font-semibold text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
        >
          Consumir
        </button>
      </div>
    </td>
  );
};

export default ConsumeCell;
