import type { PrintingHistoryDto } from "../types";

export interface PrintingHistoryState {
  printingHistory: PrintingHistoryDto[];
  isLoading: boolean;
  error: string | null;
}
