import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  Play, 
  Square, 
  Droplets, 
  Clock, 
  Calendar,
  Settings 
} from 'lucide-react';
import { Zone } from './useIrrigationAPI';

interface ZoneCardProps {
  zone: Zone;
  onStart: (zoneId: number, duration: number) => void;
  onStop: (zoneId: number) => void;
  onEdit: (zoneId: number) => void;
  onSchedule: (zoneId: number) => void;
  loading: boolean;
}

export const ZoneCard: React.FC<ZoneCardProps> = ({
  zone,
  onStart,
  onStop,
  onEdit,
  onSchedule,
  loading
}) => {
  const [duration, setDuration] = useState(10);

  const handleStart = () => {
    onStart(zone.id, duration);
  };

  const handleStop = () => {
    onStop(zone.id);
  };

  const formatLastActivation = (dateString: string | null) => {
    if (!dateString) return 'Nunca';
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', {
      day: '2-digit',
      month: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <Card className={`transition-all duration-300 ${
      zone.active 
        ? 'border-blue-500 bg-blue-50 shadow-lg' 
        : 'border-gray-200 hover:shadow-md'
    }`}>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold">
            {zone.name}
          </CardTitle>
          <div className="flex items-center gap-2">
            {zone.active && (
              <Badge variant="default" className="bg-blue-500">
                <Droplets className="w-3 h-3 mr-1" />
                Activa
              </Badge>
            )}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onEdit(zone.id)}
              className="p-1"
            >
              <Settings className="w-4 h-4" />
            </Button>
          </div>
        </div>
        {zone.description && (
          <p className="text-sm text-gray-600 mt-1">
            {zone.description}
          </p>
        )}
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Estado actual */}
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-600">Estado:</span>
          <span className={`font-medium ${
            zone.active ? 'text-blue-600' : 'text-gray-500'
          }`}>
            {zone.active ? `Regando (${zone.duration} min)` : 'Inactiva'}
          </span>
        </div>

        {/* Última activación */}
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-600">Último riego:</span>
          <div className="flex items-center gap-1">
            <Clock className="w-3 h-3" />
            <span className="font-medium">
              {formatLastActivation(zone.last_activation)}
            </span>
          </div>
        </div>

        {/* Control manual */}
        <div className="border-t pt-4">
          <div className="flex items-center gap-2 mb-3">
            <label className="text-sm font-medium text-gray-700">
              Control Manual:
            </label>
          </div>
          
          {!zone.active ? (
            <div className="flex items-center gap-2">
              <Input
                type="number"
                value={duration}
                onChange={(e) => setDuration(Number(e.target.value))}
                min="1"
                max="120"
                className="w-20 text-center"
              />
              <span className="text-sm text-gray-600">min</span>
              <Button
                onClick={handleStart}
                disabled={loading}
                size="sm"
                className="flex-1"
              >
                <Play className="w-4 h-4 mr-1" />
                Iniciar
              </Button>
            </div>
          ) : (
            <Button
              onClick={handleStop}
              disabled={loading}
              variant="destructive"
              size="sm"
              className="w-full"
            >
              <Square className="w-4 h-4 mr-1" />
              Detener
            </Button>
          )}
        </div>

        {/* Botón de programación */}
        <Button
          onClick={() => onSchedule(zone.id)}
          variant="outline"
          size="sm"
          className="w-full"
        >
          <Calendar className="w-4 h-4 mr-1" />
          Programar Horarios
        </Button>
      </CardContent>
    </Card>
  );
};