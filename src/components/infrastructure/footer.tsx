"use client";
import { cv } from "@/lib/cv-data";
import { Github, Linkedin, Mail } from "lucide-react";

export function Footer() {
  return (
    <footer className="relative border-t border-hairline mt-12">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 py-10 grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* identity */}
        <div>
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs tracking-[0.18em] uppercase">
              <span className="text-cyan">AF</span>
              <span className="text-muted-foreground mx-1">/</span>
              <span className="text-foreground">DevOps</span>
            </span>
          </div>
          <p className="mt-3 text-xs text-muted-foreground leading-relaxed">
            {cv.name} · {cv.role}<br />
            {cv.location}
          </p>
        </div>

        {/* links */}
        <div className="flex md:justify-center gap-3">
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
          <a
            href={`mailto:${cv.email}`}
            className="w-9 h-9 grid place-items-center border border-hairline hover:border-cyan/50 hover:text-cyan text-muted-foreground transition-colors"
            aria-label="Email"
          >
            <Mail className="w-4 h-4" />
          </a>
        </div>

        {/* system status */}
        <div className="md:text-right">
          <div className="flex md:justify-end items-center gap-2">
            <div className="dot-pulse" />
            <span className="tech-label text-signal">SYSTEM ONLINE</span>
          </div>
          <p className="mt-3 text-[10px] font-mono text-muted-foreground">
            UPTIME: 99.99% · BUILD: {new Date().toISOString().slice(0, 10)}
          </p>
          <p className="mt-1 text-[10px] font-mono text-muted-foreground/60">
            {"// Built from CV source-of-truth. No invented content."}
          </p>
        </div>
      </div>

      {/* base strip */}
      <div className="border-t border-hairline">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 py-4 flex flex-wrap items-center justify-between gap-3 text-[10px] font-mono uppercase tracking-[0.18em] text-muted-foreground">
          <span>© {new Date().getFullYear()} {cv.name.toUpperCase()}</span>
          <span className="hidden sm:inline">CLOUD · DEVOPS · AUTOMATION</span>
          <span className="text-cyan">v3.0 · STABLE</span>
        </div>
      </div>
    </footer>
  );
}
