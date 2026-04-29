interface DateCellProps {
  date: string;
}

const DateCell: React.FC<DateCellProps> = ({ date }) => {
  const formatDate = (date?: string): string => {
    if (date === undefined) return "-";

    return new Date(date).toLocaleDateString("es-ES");
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

export default DateCell;
