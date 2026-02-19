import { MemoryRouter } from "react-router";
import setupStore from "../../../../../store/setupStore";
import { ultimakerPetgFilament } from "../../../fixtures/mocksfilaments";
import type { StockState } from "../../../slice/types";
import { Provider } from "react-redux";
import { renderHook } from "@testing-library/react";
import useStock from "../useStock";
import { act } from "react";

describe("Given the getFilamentById function", () => {
  describe("When it's called with a valid filament ID", () => {
    test("Then it should dispatch the filament into the store", async () => {
      const initialState: StockState = {
        filaments: [],
        isLoading: false,
        error: null,
        isCreating: false,
        createError: null,
        toggleFavoriteError: null,
        currentFilament: null,
      };

      const store = setupStore({ stock: initialState });

      const wrapper = ({ children }: { children: React.ReactNode }) => (
        <MemoryRouter>
          <Provider store={store}>{children}</Provider>
        </MemoryRouter>
      );

      const { result } = renderHook(() => useStock(), { wrapper: wrapper });

      await act(async () => {
        await result.current.getFilamentById(ultimakerPetgFilament.id);
      });

      const state = store.getState().stock;

      expect(state.currentFilament).toStrictEqual(ultimakerPetgFilament);
    });
  });
});
