import heroImage from "@/assets/garden-hero.jpg";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Thermometer, Droplets, Wind } from "lucide-react";

export function HeroSection() {
  return (
    <div className="relative overflow-hidden rounded-2xl bg-gradient-nature h-80 md:h-96">
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-30"
        style={{ backgroundImage: `url(${heroImage})` }}
      />
      
      <div className="relative z-10 flex h-full items-center justify-between p-8 text-white">
        <div className="space-y-4">
          <div className="space-y-2">
            <h1 className="font-serif text-4xl md:text-5xl font-bold">
              GardenFlow
            </h1>
            <p className="text-lg opacity-90 max-w-md">
              Sistema inteligente para el cuidado y gestión de tu jardín
            </p>
          </div>
          
          <div className="flex flex-wrap gap-2">
            <Badge variant="secondary" className="bg-white/20 text-white border-white/20">
              5 Bancales activos
            </Badge>
            <Badge variant="secondary" className="bg-white/20 text-white border-white/20">
              Sistema de riego ON
            </Badge>
          </div>
        </div>

        <Card className="hidden md:block bg-white/10 backdrop-blur-sm border-white/20 p-6 min-w-64">
          <h3 className="font-semibold text-white mb-4">Condiciones actuales</h3>
          <div className="space-y-3 text-white">
            <div className="flex items-center gap-3">
              <Thermometer className="h-5 w-5 text-floral-yellow" />
              <span>24°C</span>
            </div>
            <div className="flex items-center gap-3">
              <Droplets className="h-5 w-5 text-accent" />
              <span>65% humedad</span>
            </div>
            <div className="flex items-center gap-3">
              <Wind className="h-5 w-5 text-gray-300" />
              <span>8 km/h viento</span>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}