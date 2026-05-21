import { useCallback, useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import { ChevronLeft, ChevronRight, Loader2 } from "lucide-react";
import { clsx } from "clsx";
import * as pdfjsLib from "pdfjs-dist";
import pdfjsWorker from "pdfjs-dist/build/pdf.worker.min.mjs?url";

pdfjsLib.GlobalWorkerOptions.workerSrc = pdfjsWorker;

interface PdfPresentationPreviewProps {
  fileUrl: string;
  title: string;
}

export function PdfPresentationPreview({ fileUrl, title }: PdfPresentationPreviewProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const pdfRef = useRef<pdfjsLib.PDFDocumentProxy | null>(null);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);
    setPage(1);

    const load = async () => {
      try {
        const task = pdfjsLib.getDocument(fileUrl);
        const pdf = await task.promise;
        if (cancelled) return;
        pdfRef.current = pdf;
        setTotalPages(pdf.numPages);
        setLoading(false);
      } catch {
        if (!cancelled) {
          setError("No se pudo cargar la presentación. Intenta descargar el PDF.");
          setLoading(false);
        }
      }
    };

    void load();
    return () => {
      cancelled = true;
      pdfRef.current = null;
    };
  }, [fileUrl]);

  const renderPage = useCallback(async (pageNum: number) => {
    const pdf = pdfRef.current;
    const canvas = canvasRef.current;
    if (!pdf || !canvas) return;

    const pdfPage = await pdf.getPage(pageNum);
    const viewport = pdfPage.getViewport({ scale: 1.5 });
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.height = viewport.height;
    canvas.width = viewport.width;

    await pdfPage.render({ canvasContext: ctx, viewport }).promise;
  }, []);

  useEffect(() => {
    if (loading || error || totalPages === 0) return;
    void renderPage(page);
  }, [page, loading, error, totalPages, renderPage]);

  const goPrev = () => setPage((p) => Math.max(1, p - 1));
  const goNext = () => setPage((p) => Math.min(totalPages, p + 1));

  useEffect(() => {
    if (totalPages === 0) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") setPage((p) => Math.max(1, p - 1));
      if (e.key === "ArrowRight") setPage((p) => Math.min(totalPages, p + 1));
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [totalPages]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className="relative flex min-h-[min(72vh,680px)] w-full flex-col overflow-hidden rounded-2xl border border-cyan-400/10 bg-[#0b1220]"
    >
      <div className="flex items-center justify-between gap-2 border-b border-cyan-400/10 px-4 py-2.5 bg-white/[0.03]">
        <p className="text-xs font-semibold text-slate-300 truncate">{title}</p>
        <span className="text-[10px] font-bold uppercase tracking-wider text-cyan-400/90 shrink-0">
          Modo presentación
        </span>
      </div>

      <div className="relative flex flex-1 items-center justify-center overflow-auto p-4 md:p-6 bg-[#060b14]">
        {loading && (
          <div className="flex flex-col items-center gap-3 text-slate-400">
            <Loader2 className="h-8 w-8 animate-spin text-cyan-400" />
            <p className="text-sm">Cargando diapositivas…</p>
          </div>
        )}
        {error && <p className="text-sm text-amber-300/90 px-6 text-center">{error}</p>}
        {!loading && !error && (
          <canvas
            ref={canvasRef}
            className="max-h-full max-w-full rounded-lg shadow-[0_0_48px_rgba(34,211,238,0.08)]"
            aria-label={`${title} — página ${page}`}
          />
        )}
      </div>

      {!loading && !error && totalPages > 0 && (
        <div className="flex items-center justify-between gap-3 border-t border-cyan-400/10 px-4 py-3 bg-[#0b1220]/95">
          <button
            type="button"
            onClick={goPrev}
            disabled={page <= 1}
            className={clsx(
              "inline-flex items-center gap-1 rounded-xl border px-3 py-2 text-xs font-bold transition-all",
              page <= 1
                ? "border-white/5 text-slate-600 cursor-not-allowed"
                : "border-cyan-400/25 bg-cyan-400/10 text-cyan-200 hover:bg-cyan-400/15",
            )}
          >
            <ChevronLeft size={16} /> Anterior
          </button>
          <span className="text-xs font-semibold text-slate-400 tabular-nums">
            {page} / {totalPages}
          </span>
          <button
            type="button"
            onClick={goNext}
            disabled={page >= totalPages}
            className={clsx(
              "inline-flex items-center gap-1 rounded-xl border px-3 py-2 text-xs font-bold transition-all",
              page >= totalPages
                ? "border-white/5 text-slate-600 cursor-not-allowed"
                : "border-cyan-400/25 bg-cyan-400/10 text-cyan-200 hover:bg-cyan-400/15",
            )}
          >
            Siguiente <ChevronRight size={16} />
          </button>
        </div>
      )}
    </motion.div>
  );
}
