import { useCallback, useMemo } from "react";
import {
  addFilamentFailed,
  addFilamentLoading,
  addFilamentSuccess,
  deleteFilamentFailed,
  deleteFilamentLoading,
  deleteFilamentSuccess,
  getFilament,
  getFilamentFailed,
  stockFailed,
  stockLoaded,
  stockLoading,
  toggleFavoriteFailed,
  toggleFavoriteFilament,
} from "../../slice/stockSlice";
import type { CreateFilamentDto } from "../../types/types";
import { useAppDispatch, useAppSelector } from "../../../../store/hooks";
import StockClient from "../../client/StockClient";

const useStock = () => {
  const dispatch = useAppDispatch();
  const {
    error,
    filaments,
    isLoading,
    createError,
    isCreating,
    isDeleting,
    deleteError,
  } = useAppSelector((state) => state.stock);

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

  const getFilamentById = useCallback(
    async (filamentId: string): Promise<void> => {
      try {
        const filament = await stockClient.getFilamentById(filamentId);

        dispatch(getFilament(filament));
      } catch {
        dispatch(getFilamentFailed("No se ha podido cargar este filamento"));
      }
    },
    [stockClient, dispatch],
  );

  const deleteFilamentById = useCallback(
    async (filamentId: string): Promise<void> => {
      dispatch(deleteFilamentLoading());

      try {
        await stockClient.deleteFilamentById(filamentId);
        dispatch(deleteFilamentSuccess(filamentId));
      } catch {
        dispatch(
          deleteFilamentFailed("No se ha podido eliminar este filamento"),
        );
        throw new Error("delete filament failed");
      }
    },
    [dispatch, stockClient],
  );

  const currentFilament = useAppSelector(
    (state) => state.stock.currentFilament,
  );

  return {
    loadStock,
    filaments,
    isLoading,
    error,
    addNewFilament,
    createError,
    isCreating,
    updateFavoriteFilament,
    getFilamentById,
    currentFilament,
    deleteFilamentById,
    isDeleting,
    deleteError,
  };
};

export default useStock;
