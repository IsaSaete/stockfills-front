import type { PrintingHistoryStatus } from "../types";

export const historyStatusLabels: Record<PrintingHistoryStatus, string> = {
  PENDING: "Pendiente",
  COMPLETED: "Finalizado",
  FAILED: "Fallo",
};

export const historyStatusBadgeStyles: Record<PrintingHistoryStatus, string> = {
  PENDING: "bg-blue-500/30 border border-blue-600/40",
  COMPLETED: "bg-emerald-500/30 border border-emerald-600/40",
  FAILED: "bg-red-500/30 border border-red-600/40",
};

export const historyStatusButtonStyles: Record<PrintingHistoryStatus, string> =
  {
    PENDING: "border-primary hover:bg-primary/40",
    COMPLETED: "border-emerald-400 hover:bg-emerald-500/40",
    FAILED: "border-red-500 hover:bg-red-500/40",
  };
