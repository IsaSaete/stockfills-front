interface DateCellProps {
  date: string;
}

const DateCell: React.FC<DateCellProps> = ({ date }) => {
  const formatDate = (date?: string): string => {
    if (date === undefined) return "-";

    return date;
  };

  return (
    <td className="px-4 py-4">
      <div className="flex items-center justify-center">
        <span className="text-sm font-medium text-foreground">
          {formatDate(date)}
        </span>
      </div>
    </td>
  );
};

export default DateCell;
