"use client";

import { motion } from "framer-motion";
import { MapPin, ArrowUpRight } from "lucide-react";
import { profile } from "@/data/profile";
import SocialLinks from "@/components/common/SocialLinks";

const ease = [0.22, 1, 0.36, 1] as const;

const Contact = () => {
  return (
    <section
      id="contact"
      className="grain relative overflow-hidden py-24 md:py-32 bg-primary text-primary-foreground"
    >
      {/* Marigold glow */}
      <div className="pointer-events-none absolute -bottom-40 left-1/2 h-[30rem] w-[30rem] -translate-x-1/2 rounded-full bg-accent/20 blur-[140px]" />

      <div className="container relative z-10 mx-auto px-6">
        <div className="mx-auto max-w-5xl">
          {/* Kicker */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease }}
            className="flex items-center gap-3"
          >
            <span className="kicker kicker-accent">05</span>
            <span className="h-px w-8 bg-accent/60" />
            <span className="kicker text-primary-foreground/60">Contact</span>
          </motion.div>

          {/* Big statement */}
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1, ease }}
            className="mt-6 font-display text-5xl leading-[0.95] tracking-tight md:text-7xl lg:text-8xl"
          >
            Let&apos;s build
            <br />
            something <span className="italic text-accent">good</span>.
          </motion.h2>

          {/* Email as giant link */}
          <motion.a
            href={`mailto:${profile.social.email}`}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2, ease }}
            className="group mt-12 inline-flex items-center gap-3 border-b border-primary-foreground/20 pb-2 text-2xl text-primary-foreground/90 transition-colors hover:border-accent hover:text-accent md:text-4xl"
          >
            {profile.social.email}
            <ArrowUpRight className="h-6 w-6 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1 md:h-9 md:w-9" />
          </motion.a>

          {/* Meta row */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.3, ease }}
            className="mt-16 grid grid-cols-1 gap-10 border-t border-primary-foreground/15 pt-10 sm:grid-cols-3"
          >
            <div>
              <p className="kicker text-primary-foreground/50">Based in</p>
              <p className="mt-3 flex items-center gap-2 text-primary-foreground/90">
                <MapPin className="h-4 w-4 text-accent" />
                Ngawi, Indonesia
              </p>
            </div>

            <div>
              <p className="kicker text-primary-foreground/50">Availability</p>
              <p className="mt-3 text-primary-foreground/90">
                Open to new projects
              </p>
            </div>

            <div>
              <p className="kicker text-primary-foreground/50">Elsewhere</p>
              <div className="mt-3 [&_a]:text-primary-foreground/70 [&_a:hover]:text-accent">
                <SocialLinks className="justify-start" />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
