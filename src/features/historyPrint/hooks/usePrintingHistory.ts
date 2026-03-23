import { useMemo } from "react";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import PrintingHistoryClient from "../client/PrintingHistoryClient.ts/PrintingHistoryClient";
import type { CreateHistoryPrinting } from "../types";
import {
  printingHistoryAdd,
  printingHistoryFailed,
  printingHistoryLoading,
} from "../slice/PrintingHistorySlice";

const usePrintingHistory = () => {
  const dispatch = useAppDispatch();
  const { error, isLoading, printingHistory } = useAppSelector(
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
  return { error, isLoading, printingHistory, recordConsumption };
};

export default usePrintingHistory;
