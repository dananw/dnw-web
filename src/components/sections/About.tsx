"use client";

import { motion } from "framer-motion";
import {
  Code,
  Database,
  Globe,
  Smartphone,
  Palette,
  Server,
  Calendar,
  MapPin,
  Download,
  Mail,
  Phone,
  Award,
  Briefcase,
  GraduationCap,
} from "lucide-react";
import { skills } from "@/data/skills";
import { profile } from "@/data/profile";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const About = () => {
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

  const skillsByCategory = skills.reduce((acc, skill) => {
    if (!acc[skill.category]) {
      acc[skill.category] = [];
    }
    acc[skill.category].push(skill);
    return acc;
  }, {} as Record<string, typeof skills>);

  const experience = [
    {
      title: "Senior Full Stack Developer",
      company: "Upwork Freelance",
      period: "Jul 2016 - Present",
      description: "",
    },
    {
      title: "Frontend Developer",
      company: "PT.Majoo Indonesia",
      period: "Jan 2021 - Aug 2024",
      description: "",
    },
    {
      title: "Frontend Developer",
      company: "Onehub Solution Pte. Ltd.",
      period: "Mar 2017 - Sep 2019",
      description: "",
    },
  ];

  const education = [
    {
      degree: "Bachelor of Science in Computer Science",
      school: "Institut Asia Malang",
      period: "2014 - 2018",
      description: "",
    },
  ];

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "frontend":
        return <div className="w-3 h-3 bg-blue-500 rounded-full" />;
      case "backend":
        return <div className="w-3 h-3 bg-green-500 rounded-full" />;
      case "tools":
        return <div className="w-3 h-3 bg-purple-500 rounded-full" />;
      default:
        return <div className="w-3 h-3 bg-gray-500 rounded-full" />;
    }
  };

  return (
    <section id="about" className="py-24 bg-muted/30">
      <div className="container mx-auto px-6">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
          className="max-w-6xl mx-auto"
        >
          {/* Section Header */}
          <motion.div variants={itemVariants} className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              About Me
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              {profile.bio}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-16">
            {/* Profile Card */}
            <motion.div variants={itemVariants} className="lg:col-span-1">
              <Card className="bg-background/50 backdrop-blur-sm border-border sticky top-24">
                <CardContent className="p-8">
                  <div className="text-center">
                    {/* Profile Image Placeholder */}
                    <div className="w-32 h-32 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-full mx-auto mb-6 flex items-center justify-center">
                      <span className="text-4xl">👨‍💻</span>
                    </div>

                    <h2 className="text-2xl font-bold text-foreground mb-2">
                      {profile.name}
                    </h2>
                    <p className="text-muted-foreground mb-6">
                      {profile.title}
                    </p>

                    {/* Quick Info */}
                    <div className="space-y-3 text-left mb-6">
                      <div className="flex items-center gap-3 text-sm text-muted-foreground">
                        <Mail className="h-4 w-4" />
                        <span>{profile.social.email}</span>
                      </div>
                      <div className="flex items-center gap-3 text-sm text-muted-foreground">
                        <MapPin className="h-4 w-4" />
                        <span>Ngawi, Indonesia</span>
                      </div>
                      <div className="flex items-center gap-3 text-sm text-muted-foreground">
                        <Calendar className="h-4 w-4" />
                        <span>Available for opportunities</span>
                      </div>
                    </div>

                    {/* CTA Button */}
                    <Button className="w-full mb-4" asChild>
                      <a href={`mailto:${profile.social.email}`}>
                        Get In Touch
                      </a>
                    </Button>

                    {/* Social Links */}
                    <div className="flex justify-center space-x-3">
                      <Button variant="outline" size="icon" asChild>
                        <a
                          href={profile.social.github}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <svg
                            className="h-4 w-4"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                          </svg>
                        </a>
                      </Button>
                      <Button variant="outline" size="icon" asChild>
                        <a
                          href={profile.social.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <svg
                            className="h-4 w-4"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                          </svg>
                        </a>
                      </Button>
                      {profile.social.upwork && (
                        <Button variant="outline" size="icon" asChild>
                          <a
                            href={profile.social.upwork}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <svg
                              className="h-4 w-4"
                              viewBox="0 0 512 512"
                              xmlns="http://www.w3.org/2000/svg"
                              fillRule="evenodd"
                              clipRule="evenodd"
                              strokeLinejoin="round"
                              strokeMiterlimit={2}
                            >
                              <ellipse
                                cx={184.5}
                                cy={234.5}
                                rx={57.5}
                                ry={56.5}
                                transform="translate(-546.174 -763.565) scale(4.34783)"
                                fill="hsl(var(--foreground))"
                              />
                              <path
                                d="M345.516 181.708c-42.168 0-65.774 27.481-72.532 55.773-7.658-14.416-13.335-33.698-17.75-51.628H196.94v72.531c0 26.31-11.984 45.772-35.41 45.772-23.427 0-36.852-19.462-36.852-45.772l.27-72.531H91.34v72.531c0 21.174 6.848 40.366 19.372 54.061 12.884 14.146 30.454 21.534 50.817 21.534 40.545 0 68.837-31.085 68.837-75.595V209.64c4.235 16.038 14.326 46.853 33.608 73.884l-18.02 102.625h34.148l11.893-72.712c3.875 3.244 8.02 6.127 12.434 8.74 11.443 7.208 24.508 11.263 38.023 11.713 0 0 2.073.09 3.154.09 41.807 0 75.054-32.346 75.054-76.045 0-43.7-33.337-76.226-75.144-76.226m0 122.358c-25.86 0-42.979-20.003-47.754-27.752 6.127-49.015 24.057-64.512 47.754-64.512 23.426 0 41.626 18.741 41.626 46.132 0 27.39-18.2 46.132-41.626 46.132"
                                fill="hsl(var(--background))"
                                fillRule="nonzero"
                              />
                            </svg>
                          </a>
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Main Content */}
            <motion.div
              variants={itemVariants}
              className="lg:col-span-2 space-y-12"
            >
              {/* Story Section */}
              <div>
                <h2 className="text-3xl font-bold text-foreground mb-6">
                  My Journey
                </h2>
                <div className="prose prose-invert max-w-none">
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    With more than 9 years delivering on Upwork, I help startups
                    and enterprises build scalable, high-performance platforms
                    aligned with real business goals. From e-commerce and SaaS
                    to fintech, healthcare, real estate, and logistics, I focus
                    on turning product requirements into reliable systems that
                    grow with the business.
                  </p>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    I focus on outcomes and collaboration—turning ideas into
                    clear plans, shipping reliably, and crafting experiences
                    people truly enjoy. Working closely with founders and teams,
                    I align goals, reduce complexity, and measure success
                    through real impact: faster launches, higher engagement, and
                    sustainable growth.
                  </p>
                  <p className="text-muted-foreground leading-relaxed">
                    I emphasize clean, maintainable code and modern, modular
                    architecture (including monorepos when appropriate), backed
                    by effective collaboration. Practices like code reviews,
                    CI/CD, testing, and clear documentation keep projects
                    robust, easy to maintain, and ready for future growth.
                  </p>
                </div>
              </div>

              {/* Experience Timeline */}
              <div>
                <h2 className="text-3xl font-bold text-foreground mb-6 flex items-center gap-3">
                  <Briefcase className="h-8 w-8 text-primary" />
                  Experience
                </h2>
                <div className="space-y-6">
                  <div className="relative">
                    {experience.map((item, index) => (
                      <div key={index} className="mb-8 last:mb-0 relative">
                        <Card className="bg-background/50 bg-gradient-to-br border-border">
                          <CardHeader>
                            <div className="flex flex-col-reverse gap-2 lg:flex-row lg:items-start lg:justify-between">
                              <div>
                                <CardTitle className="text-xl text-foreground">
                                  {item.title}
                                </CardTitle>
                                <p className="text-muted-foreground">
                                  {item.company}
                                </p>
                              </div>
                              <Badge variant="outline" className="w-fit">
                                {item.period}
                              </Badge>
                            </div>
                          </CardHeader>
                          {item.description && (
                            <CardContent>
                              <p className="text-muted-foreground">
                                {item.description}
                              </p>
                            </CardContent>
                          )}
                        </Card>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Education */}
              <div>
                <h2 className="text-3xl font-bold text-foreground mb-6 flex items-center gap-3">
                  <GraduationCap className="h-8 w-8 text-primary" />
                  Education
                </h2>
                <div className="relative">
                  {education.map((item, index) => (
                    <div key={index} className="mb-8 last:mb-0 relative">
                      <Card className="bg-background/50 backdrop-blur-sm border-border">
                        <CardHeader>
                          <div className="flex flex-col-reverse gap-2 lg:flex-row lg:items-start lg:justify-between">
                            <div>
                              <CardTitle className="text-xl text-foreground">
                                {item.degree}
                              </CardTitle>
                              <p className="text-muted-foreground">
                                {item.school}
                              </p>
                            </div>
                            <Badge variant="outline" className="w-fit">
                              {item.period}
                            </Badge>
                          </div>
                        </CardHeader>
                        {item.description && (
                          <CardContent>
                            <p className="text-muted-foreground">
                              {item.description}
                            </p>
                          </CardContent>
                        )}
                      </Card>
                    </div>
                  ))}
                </div>
              </div>

              {/* Skills Breakdown */}
              <div>
                <h2 className="text-3xl font-bold text-foreground mb-6 flex items-center gap-3">
                  <Award className="h-8 w-8 text-primary" />
                  Technical Skills
                </h2>
                <div className="space-y-8">
                  {Object.entries(skillsByCategory).map(
                    ([category, categorySkills]) => (
                      <div key={category}>
                        <div className="flex items-center gap-3 mb-4">
                          {getCategoryIcon(category)}
                          <h3 className="text-xl font-semibold text-foreground capitalize">
                            {category === "tools"
                              ? "Development Tools"
                              : category}
                          </h3>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          {categorySkills.map((skill) => (
                            <div
                              key={skill.name}
                              className="flex items-center justify-between"
                            >
                              <span className="text-foreground font-medium">
                                {skill.name}
                              </span>
                              <div className="flex items-center gap-2">
                                <div className="flex gap-1">
                                  {[...Array(5)].map((_, i) => (
                                    <div
                                      key={i}
                                      className={`w-2 h-2 rounded-full ${
                                        i < skill.level
                                          ? "bg-primary"
                                          : "bg-muted-foreground/30"
                                      }`}
                                    />
                                  ))}
                                </div>
                                <span className="text-sm text-muted-foreground">
                                  {skill.level}/5
                                </span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
