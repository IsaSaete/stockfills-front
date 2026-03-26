import type {
  CreateHistoryPrinting,
  PrintingHistoryDto,
  PrintingHistoryResponse,
  PrintingHistoryResponses,
} from "../../types";
import type {
  GetPrintingHistoryParams,
  PrintingHistoryClientStructure,
} from "./types";

class PrintingHistoryClient implements PrintingHistoryClientStructure {
  private readonly apiUrl = import.meta.env.VITE_API_URL;

  public recordConsumption = async (
    filamentId: string,
    createHistory: CreateHistoryPrinting,
  ): Promise<PrintingHistoryDto> => {
    const token = localStorage.getItem("token");
    const response = await fetch(
      `${this.apiUrl}/history/filaments/${filamentId}/consume`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ printingHistory: createHistory }),
      },
    );

    if (!response.ok) {
      throw new Error("Failed to consume filament and create history entry");
    }

    const data = (await response.json()) as PrintingHistoryResponse;

    return data.printingEntry;
  };

  public getPrintingHistory = async (
    params?: GetPrintingHistoryParams,
  ): Promise<PrintingHistoryResponses> => {
    const token = localStorage.getItem("token");
    const page = params?.page ?? 1;
    const limit = params?.limit ?? 10;

    const response = await fetch(
      `${this.apiUrl}/history?page=${page}&limit=${limit}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      },
    );

    if (!response.ok) {
      throw new Error("Failed to get printing history");
    }

    const { pagination, printingEntries } =
      (await response.json()) as PrintingHistoryResponses;

    const historyPrinting = { pagination, printingEntries };

    return historyPrinting;
  };
}

export default PrintingHistoryClient;
