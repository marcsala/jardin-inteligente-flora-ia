import { useState } from 'react';
import { PlantWithRiego, RiegoFormData } from '@/types/riego';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Droplets, Settings } from 'lucide-react';
import { useInventory } from '@/hooks/useInventory';

interface WateringScheduleFormProps {
  plant?: PlantWithRiego;
  onSave: (data: RiegoFormData) => void;
  onClose: () => void;
  open: boolean;
}

export function WateringScheduleForm({ plant, onSave, onClose, open }: WateringScheduleFormProps) {
  const { plants } = useInventory();
  const [formData, setFormData] = useState<RiegoFormData>({
    plantId: plant?.id || '',
    frecuenciaDias: plant?.schedule?.frecuenciaDias || 3,
    cantidad: plant?.schedule?.cantidad || 'moderada',
    notas: plant?.schedule?.notas || ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  const selectedPlant = plants.find(p => p.id === formData.plantId);

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5" />
            {plant ? 'Editar Programación' : 'Nueva Programación de Riego'}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          {!plant && (
            <div className="space-y-2">
              <Label htmlFor="plantId">Planta</Label>
              <Select
                value={formData.plantId}
                onValueChange={(value) => setFormData(prev => ({ ...prev, plantId: value }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Seleccionar planta" />
                </SelectTrigger>
                <SelectContent>
                  {plants.map(plant => (
                    <SelectItem key={plant.id} value={plant.id}>
                      <div className="flex items-center gap-2">
                        {plant.foto && (
                          <img 
                            src={plant.foto} 
                            alt={plant.nombre}
                            className="w-6 h-6 rounded object-cover"
                          />
                        )}
                        <span>{plant.nombre}</span>
                        <Badge variant="outline" className="ml-auto">
                          {plant.variedad}
                        </Badge>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}

          {(plant || selectedPlant) && (
            <div className="flex items-center gap-3 p-3 bg-muted/30 rounded-lg">
              {(plant?.foto || selectedPlant?.foto) && (
                <img 
                  src={plant?.foto || selectedPlant?.foto} 
                  alt={plant?.nombre || selectedPlant?.nombre}
                  className="w-12 h-12 rounded-lg object-cover"
                />
              )}
              <div>
                <h4 className="font-medium">{plant?.nombre || selectedPlant?.nombre}</h4>
                <p className="text-sm text-muted-foreground">
                  {plant?.variedad || selectedPlant?.variedad}
                </p>
              </div>
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="frecuencia">Frecuencia de riego (días)</Label>
            <Input
              id="frecuencia"
              type="number"
              min="1"
              max="30"
              value={formData.frecuenciaDias}
              onChange={(e) => setFormData(prev => ({ 
                ...prev, 
                frecuenciaDias: parseInt(e.target.value) || 1 
              }))}
              required
            />
            <p className="text-xs text-muted-foreground">
              Cada cuántos días necesita riego esta planta
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="cantidad">Cantidad de agua</Label>
            <Select
              value={formData.cantidad}
              onValueChange={(value: 'poca' | 'moderada' | 'abundante') => 
                setFormData(prev => ({ ...prev, cantidad: value }))
              }
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="poca">
                  <div className="flex items-center gap-2">
                    <Droplets className="h-4 w-4 text-earth" />
                    <span>Poca cantidad</span>
                  </div>
                </SelectItem>
                <SelectItem value="moderada">
                  <div className="flex items-center gap-2">
                    <Droplets className="h-4 w-4 text-accent" />
                    <span>Moderada</span>
                  </div>
                </SelectItem>
                <SelectItem value="abundante">
                  <div className="flex items-center gap-2">
                    <Droplets className="h-4 w-4 text-primary" />
                    <span>Abundante</span>
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="notas">Notas (opcional)</Label>
            <Textarea
              id="notas"
              placeholder="Instrucciones especiales, horarios preferidos, etc."
              value={formData.notas}
              onChange={(e) => setFormData(prev => ({ ...prev, notas: e.target.value }))}
              rows={3}
            />
          </div>

          <div className="flex gap-2 pt-4">
            <Button type="button" variant="outline" onClick={onClose} className="flex-1">
              Cancelar
            </Button>
            <Button type="submit" className="flex-1 bg-gradient-primary shadow-nature">
              {plant ? 'Actualizar' : 'Crear'} Programación
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}