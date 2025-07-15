import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogFooter 
} from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { 
  BarChart3, 
  Clock, 
  Droplets, 
  Calendar,
  TrendingUp,
  Activity
} from 'lucide-react';
import { IrrigationStats, IrrigationLog, useIrrigationAPI } from './useIrrigationAPI';

interface StatsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const StatsModal: React.FC<StatsModalProps> = ({
  isOpen,
  onClose
}) => {
  const { getStats, getLogs } = useIrrigationAPI();
  
  const [stats, setStats] = useState<IrrigationStats[]>([]);
  const [logs, setLogs] = useState<IrrigationLog[]>([]);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<'stats' | 'logs'>('stats');

  useEffect(() => {
    if (isOpen) {
      loadData();
    }
  }, [isOpen]);

  const loadData = async () => {
    setLoading(true);
    try {
      const [statsData, logsData] = await Promise.all([
        getStats(),
        getLogs(undefined, 20) // Últimos 20 logs
      ]);
      setStats(statsData);
      setLogs(logsData);
    } catch (error) {
      console.error('Error cargando datos:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatDuration = (minutes: number) => {
    if (minutes < 60) {
      return `${minutes} min`;
    }
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return `${hours}h ${remainingMinutes}m`;
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', {
      day: '2-digit',
      month: '2-digit',
      year: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'manual': return 'bg-blue-500';
      case 'scheduled': return 'bg-green-500';
      case 'weather': return 'bg-orange-500';
      default: return 'bg-gray-500';
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'manual': return 'Manual';
      case 'scheduled': return 'Programado';
      case 'weather': return 'Meteorológico';
      default: return 'Desconocido';
    }
  };

  // Calcular totales
  const totalTime = stats.reduce((sum, stat) => sum + stat.total_time, 0);
  const totalActivations = stats.reduce((sum, stat) => sum + stat.times_activated, 0);
  const mostActiveZone = stats.reduce((prev, current) => 
    current.total_time > prev.total_time ? current : prev, 
    stats[0] || { name: '', total_time: 0 }
  );

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <BarChart3 className="w-5 h-5" />
            Estadísticas y Logs del Sistema
          </DialogTitle>
        </DialogHeader>

        {/* Tabs */}
        <div className="flex gap-2 mb-6">
          <Button
            variant={activeTab === 'stats' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setActiveTab('stats')}
            className="flex items-center gap-2"
          >
            <TrendingUp className="w-4 h-4" />
            Estadísticas
          </Button>
          <Button
            variant={activeTab === 'logs' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setActiveTab('logs')}
            className="flex items-center gap-2"
          >
            <Activity className="w-4 h-4" />
            Historial
          </Button>
        </div>

        {loading ? (
          <div className="text-center py-8">Cargando datos...</div>
        ) : (
          <>
            {/* Estadísticas */}
            {activeTab === 'stats' && (
              <div className="space-y-6">
                {/* Resumen general */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card>
                    <CardContent className="pt-6">
                      <div className="flex items-center gap-3">
                        <Clock className="w-8 h-8 text-blue-500" />
                        <div>
                          <p className="text-2xl font-bold">{formatDuration(totalTime)}</p>
                          <p className="text-sm text-gray-600">Tiempo total de riego</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="pt-6">
                      <div className="flex items-center gap-3">
                        <Droplets className="w-8 h-8 text-green-500" />
                        <div>
                          <p className="text-2xl font-bold">{totalActivations}</p>
                          <p className="text-sm text-gray-600">Activaciones totales</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="pt-6">
                      <div className="flex items-center gap-3">
                        <TrendingUp className="w-8 h-8 text-orange-500" />
                        <div>
                          <p className="text-lg font-bold">{mostActiveZone.name}</p>
                          <p className="text-sm text-gray-600">Zona más activa</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Estadísticas por zona */}
                <div>
                  <h3 className="text-lg font-semibold mb-4">Estadísticas por Zona</h3>
                  <div className="space-y-3">
                    {stats.map((stat) => (
                      <Card key={stat.id}>
                        <CardContent className="pt-4">
                          <div className="flex items-center justify-between">
                            <div>
                              <h4 className="font-medium">{stat.name}</h4>
                              <p className="text-sm text-gray-600">
                                Última actualización: {formatDate(stat.last_update)}
                              </p>
                            </div>
                            <div className="flex items-center gap-6 text-right">
                              <div>
                                <p className="text-lg font-semibold">
                                  {formatDuration(stat.total_time)}
                                </p>
                                <p className="text-xs text-gray-600">Tiempo total</p>
                              </div>
                              <div>
                                <p className="text-lg font-semibold">
                                  {stat.times_activated}
                                </p>
                                <p className="text-xs text-gray-600">Activaciones</p>
                              </div>
                              <div>
                                <p className="text-lg font-semibold">
                                  {stat.times_activated > 0 
                                    ? Math.round(stat.total_time / stat.times_activated)
                                    : 0
                                  } min
                                </p>
                                <p className="text-xs text-gray-600">Promedio</p>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Logs */}
            {activeTab === 'logs' && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Historial de Riego (Últimos 20)</h3>
                
                {logs.length === 0 ? (
                  <div className="text-center py-8 text-gray-500">
                    No hay logs de riego disponibles
                  </div>
                ) : (
                  <div className="space-y-3">
                    {logs.map((log) => (
                      <Card key={log.id}>
                        <CardContent className="pt-4">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <Badge 
                                className={`${getTypeColor(log.type)} text-white`}
                              >
                                {getTypeLabel(log.type)}
                              </Badge>
                              <div>
                                <h4 className="font-medium">{log.zone_name}</h4>
                                <p className="text-sm text-gray-600">
                                  Iniciado por: {log.triggered_by}
                                </p>
                              </div>
                            </div>
                            
                            <div className="text-right">
                              <div className="flex items-center gap-4">
                                <div>
                                  <p className="text-sm font-medium">
                                    {formatDate(log.start_time)}
                                  </p>
                                  {log.end_time && (
                                    <p className="text-xs text-gray-600">
                                      Hasta: {formatDate(log.end_time)}
                                    </p>
                                  )}
                                </div>
                                
                                <div className="text-right">
                                  <Badge variant="outline">
                                    {log.duration} min
                                  </Badge>
                                  {!log.end_time && (
                                    <p className="text-xs text-orange-600 mt-1">
                                      En progreso
                                    </p>
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </div>
            )}
          </>
        )}

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cerrar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};