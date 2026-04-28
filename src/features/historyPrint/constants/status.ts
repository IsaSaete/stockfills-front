import type { PrintingHistoryStatus } from "../types";

export const historyStatusLabels: Record<PrintingHistoryStatus, string> = {
  PENDING: "Pendiente",
  COMPLETED: "Finalizado",
  FAILED: "Fallo",
};

export const historyStatusBadgeStyles: Record<PrintingHistoryStatus, string> = {
  PENDING: "border-primary/40 bg-primary/25",
  COMPLETED: "border-emerald-400/40 bg-emerald-500/25",
  FAILED: "border-red-500/40 bg-red-500/25",
};

export const historyStatusButtonStyles: Record<PrintingHistoryStatus, string> =
  {
    PENDING: "border-primary hover:bg-primary/40",
    COMPLETED: "border-emerald-400 hover:bg-emerald-500/40",
    FAILED: "border-red-500 hover:bg-red-500/40",
  };
