import { Info } from "lucide-react";

const InfoCell: React.FC = () => {
  return (
    <td className="px-4 py-4">
      <div className="flex items-center justify-center">
        <button
          className="cursor-pointer hover:text-primary transition-all duration-100 hover:scale-105"
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
