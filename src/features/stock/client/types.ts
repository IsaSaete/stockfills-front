import type { FilamentDto } from "../types/types";

export interface FilamentClientStructure {
  getAllFilaments: () => Promise<FilamentDto[]>;
}
