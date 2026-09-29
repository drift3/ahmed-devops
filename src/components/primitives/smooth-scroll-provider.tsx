"use client";
import { useEffect, useLayoutEffect, useRef } from "react";
import { cn } from "@/lib/utils";

interface SmoothScrollProviderProps {
  children: React.ReactNode;
  disabled?: boolean;
}

/**
 * Wraps the app in Lenis smooth scroll. Disables itself for reduced-motion users.
 *
 * Bug fix (initial scroll position): ensures the page always starts at scrollY = 0
 * on fresh load / refresh. Defeats browser scroll restoration and forces Lenis to
 * start at 0. Smooth scrolling, animations, and 3D are untouched.
 */
export function SmoothScrollProvider({
  children,
  disabled,
}: SmoothScrollProviderProps) {
  const rafRef = useRef<number>(0);

  // 1) Reset to top BEFORE paint + disable browser scroll restoration.
  //    Skipped when a URL hash is present (user intentionally deep-linking).
  useLayoutEffect(() => {
    if (typeof window === "undefined") return;
    try {
      if ("scrollRestoration" in history) history.scrollRestoration = "manual";
    } catch {}
    if (window.location.hash) return;
    window.scrollTo(0, 0);
  }, []);

  // 2) Defeat late browser scroll restoration that happens after first paint.
  //    Two waves (rAF + 150ms) cover all browser timing variants.
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.location.hash) return;
    const forceTop = () => {
      if (window.scrollY > 0) window.scrollTo(0, 0);
    };
    forceTop();
    const raf = requestAnimationFrame(forceTop);
    const t = window.setTimeout(forceTop, 150);
    const onBeforeUnload = () => {
      try {
        if ("scrollRestoration" in history) history.scrollRestoration = "manual";
      } catch {}
    };
    window.addEventListener("beforeunload", onBeforeUnload);
    return () => {
      cancelAnimationFrame(raf);
      window.clearTimeout(t);
      window.removeEventListener("beforeunload", onBeforeUnload);
    };
  }, []);

  // 3) Init Lenis — and explicitly reset its position to top on init.
  useEffect(() => {
    if (disabled) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let lenis: any;
    let cancel = false;

    (async () => {
      const { default: Lenis } = await import("lenis");
      if (cancel) return;
      // Defensive: reset native scroll right before Lenis takes over.
      if (!window.location.hash) {
        window.scrollTo(0, 0);
      }
      lenis = new Lenis({
        duration: 1.05,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
        wheelMultiplier: 1,
        touchMultiplier: 1.5,
      });
      // Force Lenis to start at 0 immediately (no animation), unless deep-linking.
      if (!window.location.hash) {
        lenis.scrollTo(0, { immediate: true });
      }

      const raf = (time: number) => {
        lenis.raf(time);
        rafRef.current = requestAnimationFrame(raf);
      };
      rafRef.current = requestAnimationFrame(raf);
    })();

    return () => {
      cancel = true;
      cancelAnimationFrame(rafRef.current);
      if (lenis) lenis.destroy();
    };
  }, [disabled]);

  return <>{children}</>;
}
