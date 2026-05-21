import { motion } from "motion/react";
import { ArrowLeft } from "lucide-react";
import { clsx } from "clsx";
import { LuminaCoreIcon } from "../visual/LuminaCoreIcon";
import { LUMINA_BG, LUMINA_GLASS, LUMINA_TEXT } from "./luminaChatPalette";

interface LuminaChatHeaderProps {
  schoolName: string;
  accentColor: string;
  onBack?: () => void;
  isProcessing?: boolean;
  modeLabel?: "MODO SIMULADO" | "IA ACTIVA";
}

export function LuminaChatHeader({
  schoolName,
  accentColor,
  onBack,
  isProcessing = false,
  modeLabel = "MODO SIMULADO",
}: LuminaChatHeaderProps) {
  const statusLabel = modeLabel === "IA ACTIVA" || isProcessing ? "IA ACTIVA" : "MODO SIMULADO";
  const dotActive = isProcessing || statusLabel === "IA ACTIVA";

  return (
    <header
      className={clsx(
        "relative z-30 shrink-0 border-b px-4 py-3 md:px-5 md:py-4",
        LUMINA_BG.header,
        LUMINA_GLASS.border,
        "backdrop-blur-[24px]",
      )}
      style={{
        boxShadow:
          "0 1px 0 rgba(34,211,238,0.08), 0 12px 40px -16px rgba(34,211,238,0.06)",
      }}
    >
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-cyan-400/30 to-transparent" />
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-3 min-w-0">
          {onBack && (
            <button
              type="button"
              onClick={onBack}
              className="shrink-0 rounded-full p-2 text-slate-400 transition-colors hover:bg-cyan-400/10 hover:text-cyan-300"
              title="Volver"
            >
              <ArrowLeft size={20} />
            </button>
          )}
          <LuminaCoreIcon accentColor={accentColor} size="md" active={isProcessing} />
          <div className="min-w-0">
            <h3 className={clsx("text-sm font-bold tracking-wide truncate", LUMINA_TEXT.primary)}>
              LUMINA
            </h3>
            <p
              className={clsx(
                "text-[10px] font-semibold uppercase tracking-widest truncate",
                LUMINA_TEXT.muted,
              )}
            >
              Generación educativa · {schoolName}
            </p>
          </div>
        </div>
        <div
          className={clsx(
            "flex items-center gap-2 shrink-0 rounded-full border px-3 py-1.5",
            LUMINA_GLASS.surface,
            LUMINA_GLASS.border,
          )}
          style={{ boxShadow: `0 0 24px -6px ${accentColor}35` }}
        >
          <span
            className={clsx(
              "hidden sm:inline text-[10px] font-bold uppercase tracking-wider",
              LUMINA_TEXT.muted,
            )}
          >
            {statusLabel}
          </span>
          <motion.span
            className={clsx("h-2 w-2 rounded-full", dotActive ? "bg-teal-400" : "bg-cyan-400")}
            animate={
              dotActive
                ? { scale: [1, 1.35, 1], opacity: [0.65, 1, 0.65] }
                : { opacity: [0.45, 0.85, 0.45] }
            }
            transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
            style={{ boxShadow: "0 0 12px rgba(34,211,238,0.6)" }}
          />
        </div>
      </div>
    </header>
  );
}
