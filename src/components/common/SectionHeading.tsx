"use client";

import { motion } from "framer-motion";

interface SectionHeadingProps {
  index: string;
  kicker: string;
  title: string;
  description?: string;
  align?: "left" | "center";
}

const ease = [0.22, 1, 0.36, 1] as const;

const SectionHeading = ({
  index,
  kicker,
  title,
  description,
  align = "left",
}: SectionHeadingProps) => {
  const isCenter = align === "center";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, ease }}
      className={`mb-14 ${isCenter ? "text-center" : ""}`}
    >
      <div
        className={`flex items-center gap-3 ${
          isCenter ? "justify-center" : ""
        }`}
      >
        <span className="kicker kicker-accent">{index}</span>
        <span className="h-px w-8 bg-accent/50" />
        <span className="kicker">{kicker}</span>
      </div>

      <h2 className="mt-4 font-display text-4xl leading-[1.02] tracking-tight text-foreground md:text-6xl">
        {title}
      </h2>

      {description && (
        <p
          className={`mt-5 max-w-2xl text-lg leading-relaxed text-muted-foreground ${
            isCenter ? "mx-auto" : ""
          }`}
        >
          {description}
        </p>
      )}
    </motion.div>
  );
};

export default SectionHeading;
