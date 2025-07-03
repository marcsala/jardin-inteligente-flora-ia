import { useState } from "react";
import { Navigation } from "@/components/ui/navigation";
import { HeroSection } from "@/components/dashboard/HeroSection";
import { QuickStats } from "@/components/dashboard/QuickStats";
import { RecentActivity } from "@/components/dashboard/RecentActivity";
import { BancalGrid } from "@/components/bancales/BancalGrid";
import { RiegoPanel } from "@/components/riego/RiegoPanel";
import { ClimaWidget } from "@/components/clima/ClimaWidget";

const Index = () => {
  const [activeSection, setActiveSection] = useState("dashboard");

  const renderContent = () => {
    switch (activeSection) {
      case "bancales":
        return <BancalGrid />;
      case "riego":
        return <RiegoPanel />;
      case "clima":
        return <ClimaWidget />;
      case "calendario":
        return (
          <div className="text-center py-20">
            <h2 className="text-2xl font-serif font-semibold mb-4">Calendario de Jardín</h2>
            <p className="text-muted-foreground">Próximamente - Calendario inteligente con fases lunares</p>
          </div>
        );
      case "inventario":
        return (
          <div className="text-center py-20">
            <h2 className="text-2xl font-serif font-semibold mb-4">Inventario Floral</h2>
            <p className="text-muted-foreground">Próximamente - Gestión visual tipo Kanban</p>
          </div>
        );
      default:
        return (
          <div className="space-y-8">
            <HeroSection />
            <QuickStats />
            <RecentActivity />
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-background p-4 space-y-6">
      <Navigation 
        activeSection={activeSection} 
        onSectionChange={setActiveSection} 
      />
      
      <main className="max-w-7xl mx-auto">
        {renderContent()}
      </main>
    </div>
  );
};

export default Index;