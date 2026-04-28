interface GramsConsumedCellProps {
  grams: number;
}

const GramsConsumedCell: React.FC<GramsConsumedCellProps> = ({ grams }) => {
  return (
    <td className="px-4 py-3">
      <div className="flex items-center justify-center">
        <span className="text-sm font-semibold text-foreground tabular-nums">
          {grams} g
        </span>
      </div>
    </td>
  );
};

export default GramsConsumedCell;
