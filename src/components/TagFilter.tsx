import { cn, formatTagLabel } from "@/lib/utils";

interface TagFilterProps {
  tags: string[];
  selectedTag: string | null;
  onSelectTag: (tag: string | null) => void;
  highlightedTags: Set<string>;
}

const getTagStyles = (
  tag: string,
  isSelected: boolean,
  isHighlighted: boolean
) => {
  const baseStyles =
    "px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 cursor-pointer border";

  if (isSelected) {
    return cn(
      baseStyles,
      "solana-gradient text-primary-foreground border-transparent shadow-lg"
    );
  }

  if (!isHighlighted) {
    return cn(
      baseStyles,
      "bg-muted/30 border-tag-default/30 text-tag-default hover:bg-tag-default/10"
    );
  }

  const tagColors: Record<string, string> = {
    memecoin:
      "border-tag-memecoin/30 text-tag-memecoin hover:bg-tag-memecoin/10",
    dapp: "border-tag-dapp/30 text-tag-dapp hover:bg-tag-dapp/10",
    launchpad:
      "border-tag-launchpad/30 text-tag-launchpad hover:bg-tag-launchpad/10",
    defi: "border-tag-defi/30 text-tag-defi hover:bg-tag-defi/10",
    nft: "border-tag-nft/30 text-tag-nft hover:bg-tag-nft/10",
  };

  return cn(
    baseStyles,
    "bg-muted/30",
    tagColors[tag] ||
      "border-tag-default/30 text-tag-default hover:bg-tag-default/10"
  );
};

const TagFilter = ({
  tags,
  selectedTag,
  onSelectTag,
  highlightedTags,
}: TagFilterProps) => {
  return (
    <div className="flex flex-wrap gap-2">
      <button
        onClick={() => onSelectTag(null)}
        className={cn(
          "px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 border",
          selectedTag === null
            ? "solana-gradient text-primary-foreground border-transparent shadow-lg"
            : "bg-muted/30 border-border/50 text-muted-foreground hover:text-foreground hover:bg-muted/50"
        )}
      >
        All
      </button>
      {tags.map((tag) => (
        <button
          key={tag}
          onClick={() => onSelectTag(tag === selectedTag ? null : tag)}
          className={getTagStyles(
            tag,
            tag === selectedTag,
            highlightedTags.has(tag)
          )}
        >
          {formatTagLabel(tag)}
        </button>
      ))}
    </div>
  );
};

export default TagFilter;
