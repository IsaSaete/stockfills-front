export interface Filament {
  id: string;
  marca: string;
  tipo: "PLA" | "PETG" | "ABS" | "TPU" | "Nylon" | "PLA Wood" | "Other";
  color: string;
  cantidadActual: number;
  pesoTotal: number; // euros
  estado: "disponible" | "bajo" | "agotado";
  umbral: number;
  fechaCreacion: Date;
  codigoReferencia: string;
}

export interface Print {
  id: string;
  nombrePieza: string;
  filamentId: string;
  gramosConsumidos: number;
  fecha: Date;
  costeCalculado: number;
  tipo: "extraccion" | "ingreso";
}

export interface UserSettings {
  thresholdAlert: number;
  theme: "light" | "dark";
}

export interface DashboardStats {
  totalBobinas: number;
  stockBajo: number;
  stockEnKg: number;
  porcentajeCambio: number;
}

export interface MovimientoReciente {
  id: string;
  tipo: "extraccion" | "ingreso";
  titulo: string;
  descripcion: string;
  cantidad: number;
  fecha: Date;
}

export interface AlertaCritica {
  id: string;
  filament: Filament;
  cantidadActual: number;
  umbral: number;
}
