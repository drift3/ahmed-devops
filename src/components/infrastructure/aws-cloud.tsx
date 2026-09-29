"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { cv } from "@/lib/cv-data";
import { SectionHeading } from "@/components/primitives/section-heading";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { cn } from "@/lib/utils";

export function AWSCloud() {
  const reduced = useReducedMotion();
  const [active, setActive] = useState<number | null>(null);

  return (
    <section className="relative py-24 sm:py-32 px-5 sm:px-8 max-w-7xl mx-auto">
      <SectionHeading
        index="06"
        title="Cloud Architecture"
        subtitle="AWS.REGION"
      />

      <p className="mt-6 max-w-2xl text-muted-foreground text-sm sm:text-base leading-relaxed">
        A reference AWS architecture synthesized from my CV — services I
        practice across compute, network, data, security, and observability
        layers. Hover a node to inspect the role of each service.
      </p>

      <div className="mt-10 grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Diagram column */}
        <div className="lg:col-span-8 panel p-5 sm:p-8 relative overflow-hidden">
          <div className="absolute inset-0 grid-bg-sm opacity-40 pointer-events-none" />

          {/* VPC boundary */}
          <div className="relative border border-cyan/30 p-5 sm:p-6 bg-cyan/[0.012]">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <span className="tech-label text-cyan">REGION</span>
                <span className="text-xs font-mono text-foreground">eu-central-1</span>
              </div>
              <span className="tech-label text-muted-foreground">VPC: 10.0.0.0/16</span>
            </div>

            {/* layered flow */}
            <div className="space-y-3">
              {cv.awsFlow.map((layer, i) => {
                const isActive = active === i;
                return (
                  <motion.div
                    key={layer.service}
                    initial={reduced ? false : { opacity: 0, y: 8 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: i * 0.05 }}
                    onMouseEnter={() => setActive(i)}
                    onMouseLeave={() => setActive(null)}
                    className={cn(
                      "relative grid grid-cols-12 items-center gap-2 px-3 py-2.5 border transition-all",
                      isActive
                        ? "border-cyan/40 bg-cyan/[0.05]"
                        : "border-hairline bg-white/[0.01] hover:border-cyan/20"
                    )}
                  >
                    {/* layer tag */}
                    <div className="col-span-3 sm:col-span-2">
                      <span
                        className={cn(
                          "tech-label",
                          isActive ? "text-cyan" : "text-muted-foreground"
                        )}
                      >
                        {layer.layer}
                      </span>
                    </div>
                    {/* service name */}
                    <div className="col-span-6 sm:col-span-7">
                      <div className="flex items-center gap-2">
                        <span
                          className={cn(
                            "w-1.5 h-1.5",
                            isActive ? "bg-cyan" : "bg-cyan/40"
                          )}
                        />
                        <span className="text-sm font-mono text-foreground">
                          {layer.service}
                        </span>
                      </div>
                    </div>
                    {/* arrow */}
                    <div className="col-span-3 sm:col-span-3 flex justify-end">
                      <span
                        className={cn(
                          "text-xs font-mono",
                          isActive ? "text-cyan" : "text-muted-foreground/60"
                        )}
                      >
                        L{String(i + 1).padStart(2, "0")} ▾
                      </span>
                    </div>

                    {/* hover note */}
                    <motion.div
                      initial={false}
                      animate={{
                        height: isActive ? "auto" : 0,
                        opacity: isActive ? 1 : 0,
                      }}
                      transition={{ duration: 0.2 }}
                      className="col-span-12 overflow-hidden"
                    >
                      <p className="text-[11px] font-mono text-muted-foreground pt-1 pl-5 border-t border-hairline mt-1.5">
                        {layer.note}
                      </p>
                    </motion.div>
                  </motion.div>
                );
              })}
            </div>

            {/* subnet labels (decorative) */}
            <div className="mt-4 flex flex-wrap justify-between text-[9px] font-mono uppercase tracking-[0.18em] text-muted-foreground">
              <span>subnet-public-a · 10.0.1.0/24</span>
              <span>subnet-private-b · 10.0.2.0/24</span>
              <span>subnet-data-c · 10.0.3.0/24</span>
            </div>
          </div>

          {/* ingress/egress arrows */}
          <div className="absolute right-3 top-3 flex flex-col items-end gap-1 text-[9px] font-mono text-cyan/60">
            <span>INGRESS ▾</span>
            <span>EGRESS ▴</span>
          </div>
        </div>

        {/* Side info */}
        <div className="lg:col-span-4 space-y-4">
          <div className="panel p-4">
            <div className="tech-label text-cyan/80 mb-3">SERVICE.INVENTORY</div>
            <div className="space-y-2">
              {cv.awsFlow.slice(0, 6).map((l) => (
                <div
                  key={l.service}
                  className="flex items-center justify-between text-[11px] font-mono"
                >
                  <span className="text-muted-foreground">{l.layer}</span>
                  <span className="text-foreground">{l.service.split(" ")[0]}</span>
                </div>
              ))}
            </div>
            <div className="mt-3 pt-3 border-t border-hairline text-[10px] font-mono text-muted-foreground">
              + {cv.awsFlow.length - 6} more layers
            </div>
          </div>

          <div className="panel p-4 relative scan-lines overflow-hidden">
            <div className="tech-label text-cyan/80 mb-2">DESIGN.PRINCIPLES</div>
            <ul className="space-y-1.5 text-[11px] font-mono text-muted-foreground">
              {[
                "least-privilege IAM",
                "event-driven workloads",
                "observability via CloudWatch",
                "S3 as event source & storage",
                "VPC isolation & subnets",
              ].map((p) => (
                <li key={p} className="flex items-center gap-2">
                  <span className="text-cyan">▸</span>
                  {p}
                </li>
              ))}
            </ul>
          </div>

          <div className="panel p-4">
            <div className="tech-label text-cyan/80 mb-2">CONTEXT</div>
            <p className="text-[11px] font-mono text-muted-foreground leading-relaxed">
              Reflects the serverless patterns, IAM, and observability I
              applied in the AWS Serverless project — not a live deployment.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
