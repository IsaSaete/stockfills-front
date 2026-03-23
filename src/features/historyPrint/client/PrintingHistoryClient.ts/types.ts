import type { CreateHistoryPrinting, PrintingHistoryDto } from "../../types";

export interface PrintingHistoryClientStructure {
  recordConsumption: (
    filamentId: string,
    createHistory: CreateHistoryPrinting,
  ) => Promise<PrintingHistoryDto>;
}
