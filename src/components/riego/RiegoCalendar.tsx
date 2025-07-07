import { useState } from 'react';
import { PlantWithRiego } from '@/types/riego';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar, ChevronLeft, ChevronRight, Droplets } from 'lucide-react';

interface RiegoCalendarProps {
  plants: PlantWithRiego[];
  onSelectDate: (date: Date) => void;
  selectedDate?: Date;
}

export function RiegoCalendar({ plants, onSelectDate, selectedDate = new Date() }: RiegoCalendarProps) {
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const getPlantsForDate = (date: Date) => {
    const dateStr = date.toISOString().split('T')[0];
    return plants.filter(plant => 
      plant.proximoRiego && plant.proximoRiego.split('T')[0] === dateStr
    );
  };

  const isToday = (date: Date) => {
    const today = new Date();
    return date.toDateString() === today.toDateString();
  };

  const isSelected = (date: Date) => {
    return selectedDate && date.toDateString() === selectedDate.toDateString();
  };

  const navigateMonth = (direction: 'prev' | 'next') => {
    setCurrentMonth(prev => {
      const newDate = new Date(prev);
      if (direction === 'prev') {
        newDate.setMonth(prev.getMonth() - 1);
      } else {
        newDate.setMonth(prev.getMonth() + 1);
      }
      return newDate;
    });
  };

  const daysInMonth = getDaysInMonth(currentMonth);
  const firstDayOfMonth = getFirstDayOfMonth(currentMonth);
  const monthName = currentMonth.toLocaleDateString('es-ES', { month: 'long', year: 'numeric' });

  const days = [];
  
  // Días vacíos al inicio
  for (let i = 0; i < firstDayOfMonth; i++) {
    days.push(null);
  }
  
  // Días del mes
  for (let day = 1; day <= daysInMonth; day++) {
    days.push(day);
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Calendario de Riego
          </CardTitle>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigateMonth('prev')}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <span className="text-sm font-medium min-w-32 text-center capitalize">
              {monthName}
            </span>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigateMonth('next')}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>

      <CardContent>
        <div className="space-y-4">
          {/* Días de la semana */}
          <div className="grid grid-cols-7 gap-1">
            {['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'].map(day => (
              <div key={day} className="text-center text-sm font-medium text-muted-foreground p-2">
                {day}
              </div>
            ))}
          </div>

          {/* Calendario */}
          <div className="grid grid-cols-7 gap-1">
            {days.map((day, index) => {
              if (!day) {
                return <div key={index} className="p-2" />;
              }

              const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
              const plantsForDate = getPlantsForDate(date);
              const todayClass = isToday(date) ? 'bg-primary text-primary-foreground' : '';
              const selectedClass = isSelected(date) ? 'ring-2 ring-primary ring-offset-2' : '';
              const hasPlants = plantsForDate.length > 0;

              return (
                <div
                  key={day}
                  className={`
                    relative p-2 text-center cursor-pointer rounded-lg transition-all duration-200
                    hover:bg-muted/50 ${todayClass} ${selectedClass}
                    ${hasPlants ? 'bg-accent/10 border border-accent/20' : ''}
                  `}
                  onClick={() => onSelectDate(date)}
                >
                  <span className="text-sm">{day}</span>
                  {hasPlants && (
                    <div className="absolute -top-1 -right-1">
                      <Badge 
                        className="h-5 w-5 p-0 flex items-center justify-center text-xs bg-accent text-accent-foreground"
                      >
                        {plantsForDate.length}
                      </Badge>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Plantas para el día seleccionado */}
          {selectedDate && (
            <div className="space-y-2 pt-4 border-t">
              <h4 className="font-medium text-sm">
                Plantas para el {selectedDate.toLocaleDateString('es-ES')}
              </h4>
              {getPlantsForDate(selectedDate).length > 0 ? (
                <div className="space-y-2">
                  {getPlantsForDate(selectedDate).map(plant => (
                    <div key={plant.id} className="flex items-center gap-2 p-2 bg-muted/30 rounded">
                      <Droplets className="h-4 w-4 text-accent" />
                      <span className="text-sm">{plant.nombre}</span>
                      {plant.schedule && (
                        <Badge variant="outline" className="ml-auto">
                          {plant.schedule.cantidad}
                        </Badge>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-muted-foreground">No hay riegos programados</p>
              )}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}