import { useState } from "react";
import { ChevronUp, ChevronDown, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { cn } from "@/lib/utils";

type DeprecatedFilter = "active" | "all" | "deprecated";

interface FilterPanelProps {
  tags: string[];
  selectedTags: string[];
  onTagsChange: (tags: string[]) => void;
  deprecatedFilter: DeprecatedFilter;
  onDeprecatedFilterChange: (filter: DeprecatedFilter) => void;
  isOpen: boolean;
  onToggle: () => void;
}

const FilterPanel = ({
  tags,
  selectedTags,
  onTagsChange,
  deprecatedFilter,
  onDeprecatedFilterChange,
  isOpen,
  onToggle,
}: FilterPanelProps) => {
  const [expandedSections, setExpandedSections] = useState<Set<string>>(
    new Set(["status", "tags"])
  );

  const toggleSection = (section: string) => {
    const newExpanded = new Set(expandedSections);
    if (newExpanded.has(section)) {
      newExpanded.delete(section);
    } else {
      newExpanded.add(section);
    }
    setExpandedSections(newExpanded);
  };

  const handleTagToggle = (tag: string) => {
    if (selectedTags.includes(tag)) {
      onTagsChange(selectedTags.filter((t) => t !== tag));
    } else {
      onTagsChange([...selectedTags, tag]);
    }
  };

  const handleSelectAll = () => {
    if (selectedTags.length === tags.length) {
      onTagsChange([]);
    } else {
      onTagsChange([...tags]);
    }
  };

  return (
    <>
      <Button
        onClick={onToggle}
        variant="outline"
        className="rounded-full px-4 py-2 h-auto font-normal"
      >
        <Filter className="h-4 w-4 mr-2" />
        {isOpen ? "Hide Filters" : "Show Filters"}
      </Button>

      {isOpen && (
        <div className="glass-card rounded-2xl p-6 mt-4">
          <Collapsible
            open={expandedSections.has("status")}
            onOpenChange={() => toggleSection("status")}
          >
            <CollapsibleTrigger className="flex w-full items-center justify-between py-2 text-sm font-semibold uppercase tracking-wide text-muted-foreground hover:text-foreground transition-colors">
              <span>STATUS</span>
              {expandedSections.has("status") ? (
                <ChevronUp className="h-4 w-4" />
              ) : (
                <ChevronDown className="h-4 w-4" />
              )}
            </CollapsibleTrigger>
            <CollapsibleContent className="pt-4 space-y-3">
              <Select
                value={deprecatedFilter}
                onValueChange={(value) =>
                  onDeprecatedFilterChange(value as DeprecatedFilter)
                }
              >
                <SelectTrigger className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="deprecated">Deprecated</SelectItem>
                </SelectContent>
              </Select>
            </CollapsibleContent>
          </Collapsible>

          <div className="border-t border-border/50 my-4" />

          <Collapsible
            open={expandedSections.has("tags")}
            onOpenChange={() => toggleSection("tags")}
          >
            <CollapsibleTrigger className="flex w-full items-center justify-between py-2 text-sm font-semibold uppercase tracking-wide text-muted-foreground hover:text-foreground transition-colors">
              <span>CATEGORIES</span>
              {expandedSections.has("tags") ? (
                <ChevronUp className="h-4 w-4" />
              ) : (
                <ChevronDown className="h-4 w-4" />
              )}
            </CollapsibleTrigger>
            <CollapsibleContent className="pt-4 space-y-3">
              <div className="flex items-center space-x-2 pb-2 border-b border-border/30">
                <Checkbox
                  id="select-all"
                  checked={
                    selectedTags.length === tags.length && tags.length > 0
                  }
                  onCheckedChange={handleSelectAll}
                />
                <Label
                  htmlFor="select-all"
                  className="text-sm font-medium cursor-pointer"
                >
                  All Categories
                </Label>
              </div>
              <div className="space-y-2 max-h-[400px] overflow-y-auto">
                {tags.map((tag) => (
                  <div key={tag} className="flex items-center space-x-2">
                    <Checkbox
                      id={`tag-${tag}`}
                      checked={selectedTags.includes(tag)}
                      onCheckedChange={() => handleTagToggle(tag)}
                    />
                    <Label
                      htmlFor={`tag-${tag}`}
                      className="text-sm cursor-pointer capitalize"
                    >
                      {tag.replace(/-/g, " ")}
                    </Label>
                  </div>
                ))}
              </div>
            </CollapsibleContent>
          </Collapsible>
        </div>
      )}
    </>
  );
};

export default FilterPanel;
