interface GramsConsumedCellProps {
  grams: number;
}

const GramsConsumedCell: React.FC<GramsConsumedCellProps> = ({ grams }) => {
  return (
    <td className="px-5 py-3.5">
      <div className="flex items-center justify-center">
        <span className="text-sm font-semibold text-foreground tabular-nums">
          {grams} g
        </span>
      </div>
    </td>
  );
};

export default GramsConsumedCell;
