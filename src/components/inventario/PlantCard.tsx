import { Plant } from '@/types/inventory';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MoreVertical, Calendar, MapPin, Eye } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

interface PlantCardProps {
  plant: Plant;
  onEdit: (plant: Plant) => void;
  onDelete: (plantId: string) => void;
  onView: (plant: Plant) => void;
}

const statusLabels = {
  semillas: 'Semillas',
  siembra: 'En Siembra',
  crecimiento: 'Creciendo',
  floracion: 'En Flor'
};

const statusColors = {
  semillas: 'bg-earth text-earth-foreground',
  siembra: 'bg-lunar-crescent text-background',
  crecimiento: 'bg-accent text-accent-foreground',
  floracion: 'bg-floral-pink text-background'
};

export function PlantCard({ plant, onEdit, onDelete, onView }: PlantCardProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging
  } = useSortable({ id: plant.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return '';
    return new Date(dateString).toLocaleDateString('es-ES', {
      day: '2-digit',
      month: '2-digit'
    });
  };

  return (
    <Card 
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="group cursor-grab active:cursor-grabbing hover:shadow-nature transition-all duration-200 mb-3"
    >
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <h4 className="font-medium text-sm">{plant.nombre}</h4>
            <p className="text-xs text-muted-foreground">{plant.variedad}</p>
          </div>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                <MoreVertical className="h-3 w-3" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => onView(plant)}>
                <Eye className="h-3 w-3 mr-2" />
                Ver detalles
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onEdit(plant)}>
                Editar
              </DropdownMenuItem>
              <DropdownMenuItem 
                onClick={() => onDelete(plant.id)}
                className="text-destructive"
              >
                Eliminar
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>

      <CardContent className="pt-0">
        {plant.foto && (
          <div className="mb-2">
            <img 
              src={plant.foto} 
              alt={plant.nombre}
              className="w-full h-20 object-cover rounded-md"
            />
          </div>
        )}

        <div className="space-y-1">
          <Badge className={`text-xs ${statusColors[plant.status]}`}>
            {statusLabels[plant.status]}
          </Badge>

          {plant.fechaSiembra && (
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <Calendar className="h-3 w-3" />
              {formatDate(plant.fechaSiembra)}
            </div>
          )}

          {plant.bancalId && (
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <MapPin className="h-3 w-3" />
              {plant.bancalId}
            </div>
          )}

          {plant.notas && (
            <p className="text-xs text-muted-foreground line-clamp-2 mt-1">
              {plant.notas}
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}