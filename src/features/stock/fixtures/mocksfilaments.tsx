// src/features/stock/mocks/mockFilaments.ts

import type { FilamentDto } from "../types/types";

export const mockFilaments: FilamentDto[] = [
  {
    id: "1",
    brand: "Prusa",
    material: "PLA",
    colorHex: "#FF0000",
    diameter: 1.75,
    currentWeightGrams: 800,
    initialWeightGrams: 1000,
    lowStockThresholdGrams: 200,
    isFavorite: true,
    priceEurs: 25,
    supplier: "3DPrintersStore",
    purchaseUrl: "https://3dprintersstore.com/prusa-pla-red",
    notes: "Buena calidad, sin burbujas",
  },
  {
    id: "2",
    brand: "Ultimaker",
    material: "PETG",
    colorHex: "#00FF00",
    diameter: 1.75,
    currentWeightGrams: 150,
    initialWeightGrams: 1000,
    lowStockThresholdGrams: 200,
    isFavorite: false,
    priceEurs: 30,
    supplier: "Ultimaker Store",
    purchaseUrl: "https://ultimaker.com/petg-green",
    notes: "Transparente, resistente",
  },
  {
    id: "3",
    brand: "Anycubic",
    material: "ABS",
    colorHex: "#0000FF",
    diameter: 2.85,
    currentWeightGrams: 0,
    initialWeightGrams: 1000,
    lowStockThresholdGrams: 200,
    isFavorite: false,
    priceEurs: 20,
    createdAt: "02-03-2025",
  },
];
