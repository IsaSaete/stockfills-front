import { Eye, Pencil, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface HistoryActionsCellProps {
  entryId: string;
}

const HistoryActionsCell: React.FC<HistoryActionsCellProps> = ({ entryId }) => {
  const navigate = useNavigate();

  const handleViewDetail = () => {
    navigate(`/historial/${entryId}`);
  };

  const handleEdit = () => {
    navigate(`/historial/${entryId}/editar`);
  };

  return (
    <td className="px-5 py-3.5">
      <div className="flex items-center justify-center gap-2">
        <button
          type="button"
          onClick={handleViewDetail}
          className="inline-flex items-center justify-center rounded-lg border border-border bg-card p-2 text-muted-foreground transition-colors  hover:text-primary hover:border-primary"
          aria-label="Ver detalle del registro"
        >
          <Eye className="h-4 w-4" aria-hidden="true" />
        </button>
        <button
          type="button"
          onClick={handleEdit}
          className="inline-flex items-center justify-center rounded-lg border border-border bg-card p-2 text-muted-foreground transition-colors  hover:text-primary hover:border-primary"
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
