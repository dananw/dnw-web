"use client";

import { motion } from "framer-motion";
import React from "react";
import { projects } from "@/data/projects";
import ProjectCard from "@/components/common/ProjectCard";
import SectionHeading from "@/components/common/SectionHeading";

const Projects = () => {
  // Sort projects by year (newest first)
  const sortedProjects = [...projects].sort((a, b) => b.year - a.year);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  return (
    <section id="projects" className="py-24 md:py-32">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <SectionHeading
            index="02"
            kicker="Selected Work"
            title="Featured projects"
            description="A selection of recent work across full-stack, frontend, and design-to-code — built for startups and enterprises worldwide."
          />

          {/* Projects Grid */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
          >
            {sortedProjects.map((project, index) => (
              <ProjectCard
                key={project.id}
                project={project}
                index={index}
                enableAccordion={true}
              />
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Projects;
