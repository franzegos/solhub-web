import { useState, useMemo } from "react";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import SearchBar from "@/components/SearchBar";
import TagFilter from "@/components/TagFilter";
import ProjectGrid from "@/components/ProjectGrid";
import { Skeleton } from "@/components/ui/skeleton";
import { usePlatforms } from "@/hooks/use-platforms";
import { transformPlatformToProject } from "@/lib/platform-utils";
import { AlertCircle, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type DeprecatedFilter = "active" | "all" | "deprecated";

const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [deprecatedFilter, setDeprecatedFilter] =
    useState<DeprecatedFilter>("all");

  const { data: platforms, isLoading, error, refetch } = usePlatforms();

  const allProjects = useMemo(() => {
    if (!platforms) return [];

    const platformsArray = Array.isArray(platforms) ? platforms : [];

    try {
      return platformsArray.map(transformPlatformToProject);
    } catch (error) {
      console.error("Error transforming platforms:", error);
      return [];
    }
  }, [platforms]);

  const filteredProjects = useMemo(() => {
    return allProjects.filter((project) => {
      const matchesSearch = project.name
        .toLowerCase()
        .includes(searchQuery.toLowerCase());

      const matchesTag =
        selectedTag === null || project.tags.includes(selectedTag);

      const matchesDeprecated =
        deprecatedFilter === "all" ||
        (deprecatedFilter === "active" && !project.isDeprecated) ||
        (deprecatedFilter === "deprecated" && project.isDeprecated);

      return matchesSearch && matchesTag && matchesDeprecated;
    });
  }, [allProjects, searchQuery, selectedTag, deprecatedFilter]);

  const availableTags = useMemo(() => {
    return [...new Set(allProjects.flatMap((p) => p.tags))].sort();
  }, [allProjects]);

  const highlightedTags = useMemo(() => {
    const tagCounts = new Map<string, number>();

    allProjects.forEach((project) => {
      project.tags.forEach((tag) => {
        tagCounts.set(tag, (tagCounts.get(tag) || 0) + 1);
      });
    });

    const sortedTags = Array.from(tagCounts.entries())
      .filter(([tag]) => tag !== "dapp")
      .sort((a, b) => b[1] - a[1])
      .map(([tag]) => tag);

    return new Set(sortedTags.slice(0, 4));
  }, [allProjects]);

  const projectCount = filteredProjects.length;

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <HeroSection />

      <main className="container mx-auto px-4 pb-16">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 my-6">
          <div className="flex items-center gap-3">
            <h2 className="text-2xl md:text-3xl font-bold">Projects</h2>
            {!isLoading && (
              <span className="px-2.5 py-0.5 rounded-full text-sm font-medium bg-muted text-muted-foreground">
                {projectCount}
              </span>
            )}
          </div>
          <div className="flex items-center gap-4">
            <Select
              value={deprecatedFilter}
              onValueChange={(value) =>
                setDeprecatedFilter(value as DeprecatedFilter)
              }
            >
              <SelectTrigger className="w-[140px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="deprecated">Deprecated</SelectItem>
              </SelectContent>
            </Select>
            <div className="w-[275px]">
              <SearchBar value={searchQuery} onChange={setSearchQuery} />
            </div>
          </div>
        </div>

        {!isLoading && (
          <div className="mb-8 flex flex-col sm:flex-row items-start sm:items-center gap-4 flex-wrap">
            <TagFilter
              tags={availableTags}
              selectedTag={selectedTag}
              onSelectTag={setSelectedTag}
              highlightedTags={highlightedTags}
            />
          </div>
        )}

        {error && (
          <div className="mb-6 p-4 rounded-lg bg-destructive/10 border border-destructive/20 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <AlertCircle className="h-5 w-5 text-destructive" />
              <div>
                <p className="text-sm font-medium text-destructive">
                  Error loading platforms
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  {error instanceof Error
                    ? error.message
                    : "Failed to fetch platforms"}
                </p>
              </div>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => refetch()}
              className="ml-4"
            >
              <RefreshCw className="h-4 w-4 mr-2" />
              Retry
            </Button>
          </div>
        )}

        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <div key={i} className="glass-card rounded-xl p-5">
                <div className="flex items-start gap-4">
                  <Skeleton className="w-14 h-14 rounded-xl" />
                  <div className="flex-1 space-y-2">
                    <Skeleton className="h-5 w-24" />
                    <div className="flex gap-2">
                      <Skeleton className="h-6 w-16" />
                      <Skeleton className="h-6 w-16" />
                    </div>
                  </div>
                </div>
                <div className="flex gap-2 mt-4 pt-4 border-t border-border/30">
                  <Skeleton className="h-8 w-8 rounded-lg" />
                  <Skeleton className="h-8 w-8 rounded-lg" />
                  <Skeleton className="h-8 w-8 rounded-lg" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <ProjectGrid
            projects={filteredProjects}
            highlightedTags={highlightedTags}
          />
        )}
      </main>

      <footer className="border-t border-border/50 py-8">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p className="flex items-center justify-center gap-1">
            Made with ❤️ by
            <a
              href="https://x.com/frnzgs"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-primary hover:underline hover:transition-colors underline"
            >
              Franz
            </a>
            •
            <a
              href="https://tiplink.io/blinks/donate?dest=7koMXMUCGr8u8jD4R8bg79fyawkZUp3biVJaBpZW8qZS"
              target="_blank"
              rel="noopener noreferrer"
              className=" text-blue-500 hover:underline"
            >
              Buy him a coffee or lambo
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
