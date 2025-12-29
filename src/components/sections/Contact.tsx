"use client";

import { motion } from "framer-motion";
import { Mail, MapPin, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { profile } from "@/data/profile";

const Contact = () => {
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

  return (
    <section id="contact" className="py-24 bg-muted/30">
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
              Get In Touch
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              I&apos;m always interested in hearing about new projects and
              opportunities. Whether you have a question or just want to say hi,
              feel free to reach out!
            </p>
          </motion.div>

          <div className="max-w-3xl mx-auto">
            {/* Contact Info */}
            <motion.div variants={itemVariants} className="space-y-6">
              <div>
                <h3 className="text-2xl font-semibold text-foreground mb-6">
                  Let&apos;s Connect
                </h3>
                <p className="text-muted-foreground mb-8">
                  I&apos;m open to discussing new projects, creative ideas, or
                  opportunities to be part of your visions. Feel free to reach
                  out through any of the following channels:
                </p>
              </div>

              {/* Contact Cards */}
              <div className="space-y-4">
                <Card className="bg-background/50 backdrop-blur-sm border-border">
                  <CardContent className="flex items-center gap-4 p-6">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <Mail className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground">Email</h4>
                      <p className="text-muted-foreground">
                        {profile.social.email}
                      </p>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-background/50 backdrop-blur-sm border-border">
                  <CardContent className="flex items-center gap-4 p-6">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <MapPin className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground">
                        Location
                      </h4>
                      <p className="text-muted-foreground">Ngawi, Indonesia</p>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-background/50 backdrop-blur-sm border-border">
                  <CardContent className="flex items-center gap-4 p-6">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <Phone className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground">Phone</h4>
                      <p className="text-muted-foreground">
                        Available on request
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Social Links */}
              <div className="pt-6">
                <h4 className="font-semibold text-foreground mb-4">
                  Follow Me
                </h4>
                <div className="flex flex-wrap gap-3">
                  <Badge variant="outline" className="px-3 py-1">
                    <a
                      href={profile.social.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2"
                    >
                      GitHub
                    </a>
                  </Badge>
                  <Badge variant="outline" className="px-3 py-1">
                    <a
                      href={profile.social.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2"
                    >
                      LinkedIn
                    </a>
                  </Badge>
                  {profile.social.twitter && (
                    <Badge variant="outline" className="px-3 py-1">
                      <a
                        href={profile.social.twitter}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2"
                      >
                        Twitter
                      </a>
                    </Badge>
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

export default Contact;
