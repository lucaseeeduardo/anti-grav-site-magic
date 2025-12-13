import { Zap, TrendingUp, CheckCircle } from "lucide-react";

export default function ApiMetrics() {
  const metrics = [
    {
      icon: <Zap size={18} />,
      label: "Latência",
      value: "45ms",
      color: "text-success",
    },
    {
      icon: <TrendingUp size={18} />,
      label: "Req/seg",
      value: "2.500+",
      color: "text-primary",
    },
    {
      icon: <CheckCircle size={18} />,
      label: "Uptime",
      value: "99.9%",
      color: "text-success",
    },
  ];

  return (
    <div className="bg-secondary/50 rounded-lg p-4">
      <div className="grid grid-cols-3 gap-3">
        {metrics.map((metric) => (
          <div
            key={metric.label}
            className="flex flex-col items-center text-center"
          >
            <div className={`${metric.color} mb-1`}>{metric.icon}</div>
            <span className="text-lg font-bold">{metric.value}</span>
            <span className="text-xs text-muted-foreground">{metric.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
