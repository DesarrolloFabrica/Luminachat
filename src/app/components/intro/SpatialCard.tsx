import { motion } from "motion/react";
import { clsx } from "clsx";
import type { ReactNode } from "react";

interface SpatialCardProps {
  children: ReactNode;
  className?: string;
  accentColor?: string;
  depth?: "back" | "side" | "center" | "feature";
  onClick?: () => void;
  style?: React.CSSProperties;
  /** Evita animación de entrada cuando el padre la controla */
  skipEntrance?: boolean;
}

const depthStyles: Record<NonNullable<SpatialCardProps["depth"]>, string> = {
  back: "opacity-40 scale-[0.82] blur-[1px] pointer-events-none",
  side: "opacity-70 scale-[0.9] hover:opacity-90",
  center: "opacity-100 scale-100 z-20",
  feature: "opacity-100 scale-100",
};

export function SpatialCard({
  children,
  className,
  accentColor,
  depth = "center",
  onClick,
  style,
  skipEntrance = false,
}: SpatialCardProps) {
  const isInteractive = depth === "center" || depth === "side" || depth === "feature";

  return (
    <motion.div
      role={onClick ? "button" : undefined}
      tabIndex={onClick ? 0 : undefined}
      onClick={onClick}
      onKeyDown={
        onClick
          ? (e) => {
              if (e.key === "Enter" || e.key === " ") onClick();
            }
          : undefined
      }
      initial={skipEntrance ? false : { opacity: 0, y: 24, scale: 0.94 }}
      animate={skipEntrance ? undefined : { opacity: 1, y: 0, scale: 1 }}
      whileHover={isInteractive && !skipEntrance ? { scale: 1.03 } : undefined}
      transition={{ type: "spring", stiffness: 260, damping: 26 }}
      className={clsx(
        "relative rounded-[2rem] border border-white/20 bg-white/10 backdrop-blur-xl shadow-[0_24px_80px_rgba(0,0,0,0.45)]",
        depthStyles[depth],
        onClick && "cursor-pointer",
        className,
      )}
      style={{
        boxShadow: accentColor
          ? `0 24px 60px -12px ${accentColor}35, inset 0 1px 0 rgba(255,255,255,0.15)`
          : undefined,
        ...style,
      }}
    >
      <div className="absolute inset-0 rounded-[2rem] bg-gradient-to-br from-white/10 via-transparent to-transparent pointer-events-none" />
      <div className="relative z-10">{children}</div>
    </motion.div>
  );
}
