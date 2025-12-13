import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import {
  Globe,
  Database,
  Cpu,
  Cloud,
  Shield,
  MessageSquare,
  Calendar,
  FileSearch,
  FileText,
} from "lucide-react";
import SkillCluster from "@/components/SkillCluster";
import PortfolioProject from "@/components/PortfolioProject";
import IntegrationDiagram from "@/components/IntegrationDiagram";
import ApiMetrics from "@/components/ApiMetrics";
import DatabaseDiagram from "@/components/DatabaseDiagram";
import TrustSignal from "@/components/TrustSignal";

export default function Home() {
  const skillClusters = [
    {
      title: "APIs & Integrações",
      skills: [{ name: "REST" }, { name: "GraphQL" }, { name: "Webhooks" }],
      level: "avancado" as const,
      icon: <Globe size={20} />,
    },
    {
      title: "Bancos de Dados",
      skills: [{ name: "PostgreSQL" }, { name: "MongoDB" }, { name: "Redis" }],
      level: "expert" as const,
      icon: <Database size={20} />,
    },
    {
      title: "Automação",
      skills: [{ name: "Python" }, { name: "Node.js" }, { name: "Cron Jobs" }],
      level: "avancado" as const,
      icon: <Cpu size={20} />,
    },
    {
      title: "Cloud & Deploy",
      skills: [{ name: "Docker" }, { name: "AWS" }, { name: "CI/CD" }],
      level: "intermediario" as const,
      icon: <Cloud size={20} />,
    },
  ];

  const valuePropositions = [
    {
      title: "Zero atrito entre sistemas",
      description:
        "Conecto ERPs, CRMs e APIs de terceiros sem quebrar seu fluxo.",
    },
    {
      title: "Performance que escala",
      description: "APIs otimizadas para milhares de requisições simultâneas.",
    },
    {
      title: "Dados íntegros, decisões confiáveis",
      description: "Modelagem de banco que cresce com seu negócio.",
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
            Arquiteto de Sistemas que Conectam seu Negócio. Integrações robustas,
            dados seguros, resultados mensuráveis.
          </p>

          {/* CTAs Estratégicos */}
          <div className="flex flex-wrap items-center justify-center gap-4 pt-8">
            <Button variant="hero" size="lg" asChild>
              <Link to="/contato" className="flex items-center gap-2">
                <Calendar size={18} />
                Agendar Diagnóstico Gratuito
              </Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link to="#portfolio" className="flex items-center gap-2">
                <FileSearch size={18} />
                Ver Cases de Integração
              </Link>
            </Button>
            <Button variant="ghost" size="lg" asChild>
              <Link to="/contato" className="flex items-center gap-2">
                <FileText size={18} />
                Solicitar Orçamento
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Value Propositions */}
      <section className="max-w-6xl mx-auto px-6 py-24">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {valuePropositions.map((prop, index) => (
            <div key={index} className="space-y-3">
              <div className="text-sm font-bold text-primary tracking-wider">
                0{index + 1}
              </div>
              <h3 className="text-2xl font-bold">{prop.title}</h3>
              <p className="text-muted-foreground leading-relaxed">
                {prop.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Skills Section */}
      <section className="max-w-6xl mx-auto px-6 py-24">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Minhas Habilidades
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Especialização em desenvolvimento back-end com foco em sistemas
            escaláveis e integrações complexas.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {skillClusters.map((cluster) => (
            <SkillCluster
              key={cluster.title}
              title={cluster.title}
              skills={cluster.skills}
              level={cluster.level}
              icon={cluster.icon}
            />
          ))}
        </div>
      </section>

      {/* Portfolio Section */}
      <section id="portfolio" className="max-w-6xl mx-auto px-6 py-24">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Portfólio</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Projetos reais que demonstram expertise em sistemas back-end
            complexos.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <PortfolioProject
            title="Integração CRM ↔ ERP"
            description="Sincronização bidirecional em tempo real entre Pipedrive e Omie com validação e logs."
            type="integration"
          >
            <IntegrationDiagram />
          </PortfolioProject>

          <PortfolioProject
            title="API de Alta Performance"
            description="Gateway de pagamentos processando milhares de transações com latência mínima."
            type="api"
          >
            <ApiMetrics />
          </PortfolioProject>

          <PortfolioProject
            title="Modelagem de Banco"
            description="Otimização de schema que reduziu tempo de relatórios financeiros de 8s para 200ms."
            type="database"
          >
            <DatabaseDiagram />
          </PortfolioProject>
        </div>
      </section>

      {/* Trust Signals */}
      <section className="max-w-6xl mx-auto px-6 py-24">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Por que me escolher
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <TrustSignal
            icon={<Shield size={24} />}
            title="Compromisso com Segurança"
            description="Dados criptografados em trânsito e repouso. Implementação de boas práticas de segurança desde o primeiro dia."
          />
          <TrustSignal
            icon={<MessageSquare size={24} />}
            title="Comunicação Clara"
            description="Relatórios semanais de progresso, acesso ao repositório e documentação técnica completa do projeto."
          />
        </div>
      </section>

      {/* Final CTA */}
      <section className="max-w-4xl mx-auto px-6 py-24 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Pronto para transformar seu negócio?
        </h2>
        <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
          Agende uma conversa gratuita de 15 minutos para discutir seu projeto e
          descobrir como posso ajudar.
        </p>
        <Button variant="hero" size="lg" asChild>
          <Link to="/contato" className="flex items-center gap-2">
            <Calendar size={18} />
            Agendar Diagnóstico Gratuito
          </Link>
        </Button>
      </section>
    </main>
  );
}
