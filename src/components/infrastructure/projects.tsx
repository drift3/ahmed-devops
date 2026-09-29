"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cv } from "@/lib/cv-data";
import { SectionHeading } from "@/components/primitives/section-heading";
import { MagneticButton } from "@/components/primitives/magnetic-button";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { cn } from "@/lib/utils";
import { ChevronRight, GitBranch, Shield, Layers, X } from "lucide-react";

const PALETTE = [
  { hue: "cyan", from: "from-cyan/15", text: "text-cyan", border: "border-cyan/30" },
  { hue: "electric", from: "from-electric/15", text: "text-electric", border: "border-electric/30" },
  { hue: "amber", from: "from-amber/10", text: "text-amber", border: "border-amber/30" },
  { hue: "cyan", from: "from-cyan/15", text: "text-cyan", border: "border-cyan/30" },
  { hue: "electric", from: "from-electric/15", text: "text-electric", border: "border-electric/30" },
  { hue: "amber", from: "from-amber/10", text: "text-amber", border: "border-amber/30" },
];

export function Projects() {
  const reduced = useReducedMotion();
  const [active, setActive] = useState<number>(0);

  return (
    <section
      id="projects"
      className="relative py-24 sm:py-32 px-5 sm:px-8 max-w-7xl mx-auto"
    >
      <SectionHeading
        index="08"
        title="Case Files"
        subtitle="PROJECT.ARCHIVE"
      />

      <p className="mt-6 max-w-2xl text-muted-foreground text-sm sm:text-base leading-relaxed">
        Hands-on portfolio projects built in training and lab environments —
        six artifacts covering Linux hardening, serverless, OpenShift pipelines,
        platform parity, production microservices, and platform administration.
      </p>

      {/* Project selector list (left rail) + cinematic display (right) */}
      <div className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Selector */}
        <div className="lg:col-span-4 space-y-2">
          {cv.projects.map((p, i) => {
            const palette = PALETTE[i % PALETTE.length];
            const isActive = active === i;
            return (
              <button
                key={p.id}
                onClick={() => setActive(i)}
                className={cn(
                  "w-full text-left panel p-4 transition-all relative overflow-hidden group",
                  isActive && cn(palette.border, "bg-white/[0.02]")
                )}
              >
                {isActive && (
                  <motion.div
                    layoutId="project-active"
                    className={cn("absolute left-0 top-0 bottom-0 w-0.5 bg-cyan")}
                  />
                )}
                <div className="flex items-center justify-between">
                  <span className={cn("tech-label", isActive ? palette.text : "text-muted-foreground")}>
                    {p.id.toUpperCase()}
                  </span>
                  <ChevronRight
                    className={cn(
                      "w-3 h-3 transition-transform",
                      isActive ? cn(palette.text, "translate-x-1") : "text-muted-foreground/40"
                    )}
                  />
                </div>
                <h3
                  className={cn(
                    "text-sm font-mono tracking-tight mt-1.5 leading-tight",
                    isActive ? "text-foreground" : "text-muted-foreground"
                  )}
                >
                  {p.name}
                </h3>
                <div className="mt-2 flex flex-wrap gap-1">
                  {p.stack.slice(0, 3).map((s) => (
                    <span key={s} className="tag text-[9px]">{s}</span>
                  ))}
                </div>
              </button>
            );
          })}
        </div>

        {/* Cinematic display */}
        <div className="lg:col-span-8 relative">
          <AnimatePresence mode="wait">
            <ProjectDisplay
              key={cv.projects[active].id}
              project={cv.projects[active]}
              index={active}
              reduced={reduced}
            />
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

function ProjectDisplay({
  project,
  index,
  reduced,
}: {
  project: (typeof cv.projects)[number];
  index: number;
  reduced?: boolean;
}) {
  const palette = PALETTE[index % PALETTE.length];

  return (
    <motion.article
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.4 }}
      className="relative panel overflow-hidden"
    >
      {/* Visual preview area */}
      <div className="relative h-56 sm:h-72 overflow-hidden">
        <div className="absolute inset-0 grid-bg-sm opacity-60" />
        <div className={cn("absolute inset-0 bg-gradient-to-br", palette.from, "to-transparent")} />
        <div className="absolute inset-0 scan-lines" />

        {/* abstract project architecture visualization */}
        <ProjectArt index={index} palette={palette} reduced={reduced} />

        {/* overlay metadata */}
        <div className="absolute inset-0 p-5 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className={cn("tech-label", palette.text)}>
              CASE.{project.id.toUpperCase()}
            </span>
            <div className="flex items-center gap-2">
              <span className="tag tag-signal">VERIFIED</span>
            </div>
          </div>
          <div>
            <motion.h3
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-xl sm:text-2xl font-medium tracking-tight text-balance text-foreground"
            >
              {project.name}
            </motion.h3>
            <p className="text-sm text-muted-foreground mt-1.5">
              {project.short}
            </p>
          </div>
        </div>
      </div>

      {/* Content body */}
      <div className="p-5 sm:p-6 space-y-5">
        {/* Meta row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <Meta label="ROLE" value={project.role} />
          <Meta label="TAGS" value={project.keywords.slice(0, 2).join(", ")} />
          <Meta label="STACK" value={`${project.stack.length} tools`} />
          <Meta label="CONTEXT" value="Lab · Training" />
        </div>

        {/* Challenge / Solution */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <GitBranch className={cn("w-3.5 h-3.5", palette.text)} />
              <span className="tech-label text-muted-foreground">CHALLENGE</span>
            </div>
            <p className="text-sm text-foreground/90 leading-relaxed">
              {project.challenge}
            </p>
          </div>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Layers className={cn("w-3.5 h-3.5", palette.text)} />
              <span className="tech-label text-muted-foreground">SOLUTION</span>
            </div>
            <p className="text-sm text-foreground/90 leading-relaxed">
              {project.solution}
            </p>
          </div>
        </div>

        {/* Stack */}
        <div>
          <div className="tech-label text-muted-foreground mb-2">STACK</div>
          <div className="flex flex-wrap gap-1.5">
            {project.stack.map((s) => (
              <span key={s} className={cn("tag", palette.border, palette.text)}>
                {s}
              </span>
            ))}
          </div>
        </div>

        {/* Footer actions */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-hairline">
          <div className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-[0.15em] text-muted-foreground">
            <Shield className="w-3 h-3 text-signal" />
            SECURE · IMMUTABLE · OBSERVABLE
          </div>
          <MagneticButton
            href={cv.githubUrl}
            variant="ghost"
            className="text-[10px]"
          >
            View Repository
            <ChevronRight className="w-3 h-3" />
          </MagneticButton>
        </div>
      </div>
    </motion.article>
  );
}

function Meta({ label, value }: { label: string; value: string }) {
  return (
    <div className="panel p-2.5">
      <div className="tech-label text-muted-foreground">{label}</div>
      <div className="text-[11px] font-mono text-foreground mt-0.5">{value}</div>
    </div>
  );
}

/**
 * Abstract per-project architectural art — uses SVG shapes that match the
 * project's domain (network, serverless, pipeline, cluster, etc.).
 */
function ProjectArt({
  index,
  palette,
  reduced,
}: {
  index: number;
  palette: { text: string; from: string; border: string };
  reduced?: boolean;
}) {
  // 6 visual variants
  return (
    <svg
      className="absolute inset-0 w-full h-full opacity-70"
      viewBox="0 0 400 220"
      preserveAspectRatio="xMidYMid meet"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id={`g-${index}`} x1="0" x2="1" y1="0" y2="1">
          <stop offset="0%" stopColor="#5eead4" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#38bdf8" stopOpacity="0.1" />
        </linearGradient>
      </defs>
      <Variant index={index} reduced={reduced} />
    </svg>
  );
}

function Variant({ index, reduced }: { index: number; reduced?: boolean }) {
  const stroke = "#5eead4";
  const common = {
    stroke,
    strokeWidth: 0.8,
    fill: "none",
    opacity: 0.6,
  };
  const animate = !reduced;

  switch (index) {
    case 0:
      // systemd / hardening
      return (
        <g>
          <rect x="40" y="40" width="320" height="140" stroke={stroke} strokeOpacity="0.3" fill="none" strokeWidth="0.5" />
          <line x1="40" y1="70" x2="360" y2="70" {...common} strokeOpacity="0.4" />
          <circle cx="60" cy="55" r="4" fill={stroke} opacity="0.6" />
          <line x1="60" y1="90" x2="340" y2="90" stroke={stroke} strokeDasharray="2 4" strokeWidth="0.5" opacity="0.4" />
          <line x1="60" y1="110" x2="280" y2="110" stroke={stroke} strokeDasharray="2 4" strokeWidth="0.5" opacity="0.4" />
          <line x1="60" y1="130" x2="320" y2="130" stroke={stroke} strokeDasharray="2 4" strokeWidth="0.5" opacity="0.4" />
          <line x1="60" y1="150" x2="260" y2="150" stroke={stroke} strokeDasharray="2 4" strokeWidth="0.5" opacity="0.4" />
          <text x="280" y="55" fontSize="6" fill={stroke} opacity="0.6" fontFamily="monospace">systemd.unit</text>
        </g>
      );
    case 1:
      // serverless / event-driven
      return (
        <g>
          <circle cx="80" cy="110" r="14" {...common} />
          <circle cx="200" cy="60" r="14" {...common} />
          <circle cx="200" cy="160" r="14" {...common} />
          <circle cx="320" cy="110" r="14" {...common} />
          <line x1="94" y1="110" x2="186" y2="65" stroke={stroke} strokeWidth="0.6" opacity="0.5" className={animate ? "flow-dash" : ""} />
          <line x1="94" y1="110" x2="186" y2="155" stroke={stroke} strokeWidth="0.6" opacity="0.5" className={animate ? "flow-dash" : ""} />
          <line x1="214" y1="65" x2="306" y2="110" stroke={stroke} strokeWidth="0.6" opacity="0.5" className={animate ? "flow-dash" : ""} />
          <line x1="214" y1="155" x2="306" y2="110" stroke={stroke} strokeWidth="0.6" opacity="0.5" className={animate ? "flow-dash" : ""} />
          <text x="40" y="100" fontSize="6" fill={stroke} opacity="0.6" fontFamily="monospace">API</text>
          <text x="194" y="42" fontSize="6" fill={stroke} opacity="0.6" fontFamily="monospace">λ</text>
          <text x="194" y="200" fontSize="6" fill={stroke} opacity="0.6" fontFamily="monospace">SQS</text>
          <text x="310" y="100" fontSize="6" fill={stroke} opacity="0.6" fontFamily="monospace">S3</text>
        </g>
      );
    case 2:
      // pipeline
      return (
        <g>
          {[20, 80, 140, 200, 260, 320, 380].map((x, i) => (
            <g key={x}>
              <rect x={x - 18} y={90} width="36" height="40" {...common} strokeOpacity={0.5} />
              <circle cx={x} cy={70} r="4" fill={stroke} opacity={i % 2 ? 0.4 : 0.8} />
            </g>
          ))}
          <path d="M 20 110 H 380" stroke={stroke} strokeWidth="0.6" strokeDasharray="3 3" opacity="0.5" className={animate ? "flow-dash" : ""} />
          <text x="160" y="160" fontSize="6" fill={stroke} opacity="0.6" fontFamily="monospace">tekton · pipeline</text>
        </g>
      );
    case 3:
      // platform comparison
      return (
        <g>
          <rect x="40" y="40" width="140" height="140" stroke={stroke} strokeOpacity="0.5" fill="none" strokeWidth="0.6" />
          <rect x="220" y="40" width="140" height="140" stroke={stroke} strokeOpacity="0.5" fill="none" strokeWidth="0.6" />
          <text x="80" y="32" fontSize="6" fill={stroke} opacity="0.6" fontFamily="monospace">K8S</text>
          <text x="260" y="32" fontSize="6" fill={stroke} opacity="0.6" fontFamily="monospace">OPENSHIFT</text>
          {[60, 90, 120, 150].map((y) => (
            <g key={y}>
              <line x1="60" y1={y} x2="160" y2={y} stroke={stroke} strokeWidth="0.5" strokeDasharray="2 3" opacity="0.5" />
              <line x1="240" y1={y} x2="340" y2={y} stroke={stroke} strokeWidth="0.5" strokeDasharray="2 3" opacity="0.5" />
            </g>
          ))}
          <path d="M 180 110 H 220" stroke={stroke} strokeWidth="0.8" opacity="0.7" className={animate ? "flow-dash" : ""} />
        </g>
      );
    case 4:
      // microservices + statefulset
      return (
        <g>
          {[
            [60, 60], [110, 60], [160, 60], [210, 60], [260, 60], [310, 60],
            [60, 110], [110, 110], [160, 110], [210, 110], [260, 110], [310, 110],
            [60, 160], [110, 160], [160, 160], [210, 160], [260, 160], [310, 160],
          ].map(([x, y], i) => (
            <rect
              key={i}
              x={x}
              y={y - 8}
              width="40"
              height="16"
              stroke={stroke}
              strokeOpacity={0.4 + (i % 3) * 0.15}
              fill="none"
              strokeWidth="0.5"
            />
          ))}
          <text x="60" y="200" fontSize="6" fill={stroke} opacity="0.6" fontFamily="monospace">microservices · hpa · statefulsets</text>
        </g>
      );
    case 5:
      // operators / admin
      return (
        <g>
          <circle cx="200" cy="110" r="50" stroke={stroke} strokeOpacity="0.4" fill="none" strokeWidth="0.5" className={animate ? "spin-slow" : ""} style={{ transformOrigin: "200px 110px" }} />
          <circle cx="200" cy="110" r="30" stroke={stroke} strokeOpacity="0.5" fill="none" strokeWidth="0.5" />
          <circle cx="200" cy="110" r="10" stroke={stroke} strokeOpacity="0.7" fill="none" strokeWidth="0.5" />
          <circle cx="200" cy="60" r="3" fill={stroke} opacity="0.8" />
          <circle cx="250" cy="110" r="3" fill={stroke} opacity="0.6" />
          <circle cx="200" cy="160" r="3" fill={stroke} opacity="0.6" />
          <circle cx="150" cy="110" r="3" fill={stroke} opacity="0.8" />
          <text x="180" y="180" fontSize="6" fill={stroke} opacity="0.6" fontFamily="monospace">operatorHub</text>
        </g>
      );
    default:
      return null;
  }
}
