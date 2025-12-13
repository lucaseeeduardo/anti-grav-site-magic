import { ArrowRight, Database, Shield, Bell } from "lucide-react";

export default function IntegrationDiagram() {
  return (
    <div className="bg-secondary/50 rounded-lg p-4">
      <div className="flex items-center justify-between gap-2 text-xs">
        {/* Source */}
        <div className="flex flex-col items-center gap-1">
          <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center">
            <Database size={20} className="text-primary" />
          </div>
          <span className="font-medium">CRM</span>
        </div>

        <ArrowRight size={16} className="text-muted-foreground" />

        {/* API Gateway */}
        <div className="flex flex-col items-center gap-1">
          <div className="w-12 h-12 rounded-lg bg-primary flex items-center justify-center">
            <Shield size={20} className="text-primary-foreground" />
          </div>
          <span className="font-medium">API</span>
        </div>

        <ArrowRight size={16} className="text-muted-foreground" />

        {/* Destination */}
        <div className="flex flex-col items-center gap-1">
          <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center">
            <Database size={20} className="text-primary" />
          </div>
          <span className="font-medium">ERP</span>
        </div>
      </div>

      {/* Logs indicator */}
      <div className="mt-3 flex justify-center">
        <div className="flex items-center gap-1 px-3 py-1 bg-success/10 rounded-full text-success text-xs">
          <Bell size={12} />
          <span>Logs & Alertas Ativos</span>
        </div>
      </div>
    </div>
  );
}
