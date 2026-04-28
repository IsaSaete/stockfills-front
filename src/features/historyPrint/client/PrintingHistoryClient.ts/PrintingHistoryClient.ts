import type {
  CreateHistoryPrinting,
  PrintingHistoryDto,
  PrintingHistoryResponse,
  PrintingHistoryResponses,
  UpdatePrintingHistoryDto,
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

  public updatePrintingHistory = async (
    printingHistoryId: string,
    updatePrintingHistoryDto: UpdatePrintingHistoryDto,
  ): Promise<PrintingHistoryDto> => {
    const token = localStorage.getItem("token");
    const response = await fetch(
      `${this.apiUrl}/history/${printingHistoryId}`,
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ printingHistory: updatePrintingHistoryDto }),
      },
    );

    if (!response.ok) {
      throw new Error("Failed to update printing history");
    }

    const data = (await response.json()) as PrintingHistoryResponse;

    return data.printingEntry;
  };

  public uploadPrintingHistoryImage = async (
    imageFile: File,
  ): Promise<{ imageUrl: string; imagePublicId: string }> => {
    const token = localStorage.getItem("token");
    const formData = new FormData();

    formData.append("file", imageFile);

    const response = await fetch(`${this.apiUrl}/history/upload-image`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });

    if (!response.ok) {
      throw new Error("Failed to upload printing image");
    }

    const data = (await response.json()) as {
      imageUrl: string;
      imagePublicId: string;
    };

    return data;
  };
}

export default PrintingHistoryClient;
