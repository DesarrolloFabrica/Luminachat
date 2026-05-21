import { useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Download, X } from "lucide-react";
import { clsx } from "clsx";
import type { EducationalPackage } from "../education/educationPackageResults";
import { downloadPackageFile } from "../education/educationPackageResults";
import { LUMINA_BG, LUMINA_GLASS, LUMINA_GLOW, LUMINA_TEXT } from "../chat/luminaChatPalette";
import { PdfResultPreview } from "./PdfResultPreview";
import { VideoResultPreview } from "./VideoResultPreview";
import { InteractiveMagazinePreview } from "./InteractiveMagazinePreview";
import { PlaceholderResultPreview } from "./PlaceholderResultPreview";
import { PdfPresentationPreview } from "./PdfPresentationPreview";

interface GeneratedResultViewerProps {
  open: boolean;
  package: EducationalPackage | null;
  accentColor: string;
  onClose: () => void;
}

export function GeneratedResultViewer({
  open,
  package: pkg,
  accentColor,
  onClose,
}: GeneratedResultViewerProps) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && pkg && (
        <motion.div
          key={pkg.id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[200] flex items-center justify-center p-3 sm:p-6 md:p-8"
          role="dialog"
          aria-modal="true"
          aria-labelledby="result-viewer-title"
        >
          <motion.button
            type="button"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-[#020617]/75 backdrop-blur-md"
            onClick={onClose}
            aria-label="Cerrar visor"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 8 }}
            transition={{ type: "spring", damping: 28, stiffness: 320 }}
            className={clsx(
              "relative z-10 flex max-h-[92vh] w-full flex-col overflow-hidden rounded-3xl border backdrop-blur-[24px]",
              pkg.resultType === "interactive" ? "max-w-6xl" : "max-w-5xl",
              LUMINA_BG.shell,
              LUMINA_GLASS.border,
              LUMINA_GLOW.shell,
            )}
            onClick={(e) => e.stopPropagation()}
            style={{
              boxShadow: `0 0 80px -20px ${accentColor}40, 0 24px 64px -24px rgba(0,0,0,0.6)`,
            }}
          >
            <div
              className="pointer-events-none absolute -inset-px rounded-3xl opacity-60"
              style={{
                background: `radial-gradient(ellipse at 50% 0%, ${accentColor}22 0%, transparent 55%)`,
              }}
            />

            <header className="relative z-10 flex shrink-0 items-start justify-between gap-4 border-b border-cyan-400/10 px-5 py-4 md:px-6">
              <div className="min-w-0">
                <h2
                  id="result-viewer-title"
                  className={clsx("text-lg font-bold tracking-tight truncate", LUMINA_TEXT.primary)}
                >
                  {pkg.title}
                </h2>
                <p className={clsx("text-xs mt-0.5", LUMINA_TEXT.muted)}>
                  Resultado generado por LUMINA
                </p>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="shrink-0 rounded-full border border-cyan-400/20 bg-white/[0.04] p-2 text-slate-400 transition-colors hover:bg-cyan-400/10 hover:text-cyan-200"
              >
                <X size={20} />
              </button>
            </header>

            <div className="relative z-10 flex-1 min-h-0 overflow-y-auto lumina-chat-scroll px-4 py-4 md:px-6 md:py-5">
              {pkg.resultType === "pdf" && pkg.fileUrl && (
                <PdfResultPreview fileUrl={pkg.fileUrl} title={pkg.title} />
              )}
              {pkg.resultType === "video" && pkg.fileUrl && (
                <VideoResultPreview fileUrl={pkg.fileUrl} title={pkg.title} />
              )}
              {pkg.resultType === "presentation" && pkg.fileUrl && (
                <PdfPresentationPreview fileUrl={pkg.fileUrl} title={pkg.title} />
              )}
              {pkg.resultType === "interactive" && pkg.interactiveIframeSrc && (
                <InteractiveMagazinePreview
                  iframeSrc={pkg.interactiveIframeSrc}
                  external={pkg.interactiveExternal}
                  fallbackMessage="Navega con las flechas y controles de la publicación Adobe."
                />
              )}
              {pkg.resultType === "placeholder" && (
                <PlaceholderResultPreview
                  message={pkg.placeholderMessage ?? "Vista previa en construcción."}
                />
              )}
            </div>

            <footer className="relative z-10 shrink-0 flex flex-col-reverse sm:flex-row gap-2 border-t border-cyan-400/10 px-4 py-4 md:px-6">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 sm:flex-none rounded-xl border border-white/10 bg-white/[0.04] px-5 py-2.5 text-xs font-bold text-slate-300 hover:bg-white/[0.08] transition-colors"
              >
                Cerrar
              </button>
              <button
                type="button"
                onClick={() => downloadPackageFile(pkg)}
                disabled={pkg.downloadDisabled}
                className={clsx(
                  "flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 rounded-xl px-5 py-2.5 text-xs font-bold border transition-all",
                  pkg.downloadDisabled
                    ? "border-white/10 bg-white/[0.03] text-slate-500 cursor-not-allowed opacity-60"
                    : "border-cyan-400/20 bg-cyan-400/10 text-cyan-200 hover:bg-cyan-400/15",
                )}
              >
                <Download size={14} /> Descargar
              </button>
            </footer>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
