import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogFooter 
} from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Trash2, Plus, Clock } from 'lucide-react';
import { Schedule, useIrrigationAPI } from './useIrrigationAPI';

interface ScheduleModalProps {
  isOpen: boolean;
  onClose: () => void;
  zoneId: number;
  zoneName: string;
}

export const ScheduleModal: React.FC<ScheduleModalProps> = ({
  isOpen,
  onClose,
  zoneId,
  zoneName
}) => {
  const { getSchedules, createSchedule, updateSchedule, deleteSchedule } = useIrrigationAPI();
  
  const [schedules, setSchedules] = useState<Schedule[]>([]);
  const [loading, setLoading] = useState(false);
  const [newSchedule, setNewSchedule] = useState<Omit<Schedule, 'id' | 'zone_id'>>({
    hour: 6,
    minute: 0,
    duration: 15,
    enabled: true,
    monday: false,
    tuesday: false,
    wednesday: false,
    thursday: false,
    friday: false,
    saturday: false,
    sunday: false,
  });

  // Cargar programaciones al abrir
  useEffect(() => {
    if (isOpen) {
      loadSchedules();
    }
  }, [isOpen, zoneId]);

  const loadSchedules = async () => {
    setLoading(true);
    const data = await getSchedules(zoneId);
    setSchedules(data);
    setLoading(false);
  };

  const handleCreateSchedule = async () => {
    const success = await createSchedule(zoneId, newSchedule);
    if (success) {
      loadSchedules();
      resetNewSchedule();
    }
  };

  const handleUpdateSchedule = async (scheduleId: number, updates: Partial<Schedule>) => {
    const success = await updateSchedule(scheduleId, updates);
    if (success) {
      loadSchedules();
    }
  };

  const handleDeleteSchedule = async (scheduleId: number) => {
    const success = await deleteSchedule(scheduleId);
    if (success) {
      loadSchedules();
    }
  };

  const resetNewSchedule = () => {
    setNewSchedule({
      hour: 6,
      minute: 0,
      duration: 15,
      enabled: true,
      monday: false,
      tuesday: false,
      wednesday: false,
      thursday: false,
      friday: false,
      saturday: false,
      sunday: false,
    });
  };

  const formatTime = (hour: number, minute: number) => {
    return `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
  };

  const getDaysText = (schedule: Schedule) => {
    const days = [];
    if (schedule.monday) days.push('L');
    if (schedule.tuesday) days.push('M');
    if (schedule.wednesday) days.push('X');
    if (schedule.thursday) days.push('J');
    if (schedule.friday) days.push('V');
    if (schedule.saturday) days.push('S');
    if (schedule.sunday) days.push('D');
    
    if (days.length === 7) return 'Todos los días';
    if (days.length === 0) return 'Ningún día';
    return days.join(', ');
  };

  const dayLabels = [
    { key: 'monday', label: 'Lunes' },
    { key: 'tuesday', label: 'Martes' },
    { key: 'wednesday', label: 'Miércoles' },
    { key: 'thursday', label: 'Jueves' },
    { key: 'friday', label: 'Viernes' },
    { key: 'saturday', label: 'Sábado' },
    { key: 'sunday', label: 'Domingo' },
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Clock className="w-5 h-5" />
            Programación de {zoneName}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Programaciones existentes */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Horarios Programados</h3>
            
            {loading ? (
              <div className="text-center py-4">Cargando...</div>
            ) : schedules.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                No hay horarios programados para esta zona
              </div>
            ) : (
              <div className="space-y-3">
                {schedules.map((schedule) => (
                  <Card key={schedule.id} className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="text-lg font-mono">
                          {formatTime(schedule.hour, schedule.minute)}
                        </div>
                        <Badge variant={schedule.enabled ? "default" : "secondary"}>
                          {schedule.duration} min
                        </Badge>
                        <div className="text-sm text-gray-600">
                          {getDaysText(schedule)}
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <Switch
                          checked={schedule.enabled}
                          onCheckedChange={(enabled) =>
                            handleUpdateSchedule(schedule.id!, { enabled })
                          }
                        />
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDeleteSchedule(schedule.id!)}
                          className="text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </div>

          {/* Crear nueva programación */}
          <div className="border-t pt-6">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Plus className="w-5 h-5" />
              Nuevo Horario
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              {/* Hora */}
              <div>
                <Label htmlFor="hour">Hora</Label>
                <div className="flex gap-2">
                  <Input
                    id="hour"
                    type="number"
                    min="0"
                    max="23"
                    value={newSchedule.hour}
                    onChange={(e) => setNewSchedule(prev => ({
                      ...prev,
                      hour: Number(e.target.value)
                    }))}
                    className="w-20"
                  />
                  <span className="self-center">:</span>
                  <Input
                    type="number"
                    min="0"
                    max="59"
                    value={newSchedule.minute}
                    onChange={(e) => setNewSchedule(prev => ({
                      ...prev,
                      minute: Number(e.target.value)
                    }))}
                    className="w-20"
                  />
                </div>
              </div>

              {/* Duración */}
              <div>
                <Label htmlFor="duration">Duración (minutos)</Label>
                <Input
                  id="duration"
                  type="number"
                  min="1"
                  max="120"
                  value={newSchedule.duration}
                  onChange={(e) => setNewSchedule(prev => ({
                    ...prev,
                    duration: Number(e.target.value)
                  }))}
                />
              </div>

              {/* Estado */}
              <div>
                <Label>Estado</Label>
                <div className="flex items-center gap-2 mt-2">
                  <Switch
                    checked={newSchedule.enabled}
                    onCheckedChange={(enabled) => setNewSchedule(prev => ({
                      ...prev,
                      enabled
                    }))}
                  />
                  <span className="text-sm">
                    {newSchedule.enabled ? 'Habilitado' : 'Deshabilitado'}
                  </span>
                </div>
              </div>
            </div>

            {/* Días de la semana */}
            <div className="mb-4">
              <Label className="mb-3 block">Días de la semana</Label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {dayLabels.map(({ key, label }) => (
                  <div key={key} className="flex items-center gap-2">
                    <Switch
                      checked={newSchedule[key as keyof typeof newSchedule] as boolean}
                      onCheckedChange={(checked) => setNewSchedule(prev => ({
                        ...prev,
                        [key]: checked
                      }))}
                    />
                    <span className="text-sm">{label}</span>
                  </div>
                ))}
              </div>
            </div>

            <Button onClick={handleCreateSchedule} className="w-full">
              <Plus className="w-4 h-4 mr-2" />
              Crear Horario
            </Button>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cerrar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};