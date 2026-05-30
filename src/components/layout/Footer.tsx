import SocialLinks from "@/components/common/SocialLinks";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-primary-foreground/15 bg-primary text-primary-foreground">
      <div className="container mx-auto px-6 py-10">
        <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
          <div className="flex items-center gap-3">
            <span className="font-display text-xl">
              Danan<span className="text-accent">.</span>
            </span>
            <span className="font-mono text-xs uppercase tracking-[0.15em] text-primary-foreground/50">
              Full-Stack Developer
            </span>
          </div>

          <div className="[&_a]:text-primary-foreground/60 [&_a:hover]:text-accent">
            <SocialLinks />
          </div>
        </div>

        <div className="mt-8 flex flex-col items-center justify-between gap-2 border-t border-primary-foreground/15 pt-6 sm:flex-row">
          <p className="font-mono text-xs text-primary-foreground/50">
            © {currentYear} Danan Wijaya — All rights reserved.
          </p>
          <p className="font-mono text-xs text-primary-foreground/50">
            Built with Next.js · Tailwind CSS
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
