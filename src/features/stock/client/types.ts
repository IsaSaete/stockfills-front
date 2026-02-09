import type { FilamentDto, CreateFilamentDto } from "../types/types";

export interface stockClientStructure {
  getAllFilaments: () => Promise<FilamentDto[]>;
  addNewFilament: (newFilament: CreateFilamentDto) => Promise<FilamentDto>;
}
