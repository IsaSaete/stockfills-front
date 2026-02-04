import type { FilamentDto } from "../types/types";
import type { FilamentClientStructure } from "./types";

class FilamentClient implements FilamentClientStructure {
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

    const data = (await response.json()) as { filaments: FilamentDto[] };

    return data.filaments;
  };
}

export default FilamentClient;
