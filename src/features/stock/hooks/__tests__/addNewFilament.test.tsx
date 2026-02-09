import { Provider } from "react-redux";
import { MemoryRouter } from "react-router";
import store from "../../../../store/store";
import { act, renderHook } from "@testing-library/react";
import useStock from "../useStock";
import { newFilamentPrusament } from "../../fixtures/mocksfilaments";

describe("Given the addNewFilament function", () => {
  describe("When it's called with 'newFilamentPrusament' data", () => {
    test("Then it should show 'createdFilamentPrusament' in stock", async () => {
      const wrapper = ({ children }: { children: React.ReactNode }) => (
        <MemoryRouter>
          <Provider store={store}>{children}</Provider>
        </MemoryRouter>
      );

      const { result } = renderHook(() => useStock(), { wrapper: wrapper });

      await act(async () => {
        result.current.addNewFilament(newFilamentPrusament);
      });

      const filament = result.current.filaments;

      expect(filament).toContainEqual(
        expect.objectContaining({ brand: "Prusament" }),
      );
    });
  });
});
