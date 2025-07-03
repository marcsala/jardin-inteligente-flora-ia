export type PlantStatus = "semillas" | "siembra" | "crecimiento" | "floracion";

export interface Plant {
  id: string;
  nombre: string;
  variedad: string;
  foto?: string;
  bancalId?: string;
  fechaSiembra?: string;
  status: PlantStatus;
  notas?: string;
  createdAt: string;
  updatedAt: string;
}

export interface PlantFormData {
  nombre: string;
  variedad: string;
  foto?: string;
  bancalId?: string;
  fechaSiembra?: string;
  notas?: string;
}