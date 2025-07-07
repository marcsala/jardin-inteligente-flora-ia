import { useState } from 'react';
import { PlantWithRiego } from '@/types/riego';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Droplets, 
  Plus,
  Calendar,
  AlertTriangle,
  Settings
} from "lucide-react";
import { useRiego } from '@/hooks/useRiego';
import { useToast } from '@/hooks/use-toast';
import { PlantWateringCard } from './PlantWateringCard';
import { RiegoCalendar } from './RiegoCalendar';
import { RiegoHistory } from './RiegoHistory';
import { WateringScheduleForm } from './WateringScheduleForm';

export function RiegoPanel() {
  const { 
    getPlantsWithRiego, 
    getPlantsPendientesRiego, 
    getPlantsRiegoHoy,
    registrarRiego,
    crearSchedule,
    getRegistrosByPlant,
    loading 
  } = useRiego();
  
  const { toast } = useToast();
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [scheduleFormOpen, setScheduleFormOpen] = useState(false);
  const [historyOpen, setHistoryOpen] = useState(false);
  const [selectedPlant, setSelectedPlant] = useState<PlantWithRiego>();

  const allPlants = getPlantsWithRiego();
  const plantsPendientes = getPlantsPendientesRiego();
  const plantsHoy = getPlantsRiegoHoy();

  const handleRegar = (plantId: string, cantidad: 'poca' | 'moderada' | 'abundante') => {
    registrarRiego(plantId, cantidad, 'Riego registrado desde el panel');
    const plant = allPlants.find(p => p.id === plantId);
    toast({
      title: "Riego registrado",
      description: `${plant?.nombre} ha sido regada con cantidad ${cantidad}`,
    });
  };

  const handleEditSchedule = (plant: PlantWithRiego) => {
    setSelectedPlant(plant);
    setScheduleFormOpen(true);
  };

  const handleViewHistory = (plant: PlantWithRiego) => {
    setSelectedPlant(plant);
    setHistoryOpen(true);
  };

  const handleSaveSchedule = (data: any) => {
    crearSchedule(data);
    toast({
      title: "Programación guardada",
      description: "La programación de riego ha sido configurada",
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center space-y-2">
          <Droplets className="h-8 w-8 animate-pulse text-accent mx-auto" />
          <p className="text-muted-foreground">Cargando sistema de riego...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-serif font-semibold">Panel de Riego</h2>
        <Button 
          className="bg-gradient-primary shadow-nature"
          onClick={() => {
            setSelectedPlant(undefined);
            setScheduleFormOpen(true);
          }}
        >
          <Plus className="h-4 w-4 mr-2" />
          Nueva Programación
        </Button>
      </div>

      {/* Resumen general */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-gradient-to-r from-accent/5 to-primary/5 border-accent/20">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center">
                <Droplets className="h-5 w-5 text-accent" />
              </div>
              <div>
                <div className="text-2xl font-bold text-accent">{allPlants.length}</div>
                <div className="text-sm text-muted-foreground">Plantas con riego</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-floral-yellow/5 to-floral-yellow/10 border-floral-yellow/20">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-floral-yellow/20 flex items-center justify-center">
                <AlertTriangle className="h-5 w-5 text-floral-yellow" />
              </div>
              <div>
                <div className="text-2xl font-bold text-floral-yellow">{plantsPendientes.length}</div>
                <div className="text-sm text-muted-foreground">Necesitan riego</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-primary/5 to-primary-glow/10 border-primary/20">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                <Calendar className="h-5 w-5 text-primary" />
              </div>
              <div>
                <div className="text-2xl font-bold text-primary">{plantsHoy.length}</div>
                <div className="text-sm text-muted-foreground">Para hoy</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Contenido principal */}
      <Tabs defaultValue="pendientes" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="pendientes" className="flex items-center gap-2">
            <AlertTriangle className="h-4 w-4" />
            Pendientes ({plantsPendientes.length})
          </TabsTrigger>
          <TabsTrigger value="calendario" className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            Calendario
          </TabsTrigger>
          <TabsTrigger value="todas" className="flex items-center gap-2">
            <Droplets className="h-4 w-4" />
            Todas ({allPlants.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="pendientes" className="space-y-4">
          {plantsPendientes.length > 0 ? (
            <>
              <div className="flex items-center gap-2 mb-4">
                <AlertTriangle className="h-5 w-5 text-floral-yellow" />
                <h3 className="font-medium">Plantas que necesitan riego</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {plantsPendientes.map(plant => (
                  <PlantWateringCard
                    key={plant.id}
                    plant={plant}
                    onRegar={handleRegar}
                    onEditSchedule={handleEditSchedule}
                    onViewHistory={handleViewHistory}
                  />
                ))}
              </div>
            </>
          ) : (
            <Card>
              <CardContent className="py-12 text-center">
                <Droplets className="h-12 w-12 text-muted-foreground/50 mx-auto mb-4" />
                <p className="text-muted-foreground mb-2">¡Todas las plantas están al día!</p>
                <p className="text-sm text-muted-foreground">No hay plantas que necesiten riego por el momento</p>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="calendario" className="space-y-4">
          <RiegoCalendar
            plants={allPlants}
            onSelectDate={setSelectedDate}
            selectedDate={selectedDate}
          />
        </TabsContent>

        <TabsContent value="todas" className="space-y-4">
          {allPlants.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {allPlants.map(plant => (
                <PlantWateringCard
                  key={plant.id}
                  plant={plant}
                  onRegar={handleRegar}
                  onEditSchedule={handleEditSchedule}
                  onViewHistory={handleViewHistory}
                />
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="py-12 text-center">
                <Settings className="h-12 w-12 text-muted-foreground/50 mx-auto mb-4" />
                <p className="text-muted-foreground mb-2">No hay plantas configuradas</p>
                <p className="text-sm text-muted-foreground mb-4">
                  Configura programaciones de riego para tus plantas del inventario
                </p>
                <Button 
                  onClick={() => {
                    setSelectedPlant(undefined);
                    setScheduleFormOpen(true);
                  }}
                  className="bg-gradient-primary shadow-nature"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Crear Primera Programación
                </Button>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>

      {/* Modales */}
      <WateringScheduleForm
        plant={selectedPlant}
        open={scheduleFormOpen}
        onClose={() => {
          setScheduleFormOpen(false);
          setSelectedPlant(undefined);
        }}
        onSave={handleSaveSchedule}
      />

      <RiegoHistory
        plant={selectedPlant}
        registros={selectedPlant ? getRegistrosByPlant(selectedPlant.id) : []}
        open={historyOpen}
        onClose={() => {
          setHistoryOpen(false);
          setSelectedPlant(undefined);
        }}
      />
    </div>
  );
}