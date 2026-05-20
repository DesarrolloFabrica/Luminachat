import { motion } from "motion/react";
import { clsx } from "clsx";
import type { ReactNode } from "react";

const listVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.05, delayChildren: 0.08 },
  },
};

interface SidebarSectionProps {
  title: string;
  children: ReactNode;
  collapsed?: boolean;
  className?: string;
}

export function SidebarSection({
  title,
  children,
  collapsed = false,
  className,
}: SidebarSectionProps) {
  return (
    <div className={clsx("flex flex-col", className)}>
      {!collapsed && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="px-3 mb-2 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400"
        >
          {title}
        </motion.p>
      )}
      {collapsed && (
        <div className="mx-auto mb-2 h-px w-8 bg-gradient-to-r from-transparent via-slate-300/80 to-transparent" />
      )}
      <motion.ul
        variants={listVariants}
        initial="hidden"
        animate="show"
        className="flex flex-col gap-1"
      >
        {children}
      </motion.ul>
    </div>
  );
}
