import { Info } from "lucide-react";

const InfoCell: React.FC = () => {
  return (
    <td className="px-4 py-4">
      <div className="flex items-center justify-center">
        <button
          className="cursor-pointer"
          type="button"
          aria-label="Ver detalles"
        >
          <Info className="h-8 w-8" />
        </button>
      </div>
    </td>
  );
};

export default InfoCell;
