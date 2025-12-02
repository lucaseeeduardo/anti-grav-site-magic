import { Mail, MessageSquare } from "lucide-react";

export default function Contact() {
  const handleEmailClick = () => {
    window.open('mailto:lucas.eborba@gmail.com', '_blank');
  };

  const handleWhatsAppClick = () => {
    window.open('https://wa.me/5547989070810', '_blank');
  };

  return (
    <main className="relative z-10 min-h-screen flex flex-col items-center justify-center px-6 py-32">
      <div className="max-w-4xl mx-auto text-center space-y-12">
        <div className="space-y-4">
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight">
            Vamos conversar
          </h1>
          <p className="text-xl text-muted-foreground">
            Disponível para novos projetos e colaborações
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-8">
          {/* Email Card */}
          <button
            onClick={handleEmailClick}
            className="group p-8 border-2 border-border rounded-3xl hover:border-primary transition-all duration-300 hover:shadow-lg"
          >
            <div className="flex flex-col items-center gap-4">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                <Mail className="w-8 h-8 text-primary" />
              </div>
              <div className="space-y-2">
                <h3 className="text-sm font-bold uppercase tracking-wider text-muted-foreground">
                  Email
                </h3>
                <p className="text-lg font-medium group-hover:text-primary transition-colors">
                  lucas.eborba@gmail.com
                </p>
              </div>
            </div>
          </button>

          {/* WhatsApp Card */}
          <button
            onClick={handleWhatsAppClick}
            className="group p-8 border-2 border-border rounded-3xl hover:border-primary transition-all duration-300 hover:shadow-lg"
          >
            <div className="flex flex-col items-center gap-4">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                <MessageSquare className="w-8 h-8 text-primary" />
              </div>
              <div className="space-y-2">
                <h3 className="text-sm font-bold uppercase tracking-wider text-muted-foreground">
                  WhatsApp
                </h3>
                <p className="text-lg font-medium group-hover:text-primary transition-colors">
                  +55 47 98907-0810
                </p>
              </div>
            </div>
          </button>
        </div>

        <div className="pt-8">
          <p className="text-sm text-muted-foreground">
            Respondo geralmente em até 24 horas
          </p>
        </div>
      </div>
    </main>
  );
}
