import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Droplets, 
  Play, 
  Pause,
  Clock,
  Zap,
  Settings,
  WifiOff,
  Wifi
} from "lucide-react";

const zonas = [
  {
    id: 1,
    name: "Zona A - Rosas",
    activo: true,
    programado: "06:00 - 18:00",
    ultimoRiego: "Hace 2h",
    duracion: "15 min",
    presion: 85,
    estado: "online"
  },
  {
    id: 2,
    name: "Zona B - Aromáticas", 
    activo: false,
    programado: "07:00 - 19:00",
    ultimoRiego: "Hace 1d",
    duracion: "10 min",
    presion: 78,
    estado: "online"
  },
  {
    id: 3,
    name: "Zona C - Temporada",
    activo: true,
    programado: "06:30 - 17:30",
    ultimoRiego: "Hace 4h",
    duracion: "20 min",
    presion: 92,
    estado: "offline"
  },
  {
    id: 4,
    name: "Zona D - Sombreada",
    activo: false,
    programado: "08:00 - 16:00", 
    ultimoRiego: "Hace 6h",
    duracion: "12 min",
    presion: 88,
    estado: "online"
  }
];

export function RiegoPanel() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-serif font-semibold">Sistema de Riego</h2>
        <div className="flex gap-2">
          <Button variant="outline">
            <Settings className="h-4 w-4 mr-2" />
            Configurar
          </Button>
          <Button className="bg-gradient-primary shadow-nature">
            <Zap className="h-4 w-4 mr-2" />
            Riego Manual
          </Button>
        </div>
      </div>

      {/* Estado general */}
      <Card className="bg-gradient-to-r from-accent/5 to-primary/5 border-accent/20">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <h3 className="font-semibold text-lg">Estado del Sistema</h3>
              <div className="flex items-center gap-4">
                <Badge className="bg-accent/10 text-accent border-accent/20">
                  3 Zonas Activas
                </Badge>
                <Badge className="bg-floral-yellow/10 text-floral-yellow border-floral-yellow/20">
                  1 Zona Offline
                </Badge>
              </div>
            </div>
            <div className="text-right space-y-1">
              <div className="text-2xl font-bold text-accent">15L/h</div>
              <div className="text-sm text-muted-foreground">Consumo actual</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Zonas de riego */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {zonas.map((zona) => (
          <Card key={zona.id} className="hover:shadow-nature transition-all duration-200">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <Droplets className={`h-6 w-6 ${zona.activo ? 'text-accent animate-pulse' : 'text-muted-foreground'}`} />
                    {zona.estado === "online" ? (
                      <Wifi className="h-3 w-3 text-accent absolute -top-1 -right-1" />
                    ) : (
                      <WifiOff className="h-3 w-3 text-destructive absolute -top-1 -right-1" />
                    )}
                  </div>
                  <div>
                    <CardTitle className="text-base">{zona.name}</CardTitle>
                    <p className="text-sm text-muted-foreground">
                      {zona.estado === "online" ? "Conectado" : "Sin conexión"}
                    </p>
                  </div>
                </div>
                <Switch checked={zona.activo} />
              </div>
            </CardHeader>

            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Presión del sistema</span>
                  <span className="font-medium">{zona.presion} PSI</span>
                </div>
                <Progress 
                  value={zona.presion} 
                  className="h-2"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Clock className="h-4 w-4" />
                    Programado
                  </div>
                  <p className="text-sm font-medium">{zona.programado}</p>
                </div>
                <div className="space-y-1">
                  <div className="text-sm text-muted-foreground">Duración</div>
                  <p className="text-sm font-medium">{zona.duracion}</p>
                </div>
              </div>

              <div className="flex items-center justify-between pt-2 border-t">
                <span className="text-sm text-muted-foreground">
                  Último riego: {zona.ultimoRiego}
                </span>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline">
                    <Play className="h-3 w-3" />
                  </Button>
                  <Button size="sm" variant="outline">
                    <Pause className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}