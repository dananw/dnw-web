"use client";

import { motion } from "framer-motion";
import { ExternalLink, Github, Calendar } from "lucide-react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Project } from "@/lib/types";
import ProjectAccordion from "./ProjectAccordion";

interface ProjectCardProps {
  project: Project;
  index?: number;
  enableAccordion?: boolean;
}

const ProjectCard = ({
  project,
  index = 0,
  enableAccordion = false,
}: ProjectCardProps) => {
  const getCategoryColor = (category: string) => {
    switch (category) {
      case "frontend":
        return "bg-blue-500/10 text-blue-700 dark:text-blue-300 border-blue-500/20";
      case "fullstack":
        return "bg-green-500/10 text-green-700 dark:text-green-300 border-green-500/20";
      case "mobile":
        return "bg-purple-500/10 text-purple-700 dark:text-purple-300 border-purple-500/20";
      default:
        return "bg-gray-500/10 text-gray-700 dark:text-gray-300 border-gray-500/20";
    }
  };

  if (enableAccordion) {
    return <ProjectAccordion project={project} index={index} />;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -5 }}
      className="h-full"
    >
      <Card className="h-full bg-background/50 backdrop-blur-sm border-border hover:border-primary/50 transition-all duration-300 overflow-hidden group">
        {/* Project Image */}
        <div className="relative overflow-hidden">
          <div className="aspect-video bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center">
            <img
              src={project.image}
              alt={project.title}
              className="object-cover transition-transform duration-300 group-hover:scale-105 w-full h-full"
              onError={(e) => {
                // Fallback UI when image fails to load
                const target = e.currentTarget as HTMLImageElement;
                target.style.display = "none";
                const container = target.parentElement;
                if (container) {
                  container.innerHTML = `
                    <div class="text-center">
                      <div class="text-4xl mb-2">🚀</div>
                      <p class="text-muted-foreground">Project Preview</p>
                    </div>
                  `;
                }
              }}
            />
          </div>

          {/* Category Badge */}
          <div className="absolute top-4 right-4">
            <Badge className={getCategoryColor(project.category)}>
              {project.category}
            </Badge>
          </div>

          {/* Year */}
          <div className="absolute top-4 left-4">
            <div className="flex items-center gap-1 bg-background/80 backdrop-blur-sm px-2 py-1 rounded">
              <Calendar className="h-3 w-3" />
              <span className="text-xs">{project.year}</span>
            </div>
          </div>
        </div>

        <CardHeader className="pb-3">
          <h3 className="text-xl font-semibold text-foreground mb-2">
            {project.title}
          </h3>
          <p className="text-muted-foreground line-clamp-2">
            {project.description}
          </p>
        </CardHeader>

        <CardContent className="pb-3">
          {/* Tech Stack */}
          <div className="flex flex-wrap gap-2 mb-4">
            {project.techStack.slice(0, 4).map((tech) => (
              <Badge
                key={tech}
                variant="secondary"
                className="text-xs bg-muted/50"
              >
                {tech}
              </Badge>
            ))}
            {project.techStack.length > 4 && (
              <Badge variant="secondary" className="text-xs bg-muted/50">
                +{project.techStack.length - 4}
              </Badge>
            )}
          </div>
        </CardContent>

        <CardFooter className="pt-0">
          <div className="flex gap-2 w-full">
            {project.liveUrl && (
              <Button size="sm" asChild className="flex-1">
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2"
                >
                  <ExternalLink className="h-3 w-3" />
                  Live Demo
                </a>
              </Button>
            )}
            {project.githubUrl && (
              <Button size="sm" variant="outline" asChild className="flex-1">
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2"
                >
                  <Github className="h-3 w-3" />
                  Code
                </a>
              </Button>
            )}
          </div>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

export default ProjectCard;
