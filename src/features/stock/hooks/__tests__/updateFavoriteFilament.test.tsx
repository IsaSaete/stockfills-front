import { MemoryRouter } from "react-router";
import { Provider } from "react-redux";
import useStock from "../useStock";
import { act, renderHook } from "@testing-library/react";
import {
  favoriteFilament,
  nonFavoriteFilament,
} from "../../fixtures/mocksfilaments";
import type { StockState } from "../../slice/types";
import setupStore from "../../../../store/setupStore";

describe("Given the updatedFavoriteFilament function", () => {
  describe("When it's called with filament marked as favorite", () => {
    test("Then it should update this filament marked as non favorite", async () => {
      const initialState: StockState = {
        filaments: [favoriteFilament],
        isLoading: false,
        error: null,
        isCreating: false,
        createError: null,
        toggleFavoriteError: null,
      };

      const store = setupStore({ stock: initialState });

      const wrapper = ({ children }: { children: React.ReactNode }) => (
        <MemoryRouter>
          <Provider store={store}>{children}</Provider>
        </MemoryRouter>
      );

      const { result } = renderHook(() => useStock(), { wrapper: wrapper });

      await act(async () => {
        result.current.updateFavoriteFilament(favoriteFilament.id);
      });

      const updatedFilament = result.current.filaments;

      expect(updatedFilament).toContainEqual(
        expect.objectContaining({
          brand: nonFavoriteFilament.brand,
          isFavorite: false,
        }),
      );
    });
  });
});
