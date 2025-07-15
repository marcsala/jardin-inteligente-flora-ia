
import { useState, useEffect, useCallback } from 'react';

// Configuración de la API
const API_BASE_URL = process.env.NODE_ENV === 'production' 
  ? 'https://tu-backend-en-railway.com/api'  // Cambiar cuando despliegues
  : 'http://localhost:3000/api';  // Para desarrollo local

// Tipos TypeScript
export interface Zone {
  id: number;
  name: string;
  description: string;
  active: boolean;
  duration: number;
  last_activation: string | null;
}

export interface Schedule {
  id?: number;
  zone_id: number;
  hour: number;
  minute: number;
  duration: number;
  enabled: boolean;
  monday: boolean;
  tuesday: boolean;
  wednesday: boolean;
  thursday: boolean;
  friday: boolean;
  saturday: boolean;
  sunday: boolean;
}

export interface IrrigationStats {
  id: number;
  name: string;
  total_time: number;
  times_activated: number;
  last_update: string;
}

export interface SystemStatus {
  device_id: string | null;
  last_seen: string | null;
  system_enabled: boolean;
  manual_mode: boolean;
  wifi_connected: boolean;
  ip_address: string | null;
  zones: Zone[];
}

export interface IrrigationLog {
  id: number;
  zone_id: number;
  zone_name: string;
  start_time: string;
  end_time: string | null;
  duration: number;
  type: 'manual' | 'scheduled' | 'weather';
  triggered_by: string;
}

// Hook principal
export const useIrrigationAPI = () => {
  const [zones, setZones] = useState<Zone[]>([]);
  const [systemStatus, setSystemStatus] = useState<SystemStatus | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Función para hacer peticiones
  const apiCall = async (endpoint: string, options?: RequestInit) => {
    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        headers: {
          'Content-Type': 'application/json',
          ...options?.headers,
        },
        ...options,
      });

      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }

      return await response.json();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error desconocido');
      throw err;
    }
  };

  // Obtener todas las zonas
  const fetchZones = useCallback(async () => {
    setLoading(true);
    try {
      const response = await apiCall('/zones');
      setZones(response.data);
      setError(null);
    } catch (err) {
      console.error('Error obteniendo zonas:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  // Obtener estado del sistema
  const fetchSystemStatus = useCallback(async () => {
    try {
      const response = await apiCall('/status');
      setSystemStatus(response.data.system);
      setError(null);
    } catch (err) {
      console.error('Error obteniendo estado del sistema:', err);
    }
  }, []);

  // Iniciar riego manual
  const startIrrigation = async (zoneId: number, duration: number) => {
    setLoading(true);
    try {
      await apiCall(`/zones/${zoneId}/start`, {
        method: 'POST',
        body: JSON.stringify({ duration }),
      });
      
      // Actualizar estado local
      setZones(prev => prev.map(zone => 
        zone.id === zoneId 
          ? { ...zone, active: true, duration, last_activation: new Date().toISOString() }
          : zone
      ));
      
      setError(null);
      return true;
    } catch (err) {
      console.error('Error iniciando riego:', err);
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Detener riego
  const stopIrrigation = async (zoneId: number) => {
    setLoading(true);
    try {
      await apiCall(`/zones/${zoneId}/stop`, {
        method: 'POST',
      });
      
      // Actualizar estado local
      setZones(prev => prev.map(zone => 
        zone.id === zoneId 
          ? { ...zone, active: false, duration: 0 }
          : zone
      ));
      
      setError(null);
      return true;
    } catch (err) {
      console.error('Error deteniendo riego:', err);
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Detener todo el riego
  const stopAllIrrigation = async () => {
    setLoading(true);
    try {
      await apiCall('/stop-all', {
        method: 'POST',
      });
      
      // Actualizar estado local
      setZones(prev => prev.map(zone => 
        ({ ...zone, active: false, duration: 0 })
      ));
      
      setError(null);
      return true;
    } catch (err) {
      console.error('Error deteniendo todo el riego:', err);
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Obtener programaciones de una zona
  const getSchedules = async (zoneId: number): Promise<Schedule[]> => {
    try {
      const response = await apiCall(`/zones/${zoneId}/schedules`);
      return response.data;
    } catch (err) {
      console.error('Error obteniendo programaciones:', err);
      return [];
    }
  };

  // Crear nueva programación
  const createSchedule = async (zoneId: number, schedule: Omit<Schedule, 'id' | 'zone_id'>) => {
    setLoading(true);
    try {
      await apiCall(`/zones/${zoneId}/schedules`, {
        method: 'POST',
        body: JSON.stringify(schedule),
      });
      setError(null);
      return true;
    } catch (err) {
      console.error('Error creando programación:', err);
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Actualizar programación
  const updateSchedule = async (scheduleId: number, schedule: Partial<Schedule>) => {
    setLoading(true);
    try {
      await apiCall(`/schedules/${scheduleId}`, {
        method: 'PUT',
        body: JSON.stringify(schedule),
      });
      setError(null);
      return true;
    } catch (err) {
      console.error('Error actualizando programación:', err);
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Eliminar programación
  const deleteSchedule = async (scheduleId: number) => {
    setLoading(true);
    try {
      await apiCall(`/schedules/${scheduleId}`, {
        method: 'DELETE',
      });
      setError(null);
      return true;
    } catch (err) {
      console.error('Error eliminando programación:', err);
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Obtener estadísticas
  const getStats = async (): Promise<IrrigationStats[]> => {
    try {
      const response = await apiCall('/stats');
      return response.data;
    } catch (err) {
      console.error('Error obteniendo estadísticas:', err);
      return [];
    }
  };

  // Obtener logs
  const getLogs = async (zoneId?: number, limit = 50): Promise<IrrigationLog[]> => {
    try {
      const params = new URLSearchParams();
      if (zoneId !== undefined) params.append('zone_id', zoneId.toString());
      params.append('limit', limit.toString());
      
      const response = await apiCall(`/logs?${params.toString()}`);
      return response.data;
    } catch (err) {
      console.error('Error obteniendo logs:', err);
      return [];
    }
  };

  // Actualizar zona (nombre, descripción)
  const updateZone = async (zoneId: number, name: string, description: string) => {
    setLoading(true);
    try {
      await apiCall(`/zones/${zoneId}`, {
        method: 'PUT',
        body: JSON.stringify({ name, description }),
      });
      
      // Actualizar estado local
      setZones(prev => prev.map(zone => 
        zone.id === zoneId 
          ? { ...zone, name, description }
          : zone
      ));
      
      setError(null);
      return true;
    } catch (err) {
      console.error('Error actualizando zona:', err);
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Obtener configuración del sistema
  const getConfig = async () => {
    try {
      const response = await apiCall('/config');
      return response.data;
    } catch (err) {
      console.error('Error obteniendo configuración:', err);
      return {};
    }
  };

  // Actualizar configuración del sistema
  const updateConfig = async (config: { system_enabled?: boolean; manual_mode?: boolean; weather_integration?: boolean }) => {
    setLoading(true);
    try {
      await apiCall('/config', {
        method: 'PUT',
        body: JSON.stringify(config),
      });
      setError(null);
      return true;
    } catch (err) {
      console.error('Error actualizando configuración:', err);
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Cargar datos iniciales
  useEffect(() => {
    fetchZones();
    fetchSystemStatus();
  }, [fetchZones, fetchSystemStatus]);

  // Polling para actualizar estado cada 30 segundos
  useEffect(() => {
    const interval = setInterval(() => {
      fetchSystemStatus();
      fetchZones();
    }, 30000);

    return () => clearInterval(interval);
  }, [fetchSystemStatus, fetchZones]);

  return {
    // Estado
    zones,
    systemStatus,
    loading,
    error,
    
    // Funciones de riego
    startIrrigation,
    stopIrrigation,
    stopAllIrrigation,
    
    // Funciones de programación
    getSchedules,
    createSchedule,
    updateSchedule,
    deleteSchedule,
    
    // Funciones de estadísticas
    getStats,
    getLogs,
    
    // Funciones de configuración
    updateZone,
    getConfig,
    updateConfig,
    
    // Funciones de actualización
    fetchZones,
    fetchSystemStatus,
  };
};
