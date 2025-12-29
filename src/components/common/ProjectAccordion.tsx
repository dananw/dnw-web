import {
  ExternalLink,
  Github,
  Calendar,
  Rocket,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Project } from "@/lib/types";
import Image from "next/image";

interface ProjectCardProps {
  project: Project | null;
}

const ProjectCard = ({ project }: ProjectCardProps) => {

  if (!project) {
    return (
      <div className="border border-border rounded-lg overflow-hidden bg-card">
        <div className="p-6">
          <p className="text-muted-foreground">Project not found</p>
        </div>
      </div>
    );
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "frontend":
        return "bg-blue-500/10 text-blue-500 border-blue-500/20 rounded-lg px-4 py-2 font-medium text-sm";
      case "fullstack":
        return "bg-green-500/10 text-green-500 border-green-500/20 rounded-lg px-4 py-2 font-medium text-sm";
      case "mobile":
        return "bg-purple-500/10 text-purple-500 border-purple-500/20 rounded-lg px-4 py-2 font-medium text-sm";
      default:
        return "bg-gray-500/10 text-gray-500 border-gray-500/20 rounded-lg px-4 py-2 font-medium text-sm";
    }
  };

  return (
    <div className="border border-border rounded-lg overflow-hidden bg-card">
      <div className="p-6 space-y-6">
        {/* Header */}
        <div>
          <h3 className="text-xl font-bold text-foreground mb-2">
            {project.title}
          </h3>
          <p className="text-muted-foreground mb-3">{project.description}</p>
          <div className="flex items-center gap-4">
            <Badge className={getCategoryColor(project.category)}>
              {project.category}
            </Badge>
            <div className="flex items-center gap-1 text-muted-foreground">
              <Calendar className="h-4 w-4" />
              <span className="text-md">{project.year}</span>
            </div>
          </div>
        </div>

        {/* Image Gallery */}
        <div className="relative aspect-video rounded-lg overflow-hidden bg-muted/20">
          {project.image ? (
            <Image
              src={project.image}
              alt={`${project.title} - Preview`}
              width={1200}
              height={675}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <div className="text-center">
                <Rocket className="h-12 w-12 mx-auto mb-2 text-muted-foreground" />
                <p className="text-muted-foreground">Project Preview</p>
              </div>
            </div>
          )}
        </div>

        {/* Long Description */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Project Overview</h3>
          <p className="text-muted-foreground leading-relaxed">
            {project.longDescription || project.description}
          </p>
        </div>

        {/* Features */}
        {project.features && project.features.length > 0 && (
          <div>
            <h3 className="text-lg font-semibold mb-3">Key Features</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {project.features.map((feature, index) => (
                <div key={index} className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                  <span className="text-sm text-muted-foreground">
                    {feature}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tech Stack */}
        <div>
          <h3 className="text-lg font-semibold mb-3">
            Technologies Used
          </h3>
          <div className="flex flex-wrap gap-2">
            {project.techStack.map((tech) => (
              <Badge
                key={tech}
                variant="outline"
                className="rounded-lg px-4 py-2"
              >
                {tech}
              </Badge>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 pt-4">
          {project.liveUrl && (
            <Button asChild className="flex-1">
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2"
              >
                <ExternalLink className="h-4 w-4" />
                Live Website
              </a>
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
