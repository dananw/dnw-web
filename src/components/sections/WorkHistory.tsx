"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Star, Calendar, ChevronDown } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { workHistory } from "@/data/workHistory";
import SectionHeading from "@/components/common/SectionHeading";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
    },
  },
};

const StarRating = ({ rating }: { rating: number }) => (
  <div
    className="flex items-center gap-0.5"
    role="img"
    aria-label={`${rating} out of 5 stars`}
  >
    {[...Array(5)].map((_, i) => (
      <Star
        key={i}
        className={`h-3.5 w-3.5 ${
          i < rating
            ? "fill-yellow-400 text-yellow-400"
            : "fill-muted-foreground/20 text-muted-foreground/20"
        }`}
        aria-hidden="true"
      />
    ))}
    <span className="ml-1 text-xs font-medium text-foreground">
      {rating.toFixed(1)}
    </span>
  </div>
);

const INITIAL_COUNT = 4;

const WorkHistory = () => {
  const [expanded, setExpanded] = useState(false);

  if (!workHistory.length) return null;

  const visibleItems = expanded
    ? workHistory
    : workHistory.slice(0, INITIAL_COUNT);
  const hiddenCount = workHistory.length - INITIAL_COUNT;

  return (
    <section id="work-history" className="py-24 md:py-32">
      <div className="container mx-auto px-6">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
          className="max-w-4xl mx-auto"
        >
          {/* Section Header */}
          <SectionHeading
            index="04"
            kicker="Track Record"
            title="Work history"
            description={`${workHistory.length} completed jobs on Upwork across full-stack, frontend, and design-to-code projects.`}
          />

          {/* Job List */}
          <ol className="space-y-px">
            {visibleItems.map((job) => (
              <motion.li
                key={job.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4 }}
                className="border-b border-border py-6 first:pt-0"
              >
                <div className="flex items-start justify-between gap-4">
                  <h3 className="font-semibold text-foreground">{job.title}</h3>
                  {job.rating && (
                    <div className="flex-shrink-0 pt-0.5">
                      <StarRating rating={job.rating} />
                    </div>
                  )}
                </div>

                <div className="mt-1.5 flex items-center gap-1.5 text-sm text-muted-foreground">
                  <Calendar className="h-3.5 w-3.5" />
                  <span>{job.period}</span>
                </div>

                {job.tags.length > 0 && (
                  <div className="mt-3 flex flex-wrap gap-2">
                    {job.tags.map((tag) => (
                      <Badge
                        key={tag}
                        variant="secondary"
                        className="rounded-full border border-border bg-muted px-3 py-1 text-xs font-normal text-muted-foreground"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                )}

                <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
                  <span className="font-medium text-foreground">
                    Job description:{" "}
                  </span>
                  {job.description}
                </p>
              </motion.li>
            ))}
          </ol>

          {/* Show more / less */}
          {hiddenCount > 0 && (
            <motion.div variants={itemVariants} className="text-center mt-10">
              <Button
                variant="outline"
                onClick={() => setExpanded((prev) => !prev)}
                aria-expanded={expanded}
              >
                {expanded ? "Show less" : `Show ${hiddenCount} more`}
                <ChevronDown
                  className={`ml-2 h-4 w-4 transition-transform ${
                    expanded ? "rotate-180" : ""
                  }`}
                />
              </Button>
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default WorkHistory;
