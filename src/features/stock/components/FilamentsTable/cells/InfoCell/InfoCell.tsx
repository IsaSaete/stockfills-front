import { Info } from "lucide-react";
import { Link } from "react-router";

interface InfoCellProps {
  filamentId: string;
}

const InfoCell: React.FC<InfoCellProps> = ({ filamentId }) => {
  return (
    <td className="px-5 py-3.5">
      <div className="flex items-center justify-center">
        <Link
          to={`/stock/filamento/${filamentId}`}
          className="inline-flex items-center justify-center rounded-lg border border-border bg-card p-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          type="button"
          aria-label="Ver detalles"
        >
          <Info className="h-4 w-4" />
        </Link>
      </div>
    </td>
  );
};

export default InfoCell;
