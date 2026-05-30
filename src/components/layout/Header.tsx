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

  const scrollToSection = (
    e: React.MouseEvent<HTMLAnchorElement>,
    id: string
  ) => {
    e.preventDefault();
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  const navigation = [
    { name: "Home", href: "/", sectionId: null },
    { name: "About", href: "/#about", sectionId: "about" },
    { name: "Projects", href: "/#projects", sectionId: "projects" },
    { name: "Reviews", href: "/#testimonials", sectionId: "testimonials" },
    { name: "Work", href: "/#work-history", sectionId: "work-history" },
    { name: "Contact", href: "/#contact", sectionId: "contact" },
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
          <Link
            href="/"
            className="font-display text-2xl font-medium tracking-tight text-foreground"
            aria-label="Danan Wijaya — home"
          >
            Danan<span className="text-accent">.</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navigation.map((item, i) =>
              item.sectionId ? (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={(e) => scrollToSection(e, item.sectionId!)}
                  className="group font-mono text-xs uppercase tracking-[0.15em] text-muted-foreground hover:text-foreground transition-colors duration-200"
                >
                  <span className="text-accent/70">
                    0{i}
                  </span>{" "}
                  {item.name}
                </a>
              ) : (
                <Link
                  key={item.name}
                  href={item.href}
                  className="font-mono text-xs uppercase tracking-[0.15em] text-muted-foreground hover:text-foreground transition-colors duration-200"
                >
                  <span className="text-accent/70">0{i}</span> {item.name}
                </Link>
              )
            )}
            <div className="ml-2">
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
          <nav className="md:hidden mt-4 pb-4 border-t border-border">
            {navigation.map((item, i) =>
              item.sectionId ? (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={(e) => {
                    scrollToSection(e, item.sectionId!);
                    setIsMenuOpen(false);
                  }}
                  className="block py-3 font-mono text-sm uppercase tracking-[0.15em] text-muted-foreground hover:text-foreground transition-colors duration-200"
                >
                  <span className="text-accent/70">0{i}</span> {item.name}
                </a>
              ) : (
                <Link
                  key={item.name}
                  href={item.href}
                  className="block py-3 font-mono text-sm uppercase tracking-[0.15em] text-muted-foreground hover:text-foreground transition-colors duration-200"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <span className="text-accent/70">0{i}</span> {item.name}
                </Link>
              )
            )}
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;