
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  Wifi, 
  WifiOff, 
  Power, 
  PowerOff, 
  Hand, 
  Calendar,
  Droplets,
  AlertCircle,
  RefreshCw,
  BarChart3
} from 'lucide-react';
import { useIrrigationAPI } from './useIrrigationAPI';
import { ZoneCard } from './ZoneCard';
import { ScheduleModal } from './ScheduleModal';
import { StatsModal } from './StatsModal';

export const IrrigationDashboard: React.FC = () => {
  const {
    zones,
    systemStatus,
    loading,
    error,
    startIrrigation,
    stopIrrigation,
    stopAllIrrigation,
    fetchZones,
    fetchSystemStatus,
    updateConfig
  } = useIrrigationAPI();

  const [refreshing, setRefreshing] = useState(false);
  const [scheduleModal, setScheduleModal] = useState<{
    isOpen: boolean;
    zoneId: number;
    zoneName: string;
  }>({
    isOpen: false,
    zoneId: 0,
    zoneName: ''
  });
  const [statsModal, setStatsModal] = useState(false);

  // Manejar actualización manual
  const handleRefresh = async () => {
    setRefreshing(true);
    await Promise.all([fetchZones(), fetchSystemStatus()]);
    setRefreshing(false);
  };

  // Manejar inicio de riego
  const handleStartIrrigation = async (zoneId: number, duration: number) => {
    const success = await startIrrigation(zoneId, duration);
    if (success) {
      console.log(`Riego iniciado en zona ${zoneId} por ${duration} minutos`);
    }
  };

  // Manejar parada de riego
  const handleStopIrrigation = async (zoneId: number) => {
    const success = await stopIrrigation(zoneId);
    if (success) {
      console.log(`Riego detenido en zona ${zoneId}`);
    }
  };

  // Manejar parada total
  const handleStopAll = async () => {
    const success = await stopAllIrrigation();
    if (success) {
      console.log('Todo el riego detenido');
    }
  };

  // Alternar modo manual
  const toggleManualMode = async () => {
    if (systemStatus) {
      await updateConfig({ manual_mode: !systemStatus.manual_mode });
      await fetchSystemStatus();
    }
  };

  // Alternar sistema habilitado
  const toggleSystemEnabled = async () => {
    if (systemStatus) {
      await updateConfig({ system_enabled: !systemStatus.system_enabled });
      await fetchSystemStatus();
    }
  };

  // Funciones para modales
  const handleEditZone = (zoneId: number) => {
    console.log(`Editar zona ${zoneId}`);
    // Aquí abrirías un modal para editar la zona
  };

  const handleScheduleZone = (zoneId: number) => {
    const zone = zones.find(z => z.id === zoneId);
    setScheduleModal({
      isOpen: true,
      zoneId,
      zoneName: zone?.name || `Zona ${zoneId + 1}`
    });
  };

  const closeScheduleModal = () => {
    setScheduleModal(prev => ({ ...prev, isOpen: false }));
  };

  // Calcular estadísticas
  const activeZones = zones.filter(zone => zone.active).length;
  const totalZones = zones.length;

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Sistema de Riego Inteligente
          </h1>
          <p className="text-gray-600 mt-1">
            Control y monitoreo de 14 zonas de riego
          </p>
        </div>
        <Button
          onClick={handleRefresh}
          disabled={refreshing}
          variant="outline"
          size="sm"
        >
          <RefreshCw className={`w-4 h-4 mr-2 ${refreshing ? 'animate-spin' : ''}`} />
          Actualizar
        </Button>
      </div>

      {/* Error Alert */}
      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            Error de conexión: {error}
          </AlertDescription>
        </Alert>
      )}

      {/* Estado del Sistema */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Droplets className="w-5 h-5" />
            Estado del Sistema
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Conexión ESP32 */}
            <div className="flex items-center gap-3">
              {systemStatus?.wifi_connected ? (
                <Wifi className="w-5 h-5 text-green-500" />
              ) : (
                <WifiOff className="w-5 h-5 text-red-500" />
              )}
              <div>
                <p className="text-sm font-medium">Conexión</p>
                <p className="text-xs text-gray-600">
                  {systemStatus?.wifi_connected ? 'Conectado' : 'Desconectado'}
                </p>
              </div>
            </div>

            {/* Estado del Sistema */}
            <div className="flex items-center gap-3">
              <Button
                variant="ghost"
                size="sm"
                onClick={toggleSystemEnabled}
                className="p-0 h-auto"
              >
                {systemStatus?.system_enabled ? (
                  <Power className="w-5 h-5 text-green-500" />
                ) : (
                  <PowerOff className="w-5 h-5 text-red-500" />
                )}
              </Button>
              <div>
                <p className="text-sm font-medium">Sistema</p>
                <p className="text-xs text-gray-600">
                  {systemStatus?.system_enabled ? 'Habilitado' : 'Deshabilitado'}
                </p>
              </div>
            </div>

            {/* Modo Manual */}
            <div className="flex items-center gap-3">
              <Button
                variant="ghost"
                size="sm"
                onClick={toggleManualMode}
                className="p-0 h-auto"
              >
                <Hand className={`w-5 h-5 ${
                  systemStatus?.manual_mode ? 'text-orange-500' : 'text-gray-400'
                }`} />
              </Button>
              <div>
                <p className="text-sm font-medium">Modo</p>
                <p className="text-xs text-gray-600">
                  {systemStatus?.manual_mode ? 'Manual' : 'Automático'}
                </p>
              </div>
            </div>

            {/* Zonas Activas */}
            <div className="flex items-center gap-3">
              <Badge variant={activeZones > 0 ? "default" : "secondary"}>
                {activeZones}/{totalZones}
              </Badge>
              <div>
                <p className="text-sm font-medium">Zonas Activas</p>
                <p className="text-xs text-gray-600">
                  {activeZones} de {totalZones} regando
                </p>
              </div>
            </div>
          </div>

          {/* Última conexión */}
          {systemStatus?.last_seen && (
            <div className="mt-4 pt-4 border-t">
              <p className="text-xs text-gray-500">
                Última conexión: {new Date(systemStatus.last_seen).toLocaleString('es-ES')}
                {systemStatus.ip_address && ` - IP: ${systemStatus.ip_address}`}
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Controles Globales */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button
            onClick={handleStopAll}
            variant="destructive"
            disabled={loading || activeZones === 0}
          >
            Detener Todo el Riego
          </Button>
          
          {activeZones > 0 && (
            <Badge variant="outline" className="text-blue-600">
              {activeZones} zona{activeZones !== 1 ? 's' : ''} regando actualmente
            </Badge>
          )}
        </div>

        <Button
          onClick={() => setStatsModal(true)}
          variant="outline"
          className="flex items-center gap-2"
        >
          <BarChart3 className="w-4 h-4" />
          Ver Estadísticas
        </Button>
      </div>

      {/* Grid de Zonas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {zones.map((zone) => (
          <ZoneCard
            key={zone.id}
            zone={zone}
            onStart={handleStartIrrigation}
            onStop={handleStopIrrigation}
            onEdit={handleEditZone}
            onSchedule={handleScheduleZone}
            loading={loading}
          />
        ))}
      </div>

      {/* Loading state */}
      {loading && zones.length === 0 && (
        <div className="flex items-center justify-center py-12">
          <div className="text-center">
            <RefreshCw className="w-8 h-8 animate-spin mx-auto mb-4 text-gray-400" />
            <p className="text-gray-600">Cargando zonas de riego...</p>
          </div>
        </div>
      )}

      {/* Modales */}
      <ScheduleModal
        isOpen={scheduleModal.isOpen}
        onClose={closeScheduleModal}
        zoneId={scheduleModal.zoneId}
        zoneName={scheduleModal.zoneName}
      />

      <StatsModal
        isOpen={statsModal}
        onClose={() => setStatsModal(false)}
      />
    </div>
  );
};
