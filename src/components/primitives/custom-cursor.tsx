"use client";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface CustomCursorProps {
  disabled?: boolean;
}

/**
 * Minimal technical cursor — a small crosshair + frame ring that grows on hover.
 * Only renders on pointer:fine devices and when reduced motion is off.
 */
export function CustomCursor({ disabled }: CustomCursorProps) {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);
  const [active, setActive] = useState(false);

  useEffect(() => {
    if (disabled) return;
    if (typeof window === "undefined") return;
    if (window.matchMedia("(pointer: coarse)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    // Defer ref access until after state update commits.
    const apply = () => {
      const dot = dotRef.current;
      const ring = ringRef.current;
      if (!dot || !ring) return;
      let rx = 0, ry = 0, dx = 0, dy = 0;
      let raf = 0;
      let localActive = false;

      const onMove = (e: MouseEvent) => {
        dx = e.clientX;
        dy = e.clientY;
        dot.style.transform = `translate(${dx}px, ${dy}px)`;
        const t = e.target as HTMLElement | null;
        const interactive = t?.closest(
          "a, button, [data-cursor='pointer'], input, textarea, [role='button']"
        );
        const next = !!interactive;
        if (next !== localActive) {
          localActive = next;
          setActive(next);
        }
      };
      const onEnter = () => setShown(true);
      const onLeave = () => setShown(false);

      const loop = () => {
        rx += (dx - rx) * 0.18;
        ry += (dy - ry) * 0.18;
        ring.style.transform = `translate(${rx}px, ${ry}px)`;
        raf = requestAnimationFrame(loop);
      };
      raf = requestAnimationFrame(loop);

      window.addEventListener("mousemove", onMove);
      document.addEventListener("mouseenter", onEnter);
      document.addEventListener("mouseleave", onLeave);
      setShown(true);

      return () => {
        cancelAnimationFrame(raf);
        window.removeEventListener("mousemove", onMove);
        document.removeEventListener("mouseenter", onEnter);
        document.removeEventListener("mouseleave", onLeave);
      };
    };

    // Wait one frame so refs are populated.
    const t = requestAnimationFrame(() => {
      const cleanup = apply();
      return cleanup;
    });
    return () => cancelAnimationFrame(t);
  }, [disabled]);

  if (disabled) return null;

  return (
    <>
      <div
        ref={dotRef}
        className="cmd-cursor"
        style={{
          width: 4,
          height: 4,
          marginLeft: -2,
          marginTop: -2,
          opacity: shown ? 1 : 0,
          transition: "opacity 0.2s",
        }}
      >
        <div className="w-1 h-1 bg-cyan" />
      </div>
      <div
        ref={ringRef}
        className="cmd-cursor"
        style={{
          width: 28,
          height: 28,
          marginLeft: -14,
          marginTop: -14,
          opacity: shown ? 1 : 0,
          transition: "opacity 0.2s",
        }}
      >
        <div
          className={cn(
            "w-7 h-7 border border-cyan/50 transition-[width,height] duration-200",
            active && "w-10 h-10 -ml-1.5 -mt-1.5 border-cyan"
          )}
        />
      </div>
    </>
  );
}
