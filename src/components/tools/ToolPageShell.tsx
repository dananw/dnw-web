import Link from "next/link";
import { ArrowLeft } from "lucide-react";

interface ToolPageShellProps {
  title: string;
  description: string;
  children: React.ReactNode;
}

/**
 * Shared chrome for every individual tool page: back link, heading, and a
 * consistent container. Keeps tool pages free of layout boilerplate.
 */
const ToolPageShell = ({
  title,
  description,
  children,
}: ToolPageShellProps) => {
  return (
    <section className="relative py-28 md:py-32">
      <div className="container mx-auto max-w-4xl px-6">
        <Link
          href="/tools"
          className="group inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.15em] text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-0.5" />
          All tools
        </Link>

        <header className="mt-6">
          <h1 className="font-display text-4xl leading-[1.05] tracking-tight text-foreground md:text-5xl">
            {title}
          </h1>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-muted-foreground">
            {description}
          </p>
        </header>

        <div className="mt-10">{children}</div>
      </div>
    </section>
  );
};

export default ToolPageShell;
