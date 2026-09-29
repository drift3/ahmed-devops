"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { cv } from "@/lib/cv-data";
import { SectionHeading } from "@/components/primitives/section-heading";
import { ScrambleText } from "@/components/primitives/scramble-text";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { Cpu, Server, Cloud, Shield } from "lucide-react";

export function About() {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const photoY = useTransform(scrollYProgress, [0, 1], [40, -40]);
  const overlayY = useTransform(scrollYProgress, [0, 1], [-20, 30]);

  return (
    <section
      ref={ref}
      id="about"
      className="relative py-24 sm:py-32 px-5 sm:px-8 max-w-7xl mx-auto"
    >
      <SectionHeading
        index="01"
        title="Identity Module"
        subtitle="WHO.IS[AHMED]"
      />

      <div className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        {/* Portrait panel */}
        <div className="lg:col-span-5">
          <div className="relative aspect-[4/5] panel corner-ticks overflow-hidden">
            {/* grid background */}
            <div className="absolute inset-0 grid-bg-sm opacity-60" />
            <div className="absolute inset-0 scan-lines" />

            {/* duotone portrait */}
            <motion.div
              style={reduced ? undefined : { y: photoY }}
              className="absolute inset-0"
            >
              <img
                src={`${process.env.NEXT_PUBLIC_BASE_PATH || ""}/assets/portrait.jpg`}
                alt="Portrait of Ahmed Farouk"
                className="w-full h-full object-cover object-center mix-blend-luminosity opacity-90"
                style={{
                  filter:
                    "contrast(1.15) brightness(0.95) saturate(0.4) sepia(0.18) hue-rotate(150deg)",
                }}
              />
              {/* color wash */}
              <div className="absolute inset-0 bg-gradient-to-tr from-cyan/25 via-transparent to-electric/15 mix-blend-color" />
              <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-transparent" />
            </motion.div>

            {/* overlay metadata */}
            <motion.div
              style={reduced ? undefined : { y: overlayY }}
              className="absolute inset-0 p-5 flex flex-col justify-between"
            >
              <div className="flex items-center justify-between">
                <span className="tech-label text-cyan">ID.CARD</span>
                <span className="tech-label text-muted-foreground">v3.0</span>
              </div>
              <div className="space-y-1.5">
                <ScrambleText
                  as="div"
                  text="AHMED FAROUK"
                  disabled={reduced}
                  className="text-xl sm:text-2xl font-mono tracking-tight text-foreground"
                />
                <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-[10px] font-mono uppercase tracking-[0.15em] text-muted-foreground">
                  <span>LOC</span>
                  <span className="text-foreground/90">{cv.location}</span>
                  <span>ROLE</span>
                  <span className="text-foreground/90">{cv.role}</span>
                  <span>STATUS</span>
                  <span className="text-signal">TRAINING</span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* tech strip */}
          <div className="mt-3 flex items-center justify-between text-[10px] font-mono uppercase tracking-[0.15em] text-muted-foreground">
            <span>IMG.SCAN.OK</span>
            <span>HASH:0xAF...90</span>
          </div>
        </div>

        {/* Narrative */}
        <div className="lg:col-span-7 space-y-6">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10% 0px" }}
            transition={{ duration: 0.6 }}
            className="text-xl sm:text-2xl font-medium leading-snug text-foreground text-balance"
          >
            {cv.summary}
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10% 0px" }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-base text-muted-foreground leading-relaxed"
          >
            I work across cloud infrastructure, container platforms, and CI/CD
            pipelines — building automation that makes deployments predictable
            and systems observable. My current focus is operating Kubernetes
            and OpenShift clusters, applying GitOps practices, and shaping
            production-oriented microservice patterns around health probes,
            autoscaling, and security boundaries.
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10% 0px" }}
            transition={{ duration: 0.6, delay: 0.18 }}
            className="text-base text-muted-foreground leading-relaxed"
          >
            The engineering problems that interest me most sit at the seams
            between cloud and platform: how infrastructure stays reproducible
            under change, how services degrade safely, and how teams ship
            without trading off security or observability. I approach these
            with Bash and Python as my operating tools, infrastructure-as-code
            with Terraform and Ansible, and pipeline-driven delivery with
            GitHub Actions and Tekton.
          </motion.p>

          {/* Direction cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4">
            {[
              { icon: Cloud, label: "CLOUD", value: "AWS" },
              { icon: Server, label: "PLATFORMS", value: "K8S · OCP" },
              { icon: Cpu, label: "AUTOMATION", value: "IaC · CI/CD" },
              { icon: Shield, label: "SECURITY", value: "DevSecOps" },
            ].map((c) => (
              <motion.div
                key={c.label}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="panel p-3 flex flex-col gap-2"
              >
                <c.icon className="w-4 h-4 text-cyan" />
                <div className="tech-label text-muted-foreground">{c.label}</div>
                <div className="tech-value">{c.value}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
