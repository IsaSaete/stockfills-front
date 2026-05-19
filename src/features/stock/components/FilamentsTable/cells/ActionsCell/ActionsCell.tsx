import { Info, Trash2 } from "lucide-react";
import { Link } from "react-router";
import type { FilamentDto } from "../../../../types/types";

interface ActionsCellProps {
  filament: FilamentDto;
  onDelete: (filament: FilamentDto) => void;
  isDeleting: boolean;
}

const ActionsCell: React.FC<ActionsCellProps> = ({
  filament,
  onDelete,
  isDeleting,
}) => {
  return (
    <td className="px-5 py-3.5">
      <div className="flex items-center justify-center gap-2">
        <Link
          to={`/stock/filamento/${filament.id}`}
          className="inline-flex items-center justify-center rounded-lg border border-border bg-card p-2 text-muted-foreground transition-colors hover:border-primary hover:text-primary"
          aria-label="Ver detalles del filamento"
        >
          <Info className="h-4 w-4" aria-hidden="true" />
        </Link>
        <button
          type="button"
          onClick={() => onDelete(filament)}
          disabled={isDeleting}
          className="inline-flex items-center justify-center rounded-lg border border-red-500/50 bg-card p-2 text-red-400 transition-colors hover:border-red-500 hover:text-red-300 disabled:cursor-not-allowed disabled:opacity-60"
          aria-label="Eliminar filamento"
        >
          <Trash2 className="h-4 w-4" aria-hidden="true" />
        </button>
      </div>
    </td>
  );
};

export default ActionsCell;
