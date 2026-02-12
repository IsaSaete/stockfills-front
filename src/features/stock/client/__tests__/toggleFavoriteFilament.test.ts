import { http, HttpResponse } from "msw";
import { server } from "../../../../setupTests";
import {
  favoriteFilament,
  filamentivePla,
  nonFavoriteFilament,
} from "../../fixtures/mocksfilaments";
import StockClient from "../StockClient";

describe("Given the toggleFavoriteFilament method of StockClient", () => {
  describe("When it's called with filament marked as a favorite", () => {
    test("Then it should return this filament as not a favorite", async () => {
      const filamentClient = new StockClient();

      const updatedFilament = await filamentClient.toggleFavoriteFilament(
        favoriteFilament.id,
      );

      expect(updatedFilament).toStrictEqual(nonFavoriteFilament);
    });
  });

  describe("When it'a called and the server responds with an error", () => {
    test("Then it should throw an error with message 'Failed to toggle favorite status'", async () => {
      const expectedErrorMessage = "Failed to toggle favorite status";

      const apiUrl = import.meta.env.VITE_API_URL;

      server.use(
        http.post(
          `${apiUrl}/stockfilaments/${filamentivePla.id}/favorite`,
          () => {
            return new HttpResponse(null, { status: 500 });
          },
        ),
      );

      const filamentClient = new StockClient();

      const updatedFilament = filamentClient.toggleFavoriteFilament(
        filamentivePla.id,
      );

      await expect(updatedFilament).rejects.toThrow(expectedErrorMessage);
    });
  });
});
