import { Pencil, Trash2 } from "lucide-react";

const HistoryActionsCell: React.FC = () => {
  return (
    <td className="px-4 py-3">
      <div className="flex items-center justify-center gap-2">
        <button
          type="button"
          disabled
          className="inline-flex items-center justify-center rounded-lg border border-border-primary p-2 text-foreground opacity-50 disabled:cursor-not-allowed"
          aria-label="Editar registro"
        >
          <Pencil className="h-4 w-4" aria-hidden="true" />
        </button>
        <button
          type="button"
          disabled
          className="inline-flex items-center justify-center rounded-lg border border-red-500/50 p-2 text-red-400 opacity-50 disabled:cursor-not-allowed"
          aria-label="Eliminar registro"
        >
          <Trash2 className="h-4 w-4" aria-hidden="true" />
        </button>
      </div>
    </td>
  );
};

export default HistoryActionsCell;
