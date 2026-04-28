import type { FilamentDiameter, FilamentMaterial } from "../stock/types/types";

export type PrintingHistoryStatus = "PENDING" | "COMPLETED" | "FAILED";

export interface CreateHistoryPrinting {
  gramsConsumed: number;
  pieceName: string | null;
  notes: string | null;
}

export interface PrintingHistoryDto {
  id: string;
  pieceName?: string;
  gramsConsumed: number;
  costPerPiece?: number;
  status: PrintingHistoryStatus;
  notes?: string;
  imageUrl?: string;
  imagePublicId?: string;
  createdAt: string;
  filament: {
    id: string;
    brand: string;
    material: FilamentMaterial;
    customMaterial?: string;
    colorHex: string;
    diameter: FilamentDiameter;
  };
}

export interface PrintingHistoryResponse {
  printingEntry: PrintingHistoryDto;
}

export interface PrintingHistoryResponses {
  printingEntries: PrintingHistoryDto[];
  pagination: {
    totalItems: number;
    page: number;
    limit: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
  };
}

export interface UpdatePrintingHistoryDto {
  pieceName?: string;
  status?: PrintingHistoryStatus;
  notes?: string;
  imageUrl?: string;
  imagePublicId?: string;
}
