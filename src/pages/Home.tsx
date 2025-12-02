import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export default function Home() {
  const services = [
    {
      number: "01",
      title: "Integrações",
      description: "Conexão entre sistemas e plataformas com APIs robustas e webhooks.",
    },
    {
      number: "02",
      title: "ERP & Financeiro",
      description: "Soluções para gestão empresarial e análise de dados financeiros.",
    },
    {
      number: "03",
      title: "Automação",
      description: "Processos automatizados para maior eficiência e escalabilidade.",
    },
  ];

  return (
    <main className="relative z-10 min-h-screen">
      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center min-h-screen px-6 py-32">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full text-primary text-sm font-medium">
            <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
            Disponível para novos projetos
          </div>
          
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight">
            Lucas Eduardo
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Desenvolvedor de Software especializado em integrações de dados financeiros, 
            APIs e automação de processos
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-8">
            <Button variant="hero" size="lg">
              Ver projetos
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link to="/contato">Entre em contato</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="max-w-6xl mx-auto px-6 py-24">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {services.map((service) => (
            <div key={service.number} className="space-y-4">
              <div className="text-sm font-bold text-muted-foreground tracking-wider">
                {service.number}
              </div>
              <h3 className="text-2xl font-bold">{service.title}</h3>
              <p className="text-muted-foreground leading-relaxed">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Tech Stack */}
      <section className="max-w-6xl mx-auto px-6 py-24">
        <div className="text-center space-y-12">
          <h2 className="text-3xl md:text-4xl font-bold">Tecnologias</h2>
          <div className="flex flex-wrap items-center justify-center gap-8">
            {[
              "React",
              "TypeScript",
              "Node.js",
              "Python",
              "PostgreSQL",
              "REST APIs",
              "GraphQL",
              "Docker",
            ].map((tech) => (
              <div
                key={tech}
                className="px-6 py-3 border border-border rounded-full text-sm font-medium hover:bg-muted transition-colors cursor-default"
              >
                {tech}
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
