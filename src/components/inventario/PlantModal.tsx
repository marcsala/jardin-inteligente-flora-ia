import { Plant } from '@/types/inventory';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Calendar, MapPin, Clock, FileText } from 'lucide-react';

interface PlantModalProps {
  plant: Plant | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const statusLabels = {
  semillas: 'Semillas Almacenadas',
  siembra: 'En Siembra',
  crecimiento: 'En Crecimiento',
  floracion: 'En Floración'
};

const statusColors = {
  semillas: 'bg-earth text-earth-foreground',
  siembra: 'bg-lunar-crescent text-background',
  crecimiento: 'bg-accent text-accent-foreground',
  floracion: 'bg-floral-pink text-background'
};

export function PlantModal({ plant, open, onOpenChange }: PlantModalProps) {
  if (!plant) return null;

  const formatDate = (dateString?: string) => {
    if (!dateString) return 'No especificada';
    return new Date(dateString).toLocaleDateString('es-ES', {
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    });
  };

  const formatDateTime = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('es-ES', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-xl">{plant.nombre}</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {plant.foto && (
            <div className="w-full">
              <img 
                src={plant.foto} 
                alt={plant.nombre}
                className="w-full h-64 object-cover rounded-lg"
              />
            </div>
          )}

          <div className="grid grid-cols-2 gap-4">
            <div>
              <h3 className="font-medium text-sm text-muted-foreground mb-2">Información Básica</h3>
              <div className="space-y-2">
                <div>
                  <span className="text-sm font-medium">Variedad:</span>
                  <p className="text-sm text-muted-foreground">{plant.variedad}</p>
                </div>
                <div>
                  <span className="text-sm font-medium">Estado:</span>
                  <div className="mt-1">
                    <Badge className={`text-xs ${statusColors[plant.status]}`}>
                      {statusLabels[plant.status]}
                    </Badge>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-medium text-sm text-muted-foreground mb-2">Ubicación y Fechas</h3>
              <div className="space-y-2">
                {plant.bancalId && (
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">{plant.bancalId}</span>
                  </div>
                )}
                
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{formatDate(plant.fechaSiembra)}</span>
                </div>
              </div>
            </div>
          </div>

          <Separator />

          {plant.notas && (
            <div>
              <div className="flex items-center gap-2 mb-2">
                <FileText className="h-4 w-4 text-muted-foreground" />
                <h3 className="font-medium text-sm">Notas</h3>
              </div>
              <p className="text-sm text-muted-foreground whitespace-pre-wrap">
                {plant.notas}
              </p>
            </div>
          )}

          <Separator />

          <div className="flex items-center gap-4 text-xs text-muted-foreground">
            <div className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              <span>Creado: {formatDateTime(plant.createdAt)}</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              <span>Actualizado: {formatDateTime(plant.updatedAt)}</span>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}