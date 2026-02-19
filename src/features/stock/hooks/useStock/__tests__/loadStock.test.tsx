import { act, renderHook } from "@testing-library/react";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router";
import store from "../../../../../store/store";
import useStock from "../../useStock/useStock";

describe("Given the loadStock function", () => {
  describe("When it's called", () => {
    test("Then it should show a list of filaments", async () => {
      const expectedFilamentBrand = "Anycubic";

      const wrapper = ({ children }: { children: React.ReactNode }) => (
        <MemoryRouter>
          <Provider store={store}>{children}</Provider>
        </MemoryRouter>
      );

      const { result } = renderHook(() => useStock(), { wrapper: wrapper });

      await act(async () => {
        result.current.loadStock();
      });

      const filaments = result.current.filaments;

      expect(filaments).toContainEqual(
        expect.objectContaining({ brand: expectedFilamentBrand }),
      );
    });
  });
});
