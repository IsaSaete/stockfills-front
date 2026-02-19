import { http, HttpResponse } from "msw";
import { server } from "../../../../setupTests";
import {
  filamentivePla,
  ultimakerPetgFilament,
} from "../../fixtures/mocksfilaments";
import StockClient from "../StockClient";

describe("Given the getFilamentById methot od StockClient", () => {
  describe("When it's called with the Ultimaker PETG filament ID", () => {
    test("Then it should return the Ultimaker PETG filament data", async () => {
      const filamentClient = new StockClient();

      const foundFilament = await filamentClient.getFilamentById(
        ultimakerPetgFilament.id,
      );

      expect(foundFilament).toStrictEqual(ultimakerPetgFilament);
    });
  });

  describe("When it'a called and the server responds with an error", () => {
    test("Then it should throw an error with message 'Failed to obtain this filament'", async () => {
      const expectedErrorMessage = "Failed to obtain this filament";

      const apiUrl = import.meta.env.VITE_API_URL;

      server.use(
        http.get(`${apiUrl}/stockfilaments/${filamentivePla.id}`, () => {
          return new HttpResponse(null, { status: 500 });
        }),
      );

      const filamentClient = new StockClient();

      const updatedFilament = filamentClient.getFilamentById(filamentivePla.id);

      await expect(updatedFilament).rejects.toThrow(expectedErrorMessage);
    });
  });
});
