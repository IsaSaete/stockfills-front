import type { PrintingHistoryDto } from "../../../types";

interface PieceNameCellProps {
  entry: PrintingHistoryDto;
}

const PieceNameCell: React.FC<PieceNameCellProps> = ({ entry }) => {
  const title = entry.pieceName?.trim() || "-";

  return (
    <td className="px-5 py-3.5">
      <div className="flex items-center justify-center text-center">
        <span className="line-clamp-2 text-sm font-semibold text-foreground">
          {title}
        </span>
      </div>
    </td>
  );
};

export default PieceNameCell;
