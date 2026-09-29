"use client";

import { useState } from "react";
import { cv } from "@/lib/cv-data";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { SmoothScrollProvider } from "@/components/primitives/smooth-scroll-provider";
import { CustomCursor } from "@/components/primitives/custom-cursor";
import { Loader } from "@/components/infrastructure/loader";
import { Nav } from "@/components/infrastructure/nav";
import { Hero } from "@/components/infrastructure/hero";
import { About } from "@/components/infrastructure/about";
import { InfrastructureMap } from "@/components/infrastructure/infrastructure-map";
import { DevOpsPipeline } from "@/components/infrastructure/devops-pipeline";
import { Terminal } from "@/components/infrastructure/terminal";
import { ClusterVisualization } from "@/components/infrastructure/cluster-visualization";
import { AWSCloud } from "@/components/infrastructure/aws-cloud";
import { Experience } from "@/components/infrastructure/experience";
import { Projects } from "@/components/infrastructure/projects";
import { Certifications } from "@/components/infrastructure/certifications";
import { Contact } from "@/components/infrastructure/contact";
import { Footer } from "@/components/infrastructure/footer";

export default function Home() {
  const reduced = useReducedMotion();
  const [loaded, setLoaded] = useState(false);

  return (
    <SmoothScrollProvider disabled={reduced}>
      <CustomCursor disabled={reduced} />
      <Loader onComplete={() => setLoaded(true)} disabled={reduced} />

      <div
        className="relative min-h-screen flex flex-col"
        style={{
          opacity: loaded || reduced ? 1 : 0.0,
          transition: "opacity 0.5s ease-in",
        }}
      >
        <Nav />

        <main className="flex-1">
          <Hero />
          <About />
          <InfrastructureMap />
          <DevOpsPipeline />
          <Terminal />
          <ClusterVisualization />
          <AWSCloud />
          <Experience />
          <Projects />
          <Certifications />
          <Contact />
        </main>

        <Footer />

        {/* Ambient noise overlay */}
        <div
          aria-hidden="true"
          className="pointer-events-none fixed inset-0 z-[1] opacity-[0.025] mix-blend-overlay"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' /%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
          }}
        />
      </div>
    </SmoothScrollProvider>
  );
}
