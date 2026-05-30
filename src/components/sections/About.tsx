"use client";

import { motion } from "framer-motion";
import { MapPin, Mail, Star } from "lucide-react";
import { skills } from "@/data/skills";
import { profile } from "@/data/profile";
import { Button } from "@/components/ui/button";
import SocialLinks from "@/components/common/SocialLinks";
import SectionHeading from "@/components/common/SectionHeading";

const ease = [0.22, 1, 0.36, 1] as const;

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease } },
};

const experience = [
  {
    title: "Senior Full Stack Developer",
    company: "Upwork Freelance",
    period: "Jul 2016 — Present",
  },
  {
    title: "Frontend Developer",
    company: "PT. Majoo Indonesia",
    period: "Jan 2021 — Aug 2024",
  },
  {
    title: "Frontend Developer",
    company: "Onehub Solution Pte. Ltd.",
    period: "Mar 2017 — Sep 2019",
  },
];

const education = [
  {
    degree: "B.Sc. in Computer Science",
    school: "Institut Asia Malang",
    period: "2014 — 2018",
  },
];

const categoryLabels: Record<string, string> = {
  frontend: "Frontend",
  backend: "Backend",
  tools: "Tooling",
  other: "Infra & Other",
};

const About = () => {
  const skillsByCategory = skills.reduce((acc, skill) => {
    if (!acc[skill.category]) acc[skill.category] = [];
    acc[skill.category].push(skill);
    return acc;
  }, {} as Record<string, typeof skills>);

  return (
    <section id="about" className="py-24 md:py-32">
      <div className="container mx-auto px-6">
        <div className="mx-auto max-w-6xl">
          <SectionHeading
            index="01"
            kicker="About"
            title="Engineering with intent"
            description={profile.bio}
          />

          <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
            {/* Profile Card */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              className="lg:col-span-1"
            >
              <div className="sticky top-24 rounded-lg border border-border bg-card p-8">
                {/* Monogram */}
                <div className="mb-6 flex h-24 w-24 items-center justify-center rounded-lg border border-border bg-accent/10">
                  <span className="font-display text-3xl italic text-accent">
                    DW
                  </span>
                </div>

                <h3 className="font-display text-2xl text-foreground">
                  {profile.name}
                </h3>
                <p className="mt-1 font-mono text-xs uppercase tracking-[0.15em] text-muted-foreground">
                  {profile.title}
                </p>

                <dl className="mt-6 space-y-3 border-t border-border pt-6 text-sm">
                  <div className="flex items-center gap-3 text-muted-foreground">
                    <Mail className="h-4 w-4 text-accent" />
                    <span className="break-all">{profile.social.email}</span>
                  </div>
                  <div className="flex items-center gap-3 text-muted-foreground">
                    <MapPin className="h-4 w-4 text-accent" />
                    <span>Ngawi, Indonesia</span>
                  </div>
                  <div className="flex items-center gap-3 text-muted-foreground">
                    <Star className="h-4 w-4 text-accent" />
                    <span>Top Rated · 100% Job Success</span>
                  </div>
                </dl>

                <Button className="mt-6 w-full rounded-full" asChild>
                  <a href={`mailto:${profile.social.email}`}>Get in touch</a>
                </Button>

                <div className="mt-6 border-t border-border pt-6">
                  <SocialLinks variant="button" className="justify-start" />
                </div>
              </div>
            </motion.div>

            {/* Main Content */}
            <div className="space-y-16 lg:col-span-2">
              {/* Story */}
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
              >
                <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent">
                  / Journey
                </p>
                <div className="mt-5 space-y-5 text-lg leading-relaxed text-muted-foreground">
                  <p>
                    With <span className="text-foreground">10+ years</span> and
                    a Top Rated track record on Upwork (100% Job Success, $40K+
                    earned), I help startups and enterprises build scalable,
                    high-performance platforms aligned with real business goals
                    — across e-commerce, SaaS, fintech, healthcare, real estate,
                    and logistics.
                  </p>
                  <p>
                    I focus on outcomes and collaboration: turning ideas into
                    clear plans, shipping reliably, and crafting experiences
                    people genuinely enjoy. Working closely with founders and
                    teams, I align goals, reduce complexity, and measure success
                    through real impact.
                  </p>
                  <p>
                    I emphasize clean, maintainable code and modular
                    architecture — backed by code reviews, CI/CD, testing, and
                    clear documentation that keep projects robust and ready to
                    grow.
                  </p>
                </div>
              </motion.div>

              {/* Experience timeline */}
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
              >
                <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent">
                  / Experience
                </p>
                <ol className="mt-5 border-l border-border">
                  {experience.map((item) => (
                    <li key={`${item.company}-${item.period}`} className="relative pl-6 pb-8 last:pb-0">
                      <span className="absolute -left-[5px] top-1.5 h-2.5 w-2.5 rounded-full border-2 border-accent bg-background" />
                      <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
                        <h4 className="font-display text-xl text-foreground">
                          {item.title}
                        </h4>
                        <span className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
                          {item.period}
                        </span>
                      </div>
                      <p className="mt-1 text-muted-foreground">
                        {item.company}
                      </p>
                    </li>
                  ))}
                </ol>
              </motion.div>

              {/* Education */}
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
              >
                <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent">
                  / Education
                </p>
                <ol className="mt-5 border-l border-border">
                  {education.map((item) => (
                    <li key={`${item.school}-${item.period}`} className="relative pl-6">
                      <span className="absolute -left-[5px] top-1.5 h-2.5 w-2.5 rounded-full border-2 border-accent bg-background" />
                      <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
                        <h4 className="font-display text-xl text-foreground">
                          {item.degree}
                        </h4>
                        <span className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
                          {item.period}
                        </span>
                      </div>
                      <p className="mt-1 text-muted-foreground">
                        {item.school}
                      </p>
                    </li>
                  ))}
                </ol>
              </motion.div>

              {/* Skills */}
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
              >
                <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent">
                  / Technical Skills
                </p>
                <div className="mt-5 space-y-8">
                  {Object.entries(skillsByCategory).map(
                    ([category, categorySkills]) => (
                      <div key={category}>
                        <h3 className="mb-4 font-mono text-xs uppercase tracking-[0.15em] text-muted-foreground">
                          {categoryLabels[category] ?? category}
                        </h3>
                        <div className="grid grid-cols-1 gap-x-8 gap-y-3 sm:grid-cols-2">
                          {categorySkills.map((skill) => (
                            <div
                              key={skill.name}
                              className="flex items-center justify-between border-b border-border/60 pb-2"
                            >
                              <span className="text-foreground">
                                {skill.name}
                              </span>
                              <div className="flex gap-1">
                                {[...Array(5)].map((_, i) => (
                                  <div
                                    key={i}
                                    className={`h-1.5 w-4 rounded-sm ${
                                      i < skill.level
                                        ? "bg-accent"
                                        : "bg-muted-foreground/20"
                                    }`}
                                  />
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )
                  )}
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
