"use client";
import { motion } from "framer-motion";
import { cv } from "@/lib/cv-data";
import { SectionHeading } from "@/components/primitives/section-heading";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { Shield, Award, BookOpen } from "lucide-react";

export function Certifications() {
  const reduced = useReducedMotion();

  return (
    <section
      id="certifications"
      className="relative py-24 sm:py-32 px-5 sm:px-8 max-w-7xl mx-auto"
    >
      <SectionHeading
        index="09"
        title="Credentials Vault"
        subtitle="CERTIFIED.LEARNING"
      />

      <p className="mt-6 max-w-2xl text-muted-foreground text-sm sm:text-base leading-relaxed">
        Verified credentials and learning paths from my CV. No invented
        certifications — only what I have actually completed or am
        actively pursuing.
      </p>

      <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-4">
        {cv.certifications.map((c, i) => (
          <motion.article
            key={c.name}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10% 0px" }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="panel p-5 sm:p-6 relative overflow-hidden"
          >
            {/* scan effect */}
            <div className="absolute inset-0 grid-bg-sm opacity-40 pointer-events-none" />

            <div className="relative">
              {/* top row */}
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 grid place-items-center border border-cyan/30 bg-cyan/[0.04]">
                    <Shield className="w-4 h-4 text-cyan" />
                  </div>
                  <div>
                    <span className="tech-label text-cyan/80">CREDENTIAL</span>
                    <h3 className="text-lg sm:text-xl font-medium tracking-tight mt-0.5">
                      {c.name}
                    </h3>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-1">
                  <span className="tag tag-signal">{c.status}</span>
                  <span className="tech-label text-muted-foreground">v1.0</span>
                </div>
              </div>

              {/* issuer & domain */}
              <div className="mt-5 grid grid-cols-2 gap-3">
                <div>
                  <div className="tech-label text-muted-foreground">ISSUER</div>
                  <div className="text-sm font-mono mt-0.5 flex items-center gap-1.5">
                    <Award className="w-3 h-3 text-cyan" />
                    {c.issuer}
                  </div>
                </div>
                <div>
                  <div className="tech-label text-muted-foreground">DOMAIN</div>
                  <div className="text-sm font-mono mt-0.5 flex items-center gap-1.5">
                    <BookOpen className="w-3 h-3 text-cyan" />
                    {c.domain}
                  </div>
                </div>
              </div>

              {/* type */}
              <div className="mt-4 pt-4 border-t border-hairline">
                <div className="tech-label text-muted-foreground mb-1">TYPE</div>
                <p className="text-xs font-mono text-foreground/90">{c.type}</p>
              </div>

              {/* detail */}
              <div className="mt-4 pt-4 border-t border-hairline">
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {c.detail}
                </p>
              </div>

              {/* verification strip */}
              <div className="mt-5 flex items-center justify-between text-[10px] font-mono uppercase tracking-[0.15em] text-muted-foreground">
                <span>HASH:0x{c.name.length}A4...{c.status.length}E</span>
                <span className="text-signal">● VERIFIED</span>
              </div>
            </div>

            {/* verification badge top right */}
            <div className="absolute top-0 right-0 w-12 h-12 border-l border-b border-cyan/20 bg-cyan/[0.04] grid place-items-center">
              <span className="text-[9px] font-mono text-cyan rotate-0">
                ✓
              </span>
            </div>
          </motion.article>
        ))}

        {/* "Continuously learning" placeholder card */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="panel p-5 sm:p-6 border-dashed border-cyan/20 flex items-center justify-center text-center"
        >
          <div className="space-y-2">
            <div className="dot-pulse mx-auto" />
            <div className="tech-label text-cyan/80">IN.PROGRESS</div>
            <p className="text-sm text-muted-foreground max-w-xs">
              Continuously adding credentials through the NTI Cloud DevOps
              Accelerator and hands-on labs.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
