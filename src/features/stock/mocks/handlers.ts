import { http, HttpResponse } from "msw";
import {
  createdFilamentPrusament,
  favoriteFilament,
  mockFilaments,
  nonFavoriteFilament,
  ultimakerPetgFilament,
} from "../fixtures/mocksfilaments";
import type { FilamentResponse, FilamentsResponse } from "../types/types";

const apiUrl = import.meta.env.VITE_API_URL;

if (!apiUrl) {
  throw new Error("Not found");
}

export const filamentsHandlers = [
  http.get(`${apiUrl}/stockfilaments`, () => {
    return HttpResponse.json<FilamentsResponse>({ filaments: mockFilaments });
  }),

  http.post(`${apiUrl}/stockfilaments`, () => {
    return HttpResponse.json<FilamentResponse>({
      filament: createdFilamentPrusament,
    });
  }),

  http.patch(`${apiUrl}/stockfilaments/${favoriteFilament.id}/favorite`, () => {
    return HttpResponse.json<FilamentResponse>({
      filament: nonFavoriteFilament,
    });
  }),
  http.get(`${apiUrl}/stockfilaments/${ultimakerPetgFilament.id}`, () => {
    return HttpResponse.json<FilamentResponse>({
      filament: ultimakerPetgFilament,
    });
  }),
];
