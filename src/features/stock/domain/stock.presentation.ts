import {
  AlertCircle,
  AlertTriangle,
  CheckCircle,
  type LucideIcon,
} from "lucide-react";
import type { StockStatus } from "../types/types";

export type StockColor = "red" | "amber" | "lime";

export interface StockPresentationConfig {
  label: string;
  color: StockColor;
  icon: LucideIcon;
}

export const stockPresentation: Record<StockStatus, StockPresentationConfig> = {
  critical: { label: "Stock crítico", color: "red", icon: AlertCircle },
  low: { label: "Stock bajo", color: "amber", icon: AlertTriangle },
  normal: { label: "Stock óptimo", color: "lime", icon: CheckCircle },
};
