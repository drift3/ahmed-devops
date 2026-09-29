"use client";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface ScrambleTextProps {
  text: string;
  className?: string;
  as?: "span" | "div" | "h1" | "h2" | "h3";
  trigger?: "hover" | "inView" | "mount";
  disabled?: boolean;
}

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#$%&*+-=<>";

/**
 * Reveals text by scrambling through random characters before settling.
 */
export function ScrambleText({
  text,
  className,
  as = "span",
  trigger = "inView",
  disabled = false,
}: ScrambleTextProps) {
  const ref = useRef<HTMLElement>(null);
  const [output, setOutput] = useState(text);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    if (disabled) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setOutput(text);
      return;
    }
    if (trigger === "mount") {
      setStarted(true);
      return;
    }
    if (trigger === "inView") {
      const el = ref.current;
      if (!el) return;
      const io = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting && !started) {
            setStarted(true);
            io.disconnect();
          }
        },
        { threshold: 0.6 }
      );
      io.observe(el);
      return () => io.disconnect();
    }
  }, [text, trigger, disabled, started]);

  useEffect(() => {
    if (!started || disabled) return;
    let raf = 0;
    const duration = 600;
    const start = performance.now();

    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / duration);
      const revealCount = Math.floor(p * text.length);
      let next = "";
      for (let i = 0; i < text.length; i++) {
        const c = text[i];
        if (c === " " || c === "/" || c === "·") {
          next += c;
        } else if (i < revealCount) {
          next += c;
        } else {
          next += CHARS[Math.floor(Math.random() * CHARS.length)];
        }
      }
      setOutput(next);
      if (p < 1) raf = requestAnimationFrame(tick);
      else setOutput(text);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [started, text, disabled]);

  const Tag = as as any;
  return (
    <Tag ref={ref} className={cn("font-mono", className)} data-scramble>
      {output}
    </Tag>
  );
}
