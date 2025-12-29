"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { flushSync } from "react-dom";
import { useTheme } from "next-themes";

interface ThemeToggleProps extends React.ComponentPropsWithoutRef<"button"> {
  duration?: number;
}

export const ThemeToggle = ({
  className,
  duration = 400,
  ...props
}: ThemeToggleProps) => {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  const toggleTheme = useCallback(async () => {
    if (!buttonRef.current) return;

    const prefersMotion = window.matchMedia(
      "(prefers-reduced-motion: no-preference)"
    ).matches;
    const canTransition =
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      typeof (document as any).startViewTransition === "function";

    const next = resolvedTheme === "dark" ? "light" : "dark";

    // Use View Transitions ripple reveal when supported and motion allowed
    if (canTransition && prefersMotion) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const vt = (document as any).startViewTransition(() => {
        flushSync(() => {
          setTheme(next);
        });
      });

      await vt.ready;

      const { top, left, width, height } =
        buttonRef.current.getBoundingClientRect();
      const x = left + width / 2;
      const y = top + height / 2;
      const maxRadius = Math.hypot(
        Math.max(left, window.innerWidth - left),
        Math.max(top, window.innerHeight - top)
      );

      document.documentElement.animate(
        {
          clipPath: [
            `circle(0px at ${x}px ${y}px)`,
            `circle(${maxRadius}px at ${x}px ${y}px)`,
          ],
        },
        {
          duration,
          easing: "ease-in-out",
          pseudoElement: "::view-transition-new(root)",
        }
      );
    } else {
      // Fallback: just toggle theme without animation
      setTheme(next);
    }
  }, [resolvedTheme, setTheme, duration]);

  return (
    <button
      ref={buttonRef}
      onClick={toggleTheme}
      className={className}
      aria-label="Toggle theme"
      {...props}
    >
      {mounted &&
        (resolvedTheme === "dark" ? (
          <Sun className="size-5" />
        ) : (
          <Moon className="size-5" />
        ))}
      <span className="sr-only">Toggle theme</span>
    </button>
  );
};
