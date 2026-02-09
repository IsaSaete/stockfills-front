import type { FilamentDiameter } from "../../../../types/types";

interface DiameterCellProps {
  diameter: FilamentDiameter;
}

const DiameterCell: React.FC<DiameterCellProps> = ({ diameter }) => {
  return (
    <td className="px-4 py-4">
      <div className="flex items-center justify-center">
        <span className="text-sm text-foreground">{diameter} mm</span>
      </div>
    </td>
  );
};

export default DiameterCell;
