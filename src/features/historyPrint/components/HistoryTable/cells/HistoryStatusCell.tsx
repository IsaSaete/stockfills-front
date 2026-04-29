import {
  historyStatusBadgeStyles,
  historyStatusLabels,
} from "../../../constants/status";
import type { PrintingHistoryStatus } from "../../../types";

interface HistoryStatusCellProps {
  status?: PrintingHistoryStatus;
}

const HistoryStatusCell: React.FC<HistoryStatusCellProps> = ({ status }) => {
  const resolvedStatus = status ?? "PENDING";

  return (
    <td className="px-5 py-3.5 text-center">
      <span
        className={`inline-flex min-w-25 rounded-full justify-center px-2 py-1 text-sm font-medium ${historyStatusBadgeStyles[resolvedStatus]}`}
      >
        {historyStatusLabels[resolvedStatus]}
      </span>
    </td>
  );
};

export default HistoryStatusCell;
