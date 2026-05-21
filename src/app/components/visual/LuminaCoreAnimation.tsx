import { useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import "@lottiefiles/dotlottie-wc";
import { clsx } from "clsx";
import { useReducedMotion } from "../../hooks/useReducedMotion";
import type { ParallaxOffset } from "../../hooks/useMouseParallax";

import { LUMINA_LOTTIE_SRC } from "./luminaLottie";

type LuminaCoreSize = "default" | "compact" | "school" | "console";

interface LuminaCoreAnimationProps {
  accentColor?: string;
  parallax?: ParallaxOffset;
  className?: string;
  /** @deprecated Usar `size="compact"` */
  compact?: boolean;
  size?: LuminaCoreSize;
}

export function LuminaCoreAnimation({
  accentColor = "#6366f1",
  parallax = { x: 0, y: 0 },
  className,
  compact = false,
  size,
}: LuminaCoreAnimationProps) {
  const resolvedSize: LuminaCoreSize = size ?? (compact ? "compact" : "default");
  const reducedMotion = useReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);

  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const springX = useSpring(px, { stiffness: 120, damping: 22 });
  const springY = useSpring(py, { stiffness: 120, damping: 22 });

  useEffect(() => {
    if (reducedMotion) {
      px.set(0);
      py.set(0);
    } else {
      px.set(parallax.x * 14);
      py.set(parallax.y * 10);
    }
  }, [parallax.x, parallax.y, reducedMotion, px, py]);

  const glowX = useTransform(springX, (v) => v * 0.5);
  const glowY = useTransform(springY, (v) => v * 0.5);

  const lottieSizeBySize: Record<LuminaCoreSize, string> = {
    console:
      "h-[min(72%,280px)] w-[min(72%,280px)] max-h-[min(85%,340px)] max-w-[min(85%,340px)]",
    school:
      "h-[min(56vw,240px)] w-[min(56vw,240px)] sm:h-[280px] sm:w-[280px] lg:h-[300px] lg:w-[300px] xl:h-[320px] xl:w-[320px]",
    compact:
      "h-[min(82vw,380px)] w-[min(82vw,380px)] sm:h-[440px] sm:w-[440px] md:h-[500px] md:w-[500px] lg:h-[min(50vw,600px)] lg:w-[min(50vw,600px)]",
    default:
      "h-[min(65vw,360px)] w-[min(65vw,360px)] sm:h-[420px] sm:w-[420px] md:h-[480px] md:w-[480px] lg:h-[540px] lg:w-[540px]",
  };

  const glowSizeBySize: Record<LuminaCoreSize, string> = {
    console:
      "h-[min(78%,300px)] w-[min(78%,300px)] max-h-[min(90%,380px)] max-w-[min(90%,380px)]",
    school:
      "h-[min(60vw,260px)] w-[min(60vw,260px)] sm:h-[300px] sm:w-[300px] lg:h-[340px] lg:w-[340px] xl:h-[360px] xl:w-[360px]",
    compact:
      "h-[min(88vw,420px)] w-[min(88vw,420px)] sm:h-[480px] sm:w-[480px] md:h-[540px] md:w-[540px] lg:h-[min(55vw,660px)] lg:w-[min(55vw,660px)]",
    default:
      "h-[min(80vw,400px)] w-[min(80vw,400px)] md:h-[500px] md:w-[500px] lg:h-[600px] lg:w-[600px]",
  };

  const lottieSize = lottieSizeBySize[resolvedSize];
  const glowSize = glowSizeBySize[resolvedSize];

  return (
    <motion.div
      ref={containerRef}
      className={clsx("relative mx-auto select-none flex flex-col items-center", className)}
      style={{ x: springX, y: springY }}
      initial={{ opacity: 0, scale: 0.92 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Glow detrás — sin tarjeta */}
      <motion.div
        className="pointer-events-none absolute inset-0 flex items-center justify-center"
        style={{ x: glowX, y: glowY }}
      >
        <div
          className={clsx("rounded-full blur-[90px] opacity-55", glowSize)}
          style={{
            background: `radial-gradient(circle, ${accentColor}70 0%, ${accentColor}45 40%, transparent 72%)`,
          }}
        />
      </motion.div>

      {/* Esfera flotante — sin fondo ni borde */}
      <motion.div
        className="relative z-10 flex items-center justify-center"
        animate={
          reducedMotion
            ? undefined
            : {
                y: [0, -12, 0],
                scale: [1, 1.03, 1],
              }
        }
        transition={
          reducedMotion
            ? undefined
            : { duration: 6, repeat: Infinity, ease: "easeInOut" }
        }
        whileHover={reducedMotion ? undefined : { scale: 1.04 }}
      >
        {!reducedMotion &&
          [0, 1, 2, 3, 4].map((i) => (
            <motion.span
              key={i}
              className="pointer-events-none absolute h-1 w-1 rounded-full bg-white/50"
              style={{
                left: `${10 + i * 16}%`,
                top: `${20 + (i % 3) * 22}%`,
              }}
              animate={{ opacity: [0.15, 0.8, 0.15], y: [0, -10, 0] }}
              transition={{
                duration: 3 + i * 0.4,
                repeat: Infinity,
                delay: i * 0.25,
              }}
            />
          ))}

        <dotlottie-wc
          src={LUMINA_LOTTIE_SRC}
          autoplay
          loop
          className={clsx("block", lottieSize)}
          style={{
            filter: `drop-shadow(0 0 40px ${accentColor}55) drop-shadow(0 0 80px rgba(96,165,250,0.25))`,
          }}
        />
      </motion.div>
    </motion.div>
  );
}
