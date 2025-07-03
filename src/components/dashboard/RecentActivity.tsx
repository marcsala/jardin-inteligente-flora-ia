import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { 
  Droplets, 
  Flower, 
  Calendar,
  Thermometer,
  Clock
} from "lucide-react";

const activities = [
  {
    id: 1,
    action: "Riego automático activado",
    target: "Bancal de rosas",
    time: "Hace 2 horas",
    icon: Droplets,
    color: "bg-accent",
    type: "success"
  },
  {
    id: 2,
    action: "Nueva floración detectada",
    target: "Geranios bancal 3",
    time: "Hace 4 horas",
    icon: Flower,
    color: "bg-floral-pink",
    type: "info"
  },
  {
    id: 3,
    action: "Tarea programada",
    target: "Poda de lavanda",
    time: "Mañana 9:00",
    icon: Calendar,
    color: "bg-earth",
    type: "warning"
  },
  {
    id: 4,
    action: "Alerta de temperatura",
    target: "Zona sombreada",
    time: "Hace 6 horas",
    icon: Thermometer,
    color: "bg-floral-yellow",
    type: "alert"
  }
];

const getTypeColor = (type: string) => {
  switch (type) {
    case "success": return "bg-accent/10 text-accent border-accent/20";
    case "info": return "bg-floral-pink/10 text-floral-pink border-floral-pink/20";
    case "warning": return "bg-earth/10 text-earth border-earth/20";
    case "alert": return "bg-floral-yellow/10 text-floral-yellow border-floral-yellow/20";
    default: return "bg-muted";
  }
};

export function RecentActivity() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Clock className="h-5 w-5 text-primary" />
          Actividad reciente
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity) => {
            const Icon = activity.icon;
            
            return (
              <div key={activity.id} className="flex items-center gap-4 p-3 rounded-lg hover:bg-muted/50 transition-colors">
                <Avatar className={`h-10 w-10 ${activity.color}`}>
                  <AvatarFallback className="bg-transparent">
                    <Icon className="h-5 w-5 text-white" />
                  </AvatarFallback>
                </Avatar>
                
                <div className="flex-1 space-y-1">
                  <p className="text-sm font-medium leading-none">
                    {activity.action}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {activity.target}
                  </p>
                </div>
                
                <Badge 
                  variant="outline" 
                  className={getTypeColor(activity.type)}
                >
                  {activity.time}
                </Badge>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}