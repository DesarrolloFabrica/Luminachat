import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { FileText, Sparkles } from "lucide-react";
import { ANALYSIS_MESSAGES } from "./educationMock";
import { useReducedMotion } from "../../hooks/useReducedMotion";

interface AnalysisProgressProps {
  accentColor: string;
  onComplete: () => void;
  /** Duración total simulada en ms */
  durationMs?: number;
}

export function AnalysisProgress({
  accentColor,
  onComplete,
  durationMs = 7500,
}: AnalysisProgressProps) {
  const reducedMotion = useReducedMotion();
  const [progress, setProgress] = useState(0);
  const [messageIndex, setMessageIndex] = useState(0);

  useEffect(() => {
    const step = 50;
    const increment = 100 / (durationMs / step);
    const interval = window.setInterval(() => {
      setProgress((p) => {
        const next = Math.min(p + increment, 100);
        if (next >= 100) window.clearInterval(interval);
        return next;
      });
    }, step);
    const timeout = window.setTimeout(onComplete, durationMs);
    return () => {
      window.clearInterval(interval);
      window.clearTimeout(timeout);
    };
  }, [durationMs, onComplete]);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setMessageIndex((i) => (i + 1) % ANALYSIS_MESSAGES.length);
    }, 1500);
    return () => window.clearInterval(interval);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, filter: "blur(8px)" }}
      animate={{ opacity: 1, filter: "blur(0px)" }}
      className="flex flex-col items-center justify-center py-12 px-6 text-center"
    >
      <motion.div
        animate={
          reducedMotion
            ? undefined
            : { y: [0, -12, 0], rotate: [-2, 2, -2] }
        }
        transition={
          reducedMotion
            ? undefined
            : { duration: 4, repeat: Infinity, ease: "easeInOut" }
        }
        className="relative mb-8"
      >
        <div
          className="absolute inset-0 rounded-3xl blur-2xl opacity-50"
          style={{ backgroundColor: `${accentColor}44` }}
        />
        <div
          className="relative flex h-20 w-20 items-center justify-center rounded-2xl border border-white/25 bg-white/10 backdrop-blur-xl"
        >
          <FileText size={36} style={{ color: accentColor }} />
        </div>
        {!reducedMotion && (
          <>
            {[0, 1, 2].map((i) => (
              <motion.span
                key={i}
                className="absolute h-1.5 w-1.5 rounded-full"
                style={{ backgroundColor: accentColor }}
                animate={{
                  opacity: [0.2, 0.8, 0.2],
                  scale: [0.8, 1.2, 0.8],
                  x: [20 + i * 24, 40 + i * 20, 20 + i * 24],
                  y: [-30 + i * 15, -50, -30 + i * 15],
                }}
                transition={{
                  duration: 2.5,
                  repeat: Infinity,
                  delay: i * 0.4,
                }}
              />
            ))}
          </>
        )}
      </motion.div>

      <div className="mb-2 flex items-center gap-2">
        <Sparkles size={16} style={{ color: accentColor }} />
        <span className="text-xs font-semibold uppercase tracking-widest text-white/50">
          LUMINA analizando
        </span>
      </div>

      <div className="h-8 mb-6 flex items-center justify-center">
        <AnimatePresence mode="wait">
          <motion.p
            key={messageIndex}
            initial={{ opacity: 0, y: 8, filter: "blur(4px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -8, filter: "blur(4px)" }}
            transition={{ duration: 0.35 }}
            className="text-base md:text-lg font-medium text-white/90"
          >
            {ANALYSIS_MESSAGES[messageIndex]}
          </motion.p>
        </AnimatePresence>
      </div>

      <div className="w-full max-w-md h-2 rounded-full bg-white/10 overflow-hidden border border-white/10">
        <motion.div
          className="h-full rounded-full"
          style={{
            width: `${progress}%`,
            background: `linear-gradient(90deg, ${accentColor}, ${accentColor}99)`,
            boxShadow: `0 0 20px ${accentColor}66`,
          }}
          transition={{ duration: 0.1 }}
        />
      </div>
      <p className="mt-3 text-xs text-white/40 tabular-nums">{Math.round(progress)}%</p>
    </motion.div>
  );
}
