import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { LuminaCoreIcon } from "../visual/LuminaCoreIcon";
import { clsx } from "clsx";
import { ANALYSIS_MESSAGES } from "../education/educationMock";
import { glowPulse } from "./chatMotion";
import { LUMINA_TEXT } from "./luminaChatPalette";

const DEFAULT_MESSAGES: string[] = [
  "Analizando estructura académica…",
  "Preparando recursos visuales…",
  "Organizando componentes interactivos…",
  ...ANALYSIS_MESSAGES,
];

interface LuminaThinkingStateProps {
  accentColor: string;
  messages?: readonly string[];
}

export function LuminaThinkingState({
  accentColor,
  messages = DEFAULT_MESSAGES,
}: LuminaThinkingStateProps) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = window.setInterval(() => {
      setIndex((i) => (i + 1) % messages.length);
    }, 1800);
    return () => window.clearInterval(id);
  }, [messages]);

  return (
    <motion.div variants={glowPulse} animate="animate" className="flex w-full justify-start gap-3">
      <LuminaCoreIcon accentColor={accentColor} size="sm" active />
      <div
        className="flex-1 max-w-md rounded-2xl rounded-tl-md border border-cyan-400/15 px-5 py-4 backdrop-blur-[24px]"
        style={{
          background:
            "linear-gradient(180deg, rgba(34,211,238,0.08) 0%, rgba(255,255,255,0.03) 100%)",
          boxShadow: "0 0 40px rgba(34,211,238,0.08)",
        }}
      >
        <div className="flex items-end justify-center gap-1 h-8 mb-4">
          {[0, 1, 2, 3, 4].map((i) => (
            <motion.span
              key={i}
              className="w-1 rounded-full bg-gradient-to-t from-teal-400 to-cyan-300"
              animate={{ height: ["20%", "100%", "20%"] }}
              transition={{
                duration: 0.9,
                repeat: Infinity,
                delay: i * 0.12,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>
        <div className="h-5 flex items-center justify-center mb-3">
          <AnimatePresence mode="wait">
            <motion.p
              key={index}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              className={clsx("text-xs font-medium text-center", LUMINA_TEXT.secondary)}
            >
              {messages[index]}
            </motion.p>
          </AnimatePresence>
        </div>
        <div className="flex gap-1.5 justify-center">
          {[0, 1, 2].map((i) => (
            <motion.span
              key={i}
              className="h-1 w-1 rounded-full bg-cyan-400/60"
              animate={{ opacity: [0.2, 1, 0.2], scale: [1, 1.4, 1] }}
              transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.2 }}
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
}
