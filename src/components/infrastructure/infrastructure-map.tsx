"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { cv } from "@/lib/cv-data";
import { SectionHeading } from "@/components/primitives/section-heading";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { cn } from "@/lib/utils";

type NodeState = {
  group: string;
  root: string;
  items: readonly string[];
  activeItem: string | null;
};

export function InfrastructureMap() {
  const reduced = useReducedMotion();
  const [hovered, setHovered] = useState<{ group: string; item: string } | null>(null);

  return (
    <section
      id="stack"
      className="relative py-24 sm:py-32 px-5 sm:px-8 max-w-7xl mx-auto"
    >
      <SectionHeading
        index="02"
        title="Infrastructure Map"
        subtitle="SKILL.ECOSYSTEM"
      />

      <p className="mt-6 max-w-2xl text-muted-foreground text-sm sm:text-base leading-relaxed">
        A live map of the technologies I operate across. Hover any node to
        inspect the related skill group. The structure mirrors how a real
        platform is wired — root services delegate to capability leaves.
      </p>

      {/* Map grid */}
      <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-hairline border border-hairline">
        {cv.skills.map((s, gi) => {
          const isHovered = hovered?.group === s.group;
          return (
            <div
              key={s.group}
              className="bg-ink/90 p-4 sm:p-5 relative group"
              onMouseEnter={() => setHovered({ group: s.group, item: s.root })}
              onMouseLeave={() => setHovered(null)}
            >
              {/* group label */}
              <div className="flex items-center justify-between mb-3">
                <span className="tech-label text-cyan/80">{s.group}</span>
                <span className="tech-label text-muted-foreground">
                  {String(gi + 1).padStart(2, "0")}/
                  {String(cv.skills.length).padStart(2, "0")}
                </span>
              </div>

              {/* root node */}
              <div className="flex items-center gap-2 mb-4">
                <div
                  className={cn(
                    "w-2 h-2 bg-cyan",
                    isHovered && "shadow-[0_0_12px_var(--cyan)]"
                  )}
                />
                <ScrambleTextRoot
                  text={s.root}
                  disabled={reduced}
                  active={isHovered}
                />
              </div>

              {/* connector */}
              <div className="ml-1 border-l border-hairline pl-3 space-y-1.5">
                {s.items.map((item, ii) => (
                  <motion.div
                    key={item}
                    initial={{ opacity: 0, x: -4 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.04 * ii }}
                    className="flex items-center gap-2 text-[11px] font-mono tracking-tight"
                  >
                    <span className="text-cyan/50">└</span>
                    <span
                      className={cn(
                        "text-muted-foreground transition-colors",
                        isHovered && "text-foreground"
                      )}
                    >
                      {item}
                    </span>
                  </motion.div>
                ))}
              </div>

              {/* hover detail bar */}
              <motion.div
                initial={false}
                animate={{
                  height: isHovered ? "auto" : 0,
                  opacity: isHovered ? 1 : 0,
                }}
                transition={{ duration: 0.25 }}
                className="overflow-hidden"
              >
                <div className="mt-4 pt-3 border-t border-hairline">
                  <div className="tech-label text-muted-foreground mb-1.5">
                    MODULE.STATUS
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    <span className="tag tag-signal">ACTIVE</span>
                    <span className="tag tag-cyan">{s.items.length} NODES</span>
                  </div>
                </div>
              </motion.div>
            </div>
          );
        })}
      </div>

      {/* Languages footer */}
      <div className="mt-6 flex flex-wrap items-center justify-between gap-4 panel p-4">
        <div className="flex items-center gap-3">
          <span className="tech-label text-cyan/80">LANGUAGES</span>
          <span className="text-muted-foreground text-xs font-mono">·</span>
          {cv.languages.map((l) => (
            <span key={l.name} className="text-xs font-mono">
              {l.name}
              <span className="text-muted-foreground ml-1.5">[{l.level}]</span>
            </span>
          ))}
        </div>
        <div className="tech-label text-muted-foreground">
          {cv.skills.reduce((a, s) => a + s.items.length, 0)} NODES · {cv.skills.length} GROUPS
        </div>
      </div>
    </section>
  );
}

function ScrambleTextRoot({
  text,
  disabled,
  active,
}: {
  text: string;
  disabled?: boolean;
  active?: boolean;
}) {
  if (disabled || !active) {
    return (
      <span className="text-base sm:text-lg font-mono tracking-tight text-foreground">
        {text}
      </span>
    );
  }
  return (
    <motion.span
      key={text + String(active)}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="text-base sm:text-lg font-mono tracking-tight text-cyan text-glow-cyan"
    >
      {text}
    </motion.span>
  );
}
