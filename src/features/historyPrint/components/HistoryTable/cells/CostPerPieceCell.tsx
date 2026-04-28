interface CostPerPieceCellProps {
  cost?: number;
}

const CostPerPieceCell: React.FC<CostPerPieceCellProps> = ({ cost }) => {
  const formatCost = (value?: number): string => {
    if (value === undefined || value === 0) return "-";

    return `${value.toFixed(2)} €`;
  };

  return (
    <td className="px-4 py-3">
      <div className="flex items-center justify-center">
        <span className="text-sm font-semibold text-foreground tabular-nums">
          {formatCost(cost)}
        </span>
      </div>
    </td>
  );
};

export default CostPerPieceCell;
