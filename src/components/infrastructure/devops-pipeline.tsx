"use client";
import { useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { cv } from "@/lib/cv-data";
import { SectionHeading } from "@/components/primitives/section-heading";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { cn } from "@/lib/utils";

const STAGE_COLORS = [
  "from-cyan/30",
  "from-electric/30",
  "from-cyan/30",
  "from-amber/25",
  "from-cyan/30",
  "from-electric/30",
  "from-cyan/30",
  "from-signal/25",
];

export function DevOpsPipeline() {
  const reduced = useReducedMotion();
  const [active, setActive] = useState<number | null>(null);
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const flowX = useTransform(scrollYProgress, [0.1, 0.9], [0, 1]);

  return (
    <section
      ref={ref}
      id="pipeline"
      className="relative py-24 sm:py-32 px-5 sm:px-8 max-w-7xl mx-auto"
    >
      <SectionHeading
        index="03"
        title="Delivery Pipeline"
        subtitle="CI/CD.WORKFLOW"
      />

      <p className="mt-6 max-w-2xl text-muted-foreground text-sm sm:text-base leading-relaxed">
        The flow I follow from source commit to production observability.
        Hover a stage to reveal the real toolchain from my CV. Each stage
        is wired to capabilities practiced in my projects.
      </p>

      {/* Vertical pipeline (mobile + desktop) */}
      <div className="mt-12 relative">
        {/* connection spine */}
        <div className="absolute left-[14px] sm:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-cyan/30 to-transparent" />

        {/* flow indicator */}
        {!reduced && (
          <motion.div
            style={{ scaleY: flowX }}
            className="absolute left-[14px] sm:left-1/2 top-0 bottom-0 w-px origin-top bg-cyan glow-cyan"
          />
        )}

        <div className="space-y-3">
          {cv.pipeline.map((stage, i) => {
            const isActive = active === i;
            const isLeft = i % 2 === 0;
            return (
              <motion.div
                key={stage.stage}
                initial={{ opacity: 0, x: isLeft ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-5% 0px" }}
                transition={{ duration: 0.5, delay: i * 0.04 }}
                className={cn(
                  "relative pl-10 sm:pl-0 sm:grid sm:grid-cols-2 sm:gap-8",
                  isLeft ? "sm:[direction:ltr]" : "sm:[direction:rtl]"
                )}
              >
                {/* node dot */}
                <div className="absolute left-[10px] top-3 sm:left-1/2 sm:-translate-x-1/2 z-10">
                  <div
                    className={cn(
                      "w-2 h-2 rounded-full border transition-all",
                      isActive
                        ? "bg-cyan border-cyan scale-150 shadow-[0_0_12px_var(--cyan)]"
                        : "bg-ink border-cyan/50"
                    )}
                  />
                  <span className="absolute left-4 sm:left-3 sm:top-3 top-1/2 -translate-y-1/2 text-[9px] font-mono text-muted-foreground">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>

                {/* card */}
                <div
                  onMouseEnter={() => setActive(i)}
                  onMouseLeave={() => setActive(null)}
                  className={cn(
                    "sm:[direction:ltr] group relative panel p-4 cursor-pointer transition-all",
                    isActive && "border-cyan/40 bg-cyan/[0.02]",
                    isLeft ? "sm:text-right sm:mr-4" : "sm:ml-4"
                  )}
                >
                  {/* top row */}
                  <div
                    className={cn(
                      "flex items-center gap-2",
                      isLeft && "sm:justify-end"
                    )}
                  >
                    <span
                      className={cn(
                        "tech-label",
                        isActive ? "text-cyan" : "text-muted-foreground"
                      )}
                    >
                      STAGE
                    </span>
                    <h3 className="text-base sm:text-lg font-mono tracking-tight text-foreground">
                      {stage.stage}
                    </h3>
                  </div>
                  <p className="mt-1 text-xs text-muted-foreground">{stage.note}</p>

                  {/* tools */}
                  <div
                    className={cn(
                      "mt-3 flex flex-wrap gap-1.5",
                      isLeft && "sm:justify-end"
                    )}
                  >
                    {stage.tools.map((tool) => (
                      <span
                        key={tool}
                        className={cn(
                          "tag",
                          isActive ? "tag-cyan" : "tag"
                        )}
                      >
                        {tool}
                      </span>
                    ))}
                  </div>

                  {/* glow line under active card */}
                  <div
                    className={cn(
                      "absolute bottom-0 h-px bg-gradient-to-r transition-opacity",
                      STAGE_COLORS[i % STAGE_COLORS.length],
                      isActive ? "to-transparent opacity-100" : "opacity-0"
                    )}
                    style={{ left: 0, right: 0 }}
                  />
                </div>

                {/* spacer for opposite column */}
                <div className="hidden sm:block" />
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* legend */}
      <div className="mt-10 flex flex-wrap items-center justify-between gap-4 panel p-4">
        <div className="flex items-center gap-3">
          <div className="dot-pulse" />
          <span className="tech-label text-signal">PIPELINE ACTIVE</span>
        </div>
        <div className="flex flex-wrap items-center gap-4 text-[10px] font-mono uppercase tracking-[0.15em] text-muted-foreground">
          <span>BUILD ▸ TEST ▸ DEPLOY ▸ OBSERVE</span>
          <span className="text-cyan">END-TO-END</span>
        </div>
      </div>
    </section>
  );
}
