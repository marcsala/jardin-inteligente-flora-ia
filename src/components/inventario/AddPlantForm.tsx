import { useState } from 'react';
import { PlantFormData, PlantStatus } from '@/types/inventory';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface AddPlantFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: PlantFormData) => void;
  initialStatus?: PlantStatus;
}

const bancales = [
  { id: 'bancal-1', name: 'Bancal Norte' },
  { id: 'bancal-2', name: 'Bancal Sur' },
  { id: 'bancal-3', name: 'Bancal Este' },
  { id: 'bancal-4', name: 'Bancal Oeste' },
];

export function AddPlantForm({ open, onOpenChange, onSubmit, initialStatus }: AddPlantFormProps) {
  const [formData, setFormData] = useState<PlantFormData>({
    nombre: '',
    variedad: '',
    foto: '',
    bancalId: '',
    fechaSiembra: '',
    notas: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.nombre.trim() || !formData.variedad.trim()) return;

    onSubmit(formData);
    
    // Reset form
    setFormData({
      nombre: '',
      variedad: '',
      foto: '',
      bancalId: '',
      fechaSiembra: '',
      notas: ''
    });
    
    onOpenChange(false);
  };

  const handleChange = (field: keyof PlantFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Añadir Nueva Planta</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="nombre">Nombre de la planta *</Label>
            <Input
              id="nombre"
              value={formData.nombre}
              onChange={(e) => handleChange('nombre', e.target.value)}
              placeholder="ej. Rosa Roja"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="variedad">Variedad *</Label>
            <Input
              id="variedad"
              value={formData.variedad}
              onChange={(e) => handleChange('variedad', e.target.value)}
              placeholder="ej. Rosa gallica"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="foto">URL de la foto</Label>
            <Input
              id="foto"
              type="url"
              value={formData.foto}
              onChange={(e) => handleChange('foto', e.target.value)}
              placeholder="https://ejemplo.com/imagen.jpg"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="bancal">Bancal</Label>
            <Select value={formData.bancalId} onValueChange={(value) => handleChange('bancalId', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Selecciona un bancal" />
              </SelectTrigger>
              <SelectContent>
                {bancales.map(bancal => (
                  <SelectItem key={bancal.id} value={bancal.id}>
                    {bancal.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="fecha">Fecha de siembra</Label>
            <Input
              id="fecha"
              type="date"
              value={formData.fechaSiembra}
              onChange={(e) => handleChange('fechaSiembra', e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="notas">Notas</Label>
            <Textarea
              id="notas"
              value={formData.notas}
              onChange={(e) => handleChange('notas', e.target.value)}
              placeholder="Observaciones, cuidados especiales..."
              rows={3}
            />
          </div>

          <div className="flex gap-2 pt-4">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)} className="flex-1">
              Cancelar
            </Button>
            <Button 
              type="submit" 
              className="flex-1"
              disabled={!formData.nombre.trim() || !formData.variedad.trim()}
            >
              Añadir Planta
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}