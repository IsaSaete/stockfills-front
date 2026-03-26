import type {
  CreateHistoryPrinting,
  PrintingHistoryDto,
  PrintingHistoryResponses,
} from "../../types";

export interface GetPrintingHistoryParams {
  page?: number;
  limit?: number;
}

export interface PrintingHistoryClientStructure {
  recordConsumption: (
    filamentId: string,
    createHistory: CreateHistoryPrinting,
  ) => Promise<PrintingHistoryDto>;
  getPrintingHistory: (
    params?: GetPrintingHistoryParams,
  ) => Promise<PrintingHistoryResponses>;
}
