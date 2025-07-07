export interface RiegoSchedule {
  id: string;
  plantId: string;
  frecuenciaDias: number;
  ultimoRiego: string;
  proximoRiego: string;
  cantidad: 'poca' | 'moderada' | 'abundante';
  notas?: string;
  activo: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface RiegoRegistro {
  id: string;
  plantId: string;
  fecha: string;
  cantidad: 'poca' | 'moderada' | 'abundante';
  observaciones?: string;
  createdAt: string;
}

export interface RiegoFormData {
  plantId: string;
  frecuenciaDias: number;
  cantidad: 'poca' | 'moderada' | 'abundante';
  notas?: string;
}

export interface PlantWithRiego {
  id: string;
  nombre: string;
  variedad: string;
  foto?: string;
  bancalId?: string;
  status: string;
  schedule?: RiegoSchedule;
  diasSinRiego: number;
  necesitaRiego: boolean;
  proximoRiego: string;
}