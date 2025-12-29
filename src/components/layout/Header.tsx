"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "./ThemeToggle";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToProjects = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const projectsSection = document.getElementById("projects");
    if (projectsSection) {
      projectsSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  const scrollToContact = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const contactSection = document.getElementById("contact");
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  const scrollToAbout = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const aboutSection = document.getElementById("about");
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  const navigation = [
    { name: "Home", href: "/" },
    { name: "About", href: "/#about" },
    { name: "Projects", href: "/#projects" },
    { name: "Contact", href: "/#contact" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-background/80 backdrop-blur-lg border-b border-border"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="text-2xl font-bold text-foreground">
            DW
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              item.name === "Projects" ? (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={scrollToProjects}
                  className="text-muted-foreground hover:text-foreground transition-colors duration-200"
                >
                  {item.name}
                </a>
              ) : item.name === "Contact" ? (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={scrollToContact}
                  className="text-muted-foreground hover:text-foreground transition-colors duration-200"
                >
                  {item.name}
                </a>
              ) : item.name === "About" ? (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={scrollToAbout}
                  className="text-muted-foreground hover:text-foreground transition-colors duration-200"
                >
                  {item.name}
                </a>
              ) : (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-muted-foreground hover:text-foreground transition-colors duration-200"
                >
                  {item.name}
                </Link>
              )
            ))}
            <div className="ml-4">
              <ThemeToggle />
            </div>
          </nav>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-4">
            <ThemeToggle />
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden mt-4 pb-4">
            {navigation.map((item) => (
              item.name === "Projects" ? (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={(e) => {
                    scrollToProjects(e);
                    setIsMenuOpen(false);
                  }}
                  className="block py-2 text-muted-foreground hover:text-foreground transition-colors duration-200"
                >
                  {item.name}
                </a>
              ) : item.name === "Contact" ? (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={(e) => {
                    scrollToContact(e);
                    setIsMenuOpen(false);
                  }}
                  className="block py-2 text-muted-foreground hover:text-foreground transition-colors duration-200"
                >
                  {item.name}
                </a>
              ) : item.name === "About" ? (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={(e) => {
                    scrollToAbout(e);
                    setIsMenuOpen(false);
                  }}
                  className="block py-2 text-muted-foreground hover:text-foreground transition-colors duration-200"
                >
                  {item.name}
                </a>
              ) : (
                <Link
                  key={item.name}
                  href={item.href}
                  className="block py-2 text-muted-foreground hover:text-foreground transition-colors duration-200"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              )
            ))}
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;