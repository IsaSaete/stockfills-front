import { http, HttpResponse } from "msw";
import { mockFilaments } from "../fixtures/mocksfilaments";
import type { FilamentsResponse } from "../types/types";

const apiUrl = import.meta.env.VITE_API_URL;

if (!apiUrl) {
  throw new Error("Not found");
}

export const filamentsHandlers = [
  http.get(`${apiUrl}/stockfilaments`, () => {
    return HttpResponse.json<FilamentsResponse>({ filaments: mockFilaments });
  }),
];
