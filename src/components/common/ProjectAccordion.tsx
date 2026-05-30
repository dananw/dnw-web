"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ExternalLink, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Project } from "@/lib/types";
import Image from "next/image";

interface ProjectAccordionProps {
  project: Project | null;
  index?: number;
}

const ease = [0.22, 1, 0.36, 1] as const;

const ProjectAccordion = ({ project, index = 0 }: ProjectAccordionProps) => {
  const [open, setOpen] = useState(false);

  if (!project) {
    return (
      <div className="border-b border-border py-6">
        <p className="text-muted-foreground">Project not found</p>
      </div>
    );
  }

  const num = String(index + 1).padStart(2, "0");

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, ease }}
      className="group border-t border-border last:border-b"
    >
      {/* Trigger row */}
      <button
        onClick={() => setOpen((p) => !p)}
        aria-expanded={open}
        className="flex w-full items-center gap-4 py-6 text-left transition-colors md:gap-8"
      >
        <span className="font-mono text-xs text-accent">{num}</span>

        <div className="flex flex-1 flex-col gap-1 md:flex-row md:items-baseline md:justify-between md:gap-6">
          <h3 className="font-display text-2xl text-foreground transition-colors group-hover:text-accent md:text-4xl">
            {project.title}
          </h3>
          <p className="max-w-md text-sm text-muted-foreground md:text-right">
            {project.description}
          </p>
        </div>

        <div className="flex items-center gap-4">
          <span className="hidden font-mono text-xs uppercase tracking-wider text-muted-foreground sm:inline">
            {project.category} · {project.year}
          </span>
          <span
            className={`flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full border border-border transition-all duration-300 group-hover:border-accent ${
              open ? "rotate-45 bg-accent text-accent-foreground" : "text-foreground"
            }`}
          >
            <Plus className="h-4 w-4" />
          </span>
        </div>
      </button>

      {/* Expandable content */}
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease }}
            className="overflow-hidden"
          >
            <div className="grid grid-cols-1 gap-8 pb-10 lg:grid-cols-2">
              {/* Image */}
              <div className="relative aspect-video overflow-hidden rounded-lg border border-border bg-secondary/40">
                {project.image && (
                  <Image
                    src={project.image}
                    alt={`${project.title} preview`}
                    width={1200}
                    height={675}
                    className="h-full w-full object-cover"
                  />
                )}
              </div>

              {/* Details */}
              <div className="flex flex-col">
                <p className="leading-relaxed text-muted-foreground">
                  {project.longDescription || project.description}
                </p>

                {project.features && project.features.length > 0 && (
                  <div className="mt-6">
                    <p className="font-mono text-xs uppercase tracking-[0.15em] text-accent">
                      Key Features
                    </p>
                    <ul className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-2">
                      {project.features.map((feature, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                          <span className="mt-1.5 h-1 w-1 flex-shrink-0 rounded-full bg-accent" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <div className="mt-6">
                  <p className="font-mono text-xs uppercase tracking-[0.15em] text-accent">
                    Stack
                  </p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {project.techStack.map((tech) => (
                      <span
                        key={tech}
                        className="rounded-full border border-border bg-secondary/60 px-3 py-1 font-mono text-xs text-muted-foreground"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {project.liveUrl && (
                  <div className="mt-8">
                    <Button className="rounded-full" asChild>
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2"
                      >
                        Visit live site
                        <ExternalLink className="h-4 w-4" />
                      </a>
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default ProjectAccordion;
