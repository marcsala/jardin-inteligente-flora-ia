import { PlantWithRiego, RiegoRegistro } from '@/types/riego';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Droplets, Calendar, FileText } from 'lucide-react';

interface RiegoHistoryProps {
  plant?: PlantWithRiego;
  registros: RiegoRegistro[];
  open: boolean;
  onClose: () => void;
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

export function RiegoHistory({ plant, registros, open, onClose }: RiegoHistoryProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('es-ES', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatDateShort = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('es-ES', {
      day: '2-digit',
      month: 'short'
    });
  };

  if (!plant) return null;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-2xl max-h-[80vh]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Historial de Riego - {plant.nombre}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {/* Info de la planta */}
          <div className="flex items-center gap-3 p-4 bg-muted/30 rounded-lg">
            {plant.foto && (
              <img 
                src={plant.foto} 
                alt={plant.nombre}
                className="w-16 h-16 rounded-lg object-cover"
              />
            )}
            <div className="flex-1">
              <h3 className="font-medium">{plant.nombre}</h3>
              <p className="text-sm text-muted-foreground">{plant.variedad}</p>
              {plant.schedule && (
                <div className="flex items-center gap-2 mt-1">
                  <Badge className={cantidadColors[plant.schedule.cantidad]}>
                    {cantidadLabels[plant.schedule.cantidad]}
                  </Badge>
                  <span className="text-xs text-muted-foreground">
                    cada {plant.schedule.frecuenciaDias} días
                  </span>
                </div>
              )}
            </div>
            <div className="text-right">
              <div className="text-sm text-muted-foreground">Total de riegos</div>
              <div className="text-2xl font-bold text-accent">{registros.length}</div>
            </div>
          </div>

          {/* Historial */}
          <div className="space-y-2">
            <h4 className="font-medium flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              Historial de Riegos
            </h4>
            
            <ScrollArea className="h-96">
              {registros.length > 0 ? (
                <div className="space-y-3 pr-4">
                  {registros.map((registro, index) => {
                    const isRecent = index < 3;
                    return (
                      <div 
                        key={registro.id} 
                        className={`flex items-start gap-3 p-3 rounded-lg transition-all duration-200 ${
                          isRecent ? 'bg-accent/5 border border-accent/20' : 'bg-muted/30'
                        }`}
                      >
                        <div className="flex-shrink-0 mt-1">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                            isRecent ? 'bg-accent/20' : 'bg-muted'
                          }`}>
                            <Droplets className={`h-4 w-4 ${
                              isRecent ? 'text-accent' : 'text-muted-foreground'
                            }`} />
                          </div>
                        </div>
                        
                        <div className="flex-1 space-y-1">
                          <div className="flex items-center justify-between">
                            <Badge className={cantidadColors[registro.cantidad]}>
                              {cantidadLabels[registro.cantidad]}
                            </Badge>
                            <span className="text-sm text-muted-foreground">
                              {formatDateShort(registro.fecha)}
                            </span>
                          </div>
                          
                          <div className="text-xs text-muted-foreground">
                            {formatDate(registro.fecha)}
                          </div>
                          
                          {registro.observaciones && (
                            <p className="text-sm text-foreground bg-background/50 p-2 rounded border-l-2 border-accent/20">
                              {registro.observaciones}
                            </p>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <Droplets className="h-12 w-12 text-muted-foreground/50 mb-4" />
                  <p className="text-muted-foreground">No hay registros de riego</p>
                  <p className="text-sm text-muted-foreground">
                    Los riegos aparecerán aquí una vez que comiences a registrarlos
                  </p>
                </div>
              )}
            </ScrollArea>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}