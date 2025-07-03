import { useState, useEffect } from 'react';
import { lunarPhases2025, LunarPhase, lunarRecommendations } from '@/data/lunarPhases2025';

export interface CurrentLunarInfo {
  currentPhase: {
    phase: 'new' | 'first-quarter' | 'full' | 'third-quarter';
    info: typeof lunarRecommendations[keyof typeof lunarRecommendations];
  };
  nextPhase: LunarPhase | null;
  daysUntilNext: number;
  currentMoonAge: number;
}

export function useLunarData() {
  const [lunarInfo, setLunarInfo] = useState<CurrentLunarInfo | null>(null);

  useEffect(() => {
    const calculateCurrentPhase = (): CurrentLunarInfo => {
      const now = new Date();
      const currentDate = now.toISOString().split('T')[0];
      
      // Obtener todas las fases en orden cronológico
      const allPhases: LunarPhase[] = [];
      lunarPhases2025.forEach(cycle => {
        if (cycle.newMoon) allPhases.push(cycle.newMoon);
        if (cycle.firstQuarter) allPhases.push(cycle.firstQuarter);
        if (cycle.fullMoon) allPhases.push(cycle.fullMoon);
        if (cycle.thirdQuarter) allPhases.push(cycle.thirdQuarter);
      });
      
      // Ordenar por fecha
      allPhases.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
      
      // Encontrar la fase más reciente que ya pasó
      let currentPhaseData = allPhases[0]; // Por defecto la primera
      let nextPhaseData = allPhases[1] || null;
      
      for (let i = 0; i < allPhases.length; i++) {
        const phaseDate = new Date(allPhases[i].date);
        if (phaseDate <= now) {
          currentPhaseData = allPhases[i];
          nextPhaseData = allPhases[i + 1] || null;
        } else {
          break;
        }
      }
      
      // Calcular días hasta la siguiente fase
      const daysUntilNext = nextPhaseData 
        ? Math.ceil((new Date(nextPhaseData.date).getTime() - now.getTime()) / (1000 * 60 * 60 * 24))
        : 0;
      
      // Calcular edad de la luna (días desde la última luna nueva)
      const lastNewMoon = allPhases
        .filter(phase => phase.phase === 'new' && new Date(phase.date) <= now)
        .pop();
      
      const currentMoonAge = lastNewMoon 
        ? Math.floor((now.getTime() - new Date(lastNewMoon.date).getTime()) / (1000 * 60 * 60 * 24))
        : 0;

      return {
        currentPhase: {
          phase: currentPhaseData.phase,
          info: lunarRecommendations[currentPhaseData.phase]
        },
        nextPhase: nextPhaseData,
        daysUntilNext,
        currentMoonAge
      };
    };

    setLunarInfo(calculateCurrentPhase());
    
    // Actualizar cada hora
    const interval = setInterval(() => {
      setLunarInfo(calculateCurrentPhase());
    }, 1000 * 60 * 60);

    return () => clearInterval(interval);
  }, []);

  return lunarInfo;
}

export function getLunarPhaseForDate(date: string): LunarPhase | null {
  const allPhases: LunarPhase[] = [];
  lunarPhases2025.forEach(cycle => {
    if (cycle.newMoon) allPhases.push(cycle.newMoon);
    if (cycle.firstQuarter) allPhases.push(cycle.firstQuarter);
    if (cycle.fullMoon) allPhases.push(cycle.fullMoon);
    if (cycle.thirdQuarter) allPhases.push(cycle.thirdQuarter);
  });
  
  return allPhases.find(phase => phase.date === date) || null;
}