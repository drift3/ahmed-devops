"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import { cv } from "@/lib/cv-data";
import { cn } from "@/lib/utils";

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("system");
  const { scrollYProgress } = useScroll();

  useMotionValueEvent(scrollYProgress, "change", () => {
    setScrolled(scrollYProgress.get() > 0.04);
  });

  // section scroll-spy
  useEffect(() => {
    const sections = cv.nav.map((n) => document.getElementById(n.id));
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-40% 0px -55% 0px", threshold: 0 }
    );
    sections.forEach((s) => s && io.observe(s));
    return () => io.disconnect();
  }, []);

  const handleClick = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
    setOpen(false);
  };

  return (
    <>
      <motion.header
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-colors duration-300",
          scrolled ? "bg-ink/80 backdrop-blur-md border-b border-hairline" : "bg-transparent"
        )}
      >
        <nav className="max-w-7xl mx-auto px-5 sm:px-8 h-14 flex items-center justify-between">
          {/* Logo / ID */}
          <a
            href="#system"
            onClick={handleClick("system")}
            className="flex items-center gap-2 group"
          >
            <span className="font-mono text-xs tracking-[0.18em] uppercase">
              <span className="text-cyan">AF</span>
              <span className="text-muted-foreground mx-1">/</span>
              <span className="text-foreground">DevOps</span>
            </span>
            <span className="hidden sm:flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-[0.18em] text-muted-foreground">
              <span className="dot-pulse" />
              <span className="text-signal">System Online</span>
            </span>
          </a>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-1">
            {cv.nav.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={handleClick(item.id)}
                className={cn(
                  "relative px-3 py-2 text-[11px] font-mono uppercase tracking-[0.18em] transition-colors",
                  active === item.id
                    ? "text-cyan"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {item.label}
                {active === item.id && (
                  <motion.span
                    layoutId="nav-active"
                    className="absolute left-3 right-3 bottom-1 h-px bg-cyan"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </a>
            ))}
          </div>

          {/* Mobile trigger */}
          <button
            type="button"
            aria-label="Toggle menu"
            onClick={() => setOpen((v) => !v)}
            className="md:hidden flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-[0.18em] text-cyan"
          >
            <span>{open ? "CLOSE" : "MENU"}</span>
            <div className="flex flex-col gap-1">
              <span className={cn("block w-4 h-px bg-cyan transition-transform", open && "rotate-45 translate-y-1")} />
              <span className={cn("block w-4 h-px bg-cyan transition-opacity", open && "opacity-0")} />
              <span className={cn("block w-4 h-px bg-cyan transition-transform", open && "-rotate-45 -translate-y-1")} />
            </div>
          </button>
        </nav>
        {/* progress line */}
        <motion.div
          className="h-px bg-cyan/50 origin-left"
          style={{ scaleX: scrollYProgress }}
        />
      </motion.header>

      {/* Mobile menu overlay */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-ink/95 backdrop-blur-md md:hidden flex flex-col items-center justify-center gap-2"
          >
            {cv.nav.map((item, i) => (
              <motion.a
                key={item.id}
                href={`#${item.id}`}
                onClick={handleClick(item.id)}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.06 * i }}
                className={cn(
                  "text-2xl font-mono tracking-[0.18em] uppercase",
                  active === item.id ? "text-cyan" : "text-foreground/80"
                )}
              >
                {item.label}
              </motion.a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
