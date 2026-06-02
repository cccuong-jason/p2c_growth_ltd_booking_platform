"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

export function AnimatedList({
  children,
  className
}: {
  children: ReactNode[];
  className?: string;
}) {
  return (
    <div className={cn("space-y-3", className)}>
      {children.map((child, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, x: 26, scale: 0.96 }}
          whileInView={{ opacity: 1, x: 0, scale: 1 }}
          viewport={{ once: true, amount: 0.55 }}
          transition={{
            duration: 0.55,
            delay: index * 0.12,
            ease: [0.16, 1, 0.3, 1],
          }}
        >
          {child}
        </motion.div>
      ))}
    </div>
  );
}
