import { cn } from "@/lib/utils";
import { Button } from "./button";
import { 
  Flower, 
  Droplets, 
  Cloud, 
  Calendar,
  LayoutGrid,
  Settings,
  Bell
} from "lucide-react";

interface NavigationProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
}

const navigationItems = [
  { id: "dashboard", label: "Dashboard", icon: LayoutGrid },
  { id: "bancales", label: "Bancales", icon: Flower },
  { id: "riego", label: "Riego", icon: Droplets },
  { id: "clima", label: "Clima", icon: Cloud },
  { id: "calendario", label: "Calendario", icon: Calendar },
  { id: "inventario", label: "Inventario", icon: Flower },
];

export function Navigation({ activeSection, onSectionChange }: NavigationProps) {
  return (
    <nav className="flex flex-wrap gap-2 p-4 bg-card rounded-xl shadow-soft">
      {navigationItems.map((item) => {
        const Icon = item.icon;
        const isActive = activeSection === item.id;
        
        return (
          <Button
            key={item.id}
            variant={isActive ? "default" : "ghost"}
            onClick={() => onSectionChange(item.id)}
            className={cn(
              "flex items-center gap-2 px-4 py-2 transition-all duration-200",
              isActive 
                ? "bg-gradient-primary text-primary-foreground shadow-nature" 
                : "hover:bg-secondary hover:shadow-soft"
            )}
          >
            <Icon className="h-4 w-4" />
            <span className="hidden sm:inline">{item.label}</span>
          </Button>
        );
      })}
      
      <div className="ml-auto flex gap-2">
        <Button variant="ghost" size="sm">
          <Bell className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="sm">
          <Settings className="h-4 w-4" />
        </Button>
      </div>
    </nav>
  );
}