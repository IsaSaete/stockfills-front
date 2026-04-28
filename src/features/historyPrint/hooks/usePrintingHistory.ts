import { useCallback, useMemo } from "react";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import PrintingHistoryClient from "../client/PrintingHistoryClient.ts/PrintingHistoryClient";
import type {
  CreateHistoryPrinting,
  PrintingHistoryDto,
  UpdatePrintingHistoryDto,
} from "../types";
import {
  loadPrintingHistory,
  printingHistoryAdd,
  printingHistoryFailed,
  printingHistoryLoading,
  printingHistoryUpdate,
} from "../slice/PrintingHistorySlice";
import type { GetPrintingHistoryParams } from "../client/PrintingHistoryClient.ts/types";

const usePrintingHistory = () => {
  const dispatch = useAppDispatch();
  const { error, isLoading, printingHistory, pagination } = useAppSelector(
    (state) => state.printingHistory,
  );

  const printingHistoryClient = useMemo(() => new PrintingHistoryClient(), []);

  const recordConsumption = async (
    filamentId: string,
    newEntry: CreateHistoryPrinting,
  ): Promise<void> => {
    dispatch(printingHistoryLoading());

    try {
      const createdEntry = await printingHistoryClient.recordConsumption(
        filamentId,
        newEntry,
      );

      dispatch(printingHistoryAdd(createdEntry));
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : "No se ha podido registrar el consumo del filamento";

      dispatch(printingHistoryFailed(errorMessage));

      throw error;
    }
  };

  const loadPrintingHistoryByPage = useCallback(
    async (params?: GetPrintingHistoryParams): Promise<void> => {
      dispatch(printingHistoryLoading());

      try {
        const historyPrinting =
          await printingHistoryClient.getPrintingHistory(params);

        dispatch(loadPrintingHistory(historyPrinting));
      } catch (error) {
        const errorMessage =
          error instanceof Error
            ? error.message
            : "No se ha podido cargar el historial de impresiones";

        dispatch(printingHistoryFailed(errorMessage));
      }
    },
    [dispatch, printingHistoryClient],
  );

  const updatePrintingHistoryById = async (
    printingHistoryId: string,
    updatePrintingHistoryDto: UpdatePrintingHistoryDto,
  ): Promise<void> => {
    dispatch(printingHistoryLoading());

    try {
      const updatedEntry = await printingHistoryClient.updatePrintingHistory(
        printingHistoryId,
        updatePrintingHistoryDto,
      );

      dispatch(printingHistoryUpdate(updatedEntry));
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : "No se ha podido actualizar el registro";

      dispatch(printingHistoryFailed(errorMessage));

      throw error;
    }
  };

  const uploadPrintingImage = async (
    imageFile: File,
  ): Promise<{ imageUrl: string; imagePublicId: string }> => {
    return printingHistoryClient.uploadPrintingHistoryImage(imageFile);
  };

  const getPrintingHistoryById = useCallback(
    async (printingHistoryId: string): Promise<PrintingHistoryDto> => {
      return printingHistoryClient.getPrintingHistoryById(printingHistoryId);
    },
    [printingHistoryClient],
  );

  return {
    error,
    isLoading,
    printingHistory,
    pagination,
    recordConsumption,
    loadPrintingHistoryByPage,
    getPrintingHistoryById,
    updatePrintingHistoryById,
    uploadPrintingImage,
  };
};

export default usePrintingHistory;
