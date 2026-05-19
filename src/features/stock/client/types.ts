import type { FilamentDto, CreateFilamentDto } from "../types/types";

export interface stockClientStructure {
  getAllFilaments: () => Promise<FilamentDto[]>;
  addNewFilament: (newFilament: CreateFilamentDto) => Promise<FilamentDto>;
  toggleFavoriteFilament: (filamentId: string) => Promise<FilamentDto>;
  getFilamentById: (filamentId: string) => Promise<FilamentDto>;
  deleteFilamentById: (filamentId: string) => Promise<void>;
}
