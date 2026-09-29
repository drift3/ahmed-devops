"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { cv } from "@/lib/cv-data";
import { SectionHeading } from "@/components/primitives/section-heading";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { cn } from "@/lib/utils";

const POD_STATUS = ["Running", "Running", "Running", "Running", "Running"];

export function ClusterVisualization() {
  const reduced = useReducedMotion();
  const [hovered, setHovered] = useState<string | null>(null);
  const c = cv.cluster;

  return (
    <section className="relative py-24 sm:py-32 px-5 sm:px-8 max-w-7xl mx-auto">
      <SectionHeading
        index="05"
        title="Cluster Topology"
        subtitle="K8S · OPENSHIFT"
      />

      <p className="mt-6 max-w-2xl text-muted-foreground text-sm sm:text-base leading-relaxed">
        A schematic of a representative cluster I operate — based on the
        <span className="text-cyan"> kind</span> and
        <span className="text-cyan"> OpenShift</span> patterns from my projects.
        Nodes host pods; services route traffic. Hover any element to inspect.
      </p>

      <div className="mt-10 grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Topology panel */}
        <div className="lg:col-span-8 panel p-5 sm:p-8 relative overflow-hidden">
          <div className="absolute inset-0 grid-bg-sm opacity-50 pointer-events-none" />

          {/* Cluster outer frame */}
          <div className="relative">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <span className="tech-label text-cyan">CLUSTER</span>
                <span className="text-base font-mono">{c.name}</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="dot-pulse" />
                <span className="tech-label text-signal">HEALTHY</span>
              </div>
            </div>

            {/* Cluster box */}
            <div className="border border-cyan/30 p-5 sm:p-6 relative bg-cyan/[0.015]">
              {/* corner brackets */}
              <Corner name="tl" />
              <Corner name="tr" />
              <Corner name="bl" />
              <Corner name="br" />

              {/* nodes */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {c.nodes.map((node, ni) => {
                  const isMaster = node.role === "master";
                  const isHovered = hovered === node.name;
                  return (
                    <motion.div
                      key={node.name}
                      initial={{ opacity: 0, y: 12 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: 0.1 * ni }}
                      onMouseEnter={() => setHovered(node.name)}
                      onMouseLeave={() => setHovered(null)}
                      className={cn(
                        "relative panel p-3 transition-all",
                        isHovered && "border-cyan/40 bg-cyan/[0.03]",
                        isMaster && "border-amber/30"
                      )}
                    >
                      {/* node header */}
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <span
                            className={cn(
                              "w-1.5 h-1.5",
                              isMaster ? "bg-amber" : "bg-cyan"
                            )}
                          />
                          <span className="text-xs font-mono">{node.name}</span>
                        </div>
                        <span
                          className={cn(
                            "text-[9px] font-mono uppercase tracking-[0.15em]",
                            isMaster ? "text-amber" : "text-cyan"
                          )}
                        >
                          {node.role}
                        </span>
                      </div>

                      {/* pods */}
                      <div className="space-y-1.5">
                        {node.pods.map((pod, pi) => (
                          <Pod
                            key={pod}
                            name={pod}
                            status={POD_STATUS[pi % POD_STATUS.length]}
                            index={pi}
                            reduced={reduced}
                          />
                        ))}
                      </div>
                    </motion.div>
                  );
                })}
              </div>

              {/* connection lines (SVG) */}
              <svg
                className="absolute inset-0 w-full h-full pointer-events-none"
                preserveAspectRatio="none"
                aria-hidden="true"
              >
                <defs>
                  <linearGradient id="line-grad" x1="0" x2="1" y1="0" y2="0">
                    <stop offset="0%" stopColor="#5eead4" stopOpacity="0" />
                    <stop offset="50%" stopColor="#5eead4" stopOpacity="0.4" />
                    <stop offset="100%" stopColor="#5eead4" stopOpacity="0" />
                  </linearGradient>
                </defs>
                {!reduced && (
                  <line
                    x1="33%"
                    y1="50%"
                    x2="66%"
                    y2="50%"
                    stroke="url(#line-grad)"
                    strokeWidth="1"
                    className="flow-dash"
                  />
                )}
              </svg>
            </div>

            {/* services row */}
            <div className="mt-6">
              <div className="flex items-center gap-3 mb-3">
                <span className="tech-label text-cyan/80">SERVICES</span>
                <span className="h-px flex-1 bg-hairline" />
              </div>
              <div className="flex flex-wrap gap-2">
                {c.services.map((s) => (
                  <motion.div
                    key={s}
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3 }}
                    className="px-3 py-1.5 border border-hairline bg-white/[0.01] hover:border-cyan/30 transition-colors"
                  >
                    <span className="text-[11px] font-mono">{s}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Side info */}
        <div className="lg:col-span-4 space-y-4">
          <div className="panel p-4">
            <div className="tech-label text-cyan/80 mb-3">CLUSTER.METRICS</div>
            <div className="space-y-3">
              <Metric label="NODES" value={String(c.nodes.length)} />
              <Metric label="PODS" value={String(c.nodes.reduce((a, n) => a + n.pods.length, 0))} />
              <Metric label="SERVICES" value={String(c.services.length)} />
              <Metric label="STATUS" value="HEALTHY" tone="signal" />
            </div>
          </div>

          <div className="panel p-4">
            <div className="tech-label text-cyan/80 mb-3">CONTROL-PLANE</div>
            <ul className="space-y-1.5 text-[11px] font-mono text-muted-foreground">
              {["api-server", "etcd", "scheduler", "controller-manager"].map((c) => (
                <li key={c} className="flex items-center gap-2">
                  <span className="text-signal">●</span>
                  {c}
                </li>
              ))}
            </ul>
          </div>

          <div className="panel p-4 relative scan-lines overflow-hidden">
            <div className="tech-label text-cyan/80 mb-2">LEGEND</div>
            <div className="space-y-1.5 text-[11px] font-mono">
              <div className="flex items-center gap-2 text-muted-foreground">
                <span className="w-2 h-2 bg-amber" /> master node
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <span className="w-2 h-2 bg-cyan" /> worker node
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <span className="w-1.5 h-1.5 bg-signal rounded-full" /> pod: Running
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Pod({
  name,
  status,
  index,
  reduced,
}: {
  name: string;
  status: string;
  index: number;
  reduced?: boolean;
}) {
  return (
    <motion.div
      initial={reduced ? false : { opacity: 0, x: -4 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.3, delay: index * 0.06 }}
      className="flex items-center justify-between gap-2 px-2 py-1 border border-hairline bg-white/[0.01]"
    >
      <div className="flex items-center gap-1.5 min-w-0">
        <span className="w-1 h-1 rounded-full bg-signal" />
        <span className="text-[10px] font-mono truncate">{name}</span>
      </div>
      <span className="text-[9px] font-mono text-signal flex-shrink-0">{status}</span>
    </motion.div>
  );
}

function Metric({
  label,
  value,
  tone,
}: {
  label: string;
  value: string;
  tone?: "signal" | "cyan";
}) {
  return (
    <div className="flex items-center justify-between">
      <span className="tech-label text-muted-foreground">{label}</span>
      <span
        className={cn(
          "text-base font-mono",
          tone === "signal" ? "text-signal" : tone === "cyan" ? "text-cyan" : "text-foreground"
        )}
      >
        {value}
      </span>
    </div>
  );
}

function Corner({ name }: { name: "tl" | "tr" | "bl" | "br" }) {
  const base = "absolute w-2 h-2 border-cyan";
  const map = {
    tl: "top-0 left-0 border-t border-l",
    tr: "top-0 right-0 border-t border-r",
    bl: "bottom-0 left-0 border-b border-l",
    br: "bottom-0 right-0 border-b border-r",
  };
  return <div className={cn(base, map[name])} />;
}
