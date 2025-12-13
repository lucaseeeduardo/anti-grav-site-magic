interface Skill {
  name: string;
}

interface SkillClusterProps {
  title: string;
  skills: Skill[];
  level: "intermediario" | "avancado" | "expert";
  icon: React.ReactNode;
}

const levelConfig = {
  intermediario: { bars: 7, label: "Intermediário+", color: "bg-primary/60" },
  avancado: { bars: 8, label: "Avançado", color: "bg-primary/80" },
  expert: { bars: 9, label: "Expert", color: "bg-primary" },
};

export default function SkillCluster({ title, skills, level, icon }: SkillClusterProps) {
  const config = levelConfig[level];

  return (
    <div className="p-6 rounded-xl border border-border bg-card hover:shadow-lg transition-shadow">
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 rounded-lg bg-primary/10 text-primary">
          {icon}
        </div>
        <h3 className="text-lg font-bold">{title}</h3>
      </div>

      <div className="flex flex-wrap gap-2 mb-4">
        {skills.map((skill) => (
          <span
            key={skill.name}
            className="px-3 py-1 text-sm bg-secondary rounded-full text-foreground/80"
          >
            {skill.name}
          </span>
        ))}
      </div>

      <div className="flex items-center gap-2">
        <div className="flex gap-0.5">
          {Array.from({ length: 10 }).map((_, i) => (
            <div
              key={i}
              className={`w-2 h-4 rounded-sm ${
                i < config.bars ? config.color : "bg-muted"
              }`}
            />
          ))}
        </div>
        <span className="text-sm text-muted-foreground">{config.label}</span>
      </div>
    </div>
  );
}
