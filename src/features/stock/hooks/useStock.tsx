import { useCallback, useMemo } from "react";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import StockClient from "../client/StockClient";
import {
  addFilamentFailed,
  addFilamentLoading,
  addFilamentSuccess,
  stockFailed,
  stockLoaded,
  stockLoading,
  toggleFavoriteFailed,
  toggleFavoriteFilament,
} from "../slice/stockSlice";
import type { CreateFilamentDto } from "../types/types";

const useStock = () => {
  const dispatch = useAppDispatch();
  const { error, filaments, isLoading, createError, isCreating } =
    useAppSelector((state) => state.stock);

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

  const addNewFilament = async (
    newFilament: CreateFilamentDto,
  ): Promise<void> => {
    dispatch(addFilamentLoading());

    try {
      const addedFilament = await stockClient.addNewFilament(newFilament);

      dispatch(addFilamentSuccess(addedFilament));
    } catch {
      dispatch(addFilamentFailed("No se ha podido añadir el filamento"));
    }
  };

  const updateFavoriteFilament = async (filamentId: string): Promise<void> => {
    try {
      const updatedFavoriteFilament =
        await stockClient.toggleFavoriteFilament(filamentId);

      dispatch(toggleFavoriteFilament(updatedFavoriteFilament.id));
    } catch {
      dispatch(
        toggleFavoriteFailed("No se ha podido cambiar el estado de favorito"),
      );
    }
  };

  return {
    loadStock,
    filaments,
    isLoading,
    error,
    addNewFilament,
    createError,
    isCreating,
    updateFavoriteFilament,
  };
};

export default useStock;
