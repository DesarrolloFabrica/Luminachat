import { motion } from "motion/react";
import "@lottiefiles/dotlottie-wc";
import { clsx } from "clsx";
import { LUMINA_LOTTIE_SRC } from "./luminaLottie";
import { useReducedMotion } from "../../hooks/useReducedMotion";

type IconSize = "sm" | "md" | "lg";

const SIZE_CLASS: Record<IconSize, string> = {
  sm: "h-8 w-8",
  md: "h-10 w-10",
  lg: "h-14 w-14",
};

const GLOW_CLASS: Record<IconSize, string> = {
  sm: "h-10 w-10 blur-lg",
  md: "h-12 w-12 blur-xl",
  lg: "h-16 w-16 blur-xl",
};

interface LuminaCoreIconProps {
  accentColor?: string;
  size?: IconSize;
  className?: string;
  /** Pulso al procesar */
  active?: boolean;
}

/** Icono Lottie compacto para headers, mensajes y avatares */
export function LuminaCoreIcon({
  accentColor = "#22d3ee",
  size = "md",
  className,
  active = false,
}: LuminaCoreIconProps) {
  const reducedMotion = useReducedMotion();

  return (
    <div
      className={clsx(
        "relative flex shrink-0 items-center justify-center",
        SIZE_CLASS[size],
        className,
      )}
    >
      <div
        className={clsx("pointer-events-none absolute rounded-full opacity-50", GLOW_CLASS[size])}
        style={{
          background: `radial-gradient(circle, ${accentColor}88 0%, transparent 70%)`,
        }}
      />
      <motion.div
        className="relative z-10 flex items-center justify-center"
        animate={
          reducedMotion
            ? undefined
            : active
              ? { scale: [1, 1.08, 1] }
              : { scale: [1, 1.03, 1] }
        }
        transition={{ duration: active ? 1.2 : 4, repeat: Infinity, ease: "easeInOut" }}
      >
        <dotlottie-wc
          src={LUMINA_LOTTIE_SRC}
          autoplay
          loop
          className={clsx("block", SIZE_CLASS[size])}
          style={{
            filter: `drop-shadow(0 0 12px ${accentColor}66)`,
          }}
        />
      </motion.div>
    </div>
  );
}
