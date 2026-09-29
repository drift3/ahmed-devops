"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  index: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  className?: string;
}

export function SectionHeading({
  index,
  title,
  subtitle,
  align = "left",
  className,
}: SectionHeadingProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });
  return (
    <div
      ref={ref}
      className={cn(
        "flex flex-col gap-3",
        align === "center" && "items-center text-center",
        className
      )}
    >
      <div className="flex items-center gap-3">
        <span className="tech-label text-cyan/80">{"// "}{index}</span>
        <span className="h-px w-12 bg-cyan/30" />
        {subtitle && <span className="tech-label">{subtitle}</span>}
      </div>
      <motion.h2
        initial={{ opacity: 0, y: 18 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="text-3xl sm:text-4xl md:text-5xl font-medium tracking-tight text-balance"
      >
        {title}
      </motion.h2>
    </div>
  );
}
