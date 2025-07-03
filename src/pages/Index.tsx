import { useState } from "react";
import { Navigation } from "@/components/ui/navigation";
import { HeroSection } from "@/components/dashboard/HeroSection";
import { QuickStats } from "@/components/dashboard/QuickStats";
import { RecentActivity } from "@/components/dashboard/RecentActivity";
import { BancalGrid } from "@/components/bancales/BancalGrid";
import { RiegoPanel } from "@/components/riego/RiegoPanel";
import { ClimaWidget } from "@/components/clima/ClimaWidget";
import { LunarCalendar } from "@/components/calendario/LunarCalendar";
import { InventoryKanban } from "@/components/inventario/InventoryKanban";

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
        return <LunarCalendar />;
      case "inventario":
        return <InventoryKanban />;
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