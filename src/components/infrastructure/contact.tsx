"use client";
import { motion } from "framer-motion";
import { cv } from "@/lib/cv-data";
import { SectionHeading } from "@/components/primitives/section-heading";
import { MagneticButton } from "@/components/primitives/magnetic-button";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { Github, Linkedin, Mail, ArrowRight } from "lucide-react";

export function Contact() {
  const reduced = useReducedMotion();

  return (
    <section
      id="contact"
      className="relative py-24 sm:py-32 px-5 sm:px-8 max-w-7xl mx-auto"
    >
      <SectionHeading
        index="10"
        title="Establish Connection"
        subtitle="CONTACT.LINK"
      />

      <div className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left — narrative */}
        <div className="lg:col-span-5 space-y-6">
          <motion.h3
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-2xl sm:text-3xl font-medium tracking-tight text-balance"
          >
            Open to opportunities in{" "}
            <span className="text-cyan">DevOps</span>,{" "}
            <span className="text-cyan">Cloud</span>, and{" "}
            <span className="text-cyan">Platform Engineering</span> roles.
          </motion.h3>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-base text-muted-foreground leading-relaxed"
          >
            If you operate cloud infrastructure, ship delivery pipelines,
            or run Kubernetes/OpenShift platforms — let&rsquo;s talk.
            I bring hands-on lab and training experience across Linux/RHEL,
            AWS, containers, IaC, and CI/CD, with a DevSecOps mindset.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-2"
          >
            <div className="flex items-center gap-3 text-sm font-mono">
              <Mail className="w-3.5 h-3.5 text-cyan" />
              <a
                href={`mailto:${cv.email}`}
                className="hover:text-cyan transition-colors"
              >
                {cv.email}
              </a>
            </div>
            <div className="flex items-center gap-3 text-sm font-mono">
              <span className="w-3.5 h-3.5 grid place-items-center text-cyan">●</span>
              <span className="text-muted-foreground">{cv.location}</span>
            </div>
            <div className="flex items-center gap-3 text-sm font-mono">
              <span className="w-3.5 h-3.5 grid place-items-center text-cyan">●</span>
              <span className="text-muted-foreground">{cv.phone}</span>
            </div>
          </motion.div>

          <div className="flex flex-wrap gap-3 pt-4">
            <MagneticButton href={cv.githubUrl} variant="primary">
              <Github className="w-3.5 h-3.5" />
              GitHub
            </MagneticButton>
            <MagneticButton href={cv.linkedinUrl} variant="outline">
              <Linkedin className="w-3.5 h-3.5" />
              LinkedIn
            </MagneticButton>
            <MagneticButton href={`mailto:${cv.email}`} variant="outline">
              <Mail className="w-3.5 h-3.5" />
              Email
            </MagneticButton>
          </div>
        </div>

        {/* Right — connection visualization */}
        <div className="lg:col-span-7">
          <ConnectionDiagram reduced={reduced} />
        </div>
      </div>
    </section>
  );
}

function ConnectionDiagram({ reduced }: { reduced?: boolean }) {
  return (
    <div className="panel p-6 sm:p-8 relative overflow-hidden aspect-[4/3] sm:aspect-[16/10]">
      <div className="absolute inset-0 grid-bg-sm opacity-50 pointer-events-none" />
      <div className="absolute inset-0 scan-lines pointer-events-none" />

      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 600 400"
        preserveAspectRatio="xMidYMid meet"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="conn-grad" x1="0" x2="1" y1="0" y2="0">
            <stop offset="0%" stopColor="#5eead4" stopOpacity="0.1" />
            <stop offset="50%" stopColor="#5eead4" stopOpacity="0.7" />
            <stop offset="100%" stopColor="#5eead4" stopOpacity="0.1" />
          </linearGradient>
        </defs>

        {/* connection line */}
        <path
          d="M 60 200 H 540"
          stroke="url(#conn-grad)"
          strokeWidth="1"
          fill="none"
          className={reduced ? "" : "flow-dash"}
        />

        {/* packets moving */}
        {!reduced && [0, 1, 2].map((i) => (
          <circle key={i} r="3" fill="#5eead4">
            <animateMotion
              dur="3s"
              begin={`${i * 1}s`}
              repeatCount="indefinite"
              path="M 60 200 H 540"
            />
          </circle>
        ))}

        {/* left node — client */}
        <g>
          <circle cx="60" cy="200" r="22" stroke="#5eead4" strokeOpacity="0.5" fill="rgba(94,234,212,0.05)" strokeWidth="0.6" />
          <circle cx="60" cy="200" r="32" stroke="#5eead4" strokeOpacity="0.2" fill="none" strokeWidth="0.4" />
          <text x="60" y="204" fontSize="8" fill="#5eead4" textAnchor="middle" fontFamily="monospace">YOU</text>
        </g>

        {/* middle nodes (gateway) */}
        <g>
          <rect x="180" y="180" width="80" height="40" stroke="#5eead4" strokeOpacity="0.3" fill="rgba(94,234,212,0.03)" strokeWidth="0.6" />
          <text x="220" y="200" fontSize="6" fill="#5eead4" textAnchor="middle" fontFamily="monospace">ROUTER</text>
          <text x="220" y="210" fontSize="5" fill="#5eead4" opacity="0.7" textAnchor="middle" fontFamily="monospace">DNS · TLS</text>
        </g>
        <g>
          <rect x="340" y="180" width="80" height="40" stroke="#5eead4" strokeOpacity="0.3" fill="rgba(94,234,212,0.03)" strokeWidth="0.6" />
          <text x="380" y="200" fontSize="6" fill="#5eead4" textAnchor="middle" fontFamily="monospace">LOAD.BAL</text>
          <text x="380" y="210" fontSize="5" fill="#5eead4" opacity="0.7" textAnchor="middle" fontFamily="monospace">ALB · IAM</text>
        </g>

        {/* right node — ahmed's portfolio */}
        <g>
          <circle cx="540" cy="200" r="22" stroke="#5eead4" strokeOpacity="0.5" fill="rgba(94,234,212,0.05)" strokeWidth="0.6" />
          <circle cx="540" cy="200" r="32" stroke="#5eead4" strokeOpacity="0.2" fill="none" strokeWidth="0.4" />
          <text x="540" y="198" fontSize="6" fill="#5eead4" textAnchor="middle" fontFamily="monospace">AHMED</text>
          <text x="540" y="208" fontSize="5" fill="#5eead4" opacity="0.7" textAnchor="middle" fontFamily="monospace">DEVOPS</text>
        </g>

        {/* top label */}
        <text x="300" y="40" fontSize="7" fill="#5eead4" textAnchor="middle" fontFamily="monospace" opacity="0.8">
          SECURE.CONNECTION · TLS 1.3
        </text>

        {/* bottom labels */}
        <text x="60" y="260" fontSize="6" fill="#5eead4" textAnchor="middle" fontFamily="monospace" opacity="0.6">
          CLIENT
        </text>
        <text x="540" y="260" fontSize="6" fill="#5eead4" textAnchor="middle" fontFamily="monospace" opacity="0.6">
          PORTFOLIO.SERVICE
        </text>

        {/* status indicators */}
        <circle cx="220" cy="170" r="1.5" fill="#4ade80">
          {!reduced && (
            <animate attributeName="opacity" values="1;0.3;1" dur="2s" repeatCount="indefinite" />
          )}
        </circle>
        <circle cx="380" cy="170" r="1.5" fill="#4ade80">
          {!reduced && (
            <animate attributeName="opacity" values="1;0.3;1" dur="2s" begin="0.5s" repeatCount="indefinite" />
          )}
        </circle>
      </svg>

      {/* overlay info */}
      <div className="absolute top-3 left-3 flex items-center gap-2">
        <div className="dot-pulse" />
        <span className="tech-label text-signal">LINK READY</span>
      </div>
      <div className="absolute bottom-3 right-3 flex items-center gap-2">
        <span className="tech-label text-muted-foreground">PING: 8ms</span>
        <ArrowRight className="w-3 h-3 text-cyan" />
      </div>
    </div>
  );
}
