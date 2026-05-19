import type { FilamentDto } from "../types/types";

export interface StockState {
  filaments: FilamentDto[];
  isLoading: boolean;
  error: string | null;
  isCreating: boolean;
  createError: string | null;
  toggleFavoriteError: string | null;
  currentFilament: null | FilamentDto;
  isDeleting: boolean;
  deleteError: string | null;
}
