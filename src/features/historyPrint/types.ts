import type { FilamentDiameter, FilamentMaterial } from "../stock/types/types";

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
  notes?: string;
  imageUrl?: string;
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
