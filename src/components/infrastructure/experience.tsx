"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { cv } from "@/lib/cv-data";
import { SectionHeading } from "@/components/primitives/section-heading";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { cn } from "@/lib/utils";

export function Experience() {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.6", "end 0.4"],
  });
  const scaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section
      ref={ref}
      id="experience"
      className="relative py-24 sm:py-32 px-5 sm:px-8 max-w-7xl mx-auto"
    >
      <SectionHeading
        index="07"
        title="Deployment History"
        subtitle="CAREER.TIMELINE"
      />

      <p className="mt-6 max-w-2xl text-muted-foreground text-sm sm:text-base leading-relaxed">
        Versions of my career so far. Each release is a real milestone from
        my CV — no invented roles or achievements.
      </p>

      <div className="mt-12 relative">
        {/* spine */}
        <div className="absolute left-[19px] sm:left-1/2 top-0 bottom-0 w-px bg-hairline" />
        <motion.div
          style={{ scaleY }}
          className="absolute left-[19px] sm:left-1/2 top-0 bottom-0 w-px origin-top bg-cyan glow-cyan"
        />

        <div className="space-y-8">
          {cv.timeline.map((item, i) => {
            const isLeft = i % 2 === 0;
            return (
              <motion.div
                key={item.version}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-10% 0px" }}
                transition={{ duration: 0.6 }}
                className={cn(
                  "relative pl-12 sm:pl-0 sm:grid sm:grid-cols-2 sm:gap-12",
                  isLeft ? "sm:[direction:ltr]" : "sm:[direction:rtl]"
                )}
              >
                {/* version node */}
                <div className="absolute left-0 sm:left-1/2 sm:-translate-x-1/2 top-0">
                  <div
                    className="w-10 h-10 flex items-center justify-center border border-cyan/40 bg-ink relative"
                  >
                    <span className="text-[10px] font-mono text-cyan">
                      {item.version}
                    </span>
                    {/* outer pulse */}
                    {!reduced && (
                      <span className="absolute inset-0 border border-cyan/30 animate-ping" />
                    )}
                  </div>
                </div>

                {/* content card */}
                <div
                  className={cn(
                    "sm:[direction:ltr] panel p-5 relative",
                    isLeft ? "sm:mr-2" : "sm:ml-2"
                  )}
                >
                  <div className="flex items-center justify-between mb-2 flex-wrap gap-2">
                    <span className="tech-label text-amber">{item.label}</span>
                    <span className="tech-label text-muted-foreground">
                      {item.period}
                    </span>
                  </div>
                  <h3 className="text-lg sm:text-xl font-medium tracking-tight text-foreground">
                    {item.title}
                  </h3>
                  <p className="text-xs font-mono text-cyan/80 mt-1">
                    {item.org}
                  </p>
                  <p className="text-sm text-muted-foreground mt-3 leading-relaxed">
                    {item.detail}
                  </p>
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {item.tags.map((t) => (
                      <span key={t} className="tag tag-cyan">{t}</span>
                    ))}
                  </div>
                </div>

                {/* opposite empty */}
                <div className="hidden sm:block" />
              </motion.div>
            );
          })}
        </div>

        {/* End marker */}
        <div className="relative pl-12 sm:pl-0 sm:flex sm:justify-center mt-8">
          <div className="absolute left-0 sm:left-1/2 sm:-translate-x-1/2">
            <div className="w-10 h-10 flex items-center justify-center border border-signal/40 bg-ink">
              <span className="text-[10px] font-mono text-signal">v∞</span>
            </div>
          </div>
          <div className="sm:text-center sm:ml-12">
            <div className="tech-label text-signal">CURRENT</div>
            <p className="text-xs font-mono text-muted-foreground mt-1">
              actively building · NTI training + portfolio projects
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
