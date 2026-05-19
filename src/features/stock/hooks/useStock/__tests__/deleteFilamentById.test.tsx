import { MemoryRouter } from "react-router";
import { Provider } from "react-redux";
import { act, renderHook } from "@testing-library/react";
import useStock from "../useStock";
import {
  prusaPlaFilament,
  ultimakerPetgFilament,
} from "../../../fixtures/mocksfilaments";
import type { StockState } from "../../../slice/types";
import setupStore from "../../../../../store/setupStore";

describe("Given the deleteFilamentById function", () => {
  describe("When it's called with a valid filament ID", () => {
    test("Then it should remove the filament from the store", async () => {
      const initialState: StockState = {
        filaments: [prusaPlaFilament, ultimakerPetgFilament],
        isLoading: false,
        error: null,
        isCreating: false,
        createError: null,
        toggleFavoriteError: null,
        currentFilament: null,
        isDeleting: false,
        deleteError: null,
      };

      const store = setupStore({ stock: initialState });

      const wrapper = ({ children }: { children: React.ReactNode }) => (
        <MemoryRouter>
          <Provider store={store}>{children}</Provider>
        </MemoryRouter>
      );

      const { result } = renderHook(() => useStock(), { wrapper });

      await act(async () => {
        await result.current.deleteFilamentById(prusaPlaFilament.id);
      });

      expect(result.current.filaments).toHaveLength(1);
      expect(result.current.filaments).toContainEqual(
        expect.objectContaining({ id: ultimakerPetgFilament.id }),
      );
      expect(result.current.isDeleting).toBe(false);
      expect(result.current.deleteError).toBeNull();
    });
  });
});
