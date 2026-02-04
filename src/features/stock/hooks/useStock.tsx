import { useCallback, useMemo } from "react";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import StockClient from "../client/StockClient";
import { stockFailed, stockLoaded, stockLoading } from "../slice/stockSlice";

const useStock = () => {
  const dispatch = useAppDispatch();
  const { error, filaments, isLoading } = useAppSelector(
    (state) => state.stock,
  );

  const stockClient = useMemo(() => new StockClient(), []);

  const loadStock = useCallback(async (): Promise<void> => {
    dispatch(stockLoading());

    try {
      const filamentsData = await stockClient.getAllFilaments();

      dispatch(stockLoaded(filamentsData));
    } catch {
      dispatch(stockFailed("No se ha podido cargar el stock"));
    }
  }, [dispatch, stockClient]);

  return { loadStock, filaments, isLoading, error };
};

export default useStock;
