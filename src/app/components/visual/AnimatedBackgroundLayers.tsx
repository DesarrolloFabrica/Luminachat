import { motion } from "motion/react";
import type { ParallaxOffset } from "../../hooks/useMouseParallax";
import { useReducedMotion } from "../../hooks/useReducedMotion";

interface AnimatedBackgroundLayersProps {
  accentColor: string;
  parallax: ParallaxOffset;
}

export function AnimatedBackgroundLayers({
  accentColor,
  parallax,
}: AnimatedBackgroundLayersProps) {
  const reducedMotion = useReducedMotion();

  const px = reducedMotion ? 0 : parallax.x;
  const py = reducedMotion ? 0 : parallax.y;

  return (
    <div className="pointer-events-none absolute inset-0 z-[1] overflow-hidden">
      {/* Glow central — detrás del hero */}
      <motion.div
        className="absolute top-[18%] left-1/2 h-[min(55vh,480px)] w-[min(70vw,720px)] -translate-x-1/2 rounded-full blur-[120px]"
        style={{
          background: `radial-gradient(circle, ${accentColor}55 0%, transparent 68%)`,
          x: px * 28,
          y: py * 18,
        }}
        animate={
          reducedMotion
            ? undefined
            : {
                scale: [1, 1.06, 1],
                opacity: [0.35, 0.5, 0.35],
              }
        }
        transition={
          reducedMotion
            ? undefined
            : { duration: 8, repeat: Infinity, ease: "easeInOut" }
        }
      />

      {/* Glow violeta — cards inferiores */}
      <motion.div
        className="absolute bottom-[8%] left-[15%] h-[280px] w-[380px] rounded-full blur-[100px] bg-violet-500/25"
        style={{ x: px * 20, y: py * 12 }}
        animate={
          reducedMotion
            ? undefined
            : { opacity: [0.2, 0.35, 0.2], scale: [1, 1.08, 1] }
        }
        transition={
          reducedMotion
            ? undefined
            : { duration: 9, repeat: Infinity, ease: "easeInOut", delay: 0.5 }
        }
      />

      {/* Glow teal — zona escuelas */}
      <motion.div
        className="absolute top-[38%] right-[8%] h-[220px] w-[300px] rounded-full blur-[90px] bg-teal-400/20"
        style={{ x: px * -24, y: py * 14 }}
        animate={
          reducedMotion
            ? undefined
            : { opacity: [0.15, 0.28, 0.15], scale: [1, 1.05, 1] }
        }
        transition={
          reducedMotion
            ? undefined
            : { duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }
        }
      />

      {/* Partículas / líneas suaves */}
      <motion.div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `linear-gradient(${accentColor}40 1px, transparent 1px), linear-gradient(90deg, ${accentColor}40 1px, transparent 1px)`,
          backgroundSize: "64px 64px",
          x: px * 12,
          y: py * 8,
        }}
        animate={reducedMotion ? undefined : { opacity: [0.03, 0.06, 0.03] }}
        transition={
          reducedMotion
            ? undefined
            : { duration: 10, repeat: Infinity, ease: "easeInOut" }
        }
      />
    </div>
  );
}
