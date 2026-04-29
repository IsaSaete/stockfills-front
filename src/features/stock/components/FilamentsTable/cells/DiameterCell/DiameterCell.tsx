import type { FilamentDiameter } from "../../../../types/types";

interface DiameterCellProps {
  diameter: FilamentDiameter;
}

const DiameterCell: React.FC<DiameterCellProps> = ({ diameter }) => {
  return (
    <td className="px-5 py-3.5">
      <div className="flex items-center justify-center">
        <span className="text-sm text-foreground">{diameter} mm</span>
      </div>
    </td>
  );
};

export default DiameterCell;
