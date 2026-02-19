import { Info } from "lucide-react";
import { Link } from "react-router";

interface InfoCellProps {
  filamentId: string;
}

const InfoCell: React.FC<InfoCellProps> = ({ filamentId }) => {
  return (
    <td className="px-4 py-4">
      <div className="flex items-center justify-center">
        <Link
          to={`/stock/filamento/${filamentId}`}
          className="cursor-pointer hover:text-primary transition-all duration-100 hover:scale-105"
          type="button"
          aria-label="Ver detalles"
        >
          <Info className="h-8 w-8" />
        </Link>
      </div>
    </td>
  );
};

export default InfoCell;
