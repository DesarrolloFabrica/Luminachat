import { useState } from "react";
import { motion } from "motion/react";
import { CheckCircle2, Loader2, Sparkles } from "lucide-react";
import { clsx } from "clsx";
import type { EducationalPackage, GenerationStatus } from "./educationPackageResults";
import { downloadPackageFile } from "./educationPackageResults";
import { ResultActionButtons } from "../results/ResultActionButtons";
import { luminaDocCardClass, luminaPrimaryButtonClass, LUMINA_TEXT } from "../chat/luminaChatPalette";

const GENERATION_MS = 2200;

interface GeneratedDocumentCardProps {
  package: EducationalPackage;
  accentColor: string;
  delay?: number;
  enabled?: boolean;
  variant?: "light" | "dark";
  onViewResult: (pkg: EducationalPackage) => void;
}

export function GeneratedDocumentCard({
  package: pkg,
  accentColor,
  delay = 0,
  enabled = true,
  variant = "dark",
  onViewResult,
}: GeneratedDocumentCardProps) {
  const [status, setStatus] = useState<GenerationStatus>("idle");
  const Icon = pkg.icon;
  const isDark = variant === "dark";

  const handleGenerate = () => {
    if (!enabled || status !== "idle") return;
    setStatus("generating");
    window.setTimeout(() => setStatus("generated"), GENERATION_MS);
  };

  const statusLabel =
    status === "idle"
      ? "LISTO PARA GENERAR"
      : status === "generating"
        ? "GENERANDO…"
        : "GENERADO";

  return (
    <motion.div
      initial={{ opacity: 0, y: 24, scale: 0.96 }}
      animate={{ opacity: enabled ? 1 : 0.45, y: 0, scale: 1 }}
      transition={{ delay, duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
      whileHover={enabled ? { y: -4 } : undefined}
      className={clsx(
        "group relative flex flex-col rounded-2xl p-5 backdrop-blur-[24px] transition-all duration-300",
        isDark ? luminaDocCardClass : "border border-slate-200/80 bg-white/80 hover:shadow-lg",
        !enabled && "opacity-50 pointer-events-none",
      )}
      style={
        enabled
          ? ({ ["--card-accent" as string]: accentColor } as React.CSSProperties)
          : undefined
      }
    >
      <motion.div
        animate={enabled ? { y: [0, -4, 0] } : undefined}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        className={clsx(
          "mb-4 flex h-12 w-12 items-center justify-center rounded-xl border",
          isDark ? "border-cyan-400/15 bg-cyan-400/10" : "border-slate-100 bg-slate-50",
        )}
        style={{ boxShadow: enabled ? "0 0 20px rgba(34,211,238,0.12)" : undefined }}
      >
        <Icon size={24} className="text-cyan-400" style={{ color: accentColor }} />
      </motion.div>

      <h4
        className={clsx(
          "text-sm font-bold mb-1 tracking-tight",
          isDark ? LUMINA_TEXT.primary : "text-slate-900",
        )}
      >
        {pkg.title}
      </h4>
      <p
        className={clsx(
          "text-xs leading-relaxed mb-4 flex-1",
          isDark ? LUMINA_TEXT.muted : "text-slate-600",
        )}
      >
        {pkg.description}
      </p>

      <div className="flex items-center justify-between gap-2 mt-auto">
        <motion.span
          key={status}
          initial={{ opacity: 0, x: -4 }}
          animate={{ opacity: 1, x: 0 }}
          className={clsx(
            "text-[10px] font-bold uppercase tracking-wider",
            status === "generated"
              ? "text-teal-400"
              : status === "generating"
                ? "text-cyan-400"
                : isDark
                  ? LUMINA_TEXT.muted
                  : "text-slate-500",
          )}
        >
          {statusLabel}
        </motion.span>
        {status === "generated" && (
          <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }}>
            <CheckCircle2 size={14} className="text-teal-400" />
          </motion.span>
        )}
        {status === "generating" && (
          <Loader2 size={14} className="text-cyan-400 animate-spin shrink-0" />
        )}
      </div>

      {status === "generated" ? (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          className="mt-3"
        >
          <ResultActionButtons
            onView={() => onViewResult(pkg)}
            onDownload={() => downloadPackageFile(pkg)}
            downloadDisabled={pkg.downloadDisabled}
          />
        </motion.div>
      ) : (
        <button
          type="button"
          onClick={handleGenerate}
          disabled={!enabled || status === "generating"}
          className={clsx(
            "mt-3 w-full rounded-xl py-2.5 text-xs font-bold transition-all",
            status === "generating"
              ? "bg-white/[0.06] text-slate-300 cursor-wait opacity-80"
              : clsx(luminaPrimaryButtonClass, "text-slate-950 hover:brightness-110"),
            !enabled && "opacity-50 cursor-not-allowed",
          )}
        >
          {status === "idle" ? (
            <span className="inline-flex items-center justify-center gap-1.5">
              <Sparkles size={14} /> Generar
            </span>
          ) : (
            <span className="inline-flex items-center justify-center gap-1.5">
              <Loader2 size={14} className="animate-spin" /> Generando…
            </span>
          )}
        </button>
      )}
    </motion.div>
  );
}
