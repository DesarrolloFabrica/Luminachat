import { motion } from "motion/react";
import { ExternalLink, MousePointerClick } from "lucide-react";

interface InteractiveMagazinePreviewProps {
  iframeSrc: string;
  fallbackMessage?: string;
  /** Publicación externa (p. ej. Adobe Publish Online) */
  external?: boolean;
  openInNewTabLabel?: string;
}

export function InteractiveMagazinePreview({
  iframeSrc,
  fallbackMessage = "Navega con las flechas y controles de la publicación.",
  external = false,
  openInNewTabLabel = "Abrir publicación completa",
}: InteractiveMagazinePreviewProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className="relative flex h-full min-h-[min(78vh,760px)] w-full flex-col overflow-hidden rounded-2xl border border-cyan-400/10 bg-[#0b1220]"
    >
      {external && (
        <div className="flex shrink-0 items-center justify-between gap-2 border-b border-cyan-400/10 px-4 py-2.5 bg-white/[0.03]">
          <span className="text-[10px] font-bold uppercase tracking-wider text-cyan-400/90">
            Adobe Publish Online
          </span>
          <a
            href={iframeSrc}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-[10px] font-semibold text-slate-400 hover:text-cyan-300 transition-colors"
          >
            <ExternalLink size={12} />
            {openInNewTabLabel}
          </a>
        </div>
      )}

      <iframe
        src={iframeSrc}
        title="Revista interactiva LUMINA"
        className="flex-1 w-full min-h-[min(72vh,700px)] border-0"
        allow="fullscreen; autoplay"
        allowFullScreen
        referrerPolicy="no-referrer-when-downgrade"
        sandbox="allow-scripts allow-same-origin allow-popups allow-forms allow-downloads allow-modals"
      />

      <div className="pointer-events-none absolute bottom-0 left-0 right-0 flex items-center gap-2 bg-gradient-to-t from-[#0b1220] via-[#0b1220]/95 to-transparent px-4 py-3">
        <MousePointerClick size={14} className="text-cyan-400 shrink-0" />
        <p className="text-[10px] text-slate-400">{fallbackMessage}</p>
      </div>
    </motion.div>
  );
}
