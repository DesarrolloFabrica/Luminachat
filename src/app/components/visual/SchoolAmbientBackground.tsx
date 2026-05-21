import { motion, AnimatePresence } from "motion/react";
import type { SchoolTheme } from "../../data/schoolThemes";

interface SchoolAmbientBackgroundProps {
  theme: SchoolTheme;
}

export function SchoolAmbientBackground({ theme }: SchoolAmbientBackgroundProps) {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={theme.id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
          className="absolute inset-0"
        >
          <div className={`absolute inset-0 bg-gradient-to-br ${theme.pageGradient}`} />

          <motion.div
            animate={{ scale: [1, 1.08, 1], opacity: [0.32, 0.52, 0.32] }}
            transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -top-[18%] -right-[8%] h-[55vh] w-[55vh] rounded-full blur-[100px]"
            style={{ backgroundColor: `${theme.backgroundGlow}35` }}
          />
          <motion.div
            animate={{ scale: [1, 1.12, 1], opacity: [0.22, 0.42, 0.22] }}
            transition={{ duration: 14, repeat: Infinity, ease: "easeInOut", delay: 0.8 }}
            className="absolute bottom-[8%] -left-[12%] h-[48vh] w-[48vh] rounded-full blur-[95px]"
            style={{ backgroundColor: `${theme.secondaryGlow}28` }}
          />
          <motion.div
            animate={{ opacity: [0.15, 0.28, 0.15] }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-[35%] left-1/2 -translate-x-1/2 h-[40vh] w-[60vw] rounded-full blur-[120px]"
            style={{ backgroundColor: `${theme.backgroundGlow}18` }}
          />

          <div
            className="absolute inset-0 opacity-[0.04]"
            style={{
              backgroundImage: `radial-gradient(circle at 65% 25%, ${theme.accentColor} 0%, transparent 50%)`,
            }}
          />

          {[0, 1, 2, 3, 4].map((i) => (
            <motion.span
              key={i}
              className="absolute h-1 w-1 rounded-full"
              style={{
                backgroundColor: theme.particleColor,
                left: `${12 + i * 18}%`,
                top: `${20 + (i % 3) * 22}%`,
              }}
              animate={{ opacity: [0.1, 0.5, 0.1], y: [0, -12, 0] }}
              transition={{
                duration: 4 + i * 0.6,
                repeat: Infinity,
                delay: i * 0.5,
              }}
            />
          ))}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
