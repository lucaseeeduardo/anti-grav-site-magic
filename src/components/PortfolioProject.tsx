import { ArrowRight } from "lucide-react";

interface PortfolioProjectProps {
  title: string;
  description: string;
  type: "integration" | "api" | "database";
  children: React.ReactNode;
}

export default function PortfolioProject({
  title,
  description,
  children,
}: PortfolioProjectProps) {
  return (
    <div className="group p-6 rounded-xl border border-border bg-card hover:border-primary/50 transition-all">
      <div className="mb-6">{children}</div>

      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-muted-foreground text-sm mb-4">{description}</p>

      <button className="flex items-center gap-2 text-primary text-sm font-medium group-hover:gap-3 transition-all">
        Ver detalhes
        <ArrowRight size={16} />
      </button>
    </div>
  );
}
