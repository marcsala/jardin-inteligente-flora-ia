import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { 
  Flower, 
  Droplets, 
  Calendar,
  Sprout,
  TrendingUp,
  AlertTriangle
} from "lucide-react";

const stats = [
  {
    title: "Plantas en flor",
    value: "12",
    total: "18",
    icon: Flower,
    color: "text-floral-pink",
    progress: 67
  },
  {
    title: "Nivel de humedad",
    value: "65%",
    subtitle: "Óptimo",
    icon: Droplets,
    color: "text-accent",
    progress: 65
  },
  {
    title: "Tareas pendientes",
    value: "3",
    subtitle: "Esta semana",
    icon: Calendar,
    color: "text-earth",
    progress: 25
  },
  {
    title: "Nuevos brotes",
    value: "8",
    subtitle: "Últimos 7 días",
    icon: Sprout,
    color: "text-primary-glow",
    progress: 80
  }
];

export function QuickStats() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, index) => {
        const Icon = stat.icon;
        
        return (
          <Card key={index} className="hover:shadow-nature transition-all duration-200 hover:-translate-y-1">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
              <Icon className={`h-5 w-5 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-bold">
                    {stat.value}
                  </span>
                  {stat.total && (
                    <span className="text-sm text-muted-foreground">
                      / {stat.total}
                    </span>
                  )}
                  {stat.subtitle && (
                    <span className="text-sm text-muted-foreground">
                      {stat.subtitle}
                    </span>
                  )}
                </div>
                <Progress value={stat.progress} className="h-2" />
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}