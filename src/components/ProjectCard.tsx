import {
  ExternalLink,
  Twitter,
  MessageCircle,
  BookOpen,
  FileText,
  BarChart3,
} from "lucide-react";
import type { SolanaProject } from "@/data/projects";
import { cn, formatTagLabel } from "@/lib/utils";
import { FaXTwitter } from "react-icons/fa6";
import { RxGlobe } from "react-icons/rx";

interface ProjectCardProps {
  project: SolanaProject;
  index: number;
  highlightedTags: Set<string>;
}

const getTagColor = (tag: string, isHighlighted: boolean) => {
  if (!isHighlighted) {
    return "bg-tag-default/15 text-tag-default border-tag-default/30";
  }

  const colors: Record<string, string> = {
    memecoin: "bg-tag-memecoin/15 text-tag-memecoin border-tag-memecoin/30",
    dapp: "bg-tag-dapp/15 text-tag-dapp border-tag-dapp/30",
    launchpad: "bg-tag-launchpad/15 text-tag-launchpad border-tag-launchpad/30",
    defi: "bg-tag-defi/15 text-tag-defi border-tag-defi/30",
    nft: "bg-tag-nft/15 text-tag-nft border-tag-nft/30",
  };
  return (
    colors[tag] || "bg-tag-default/15 text-tag-default border-tag-default/30"
  );
};

const DiscordIcon = () => (
  <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
    <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
  </svg>
);

const TelegramIcon = () => (
  <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
    <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
  </svg>
);

const ProjectCard = ({ project, index, highlightedTags }: ProjectCardProps) => {
  const { name, image, tags, links, isDeprecated, defiLlamaId } = project;

  return (
    <div
      className={cn(
        "glass-card-hover rounded-xl overflow-hidden opacity-0 animate-fade-in",
        isDeprecated && "opacity-50"
      )}
      style={{ animationDelay: `${index * 50}ms` }}
    >
      <div className="p-5">
        <div className="flex items-start gap-4">
          <div className="relative shrink-0">
            <div className="w-14 h-14 rounded-xl overflow-hidden bg-muted/50 flex items-center justify-center">
              <img
                src={image}
                alt={name}
                className="w-full h-full object-cover"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.style.display = "none";
                  const parent = target.parentElement;
                  if (parent) {
                    parent.innerHTML = `<span class="text-2xl font-bold solana-gradient-text">${name.charAt(
                      0
                    )}</span>`;
                  }
                }}
              />
            </div>
            {isDeprecated && (
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-destructive rounded-full" />
            )}
          </div>

          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-lg text-foreground truncate">
              {name}
            </h3>
            <div className="flex flex-wrap gap-1.5 mt-2">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className={cn(
                    "px-2 py-0.5 rounded-md text-xs font-medium border",
                    getTagColor(tag, highlightedTags.has(tag))
                  )}
                >
                  {formatTagLabel(tag)}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 mt-4 pt-4 border-t border-border/30">
          {links.website && (
            <a
              href={links.website}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg bg-muted/30 text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors"
              title="Website"
            >
              <RxGlobe className="h-4 w-4" />
            </a>
          )}
          {links.twitter && (
            <a
              href={links.twitter}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg bg-muted/30 text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors"
              title="Twitter"
            >
              <FaXTwitter className="h-4 w-4" />
            </a>
          )}
          {links.discord && (
            <a
              href={links.discord}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg bg-muted/30 text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors"
              title="Discord"
            >
              <DiscordIcon />
            </a>
          )}
          {links.telegram && (
            <a
              href={links.telegram}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg bg-muted/30 text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors"
              title="Telegram"
            >
              <TelegramIcon />
            </a>
          )}
          {links.medium && (
            <a
              href={links.medium}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg bg-muted/30 text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors"
              title="Medium"
            >
              <FileText className="h-4 w-4" />
            </a>
          )}
          {links.documentation && (
            <a
              href={links.documentation}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg bg-muted/30 text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors"
              title="Documentation"
            >
              <BookOpen className="h-4 w-4" />
            </a>
          )}
          {defiLlamaId && (
            <a
              href={`https://defillama.com/protocol/${defiLlamaId}`}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg bg-muted/30 text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors"
              title="DeFiLlama"
            >
              <BarChart3 className="h-4 w-4" />
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
