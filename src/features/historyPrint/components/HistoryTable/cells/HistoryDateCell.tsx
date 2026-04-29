interface HistoryDateCellProps {
  date: string;
}

const HistoryDateCell: React.FC<HistoryDateCellProps> = ({ date }) => {
  const formatDate = (value?: string): string => {
    if (value === undefined) return "-";

    return new Date(value).toLocaleDateString("es-ES");
  };

  return (
    <td className="px-5 py-3.5">
      <div className="flex items-center justify-center">
        <span className="text-sm font-medium text-muted-foreground">
          {formatDate(date)}
        </span>
      </div>
    </td>
  );
};

export default HistoryDateCell;
