import solhubLogo from "@/assets/solhub-logo.png";
import { Button } from "@/components/ui/button";
import { Plus, PlusSquareIcon } from "lucide-react";

const Header = () => {
  return (
    <header className="sticky top-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-xl supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <img src={solhubLogo} alt="Solhub" className="h-8 w-auto" />
            {/* <span className="text-2xl font-semibold tracking-tight">
              <span className="solana-gradient-text">Ecosystem</span>
            </span> */}
          </div>

          <nav className="hidden md:flex items-center gap-4">
            <Button
              asChild
              variant="default"
              className="w-full sm:w-auto group relative overflow-hidden solana-gradient hover:shadow-lg hover:shadow-primary/25 transition-all duration-300"
            >
              <a
                href="https://github.com/jup-ag/platform-list?tab=readme-ov-file#contributing"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2"
              >
                <PlusSquareIcon className="h-5 w-5 transition-transform" />
                <span>Add your Project</span>
              </a>
            </Button>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
