import type {
  CreateHistoryPrinting,
  PrintingHistoryDto,
  PrintingHistoryResponses,
  UpdatePrintingHistoryDto,
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
  getPrintingHistoryById: (
    printingHistoryId: string,
  ) => Promise<PrintingHistoryDto>;
  updatePrintingHistory: (
    printingHistoryId: string,
    updatePrintingHistoryDto: UpdatePrintingHistoryDto,
  ) => Promise<PrintingHistoryDto>;
  uploadPrintingHistoryImage: (
    imageFile: File,
  ) => Promise<{ imageUrl: string; imagePublicId: string }>;
}
