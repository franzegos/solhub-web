import solanaMark from "@/assets/solana-mark.png";
import { Button } from "@/components/ui/button";
import { Rocket, BookOpen } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="relative py-16 md:py-24 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-solana-teal/10 rounded-full blur-3xl animate-pulse-glow" />
        <div
          className="absolute bottom-0 right-1/4 w-96 h-96 bg-solana-purple/10 rounded-full blur-3xl animate-pulse-glow"
          style={{ animationDelay: "1.5s" }}
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-3xl mx-auto">
          <div className="flex justify-center mb-6">
            <div className="relative">
              <div className="absolute inset-0 solana-gradient blur-2xl opacity-30 scale-150" />
              <img
                src={solanaMark}
                alt="Solana"
                className="h-16 w-auto relative z-10"
              />
            </div>
          </div>

          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-4">
            <span className="text-foreground">Discover the</span>
            <br />
            <span className="solana-gradient-text">Solana Ecosystem</span>
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground max-w-xl mx-auto mb-8">
            Explore the most comprehensive directory of projects building on
            Solana.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              asChild
              variant="default"
              size="lg"
              className="w-full sm:w-auto group relative overflow-hidden solana-gradient hover:shadow-lg hover:shadow-primary/25 transition-all duration-300"
            >
              <a
                href="https://solana.com/docs/intro/quick-start"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2"
              >
                <Rocket className="h-5 w-5 transition-transform group-hover:translate-y-[-2px]" />
                <span>Start Building</span>
              </a>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="w-full sm:w-auto group border-2 hover:border-primary/50 hover:bg-primary/5 transition-all duration-300"
            >
              <a
                href="https://solana.com/developers"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2"
              >
                <BookOpen className="h-5 w-5 transition-transform group-hover:scale-110" />
                <span>Resources</span>
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
