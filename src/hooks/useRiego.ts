import { useState, useEffect } from 'react';
import { RiegoSchedule, RiegoRegistro, RiegoFormData, PlantWithRiego } from '@/types/riego';
import { Plant } from '@/types/inventory';
import { useInventory } from './useInventory';

// Mock data para demostración
const mockSchedules: RiegoSchedule[] = [
  {
    id: '1',
    plantId: '1',
    frecuenciaDias: 3,
    ultimoRiego: '2025-01-04T10:00:00Z',
    proximoRiego: '2025-01-07T10:00:00Z',
    cantidad: 'moderada',
    notas: 'Regar por la mañana',
    activo: true,
    createdAt: '2025-01-01T10:00:00Z',
    updatedAt: '2025-01-04T10:00:00Z'
  },
  {
    id: '2',
    plantId: '2',
    frecuenciaDias: 2,
    ultimoRiego: '2025-01-05T08:00:00Z',
    proximoRiego: '2025-01-07T08:00:00Z',
    cantidad: 'poca',
    notas: 'Evitar encharcamiento',
    activo: true,
    createdAt: '2025-01-02T08:00:00Z',
    updatedAt: '2025-01-05T08:00:00Z'
  }
];

const mockRegistros: RiegoRegistro[] = [
  {
    id: '1',
    plantId: '1',
    fecha: '2025-01-04T10:00:00Z',
    cantidad: 'moderada',
    observaciones: 'Tierra un poco seca',
    createdAt: '2025-01-04T10:00:00Z'
  },
  {
    id: '2',
    plantId: '2',
    fecha: '2025-01-05T08:00:00Z',
    cantidad: 'poca',
    observaciones: 'Humedad buena',
    createdAt: '2025-01-05T08:00:00Z'
  }
];

export function useRiego() {
  const [schedules, setSchedules] = useState<RiegoSchedule[]>([]);
  const [registros, setRegistros] = useState<RiegoRegistro[]>([]);
  const [loading, setLoading] = useState(true);
  const { plants } = useInventory();

  useEffect(() => {
    // Simular carga de datos
    setTimeout(() => {
      setSchedules(mockSchedules);
      setRegistros(mockRegistros);
      setLoading(false);
    }, 500);
  }, []);

  const calcularDiasSinRiego = (ultimoRiego: string): number => {
    const hoy = new Date();
    const fechaUltimoRiego = new Date(ultimoRiego);
    const diffTime = Math.abs(hoy.getTime() - fechaUltimoRiego.getTime());
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  const necesitaRiego = (schedule: RiegoSchedule): boolean => {
    const diasSinRiego = calcularDiasSinRiego(schedule.ultimoRiego);
    return diasSinRiego >= schedule.frecuenciaDias;
  };

  const calcularProximoRiego = (schedule: RiegoSchedule): string => {
    const ultimoRiego = new Date(schedule.ultimoRiego);
    const proximoRiego = new Date(ultimoRiego);
    proximoRiego.setDate(proximoRiego.getDate() + schedule.frecuenciaDias);
    return proximoRiego.toISOString();
  };

  const getPlantsWithRiego = (): PlantWithRiego[] => {
    return plants.map(plant => {
      const schedule = schedules.find(s => s.plantId === plant.id);
      const diasSinRiego = schedule ? calcularDiasSinRiego(schedule.ultimoRiego) : 0;
      const necesitaRiegoPlant = schedule ? necesitaRiego(schedule) : false;
      const proximoRiego = schedule ? calcularProximoRiego(schedule) : '';

      return {
        ...plant,
        schedule,
        diasSinRiego,
        necesitaRiego: necesitaRiegoPlant,
        proximoRiego
      };
    });
  };

  const getPlantsPendientesRiego = (): PlantWithRiego[] => {
    return getPlantsWithRiego().filter(plant => plant.necesitaRiego);
  };

  const getPlantsRiegoHoy = (): PlantWithRiego[] => {
    const hoy = new Date().toISOString().split('T')[0];
    return getPlantsWithRiego().filter(plant => 
      plant.proximoRiego && plant.proximoRiego.split('T')[0] === hoy
    );
  };

  const registrarRiego = (plantId: string, cantidad: 'poca' | 'moderada' | 'abundante', observaciones?: string) => {
    const nuevoRegistro: RiegoRegistro = {
      id: Date.now().toString(),
      plantId,
      fecha: new Date().toISOString(),
      cantidad,
      observaciones,
      createdAt: new Date().toISOString()
    };

    setRegistros(prev => [...prev, nuevoRegistro]);

    // Actualizar el último riego en el schedule
    setSchedules(prev => 
      prev.map(schedule => 
        schedule.plantId === plantId 
          ? { 
              ...schedule, 
              ultimoRiego: new Date().toISOString(),
              proximoRiego: calcularProximoRiego({
                ...schedule,
                ultimoRiego: new Date().toISOString()
              }),
              updatedAt: new Date().toISOString()
            }
          : schedule
      )
    );
  };

  const crearSchedule = (scheduleData: RiegoFormData) => {
    const nuevaSchedule: RiegoSchedule = {
      id: Date.now().toString(),
      ...scheduleData,
      ultimoRiego: new Date().toISOString(),
      proximoRiego: '',
      activo: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    nuevaSchedule.proximoRiego = calcularProximoRiego(nuevaSchedule);
    setSchedules(prev => [...prev, nuevaSchedule]);
  };

  const actualizarSchedule = (scheduleId: string, updates: Partial<RiegoSchedule>) => {
    setSchedules(prev => 
      prev.map(schedule => 
        schedule.id === scheduleId 
          ? { ...schedule, ...updates, updatedAt: new Date().toISOString() }
          : schedule
      )
    );
  };

  const eliminarSchedule = (scheduleId: string) => {
    setSchedules(prev => prev.filter(schedule => schedule.id !== scheduleId));
  };

  const getRegistrosByPlant = (plantId: string) => {
    return registros
      .filter(registro => registro.plantId === plantId)
      .sort((a, b) => new Date(b.fecha).getTime() - new Date(a.fecha).getTime());
  };

  return {
    schedules,
    registros,
    loading,
    getPlantsWithRiego,
    getPlantsPendientesRiego,
    getPlantsRiegoHoy,
    registrarRiego,
    crearSchedule,
    actualizarSchedule,
    eliminarSchedule,
    getRegistrosByPlant
  };
}