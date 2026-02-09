import type {
  FilamentDto,
  FilamentResponse,
  CreateFilamentDto,
  FilamentsResponse,
} from "../types/types";
import type { stockClientStructure } from "./types";

class StockClient implements stockClientStructure {
  private readonly apiUrl = import.meta.env.VITE_API_URL;

  public getAllFilaments = async (): Promise<FilamentDto[]> => {
    const token = localStorage.getItem("token");
    const response = await fetch(`${this.apiUrl}/stockfilaments`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Error fetching filaments");
    }

    const data = (await response.json()) as FilamentsResponse;

    return data.filaments;
  };

  public addNewFilament = async (
    newFilament: CreateFilamentDto,
  ): Promise<FilamentDto> => {
    const token = localStorage.getItem("token");
    const response = await fetch(`${this.apiUrl}/stockfilaments/new`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newFilament),
    });

    if (!response.ok) {
      throw new Error("Error adding a new filament");
    }

    const data = (await response.json()) as FilamentResponse;

    return data.filament;
  };
}

export default StockClient;
