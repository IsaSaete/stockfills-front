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
    <td className="px-4 py-3 text-center">
      <span
        className={`inline-flex rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-wide ${historyStatusBadgeStyles[resolvedStatus]}`}
      >
        {historyStatusLabels[resolvedStatus]}
      </span>
    </td>
  );
};

export default HistoryStatusCell;
