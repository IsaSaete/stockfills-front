import { Eye, Pencil, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface HistoryActionsCellProps {
  entryId: string;
}

const HistoryActionsCell: React.FC<HistoryActionsCellProps> = ({ entryId }) => {
  const navigate = useNavigate();

  const handleEdit = () => {
    navigate(`/historial/${entryId}/editar`);
  };

  return (
    <td className="px-4 py-3">
      <div className="flex items-center justify-center gap-2">
        <button
          type="button"
          disabled
          className="inline-flex items-center justify-center rounded-lg border border-border-primary p-2 text-foreground opacity-50 disabled:cursor-not-allowed"
          aria-label="Ver detalle del registro"
        >
          <Eye className="h-4 w-4" aria-hidden="true" />
        </button>
        <button
          type="button"
          onClick={handleEdit}
          className="inline-flex items-center justify-center rounded-lg border border-border-primary p-2 text-foreground transition-colors hover:border-primary hover:text-primary"
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
