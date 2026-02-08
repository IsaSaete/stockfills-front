export type FilamentMaterial =
  | "PLA"
  | "ABS"
  | "ASA"
  | "PETG"
  | "TPU"
  | "PET"
  | "NYLON"
  | "PLA_WOOD"
  | "FLEXIBLE"
  | "OTHER";

export type FilamentDiameter = 1.75 | 2.85;

export interface FilamentDto {
  id: string;
  brand: string;
  material: FilamentMaterial;
  colorHex: string;
  diameter: FilamentDiameter;
  initialWeightGrams: number;
  currentWeightGrams: number;
  lowStockThresholdGrams: number;
  isFavorite: boolean;
  priceEurs?: number;
  supplier?: string;
  purchaseUrl?: string;
  notes?: string;
  createdAt?: string;
}

export interface FilamentsResponse {
  filaments: FilamentDto[];
}

export type FilamentForm = {
  brand: string;
  material: string;
  colorHex: string;
  diameter: string;
  initialWeightGrams: string;
  isFavorite: boolean;
  priceEurs: string;
  supplier: string;
  purchaseUrl: string;
  notes: string;
};

export type FilamentSendDto = Omit<
  FilamentDto,
  "id" | "colorHex" | "createdAt"
> & {
  color: string;
};
