"use client";
import { motion } from "framer-motion";
import { cv } from "@/lib/cv-data";
import { HeroScene } from "./hero-scene";
import { ScrambleText } from "@/components/primitives/scramble-text";
import { MagneticButton } from "@/components/primitives/magnetic-button";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { ArrowDown, Github, Linkedin, Mail, Terminal } from "lucide-react";

export function Hero() {
  const reduced = useReducedMotion();

  return (
    <section
      id="system"
      className="relative min-h-screen w-full overflow-hidden flex flex-col"
    >
      {/* 3D background */}
      <div className="absolute inset-0 z-0">
        <HeroScene reduced={reduced} />
      </div>

      {/* gradient overlays */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-ink/40 via-transparent to-ink" />
        <div className="absolute inset-0 grid-bg opacity-50" />
        <div className="absolute inset-0 scan-lines" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,var(--ink)_85%)]" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex-1 flex flex-col justify-center px-5 sm:px-8 pt-20 max-w-7xl mx-auto w-full">
        {/* Top status row */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap items-center gap-x-6 gap-y-2 mb-8"
        >
          <div className="flex items-center gap-2">
            <span className="dot-pulse" />
            <span className="tech-label text-signal">SYSTEM ONLINE</span>
          </div>
          <span className="tech-label text-muted-foreground hidden sm:inline">
            {"// DEVOPS ENGINEER"}
          </span>
          <span className="tech-label text-muted-foreground hidden md:inline">
            BUILD-TIME: {new Date().toISOString().slice(0, 10)}
          </span>
        </motion.div>

        {/* Headline */}
        <div className="space-y-1 sm:space-y-2 max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
          >
            <ScrambleText
              as="h1"
              text="AHMED FAROUK"
              trigger="mount"
              disabled={reduced}
              className="text-5xl sm:text-7xl md:text-8xl lg:text-[10rem] font-medium tracking-[-0.04em] leading-[0.92] text-balance"
            />
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="text-2xl sm:text-3xl md:text-4xl font-mono text-cyan tracking-tight"
          >
            <span className="text-muted-foreground">{"// "}</span>
            {"DevOps Engineer"}
            <span className="text-cyan blink">_</span>
          </motion.p>

          {/* Positioning */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.75 }}
            className="text-base sm:text-lg text-muted-foreground mt-6 max-w-2xl leading-relaxed"
          >
            {cv.positioning.join(" · ")} — operating cloud infrastructure,
            container platforms, and automated delivery pipelines from
            <span className="text-foreground"> {cv.location}</span>.
          </motion.p>
        </div>

        {/* Technical metadata grid */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.95 }}
          className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-px bg-hairline border border-hairline max-w-3xl"
        >
          {[
            { l: "LOCATION", v: "EGYPT" },
            { l: "DOMAIN", v: "CLOUD · DEVOPS" },
            { l: "STACK", v: "AWS · K8S · OPENSHIFT" },
            { l: "STATUS", v: "TRAINING" },
          ].map((m) => (
            <div key={m.l} className="bg-ink/80 backdrop-blur-sm p-3 sm:p-4">
              <div className="tech-label text-muted-foreground">{m.l}</div>
              <div className="tech-value mt-1 text-cyan">{m.v}</div>
            </div>
          ))}
        </motion.div>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.1 }}
          className="mt-8 flex flex-wrap items-center gap-3"
        >
          <MagneticButton href="#projects" variant="primary">
            <Terminal className="w-3.5 h-3.5" />
            View Projects
          </MagneticButton>
          <MagneticButton href="#contact" variant="outline">
            <Mail className="w-3.5 h-3.5" />
            Establish Connection
          </MagneticButton>
          <div className="flex items-center gap-2 ml-2">
            <a
              href={cv.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 grid place-items-center border border-hairline hover:border-cyan/50 hover:text-cyan text-muted-foreground transition-colors"
              aria-label="GitHub"
            >
              <Github className="w-4 h-4" />
            </a>
            <a
              href={cv.linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 grid place-items-center border border-hairline hover:border-cyan/50 hover:text-cyan text-muted-foreground transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-4 h-4" />
            </a>
          </div>
        </motion.div>
      </div>

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4 }}
        className="relative z-10 pb-6 flex flex-col items-center gap-2"
      >
        <span className="tech-label text-muted-foreground">SCROLL TO DEPLOY</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
        >
          <ArrowDown className="w-3.5 h-3.5 text-cyan" />
        </motion.div>
      </motion.div>
    </section>
  );
}
