import type { FilamentDto } from "../types/types";

export interface stockClientStructure {
  getAllFilaments: () => Promise<FilamentDto[]>;
}
