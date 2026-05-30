"use client";

import { motion } from "framer-motion";
import { ArrowDown, ArrowUpRight, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { profile } from "@/data/profile";
import SocialLinks from "@/components/common/SocialLinks";

const ease = [0.22, 1, 0.36, 1] as const;

const Hero = () => {
  const [firstName, ...rest] = profile.name.split(" ");
  const lastName = rest.join(" ");

  return (
    <section className="grain relative min-h-screen overflow-hidden flex items-center">
      {/* Background atmosphere */}
      <div className="pointer-events-none absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-secondary/40" />
        <div className="absolute inset-0 opacity-[0.5] [background-image:linear-gradient(to_right,hsl(var(--border))_1px,transparent_1px)] [background-size:min(18vw,160px)_100%]" />
        {/* Marigold glow, top-right */}
        <div className="absolute -top-32 -right-24 h-[28rem] w-[28rem] rounded-full bg-accent/15 blur-[120px]" />
      </div>

      <div className="container mx-auto px-6 pt-32 pb-20 relative z-10">
        {/* Kicker row */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease }}
          className="flex flex-wrap items-center justify-between gap-4 border-b border-border pb-5"
        >
          <span className="kicker">
            <span className="kicker-accent">★</span> Portfolio / 2026
          </span>
          <span className="kicker inline-flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
            </span>
            Available for work
          </span>
        </motion.div>

        {/* Name — oversized serif */}
        <div className="mt-10 md:mt-16">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease }}
            className="kicker mb-5"
          >
            Hello — I&apos;m
          </motion.p>
          <h1 className="font-display leading-[0.86] tracking-tight text-foreground">
            <motion.span
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.18, ease }}
              className="block text-[18vw] sm:text-[15vw] md:text-[12vw] lg:text-[10.5rem]"
            >
              {firstName}
            </motion.span>
            <motion.span
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.28, ease }}
              className="block text-[18vw] sm:text-[15vw] md:text-[12vw] lg:text-[10.5rem] italic text-accent"
              style={{ fontWeight: 300 }}
            >
              {lastName}
            </motion.span>
          </h1>
        </div>

        {/* Title + bio + CTA grid */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4, ease }}
          className="mt-12 grid grid-cols-1 gap-10 border-t border-border pt-10 lg:grid-cols-12"
        >
          <div className="lg:col-span-5">
            <h2 className="font-mono text-sm uppercase tracking-[0.18em] text-foreground">
              {profile.title}
            </h2>
            <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-3 py-1 text-xs font-medium text-accent">
              <Star className="h-3.5 w-3.5 fill-current" />
              Top Rated on Upwork
            </div>
          </div>

          <div className="lg:col-span-7">
            <p className="max-w-xl text-lg leading-relaxed text-muted-foreground md:text-xl">
              {profile.bio}
            </p>

            <div className="mt-8 flex flex-col items-start gap-5 sm:flex-row sm:items-center">
              <Button size="lg" className="group rounded-full" asChild>
                <a href="#projects">
                  View selected work
                  <ArrowUpRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
              </Button>
              <SocialLinks />
            </div>
          </div>
        </motion.div>

        {/* Stats — editorial ledger */}
        {profile.stats && profile.stats.length > 0 && (
          <motion.dl
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.55, ease }}
            className="mt-16 grid grid-cols-2 gap-px overflow-hidden rounded-lg border border-border bg-border md:grid-cols-4"
          >
            {profile.stats.map((stat) => (
              <div key={stat.label} className="bg-background p-6">
                <dt className="kicker text-[0.65rem]">{stat.label}</dt>
                <dd className="mt-2 font-display text-4xl text-foreground md:text-5xl">
                  {stat.value}
                </dd>
              </div>
            ))}
          </motion.dl>
        )}
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2">
        <ArrowDown className="h-5 w-5 animate-bounce text-muted-foreground" />
      </div>
    </section>
  );
};

export default Hero;
