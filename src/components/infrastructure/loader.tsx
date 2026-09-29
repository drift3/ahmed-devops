"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cv } from "@/lib/cv-data";

const SEQUENCE = [
  "NETWORK",
  "CLOUD · AWS",
  "CONTAINERS · K8S",
  "PIPELINES · CI/CD",
  "OBSERVABILITY",
  "SECURITY · DEVSECOPS",
];

interface LoaderProps {
  onComplete: () => void;
  disabled?: boolean;
}

export function Loader({ onComplete, disabled }: LoaderProps) {
  const [progress, setProgress] = useState(0);
  const [stage, setStage] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (disabled) {
      onComplete();
      return;
    }
    const total = 1500;
    const start = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / total);
      setProgress(Math.floor(p * 100));
      setStage(Math.min(SEQUENCE.length - 1, Math.floor(p * SEQUENCE.length)));
      if (p < 1) raf = requestAnimationFrame(tick);
      else {
        setTimeout(() => setDone(true), 240);
        setTimeout(onComplete, 900);
      }
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [onComplete, disabled]);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          className="fixed inset-0 z-[100] bg-ink grid-bg flex flex-col items-center justify-center"
          exit={{ opacity: 0, transition: { duration: 0.5, ease: "easeInOut" } }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-ink pointer-events-none" />

          <div className="relative w-full max-w-md px-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="dot-pulse" />
              <span className="tech-label text-cyan">
                INITIALIZING SYSTEM
              </span>
            </div>

            <motion.h1
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-2xl font-mono tracking-tight mb-8"
            >
              {cv.name.toUpperCase()}
              <span className="text-cyan">_</span>
            </motion.h1>

            {/* progress bar */}
            <div className="relative h-2 bg-white/[0.03] border border-hairline overflow-hidden">
              <div
                className="absolute inset-y-0 left-0 bg-cyan/80"
                style={{ width: `${progress}%`, transition: "width 0.06s linear" }}
              />
              <div className="absolute inset-0 load-bar opacity-40" />
            </div>

            <div className="mt-3 flex justify-between text-xs font-mono">
              <span className="text-muted-foreground tabular">
                {String(progress).padStart(3, "0")}%
              </span>
              <AnimatePresence mode="wait">
                <motion.span
                  key={stage}
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  transition={{ duration: 0.2 }}
                  className="text-cyan/80 tabular"
                >
                  {SEQUENCE[stage]}
                </motion.span>
              </AnimatePresence>
            </div>

            {/* module list */}
            <div className="mt-10 grid grid-cols-2 gap-y-1.5 gap-x-6 text-[10px] font-mono uppercase tracking-[0.18em]">
              {SEQUENCE.map((m, i) => (
                <div
                  key={m}
                  className={`flex items-center gap-2 transition-colors ${
                    i <= stage ? "text-foreground" : "text-muted-foreground/40"
                  }`}
                >
                  <span
                    className={`w-1 h-1 ${
                      i <= stage ? "bg-signal" : "bg-muted-foreground/30"
                    }`}
                  />
                  {m}
                </div>
              ))}
            </div>
          </div>

          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 tech-label text-muted-foreground/60">
            ESTABLISHING SECURE CONNECTION
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
