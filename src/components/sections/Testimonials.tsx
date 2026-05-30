"use client";

import { motion } from "framer-motion";
import { Star, Quote, ExternalLink } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { testimonials } from "@/data/testimonials";
import { profile } from "@/data/profile";
import SectionHeading from "@/components/common/SectionHeading";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
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
        className={`h-4 w-4 ${
          i < rating
            ? "fill-yellow-400 text-yellow-400"
            : "fill-muted text-muted"
        }`}
        aria-hidden="true"
      />
    ))}
    <span className="ml-1.5 text-sm font-medium text-foreground">
      {rating.toFixed(1)}
    </span>
  </div>
);

const Testimonials = () => {
  if (!testimonials.length) return null;

  return (
    <section id="testimonials" className="py-24 md:py-32 bg-secondary/40">
      <div className="container mx-auto px-6">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
          className="max-w-6xl mx-auto"
        >
          {/* Section Header */}
          <SectionHeading
            index="03"
            kicker="Client Feedback"
            title="What clients say"
            description="Verified reviews from clients I've partnered with on Upwork — a consistent 5.0 rating across projects."
          />

          {/* Testimonials Grid */}
          <motion.div
            variants={containerVariants}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            {testimonials.map((t) => (
              <motion.div key={t.id} variants={itemVariants}>
                <Card className="h-full bg-background/50 backdrop-blur-sm border-border hover:border-primary/50 transition-colors duration-300">
                  <CardContent className="p-6 flex flex-col h-full">
                    <div className="flex items-start justify-between gap-4 mb-4">
                      <h3 className="font-semibold text-foreground">
                        {t.projectTitle}
                      </h3>
                      <Quote className="h-5 w-5 text-primary/40 flex-shrink-0" />
                    </div>

                    <StarRating rating={t.rating} />

                    <p className="mt-4 text-muted-foreground leading-relaxed italic flex-1">
                      &ldquo;{t.quote}&rdquo;
                    </p>

                    <div className="mt-6 flex items-center justify-between text-sm">
                      <span className="font-medium text-foreground">
                        {t.client ?? "Verified Client"}
                      </span>
                      <span className="text-muted-foreground">{t.date}</span>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>

          {/* CTA to Upwork profile */}
          {profile.social.upwork && (
            <motion.div
              variants={itemVariants}
              className="text-center mt-12"
            >
              <Button variant="outline" asChild>
                <a
                  href={profile.social.upwork}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View full profile on Upwork
                  <ExternalLink className="ml-2 h-4 w-4" />
                </a>
              </Button>
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;
