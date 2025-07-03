import { useState } from 'react';
import { Plant, PlantStatus } from '@/types/inventory';
import { useInventory } from '@/hooks/useInventory';
import { KanbanColumn } from './KanbanColumn';
import { PlantModal } from './PlantModal';
import { AddPlantForm } from './AddPlantForm';
import { Skeleton } from '@/components/ui/skeleton';
import { Package, Sprout, TreePine, FlowerIcon } from 'lucide-react';
import { DndContext, DragEndEvent, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';

const columns = [
  {
    title: 'Semillas Almacenadas',
    status: 'semillas' as PlantStatus,
    icon: <Package className="h-4 w-4" />,
    color: 'text-earth'
  },
  {
    title: 'En Siembra',
    status: 'siembra' as PlantStatus,
    icon: <Sprout className="h-4 w-4" />,
    color: 'text-lunar-crescent'
  },
  {
    title: 'En Crecimiento',
    status: 'crecimiento' as PlantStatus,
    icon: <TreePine className="h-4 w-4" />,
    color: 'text-accent'
  },
  {
    title: 'En Floración',
    status: 'floracion' as PlantStatus,
    icon: <FlowerIcon className="h-4 w-4" />,
    color: 'text-floral-pink'
  }
];

export function InventoryKanban() {
  const { 
    plants, 
    loading, 
    addPlant, 
    updatePlantStatus, 
    deletePlant, 
    getPlantsByStatus 
  } = useInventory();

  const [selectedPlant, setSelectedPlant] = useState<Plant | null>(null);
  const [showPlantModal, setShowPlantModal] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);
  const [addFormInitialStatus, setAddFormInitialStatus] = useState<PlantStatus>('semillas');

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const plantId = active.id as string;
      const newStatus = over.id as PlantStatus;
      updatePlantStatus(plantId, newStatus);
    }
  };

  const handleAddPlant = (status: PlantStatus) => {
    setAddFormInitialStatus(status);
    setShowAddForm(true);
  };

  const handleViewPlant = (plant: Plant) => {
    setSelectedPlant(plant);
    setShowPlantModal(true);
  };

  const handleEditPlant = (plant: Plant) => {
    // TODO: Implement edit functionality
    console.log('Edit plant:', plant);
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="text-center">
          <h2 className="text-2xl font-serif font-semibold mb-2">Inventario Floral</h2>
          <p className="text-muted-foreground">Gestión visual tipo Kanban</p>
        </div>
        
        <div className="flex gap-4 overflow-x-auto pb-4">
          {[1, 2, 3, 4].map(i => (
            <div key={i} className="flex-1 min-w-72">
              <Skeleton className="h-96 w-full" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-serif font-semibold mb-2">Inventario Floral</h2>
        <p className="text-muted-foreground">Gestión visual tipo Kanban - Arrastra las plantas entre estados</p>
      </div>

      <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
        <div className="flex gap-4 overflow-x-auto pb-4">
          {columns.map(column => (
            <KanbanColumn
              key={column.status}
              title={column.title}
              status={column.status}
              plants={getPlantsByStatus(column.status)}
              onAddPlant={handleAddPlant}
              onEditPlant={handleEditPlant}
              onDeletePlant={deletePlant}
              onViewPlant={handleViewPlant}
              icon={column.icon}
              color={column.color}
            />
          ))}
        </div>
      </DndContext>

      <PlantModal
        plant={selectedPlant}
        open={showPlantModal}
        onOpenChange={setShowPlantModal}
      />

      <AddPlantForm
        open={showAddForm}
        onOpenChange={setShowAddForm}
        onSubmit={addPlant}
        initialStatus={addFormInitialStatus}
      />
    </div>
  );
}