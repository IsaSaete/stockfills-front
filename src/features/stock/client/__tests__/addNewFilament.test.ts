import {
  createdFilamentPrusament,
  newFilamentPrusament,
} from "../../fixtures/mocksfilaments";
import StockClient from "../StockClient";

describe("Given the addNewFilament method of StockClient", () => {
  describe("When it's called with 'newFilamentPrusament' filament data", () => {
    test("Then it should return 'createdFilamentPrusament' data", async () => {
      const filamentClient = new StockClient();

      const newFilament =
        await filamentClient.addNewFilament(newFilamentPrusament);

      expect(newFilament).toStrictEqual(createdFilamentPrusament);
    });
  });
});
