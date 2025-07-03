import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Cloud, 
  Sun, 
  CloudRain,
  Wind,
  Thermometer,
  Droplets,
  Eye,
  Gauge
} from "lucide-react";

const datosActuales = {
  temperatura: 24,
  humedad: 65,
  viento: 8,
  presion: 1013,
  visibilidad: 10,
  uv: 6,
  descripcion: "Parcialmente nublado",
  icon: Cloud
};

const pronostico = [
  { dia: "Hoy", temp: 24, min: 18, icon: Cloud, lluvia: 20 },
  { dia: "Mañana", temp: 26, min: 19, icon: Sun, lluvia: 5 },
  { dia: "Martes", temp: 22, min: 16, icon: CloudRain, lluvia: 80 },
  { dia: "Miércoles", temp: 25, min: 17, icon: Sun, lluvia: 10 },
  { dia: "Jueves", temp: 23, min: 18, icon: Cloud, lluvia: 30 }
];

const recomendaciones = [
  {
    tipo: "riego",
    mensaje: "Reducir riego mañana - lluvia prevista",
    urgencia: "media"
  },
  {
    tipo: "cuidado",
    mensaje: "Proteger plantas sensibles del viento",
    urgencia: "baja"
  },
  {
    tipo: "plantacion",
    mensaje: "Condiciones óptimas para trasplantar",
    urgencia: "alta"
  }
];

const getUrgenciaColor = (urgencia: string) => {
  switch (urgencia) {
    case "alta": return "bg-accent/10 text-accent border-accent/20";
    case "media": return "bg-floral-yellow/10 text-floral-yellow border-floral-yellow/20";
    case "baja": return "bg-muted/50 text-muted-foreground border-muted";
    default: return "bg-muted";
  }
};

export function ClimaWidget() {
  const IconoActual = datosActuales.icon;

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-serif font-semibold">Condiciones Climáticas</h2>

      {/* Clima actual */}
      <Card className="bg-gradient-to-br from-accent/10 to-primary/10 border-accent/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <IconoActual className="h-6 w-6 text-accent" />
            Condiciones Actuales
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center space-y-2">
              <Thermometer className="h-8 w-8 text-floral-yellow mx-auto" />
              <div className="text-3xl font-bold">{datosActuales.temperatura}°</div>
              <div className="text-sm text-muted-foreground">Temperatura</div>
            </div>
            <div className="text-center space-y-2">
              <Droplets className="h-8 w-8 text-accent mx-auto" />
              <div className="text-3xl font-bold">{datosActuales.humedad}%</div>
              <div className="text-sm text-muted-foreground">Humedad</div>
            </div>
            <div className="text-center space-y-2">
              <Wind className="h-8 w-8 text-primary mx-auto" />
              <div className="text-3xl font-bold">{datosActuales.viento}</div>
              <div className="text-sm text-muted-foreground">km/h</div>
            </div>
            <div className="text-center space-y-2">
              <Gauge className="h-8 w-8 text-earth mx-auto" />
              <div className="text-3xl font-bold">{datosActuales.presion}</div>
              <div className="text-sm text-muted-foreground">hPa</div>
            </div>
          </div>
          <div className="text-center mt-4 text-muted-foreground">
            {datosActuales.descripcion}
          </div>
        </CardContent>
      </Card>

      {/* Pronóstico */}
      <Card>
        <CardHeader>
          <CardTitle>Pronóstico 5 días</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-5 gap-4">
            {pronostico.map((dia, index) => {
              const Icono = dia.icon;
              return (
                <div key={index} className="text-center space-y-2 p-3 rounded-lg hover:bg-muted/50 transition-colors">
                  <div className="text-sm font-medium">{dia.dia}</div>
                  <Icono className={`h-8 w-8 mx-auto ${
                    dia.icon === Sun ? 'text-floral-yellow' :
                    dia.icon === CloudRain ? 'text-accent' :
                    'text-muted-foreground'
                  }`} />
                  <div className="space-y-1">
                    <div className="font-bold">{dia.temp}°</div>
                    <div className="text-sm text-muted-foreground">{dia.min}°</div>
                  </div>
                  <div className="text-xs text-accent">{dia.lluvia}%</div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Recomendaciones */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Eye className="h-5 w-5 text-primary" />
            Recomendaciones del Jardín
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {recomendaciones.map((rec, index) => (
              <div key={index} className="flex items-start gap-3 p-3 rounded-lg border">
                <div className="mt-1">
                  {rec.tipo === "riego" && <Droplets className="h-4 w-4 text-accent" />}
                  {rec.tipo === "cuidado" && <Wind className="h-4 w-4 text-primary" />}
                  {rec.tipo === "plantacion" && <Sun className="h-4 w-4 text-floral-yellow" />}
                </div>
                <div className="flex-1">
                  <p className="text-sm">{rec.mensaje}</p>
                </div>
                <Badge variant="outline" className={getUrgenciaColor(rec.urgencia)}>
                  {rec.urgencia}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}