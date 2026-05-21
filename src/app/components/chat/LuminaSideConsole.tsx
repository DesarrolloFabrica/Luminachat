import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Maximize2, Activity } from "lucide-react";
import { clsx } from "clsx";
import { LuminaCoreAnimation } from "../visual/LuminaCoreAnimation";
import { glowPulse } from "./chatMotion";
import { LUMINA_BG, LUMINA_GLASS, LUMINA_GLOW, LUMINA_TEXT } from "./luminaChatPalette";

const ROTATING_STATUSES = [
  "Analizando estructura académica…",
  "Preparando recursos visuales…",
  "Organizando componentes interactivos…",
  "Sincronizando paquetes educativos…",
  "Optimizando salida documental…",
] as const;

interface LuminaSideConsoleProps {
  schoolName: string;
  accentColor: string;
  isTyping: boolean;
  isResponding: boolean;
  onExpand?: () => void;
}

export function LuminaSideConsole({
  schoolName,
  accentColor,
  isTyping,
  isResponding,
  onExpand,
}: LuminaSideConsoleProps) {
  const [statusIndex, setStatusIndex] = useState(0);
  const processing = isTyping || isResponding;

  useEffect(() => {
    const id = window.setInterval(() => {
      setStatusIndex((i) => (i + 1) % ROTATING_STATUSES.length);
    }, 3200);
    return () => window.clearInterval(id);
  }, []);

  return (
    <div className="hidden lg:flex flex-col gap-4 h-full w-full">
      <motion.div
        variants={glowPulse}
        animate="animate"
        className={clsx(
          "relative flex-1 min-h-0 rounded-[2rem] overflow-hidden",
          "border backdrop-blur-[24px]",
          LUMINA_BG.shell,
          LUMINA_GLASS.border,
          LUMINA_GLOW.shell,
          onExpand && "cursor-pointer group",
        )}
        onClick={onExpand}
      >
        <motion.div
          className="pointer-events-none absolute -inset-4 z-0 rounded-[2.5rem] blur-[60px] opacity-60"
          style={{
            background:
              "radial-gradient(ellipse at 50% 55%, rgba(34,211,238,0.28) 0%, transparent 65%)",
          }}
          animate={{ opacity: [0.4, 0.75, 0.4] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        />
        <div
          className="pointer-events-none absolute inset-0 z-[1]"
          style={{
            background:
              "linear-gradient(180deg, rgba(96,165,250,0.06) 0%, transparent 35%, rgba(20,184,166,0.1) 100%)",
          }}
        />

        {onExpand && (
          <div className="absolute top-4 right-4 z-30 opacity-0 group-hover:opacity-100 transition-opacity">
            <div className="rounded-full border border-cyan-400/25 bg-[#111827]/70 p-2 text-cyan-300 backdrop-blur-md">
              <Maximize2 size={16} />
            </div>
          </div>
        )}

        <div className="relative z-[5] flex h-full min-h-0 flex-col items-center justify-center px-4 py-8">
          <motion.div
            animate={
              processing
                ? { scale: [1, 1.04, 1], filter: ["brightness(1)", "brightness(1.15)", "brightness(1)"] }
                : undefined
            }
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="flex items-center justify-center w-full h-full max-h-full"
          >
            <LuminaCoreAnimation
              size="console"
              accentColor={accentColor}
              className="max-h-full"
            />
          </motion.div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 z-20 p-4 bg-gradient-to-t from-[#0b1220]/95 via-[#0f172a]/70 to-transparent backdrop-blur-sm">
          <div className="flex items-center justify-center gap-2">
            <Activity size={12} className="text-cyan-400 shrink-0" />
            <AnimatePresence mode="wait">
              <motion.span
                key={statusIndex}
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                className={clsx("text-[10px] truncate text-center", LUMINA_TEXT.muted)}
              >
                {ROTATING_STATUSES[statusIndex]}
              </motion.span>
            </AnimatePresence>
          </div>
        </div>
      </motion.div>

      <div
        className={clsx(
          "shrink-0 rounded-[1.5rem] border p-4 backdrop-blur-[24px]",
          LUMINA_BG.shell,
          LUMINA_GLASS.border,
        )}
        style={{ boxShadow: "0 0 48px rgba(34,211,238,0.06)" }}
      >
        <p
          className={clsx(
            "text-[10px] font-bold uppercase tracking-widest mb-3 text-center",
            LUMINA_TEXT.muted,
          )}
        >
          Consola LUMINA
        </p>
        <div className="flex items-center justify-center gap-2 mb-2">
          <motion.span
            className={clsx("h-2.5 w-2.5 rounded-full", processing ? "bg-teal-400" : "bg-cyan-400")}
            animate={{ scale: [1, 1.3, 1], opacity: [0.55, 1, 0.55] }}
            transition={{ duration: 1.8, repeat: Infinity }}
            style={{ boxShadow: "0 0 14px rgba(34,211,238,0.5)" }}
          />
          <span className={clsx("text-sm font-bold", LUMINA_TEXT.primary)}>
            {processing ? "Procesando" : "Lista"}
          </span>
        </div>
        <div className="flex justify-center gap-1 mb-3">
          {[0, 1, 2, 3, 4].map((i) => (
            <motion.span
              key={i}
              className="h-1 w-1 rounded-full bg-cyan-400/50"
              animate={{ opacity: processing ? [0.25, 0.95, 0.25] : 0.4 }}
              transition={{ duration: 1, repeat: Infinity, delay: i * 0.15 }}
            />
          ))}
        </div>
        <p
          className={clsx(
            "text-[10px] leading-tight text-center max-w-[240px] mx-auto",
            LUMINA_TEXT.muted,
          )}
        >
          Generación de documentos educativos para {schoolName}.
        </p>
      </div>
    </div>
  );
}
