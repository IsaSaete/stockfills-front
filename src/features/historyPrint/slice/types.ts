import type { PrintingHistoryDto } from "../types";

export interface PrintingHistoryState {
  printingHistory: PrintingHistoryDto[];
  isLoading: boolean;
  error: string | null;
  pagination: {
    totalItems: number;
    page: number;
    limit: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
  };
}
