import type {
  CreateHistoryPrinting,
  PrintingHistoryDto,
  PrintingHistoryResponse,
} from "../../types";
import type { PrintingHistoryClientStructure } from "./types";

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
}

export default PrintingHistoryClient;
