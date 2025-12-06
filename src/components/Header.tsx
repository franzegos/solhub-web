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

          <nav className="flex items-center gap-4">
            <Button
              asChild
              variant="default"
              size="sm"
              className="group relative overflow-hidden solana-gradient hover:shadow-lg hover:shadow-primary/25 transition-all duration-300"
            >
              <a
                href="https://github.com/jup-ag/platform-list?tab=readme-ov-file#contributing"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2"
              >
                <PlusSquareIcon className="h-4 w-4 md:h-5 md:w-5 transition-transform" />
                <span className="hidden sm:inline">Add your Project</span>
                <span className="sm:hidden">Add</span>
              </a>
            </Button>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
