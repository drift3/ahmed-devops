"use client";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { cv } from "@/lib/cv-data";
import { SectionHeading } from "@/components/primitives/section-heading";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { cn } from "@/lib/utils";

type Line = {
  type: "cmd" | "out" | "sys" | "err";
  text: string;
};

const COMMANDS: Record<string, Line[]> = {
  help: [
    { type: "out", text: "available commands:" },
    { type: "out", text: "  whoami            — print operator id" },
    { type: "out", text: "  uname             — system info" },
    { type: "out", text: "  kubectl get pods  — list cluster pods" },
    { type: "out", text: "  systemctl status  — service status" },
    { type: "out", text: "  ip addr           — interface list" },
    { type: "out", text: "  aws sts get-caller-identity — aws identity" },
    { type: "out", text: "  clear             — reset buffer" },
  ],
  whoami: [{ type: "out", text: "ahmed" }],
  "whoami --info": [
    { type: "out", text: "ahmed : uid=1000(ahmed) gid=1000(ahmed) groups=1000(ahmed),27(sudo),998(docker)" },
    { type: "out", text: "    role: DevOps Engineer" },
    { type: "out", text: "    location: Egypt · Mansoura" },
    { type: "out", text: "    focus: cloud infrastructure · containers · automation" },
  ],
  uname: [
    { type: "out", text: "Linux devops-station 6.5.0-rhel #1 SMP x86_64 GNU/Linux" },
    { type: "out", text: "    distribution: Red Hat Enterprise Linux 9" },
    { type: "out", text: "    shell: bash 5.1.16" },
  ],
  "kubectl get pods": [
    { type: "sys", text: "NAMESPACE       NAME                              READY   STATUS    RESTARTS" },
    { type: "out", text: "default         portfolio-api-7c9d4-x2kbn        1/1     Running   0" },
    { type: "out", text: "default         frontend-6b88c-9pq2l              1/1     Running   0" },
    { type: "out", text: "default         postgres-0                       1/1     Running   0" },
    { type: "out", text: "monitoring      prometheus-0                     1/1     Running   0" },
    { type: "out", text: "monitoring      grafana-7d6f8c-2nmz9              1/1     Running   0" },
    { type: "out", text: "openshift       oauth-openshift-5544d-x7t2p     1/1     Running   0" },
    { type: "out", text: "" },
    { type: "sys", text: "→ 6 pods · 0 failures · cluster healthy" },
  ],
  "systemctl status portfolio.service": [
    { type: "sys", text: "● portfolio.service — Ahmed Farouk portfolio" },
    { type: "out", text: "     Loaded: loaded (/etc/systemd/system/portfolio.service; enabled)" },
    { type: "out", text: "     Active: active (running) since boot" },
    { type: "out", text: "       Docs: github.com/drift3" },
    { type: "out", text: "  Process: 1337 ExecStart=/usr/local/bin/portfolio (type=exec)" },
    { type: "out", text: "    Tasks: 12 (limit: 3840)" },
    { type: "out", text: "    Memory: 84.2M  CPU: 1.22s" },
    { type: "out", text: "    Hardening: NoNewPrivileges=yes ProtectSystem=strict PrivateTmp=yes" },
    { type: "signal", text: "" } as any,
    { type: "sys", text: "→ service hardened · restart-policy on-failure · journald enabled" },
  ],
  "ip addr": [
    { type: "out", text: "1: lo    inet 127.0.0.1/8     scope host lo" },
    { type: "out", text: "2: eth0  inet 10.0.1.42/24    scope global dynamic eth0" },
    { type: "out", text: "3: wg0   inet 10.8.0.2/32     scope global wg0" },
    { type: "out", text: "    routes: default via 10.0.1.1" },
    { type: "out", text: "    dns: 1.1.1.1, 8.8.8.8" },
  ],
  "aws sts get-caller-identity": [
    { type: "sys", text: "{ \"UserId\": \"AIDAXXXXXXXXXXXX\", \"Account\": \"************\", \"Arn\": \"arn:aws:iam::************:user/ahmed-farouk\" }" },
    { type: "out", text: "→ identity verified · least-privilege role in use" },
  ],
};

const BOOT_LINES: Line[] = [
  { type: "sys", text: "boot sequence: portfolio.station" },
  { type: "out", text: "  [ok] kernel 6.5.0-rhel" },
  { type: "out", text: "  [ok] networking (eth0, wg0)" },
  { type: "out", text: "  [ok] systemd unit portfolio.service" },
  { type: "out", text: "  [ok] container runtime: docker" },
  { type: "out", text: "  [ok] cluster context: kind · openshift" },
  { type: "sys", text: 'type "help" to list commands.' },
];

const QUICK_COMMANDS = [
  "help",
  "whoami --info",
  "uname",
  "kubectl get pods",
  "systemctl status portfolio.service",
  "ip addr",
  "aws sts get-caller-identity",
];

export function Terminal() {
  const reduced = useReducedMotion();
  const [lines, setLines] = useState<Line[]>(BOOT_LINES);
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [hIndex, setHIndex] = useState(-1);
  const bufferRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (bufferRef.current) {
      bufferRef.current.scrollTop = bufferRef.current.scrollHeight;
    }
  }, [lines]);

  const pushLines = (newLines: Line[]) => {
    setLines((prev) => [...prev, ...newLines]);
  };

  const runCommand = (raw: string) => {
    const cmd = raw.trim();
    pushLines([{ type: "cmd", text: cmd }]);
    if (!cmd) return;
    setHistory((h) => [cmd, ...h].slice(0, 30));
    if (cmd === "clear") {
      setLines([]);
      return;
    }
    const out = COMMANDS[cmd];
    if (out) {
      pushLines(out);
    } else {
      pushLines([
        {
          type: "err",
          text: `command not found: ${cmd.split(" ")[0]} — try 'help'`,
        },
      ]);
    }
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    runCommand(input);
    setInput("");
    setHIndex(-1);
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowUp") {
      e.preventDefault();
      const next = Math.min(history.length - 1, hIndex + 1);
      if (next >= 0 && history[next] !== undefined) {
        setHIndex(next);
        setInput(history[next]);
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      const next = hIndex - 1;
      if (next < 0) {
        setHIndex(-1);
        setInput("");
      } else {
        setHIndex(next);
        setInput(history[next]);
      }
    }
  };

  return (
    <section
      id="terminal"
      className="relative py-24 sm:py-32 px-5 sm:px-8 max-w-7xl mx-auto"
    >
      <SectionHeading
        index="04"
        title="Operations Terminal"
        subtitle="LIVE.SHELL"
      />

      <div className="mt-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Terminal panel */}
        <div className="lg:col-span-8">
          <div className="panel relative overflow-hidden">
            {/* title bar */}
            <div className="flex items-center justify-between px-4 h-9 border-b border-hairline bg-white/[0.01]">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-critical/70" />
                <span className="w-2.5 h-2.5 rounded-full bg-amber/70" />
                <span className="w-2.5 h-2.5 rounded-full bg-signal/70" />
                <span className="ml-3 tech-label text-muted-foreground">
                  ahmed@devops-station: ~
                </span>
              </div>
              <span className="tech-label text-cyan/60">TTY · bash 5.1</span>
            </div>

            {/* buffer */}
            <div
              ref={bufferRef}
              className="h-[360px] sm:h-[420px] overflow-y-auto p-4 font-mono text-[12.5px] leading-relaxed no-scrollbar"
              onClick={() => inputRef.current?.focus()}
            >
              {lines.map((l, i) => (
                <LineRenderer key={i} line={l} reduced={reduced} />
              ))}
              {/* prompt */}
              <form onSubmit={onSubmit} className="flex items-center gap-2 mt-1">
                <span className="text-cyan">ahmed@devops-station</span>
                <span className="text-muted-foreground">:</span>
                <span className="text-electric">~</span>
                <span className="text-muted-foreground">$</span>
                <input
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={onKeyDown}
                  autoFocus
                  aria-label="Terminal input"
                  spellCheck={false}
                  autoComplete="off"
                  className="flex-1 bg-transparent outline-none border-none text-foreground placeholder:text-muted-foreground/50 font-mono text-[12.5px]"
                  placeholder="type 'help' and press enter"
                />
              </form>
            </div>

            {/* status bar */}
            <div className="flex items-center justify-between px-4 h-7 border-t border-hairline bg-white/[0.01]">
              <div className="flex items-center gap-3 text-[9px] font-mono uppercase tracking-[0.18em] text-muted-foreground">
                <span className="text-signal">●</span> CONNECTED
                <span>·</span>
                <span>tty1</span>
                <span>·</span>
                <span>UTF-8</span>
              </div>
              <span className="tech-label text-muted-foreground">
                ↑↓ history · ENTER run
              </span>
            </div>
          </div>

          {/* Quick commands */}
          <div className="mt-3 flex flex-wrap gap-1.5">
            {QUICK_COMMANDS.map((c) => (
              <button
                key={c}
                onClick={() => {
                  runCommand(c);
                  inputRef.current?.focus();
                }}
                className="tag hover:tag-cyan hover:border-cyan/40 transition-colors cursor-pointer"
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        {/* Side info panel */}
        <div className="lg:col-span-4 space-y-4">
          <div className="panel p-4">
            <div className="tech-label text-cyan/80 mb-2">SESSION.INFO</div>
            <div className="space-y-1.5 text-[11px] font-mono">
              <Row label="user" value="ahmed" />
              <Row label="host" value="devops-station" />
              <Row label="distro" value="RHEL 9" />
              <Row label="shell" value="bash 5.1" />
              <Row label="uid" value="1000" />
              <Row label="groups" value="sudo, docker" />
            </div>
          </div>

          <div className="panel p-4">
            <div className="tech-label text-cyan/80 mb-2">SERVICE.HARDENING</div>
            <ul className="space-y-1.5 text-[11px] font-mono text-muted-foreground">
              {[
                "NoNewPrivileges=yes",
                "ProtectSystem=strict",
                "PrivateTmp=yes",
                "Restart=on-failure",
                "journald structured logs",
              ].map((s) => (
                <li key={s} className="flex items-center gap-2">
                  <span className="text-signal">▸</span>
                  {s}
                </li>
              ))}
            </ul>
          </div>

          <div className="panel p-4 scan-lines relative overflow-hidden">
            <div className="tech-label text-cyan/80 mb-2">NOTE</div>
            <p className="text-[11px] font-mono text-muted-foreground leading-relaxed">
              This terminal is a visual representation of my toolchain fluency.
              Commands are scoped to my CV — no production data is exposed.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function LineRenderer({ line, reduced }: { line: Line; reduced?: boolean }) {
  const colorMap: Record<Line["type"], string> = {
    cmd: "text-foreground",
    out: "text-muted-foreground",
    sys: "text-cyan/80",
    err: "text-critical",
    signal: "text-signal",
  };
  if (line.type === "cmd") {
    return (
      <div className="flex items-center gap-2">
        <span className="text-cyan">ahmed@devops-station</span>
        <span className="text-muted-foreground">:</span>
        <span className="text-electric">~</span>
        <span className="text-muted-foreground">$</span>
        <span className={colorMap[line.type]}>{line.text}</span>
      </div>
    );
  }
  return (
    <motion.div
      initial={reduced ? false : { opacity: 0, x: -4 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.18 }}
      className={cn("whitespace-pre-wrap break-words", colorMap[line.type])}
    >
      {line.text || "\u00a0"}
    </motion.div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-2">
      <span className="text-muted-foreground">{label}</span>
      <span className="text-foreground">{value}</span>
    </div>
  );
}
