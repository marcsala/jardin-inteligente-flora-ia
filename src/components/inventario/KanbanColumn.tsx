import { Plant, PlantStatus } from '@/types/inventory';
import { PlantCard } from './PlantCard';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { useDroppable } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';

interface KanbanColumnProps {
  title: string;
  status: PlantStatus;
  plants: Plant[];
  onAddPlant: (status: PlantStatus) => void;
  onEditPlant: (plant: Plant) => void;
  onDeletePlant: (plantId: string) => void;
  onViewPlant: (plant: Plant) => void;
  icon: React.ReactNode;
  color: string;
}

export function KanbanColumn({
  title,
  status,
  plants,
  onAddPlant,
  onEditPlant,
  onDeletePlant,
  onViewPlant,
  icon,
  color
}: KanbanColumnProps) {
  const { setNodeRef } = useDroppable({
    id: status,
  });

  return (
    <Card className="flex-1 min-w-72">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-base">
            <span className={color}>{icon}</span>
            {title}
            <span className="text-sm text-muted-foreground">({plants.length})</span>
          </CardTitle>
          <Button 
            size="sm" 
            variant="ghost"
            onClick={() => onAddPlant(status)}
            className="h-6 w-6 p-0"
          >
            <Plus className="h-3 w-3" />
          </Button>
        </div>
      </CardHeader>

      <CardContent ref={setNodeRef} className="min-h-96 max-h-96 overflow-y-auto">
        <SortableContext items={plants.map(p => p.id)} strategy={verticalListSortingStrategy}>
          {plants.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-32 text-muted-foreground text-sm">
              <div className="mb-2 opacity-50">{icon}</div>
              <p>No hay plantas aquí</p>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => onAddPlant(status)}
                className="mt-2 text-xs"
              >
                <Plus className="h-3 w-3 mr-1" />
                Añadir
              </Button>
            </div>
          ) : (
            plants.map(plant => (
              <PlantCard
                key={plant.id}
                plant={plant}
                onEdit={onEditPlant}
                onDelete={onDeletePlant}
                onView={onViewPlant}
              />
            ))
          )}
        </SortableContext>
      </CardContent>
    </Card>
  );
}