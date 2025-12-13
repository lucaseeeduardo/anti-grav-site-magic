interface TrustSignalProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

export default function TrustSignal({ icon, title, description }: TrustSignalProps) {
  return (
    <div className="flex items-start gap-4 p-6 rounded-xl border border-border bg-card">
      <div className="p-3 rounded-lg bg-primary/10 text-primary shrink-0">
        {icon}
      </div>
      <div>
        <h3 className="font-bold mb-1">{title}</h3>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
    </div>
  );
}
