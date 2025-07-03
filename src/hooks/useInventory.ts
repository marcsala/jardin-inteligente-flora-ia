import { useState, useEffect } from 'react';
import { Plant, PlantStatus, PlantFormData } from '@/types/inventory';

// Mock data for demonstration
const mockPlants: Plant[] = [
  {
    id: '1',
    nombre: 'Rosa Roja',
    variedad: 'Rosa gallica',
    foto: 'https://images.unsplash.com/photo-1518709594023-6eab9bab7b23?w=300&h=200&fit=crop',
    bancalId: 'bancal-1',
    fechaSiembra: '2025-01-15',
    status: 'floracion',
    notas: 'Floración abundante en primavera',
    createdAt: '2025-01-15T10:00:00Z',
    updatedAt: '2025-03-01T15:30:00Z'
  },
  {
    id: '2',
    nombre: 'Lavanda',
    variedad: 'Lavandula angustifolia',
    foto: 'https://images.unsplash.com/photo-1540979388789-6cee28a1cdc9?w=300&h=200&fit=crop',
    bancalId: 'bancal-2',
    fechaSiembra: '2025-02-01',
    status: 'crecimiento',
    notas: 'Necesita poda después de floración',
    createdAt: '2025-02-01T09:00:00Z',
    updatedAt: '2025-02-15T12:00:00Z'
  },
  {
    id: '3',
    nombre: 'Margaritas',
    variedad: 'Bellis perennis',
    status: 'siembra',
    fechaSiembra: '2025-03-01',
    notas: 'Sembrado en semillero interior',
    createdAt: '2025-03-01T08:00:00Z',
    updatedAt: '2025-03-01T08:00:00Z'
  },
  {
    id: '4',
    nombre: 'Tulipanes',
    variedad: 'Tulipa gesneriana',
    status: 'semillas',
    notas: 'Bulbos almacenados para otoño',
    createdAt: '2025-01-10T14:00:00Z',
    updatedAt: '2025-01-10T14:00:00Z'
  }
];

export function useInventory() {
  const [plants, setPlants] = useState<Plant[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setPlants(mockPlants);
      setLoading(false);
    }, 500);
  }, []);

  const addPlant = (plantData: PlantFormData) => {
    const newPlant: Plant = {
      id: Date.now().toString(),
      ...plantData,
      status: 'semillas',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    setPlants(prev => [...prev, newPlant]);
  };

  const updatePlantStatus = (plantId: string, newStatus: PlantStatus) => {
    setPlants(prev => 
      prev.map(plant => 
        plant.id === plantId 
          ? { ...plant, status: newStatus, updatedAt: new Date().toISOString() }
          : plant
      )
    );
  };

  const updatePlant = (plantId: string, updates: Partial<Plant>) => {
    setPlants(prev => 
      prev.map(plant => 
        plant.id === plantId 
          ? { ...plant, ...updates, updatedAt: new Date().toISOString() }
          : plant
      )
    );
  };

  const deletePlant = (plantId: string) => {
    setPlants(prev => prev.filter(plant => plant.id !== plantId));
  };

  const getPlantsByStatus = (status: PlantStatus) => {
    return plants.filter(plant => plant.status === status);
  };

  return {
    plants,
    loading,
    addPlant,
    updatePlantStatus,
    updatePlant,
    deletePlant,
    getPlantsByStatus
  };
}