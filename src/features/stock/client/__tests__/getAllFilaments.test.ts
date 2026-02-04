import { http, HttpResponse } from "msw";
import { server } from "../../../../setupTests";
import { mockFilaments } from "../../fixtures/mocksfilaments";
import StockClient from "../StockClient";

describe("Given the getAllFilaments method of StockClient", () => {
  describe("When it's called", () => {
    test("Then it should return a Prusa,Anycubic & Ultimaker filaments", async () => {
      const filamentClient = new StockClient();

      const filamentsCollection = await filamentClient.getAllFilaments();

      expect(filamentsCollection).toStrictEqual(mockFilaments);
    });
  });

  describe("When it's called and the server responds with an error", () => {
    test("Then it should throw an error with message 'Error fetching filaments'", async () => {
      const expectedErrorMessage = "Error fetching filaments";

      const apiUrl = import.meta.env.VITE_API_URL;

      server.use(
        http.get(`${apiUrl}/stockfilaments`, () => {
          return new HttpResponse(null, { status: 500 });
        }),
      );

      const filamentClient = new StockClient();

      const filaments = filamentClient.getAllFilaments();

      expect(filaments).rejects.toThrow(expectedErrorMessage);
    });
  });
});
