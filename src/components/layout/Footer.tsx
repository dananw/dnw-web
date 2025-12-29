import Link from "next/link";
import { Github, Linkedin, Mail, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { profile } from "@/data/profile";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-muted border-t border-border">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-foreground">Danan Wijaya</h3>
            <p className="text-muted-foreground max-w-md">
              Building exceptional web experiences with modern technologies.
            </p>
          </div>

          {/* Quick Links */}
          {/* <div className="space-y-4">
            <h4 className="text-sm font-semibold text-foreground uppercase tracking-wider">
              Quick Links
            </h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  About
                </Link>
              </li>

              <li>
                <Link
                  href="/contact"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div> */}

          {/* Social Links */}
          <div className="space-y-4 md:ml-auto">
            <h4 className="text-sm font-semibold text-foreground uppercase tracking-wider">
              Connect
            </h4>
            <div className="flex space-x-4">
              <Button variant="outline" size="icon" asChild>
                <Link
                  href={profile.social.github}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Github className="h-4 w-4" />
                </Link>
              </Button>
              <Button variant="outline" size="icon" asChild>
                <Link
                  href={profile.social.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Linkedin className="h-4 w-4" />
                </Link>
              </Button>
              {/* <Button variant="outline" size="icon" asChild>
                <Link
                  href={profile.social.twitter || ""}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <X className="h-4 w-4" />
                </Link>
              </Button> */}
              <Button variant="outline" size="icon" asChild>
                <Link
                  href={`mailto:${profile.social.email || ""}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Mail className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-border mt-8 pt-8 text-center">
          <p className="text-muted-foreground">
            © {currentYear} Danan Wijaya. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
