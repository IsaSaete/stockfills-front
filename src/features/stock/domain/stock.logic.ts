import type { StockStatus } from "../types/types";

export interface StockInfo {
  status: StockStatus;
  remainingGrams: number;
  percentage: number;
}

export const getStockInfo = (
  remainingGrams: number,
  initialGrams: number,
  lowStockThresholdGrams: number = 200,
): StockInfo => {
  let status: StockStatus;

  if (remainingGrams <= lowStockThresholdGrams) {
    status = "critical";
  } else if (remainingGrams <= lowStockThresholdGrams * 2) {
    status = "low";
  } else {
    status = "normal";
  }

  const percentage =
    initialGrams > 0 ? Math.round((remainingGrams / initialGrams) * 100) : 0;

  return { status, remainingGrams, percentage };
};
