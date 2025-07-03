import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { 
  Flower, 
  Droplets, 
  Thermometer,
  Plus,
  MoreVertical,
  TrendingUp
} from "lucide-react";

const bancales = [
  {
    id: 1,
    name: "Bancal de Rosas",
    plantas: ["Rosa roja", "Rosa blanca", "Rosa rosada"],
    estado: "En flor",
    humedad: 75,
    temperatura: 22,
    ultimoRiego: "Hace 2 horas",
    color: "bg-floral-pink",
    progress: 85
  },
  {
    id: 2,
    name: "Hierbas Aromáticas",
    plantas: ["Lavanda", "Romero", "Tomillo"],
    estado: "Creciendo",
    humedad: 60,
    temperatura: 24,
    ultimoRiego: "Hace 1 día",
    color: "bg-primary-glow",
    progress: 60
  },
  {
    id: 3,
    name: "Flores de Temporada",
    plantas: ["Geranios", "Petunias", "Begonias"],
    estado: "En flor",
    humedad: 70,
    temperatura: 23,
    ultimoRiego: "Hace 4 horas",
    color: "bg-floral-purple",
    progress: 90
  },
  {
    id: 4,
    name: "Zona Sombreada",
    plantas: ["Hostas", "Helechos", "Caladium"],
    estado: "Saludable",
    humedad: 80,
    temperatura: 20,
    ultimoRiego: "Hace 6 horas",
    color: "bg-accent",
    progress: 75
  }
];

const getEstadoColor = (estado: string) => {
  switch (estado) {
    case "En flor": return "bg-floral-pink/10 text-floral-pink border-floral-pink/20";
    case "Creciendo": return "bg-primary-glow/10 text-primary-glow border-primary-glow/20";
    case "Saludable": return "bg-accent/10 text-accent border-accent/20";
    default: return "bg-muted";
  }
};

export function BancalGrid() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-serif font-semibold">Mis Bancales</h2>
        <Button className="bg-gradient-primary shadow-nature">
          <Plus className="h-4 w-4 mr-2" />
          Nuevo Bancal
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {bancales.map((bancal) => (
          <Card key={bancal.id} className="hover:shadow-nature transition-all duration-200 hover:-translate-y-1">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`w-4 h-4 rounded-full ${bancal.color}`} />
                  <CardTitle className="text-lg">{bancal.name}</CardTitle>
                </div>
                <Button variant="ghost" size="sm">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </div>
              <Badge variant="outline" className={getEstadoColor(bancal.estado)}>
                {bancal.estado}
              </Badge>
            </CardHeader>

            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Progreso</span>
                  <span className="font-medium">{bancal.progress}%</span>
                </div>
                <Progress value={bancal.progress} className="h-2" />
              </div>

              <div className="space-y-2">
                <h4 className="font-medium text-sm flex items-center gap-2">
                  <Flower className="h-4 w-4 text-primary" />
                  Plantas
                </h4>
                <div className="flex flex-wrap gap-1">
                  {bancal.plantas.map((planta, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {planta}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 pt-2 border-t">
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Droplets className="h-4 w-4 text-accent" />
                    Humedad
                  </div>
                  <p className="font-medium">{bancal.humedad}%</p>
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Thermometer className="h-4 w-4 text-floral-yellow" />
                    Temperatura
                  </div>
                  <p className="font-medium">{bancal.temperatura}°C</p>
                </div>
              </div>

              <div className="text-xs text-muted-foreground">
                Último riego: {bancal.ultimoRiego}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}