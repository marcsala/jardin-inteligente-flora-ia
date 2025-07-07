import { PlantWithRiego } from '@/types/riego';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Droplets, Calendar, MapPin, MoreVertical, Clock, AlertTriangle } from 'lucide-react';

interface PlantWateringCardProps {
  plant: PlantWithRiego;
  onRegar: (plantId: string, cantidad: 'poca' | 'moderada' | 'abundante') => void;
  onEditSchedule: (plant: PlantWithRiego) => void;
  onViewHistory: (plant: PlantWithRiego) => void;
}

const cantidadColors = {
  poca: 'bg-earth-light text-earth',
  moderada: 'bg-accent/20 text-accent',
  abundante: 'bg-primary/20 text-primary'
};

const cantidadLabels = {
  poca: 'Poca',
  moderada: 'Moderada',
  abundante: 'Abundante'
};

export function PlantWateringCard({ plant, onRegar, onEditSchedule, onViewHistory }: PlantWateringCardProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('es-ES', {
      day: '2-digit',
      month: '2-digit'
    });
  };

  const getUrgencyColor = () => {
    if (!plant.schedule) return 'text-muted-foreground';
    if (plant.necesitaRiego && plant.diasSinRiego > plant.schedule.frecuenciaDias + 1) {
      return 'text-destructive';
    }
    if (plant.necesitaRiego) {
      return 'text-floral-yellow';
    }
    return 'text-accent';
  };

  return (
    <Card className={`hover:shadow-nature transition-all duration-200 ${plant.necesitaRiego ? 'border-floral-yellow/50 bg-floral-yellow/5' : ''}`}>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            {plant.foto && (
              <img 
                src={plant.foto} 
                alt={plant.nombre}
                className="w-12 h-12 rounded-lg object-cover"
              />
            )}
            <div>
              <h4 className="font-medium">{plant.nombre}</h4>
              <p className="text-sm text-muted-foreground">{plant.variedad}</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            {plant.necesitaRiego && (
              <AlertTriangle className="h-4 w-4 text-floral-yellow" />
            )}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                  <MoreVertical className="h-3 w-3" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => onEditSchedule(plant)}>
                  Editar programación
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => onViewHistory(plant)}>
                  Ver historial
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {plant.schedule ? (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Badge className={cantidadColors[plant.schedule.cantidad]}>
                {cantidadLabels[plant.schedule.cantidad]}
              </Badge>
              <span className="text-sm text-muted-foreground">
                Cada {plant.schedule.frecuenciaDias} días
              </span>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <span className="text-muted-foreground">Último riego:</span>
                <span className={getUrgencyColor()}>
                  hace {plant.diasSinRiego} día{plant.diasSinRiego !== 1 ? 's' : ''}
                </span>
              </div>

              <div className="flex items-center gap-2 text-sm">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span className="text-muted-foreground">Próximo riego:</span>
                <span>{formatDate(plant.proximoRiego)}</span>
              </div>

              {plant.bancalId && (
                <div className="flex items-center gap-2 text-sm">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground">{plant.bancalId}</span>
                </div>
              )}
            </div>

            {plant.schedule.notas && (
              <p className="text-xs text-muted-foreground bg-muted/50 p-2 rounded">
                {plant.schedule.notas}
              </p>
            )}

            <div className="flex gap-2 pt-2 border-t">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button 
                    size="sm" 
                    className={`flex-1 ${plant.necesitaRiego ? 'bg-gradient-primary shadow-nature' : ''}`}
                  >
                    <Droplets className="h-4 w-4 mr-2" />
                    Regar
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem onClick={() => onRegar(plant.id, 'poca')}>
                    <Droplets className="h-4 w-4 mr-2 text-earth" />
                    Poca cantidad
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => onRegar(plant.id, 'moderada')}>
                    <Droplets className="h-4 w-4 mr-2 text-accent" />
                    Moderada
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => onRegar(plant.id, 'abundante')}>
                    <Droplets className="h-4 w-4 mr-2 text-primary" />
                    Abundante
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        ) : (
          <div className="text-center py-4 space-y-2">
            <p className="text-sm text-muted-foreground">Sin programación de riego</p>
            <Button size="sm" variant="outline" onClick={() => onEditSchedule(plant)}>
              Configurar riego
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}