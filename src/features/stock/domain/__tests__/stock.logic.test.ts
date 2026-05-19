import { describe, expect, test } from "vitest";
import { isFilamentDepleted } from "../stock.logic";

describe("Given the isFilamentDepleted function", () => {
  describe("When remaining grams are zero or negative", () => {
    test("Then it should indicate the filament is depleted", () => {
      const zeroGramsRemaining = 0;
      const negativeGramsRemaining = -10;

      const isDepletedWithZeroGrams = isFilamentDepleted(zeroGramsRemaining);
      const isDepletedWithNegativeGrams = isFilamentDepleted(
        negativeGramsRemaining,
      );

      expect(isDepletedWithZeroGrams).toBe(true);
      expect(isDepletedWithNegativeGrams).toBe(true);
    });
  });

  describe("When remaining grams are greater than zero", () => {
    test("Then it should indicate the filament is not depleted", () => {
      const oneGramRemaining = 1;
      const twoHundredFiftyGramsRemaining = 250;

      const isDepletedWithOneGram = isFilamentDepleted(oneGramRemaining);
      const isDepletedWithStock = isFilamentDepleted(
        twoHundredFiftyGramsRemaining,
      );

      expect(isDepletedWithOneGram).toBe(false);
      expect(isDepletedWithStock).toBe(false);
    });
  });
});
