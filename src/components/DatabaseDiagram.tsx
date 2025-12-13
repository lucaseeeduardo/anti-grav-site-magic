import { Table, ArrowRight } from "lucide-react";

export default function DatabaseDiagram() {
  return (
    <div className="bg-secondary/50 rounded-lg p-4">
      {/* Mini ER Diagram */}
      <div className="flex items-center justify-center gap-4 mb-3">
        <div className="flex flex-col items-center">
          <div className="w-16 h-10 rounded border-2 border-primary bg-card flex items-center justify-center">
            <Table size={16} className="text-primary" />
          </div>
          <span className="text-xs mt-1">Users</span>
        </div>

        <div className="flex flex-col items-center gap-0.5">
          <div className="w-8 h-0.5 bg-primary" />
          <span className="text-[10px] text-muted-foreground">1:N</span>
        </div>

        <div className="flex flex-col items-center">
          <div className="w-16 h-10 rounded border-2 border-primary bg-card flex items-center justify-center">
            <Table size={16} className="text-primary" />
          </div>
          <span className="text-xs mt-1">Orders</span>
        </div>

        <div className="flex flex-col items-center gap-0.5">
          <div className="w-8 h-0.5 bg-primary" />
          <span className="text-[10px] text-muted-foreground">N:M</span>
        </div>

        <div className="flex flex-col items-center">
          <div className="w-16 h-10 rounded border-2 border-primary bg-card flex items-center justify-center">
            <Table size={16} className="text-primary" />
          </div>
          <span className="text-xs mt-1">Products</span>
        </div>
      </div>

      {/* Optimization result */}
      <div className="flex items-center justify-center gap-2 text-xs">
        <span className="text-muted-foreground">Query:</span>
        <span className="text-destructive line-through">8s</span>
        <ArrowRight size={12} className="text-muted-foreground" />
        <span className="text-success font-bold">200ms</span>
      </div>
    </div>
  );
}
