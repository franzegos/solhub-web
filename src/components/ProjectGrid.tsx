import ProjectCard from "./ProjectCard";
import type { SolanaProject } from "@/data/projects";
import { Frown } from "lucide-react";

interface ProjectGridProps {
  projects: SolanaProject[];
  highlightedTags: Set<string>;
}

const ProjectGrid = ({ projects, highlightedTags }: ProjectGridProps) => {
  if (projects.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-muted-foreground">
        <Frown className="h-12 w-12 mb-4 opacity-50" />
        <p className="text-lg">No projects found</p>
        <p className="text-sm">Try adjusting your search or filters</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {projects.map((project, index) => (
        <ProjectCard
          key={project.id}
          project={project}
          index={index}
          highlightedTags={highlightedTags}
        />
      ))}
    </div>
  );
};

export default ProjectGrid;
