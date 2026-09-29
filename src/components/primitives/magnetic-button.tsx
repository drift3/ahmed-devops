"use client";
import { useRef, useState, type ReactNode, type MouseEvent } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface MagneticButtonProps {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  className?: string;
  variant?: "primary" | "ghost" | "outline";
  strength?: number;
}

/** Magnetic, slightly-3D button that follows the cursor. */
export function MagneticButton({
  children,
  href,
  onClick,
  className,
  variant = "primary",
  strength = 0.3,
}: MagneticButtonProps) {
  const ref = useRef<HTMLAnchorElement | HTMLButtonElement>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });

  const handleMove = (e: MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - (rect.left + rect.width / 2);
    const y = e.clientY - (rect.top + rect.height / 2);
    setPos({ x: x * strength, y: y * strength });
  };
  const reset = () => setPos({ x: 0, y: 0 });

  const base = cn(
    "relative inline-flex items-center justify-center gap-2 px-5 py-2.5 text-xs font-mono uppercase tracking-[0.18em] transition-colors",
    "border border-hairline select-none",
    variant === "primary" &&
      "bg-cyan/10 text-cyan hover:bg-cyan/15 border-cyan/30 hover:border-cyan/50",
    variant === "outline" &&
      "bg-transparent text-foreground/80 hover:text-foreground border-white/15 hover:border-white/40",
    variant === "ghost" &&
      "bg-transparent text-muted-foreground hover:text-foreground border-transparent hover:border-white/15",
    className
  );

  const inner = (
    <motion.span
      className="inline-flex items-center gap-2"
      animate={{ x: pos.x, y: pos.y }}
      transition={{ type: "spring", stiffness: 200, damping: 18, mass: 0.4 }}
    >
      {children}
    </motion.span>
  );

  const sharedProps = {
    ref: ref as any,
    className: base,
    onMouseMove: handleMove,
    onMouseLeave: reset,
  };

  if (href) {
    return (
      <motion.a
        {...sharedProps}
        href={href}
        target={href.startsWith("http") ? "_blank" : undefined}
        rel="noopener noreferrer"
      >
        {inner}
      </motion.a>
    );
  }
  return (
    <motion.button {...sharedProps} onClick={onClick} type="button">
      {inner}
    </motion.button>
  );
}
