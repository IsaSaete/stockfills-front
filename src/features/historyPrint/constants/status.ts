import type { PrintingHistoryStatus } from "../types";

export const historyStatusLabels: Record<PrintingHistoryStatus, string> = {
  PENDING: "Pendiente",
  COMPLETED: "Finalizado",
  FAILED: "Fallo",
};

export const historyStatusBadgeStyles: Record<PrintingHistoryStatus, string> = {
  PENDING: "border-primary/40 bg-primary/15 text-primary",
  COMPLETED: "border-emerald-400/40 bg-emerald-500/15 text-emerald-300",
  FAILED: "border-red-500/40 bg-red-500/15 text-red-300",
};

export const historyStatusButtonStyles: Record<PrintingHistoryStatus, string> =
  {
    PENDING: "border-primary hover:bg-primary/40",
    COMPLETED: "border-emerald-400 hover:bg-emerald-500/40",
    FAILED: "border-red-500 hover:bg-red-500/40",
  };
