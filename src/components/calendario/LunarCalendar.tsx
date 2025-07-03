import { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useLunarData, getLunarPhaseForDate } from "@/hooks/useLunarData";
import { lunarRecommendations } from "@/data/lunarPhases2025";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { ChevronLeft, ChevronRight, Moon } from "lucide-react";

export function LunarCalendar() {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const lunarInfo = useLunarData();

  const getLunarPhaseForDateObj = (date: Date) => {
    const dateStr = format(date, 'yyyy-MM-dd');
    return getLunarPhaseForDate(dateStr);
  };

  const renderDay = (date: Date) => {
    const lunarPhase = getLunarPhaseForDateObj(date);
    const isToday = format(date, 'yyyy-MM-dd') === format(new Date(), 'yyyy-MM-dd');
    
    return (
      <div className="relative w-full h-full flex items-center justify-center">
        <span className={`text-sm ${isToday ? 'font-bold text-primary' : ''}`}>
          {format(date, 'd')}
        </span>
        {lunarPhase && (
          <div className={`absolute -top-1 -right-1 text-xs ${lunarRecommendations[lunarPhase.phase].colorClass}`}>
            {lunarRecommendations[lunarPhase.phase].emoji}
          </div>
        )}
      </div>
    );
  };

  const selectedDatePhase = getLunarPhaseForDateObj(selectedDate);

  return (
    <div className="space-y-6">
      {/* Estado lunar actual */}
      {lunarInfo && (
        <Card className="bg-gradient-nature text-white">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-3">
              <Moon className="h-6 w-6" />
              Estado Lunar Actual
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center">
                <div className="text-4xl mb-2">{lunarInfo.currentPhase.info.emoji}</div>
                <h3 className="font-semibold text-lg">{lunarInfo.currentPhase.info.title}</h3>
                <p className="text-sm opacity-90">{lunarInfo.currentPhase.info.description}</p>
              </div>
              
              <div className="text-center">
                <div className="text-2xl font-bold text-floral-yellow">{lunarInfo.currentMoonAge}</div>
                <p className="text-sm opacity-90">días de edad lunar</p>
              </div>
              
              <div className="text-center">
                <div className="text-2xl font-bold text-floral-yellow">{lunarInfo.daysUntilNext}</div>
                <p className="text-sm opacity-90">días hasta próxima fase</p>
                {lunarInfo.nextPhase && (
                  <p className="text-xs opacity-75 mt-1">
                    {lunarRecommendations[lunarInfo.nextPhase.phase].emoji} {lunarRecommendations[lunarInfo.nextPhase.phase].title}
                  </p>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Calendario */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Moon className="h-5 w-5 text-floral-yellow" />
              Calendario Lunar 2025
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={(date) => date && setSelectedDate(date)}
              locale={es}
              className="pointer-events-auto"
              components={{
                Day: ({ date }) => renderDay(date),
              }}
            />
          </CardContent>
        </Card>

        {/* Información del día seleccionado */}
        <Card>
          <CardHeader>
            <CardTitle>
              {format(selectedDate, "d 'de' MMMM, yyyy", { locale: es })}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {selectedDatePhase ? (
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-3xl">{lunarRecommendations[selectedDatePhase.phase].emoji}</span>
                  <div>
                    <h3 className="font-semibold text-lg">{lunarRecommendations[selectedDatePhase.phase].title}</h3>
                    <p className="text-sm text-muted-foreground">
                      {selectedDatePhase.time}
                    </p>
                  </div>
                </div>
                
                <p className="text-sm mb-4">{lunarRecommendations[selectedDatePhase.phase].description}</p>
                
                <div className="space-y-2">
                  <h4 className="font-medium">Actividades recomendadas:</h4>
                  <div className="space-y-1">
                    {lunarRecommendations[selectedDatePhase.phase].activities.map((activity, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-accent"></div>
                        <span className="text-sm">{activity}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-8">
                <Moon className="h-12 w-12 text-muted-foreground mx-auto mb-3" />
                <p className="text-muted-foreground">
                  No hay eventos lunares especiales en esta fecha
                </p>
                {lunarInfo && (
                  <p className="text-sm text-muted-foreground mt-2">
                    Fase actual: {lunarInfo.currentPhase.info.title}
                  </p>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Resumen de actividades por fase */}
      <Card>
        <CardHeader>
          <CardTitle>Guía de Actividades por Fase Lunar</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {Object.entries(lunarRecommendations).map(([phase, info]) => (
              <div key={phase} className="text-center p-4 rounded-lg bg-secondary/30">
                <div className="text-3xl mb-2">{info.emoji}</div>
                <h3 className="font-semibold mb-2">{info.title}</h3>
                <p className="text-xs text-muted-foreground mb-3">{info.description}</p>
                <div className="space-y-1">
                  {info.activities.slice(0, 2).map((activity, index) => (
                    <Badge key={index} variant="secondary" className="text-xs block">
                      {activity}
                    </Badge>
                  ))}
                  {info.activities.length > 2 && (
                    <Badge variant="outline" className="text-xs">
                      +{info.activities.length - 2} más
                    </Badge>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}