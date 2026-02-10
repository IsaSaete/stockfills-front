import { http, HttpResponse } from "msw";
import {
  createdFilamentPrusament,
  mockFilaments,
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

  http.post(`${apiUrl}/stockfilaments/new`, () => {
    return HttpResponse.json<FilamentResponse>({
      filament: createdFilamentPrusament,
    });
  }),
];
