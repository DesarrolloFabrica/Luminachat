import { motion, AnimatePresence } from "motion/react";
import { clsx } from "clsx";
import { FileCheck } from "lucide-react";
import { LUMINA_BG, LUMINA_GLASS, LUMINA_GLOW } from "./luminaChatPalette";

interface LuminaChatShellProps {
  accentColor: string;
  children: React.ReactNode;
  className?: string;
  documentAnalysisMode?: boolean;
  documentName?: string;
}

export function LuminaChatShell({
  accentColor,
  children,
  className,
  documentAnalysisMode = false,
  documentName,
}: LuminaChatShellProps) {
  return (
    <div className={clsx("relative flex h-full w-full flex-col overflow-hidden", className)}>
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute -top-[35%] -right-[15%] h-[55%] w-[55%] rounded-full blur-[120px]"
          style={{ background: "radial-gradient(circle, rgba(34,211,238,0.18) 0%, transparent 70%)" }}
          animate={{ scale: [1, 1.08, 1], opacity: [0.5, 0.85, 0.5] }}
          transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute -bottom-[30%] -left-[10%] h-[50%] w-[50%] rounded-full blur-[110px]"
          style={{ background: "radial-gradient(circle, rgba(20,184,166,0.14) 0%, transparent 70%)" }}
          animate={{ scale: [1, 1.12, 1], opacity: [0.4, 0.7, 0.4] }}
          transition={{ duration: 13, repeat: Infinity, ease: "easeInOut", delay: 0.6 }}
        />
        <motion.div
          className="absolute top-[20%] left-[30%] h-[40%] w-[40%] rounded-full blur-[100px]"
          style={{ background: "radial-gradient(circle, rgba(96,165,250,0.08) 0%, transparent 65%)" }}
          animate={{ opacity: [0.3, 0.55, 0.3] }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
        />
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <motion.span
            key={i}
            className="absolute h-1 w-1 rounded-full bg-cyan-300/40"
            style={{
              left: `${15 + i * 14}%`,
              top: `${25 + (i % 3) * 20}%`,
            }}
            animate={{ opacity: [0.15, 0.55, 0.15], y: [0, -8, 0] }}
            transition={{ duration: 4 + i * 0.5, repeat: Infinity, delay: i * 0.4 }}
          />
        ))}
      </div>

      <div
        className={clsx(
          "relative z-10 flex h-full min-h-0 flex-col overflow-hidden",
          "rounded-[32px] border backdrop-blur-[24px]",
          LUMINA_BG.shell,
          LUMINA_GLASS.border,
          LUMINA_GLOW.shell,
        )}
        style={{
          boxShadow: `0 0 80px rgba(34,211,238,0.06), 0 0 40px -12px ${accentColor}15`,
        }}
      >
        <div
          className="pointer-events-none absolute inset-0 rounded-[32px] opacity-80"
          style={{
            background:
              "linear-gradient(135deg, rgba(34,211,238,0.04) 0%, transparent 45%, rgba(20,184,166,0.03) 100%)",
          }}
        />
        <div className="relative z-10 flex h-full min-h-0 flex-col">{children}</div>
      </div>

      <AnimatePresence>
        {documentAnalysisMode && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-20 flex items-start justify-center pt-20 pointer-events-none rounded-[32px]"
          >
            <motion.div
              initial={{ y: -8, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className={clsx(
                "flex items-center gap-2 rounded-full px-4 py-2",
                "border border-cyan-400/30 bg-[#111827]/90 backdrop-blur-[24px]",
                LUMINA_GLOW.cyan,
              )}
            >
              <FileCheck size={16} className="text-cyan-400" />
              <span className="text-xs font-bold uppercase tracking-wider text-white">
                Documento detectado
              </span>
              {documentName && (
                <span className="text-xs text-slate-400 truncate max-w-[180px]">
                  · {documentName}
                </span>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function LuminaChatScrollArea({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative flex-1 min-h-0">
      <div className="pointer-events-none absolute top-0 left-0 right-0 h-10 z-10 bg-gradient-to-b from-[#111827] via-[#111827]/80 to-transparent" />
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-10 z-10 bg-gradient-to-t from-[#0b1220] via-[#111827]/80 to-transparent" />
      <div className="lumina-chat-scroll h-full overflow-y-auto overflow-x-hidden px-4 py-5 md:px-6 md:py-6 space-y-5">
        {children}
      </div>
    </div>
  );
}
