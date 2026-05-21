import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Sparkles } from "lucide-react";
import { clsx } from "clsx";
import { ANALYSIS_MESSAGES, MOCK_ANALYSIS } from "./educationMock";

interface AnalysisStepProps {
  accentColor: string;
  analyzingLabel?: string;
  isActive: boolean;
  isComplete: boolean;
  onComplete: () => void;
  durationMs?: number;
}

export function AnalysisStep({
  accentColor,
  analyzingLabel = "LUMINA analizando",
  isActive,
  isComplete,
  onComplete,
  durationMs = 7500,
}: AnalysisStepProps) {
  const [progress, setProgress] = useState(0);
  const [messageIndex, setMessageIndex] = useState(0);
  const running = isActive && !isComplete;

  useEffect(() => {
    if (!running) {
      if (isComplete) setProgress(100);
      return;
    }

    setProgress(0);
    setMessageIndex(0);
    const step = 50;
    const increment = 100 / (durationMs / step);
    const interval = window.setInterval(() => {
      setProgress((p) => Math.min(p + increment, 100));
    }, step);
    const timeout = window.setTimeout(onComplete, durationMs);
    return () => {
      window.clearInterval(interval);
      window.clearTimeout(timeout);
    };
  }, [running, durationMs, onComplete, isComplete]);

  useEffect(() => {
    if (!running) return;
    const interval = window.setInterval(() => {
      setMessageIndex((i) => (i + 1) % ANALYSIS_MESSAGES.length);
    }, 1500);
    return () => window.clearInterval(interval);
  }, [running]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: isActive || isComplete ? 1 : 0.5, y: 0 }}
      className={clsx(
        "rounded-2xl border p-5 md:p-6 transition-colors",
        isActive && !isComplete
          ? "border-white/80 bg-white/70 shadow-lg"
          : "border-white/50 bg-white/40",
      )}
      style={
        isActive && !isComplete
          ? { boxShadow: `0 12px 40px -16px ${accentColor}35` }
          : undefined
      }
    >
      <div className="flex items-center gap-3 mb-4">
        <span
          className="flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold text-white"
          style={{ backgroundColor: isComplete ? "#10b981" : accentColor }}
        >
          {isComplete ? "✓" : "2"}
        </span>
        <h3 className="text-base font-bold text-slate-900">{analyzingLabel}</h3>
      </div>

      <div className="py-4 text-center">
        <motion.div
          animate={running ? { y: [0, -6, 0] } : undefined}
          transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
          className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl border border-slate-200 bg-white shadow-sm"
        >
          <Sparkles size={22} style={{ color: accentColor }} />
        </motion.div>

        <div className="h-7 mb-4 flex items-center justify-center">
          {running ? (
            <AnimatePresence mode="wait">
              <motion.p
                key={messageIndex}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                className="text-sm font-medium text-slate-700"
              >
                {ANALYSIS_MESSAGES[messageIndex]}
              </motion.p>
            </AnimatePresence>
          ) : isComplete ? (
            <p className="text-sm font-semibold text-emerald-700">Análisis completado</p>
          ) : (
            <p className="text-sm text-slate-400">Esperando documento…</p>
          )}
        </div>

        <div className="mx-auto max-w-sm h-2 rounded-full bg-slate-200 overflow-hidden">
          <motion.div
            className="h-full rounded-full"
            style={{
              width: `${isComplete ? 100 : progress}%`,
              background: `linear-gradient(90deg, ${accentColor}, ${accentColor}99)`,
            }}
          />
        </div>
        {(running || isComplete) && (
          <p className="mt-2 text-xs text-slate-500 tabular-nums">
            {Math.round(isComplete ? 100 : progress)}%
          </p>
        )}
      </div>

      <AnimatePresence>
        {isComplete && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            className="mt-4 overflow-hidden rounded-xl border border-slate-200/80 bg-white/60 p-4 text-left"
          >
            <p className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">
              Resumen del análisis (simulado)
            </p>
            <div className="space-y-4 text-sm">
              <div>
                <p className="font-semibold text-slate-800">Tema principal</p>
                <p className="text-slate-600">{MOCK_ANALYSIS.mainTopic}</p>
              </div>
              <div>
                <p className="font-semibold text-slate-800 mb-1">Temas detectados</p>
                <ol className="list-decimal list-inside space-y-0.5 text-slate-600">
                  {MOCK_ANALYSIS.topics.map((t) => (
                    <li key={t}>{t}</li>
                  ))}
                </ol>
              </div>
              <div>
                <p className="font-semibold text-slate-800 mb-1">Competencias</p>
                <ul className="list-disc list-inside space-y-0.5 text-slate-600">
                  {MOCK_ANALYSIS.competencies.map((c) => (
                    <li key={c}>{c}</li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="font-semibold text-slate-800 mb-1">
                  Resultados de aprendizaje
                </p>
                <ul className="list-disc list-inside space-y-0.5 text-slate-600">
                  {MOCK_ANALYSIS.learningOutcomes.map((o) => (
                    <li key={o}>{o}</li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      {/* TODO: análisis con IA (Gemini) */}
    </motion.div>
  );
}
