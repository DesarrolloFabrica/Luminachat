import { motion } from "motion/react";

interface PdfResultPreviewProps {
  fileUrl: string;
  title: string;
}

export function PdfResultPreview({ fileUrl, title }: PdfResultPreviewProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className="relative h-full min-h-[min(70vh,640px)] w-full overflow-hidden rounded-2xl border border-cyan-400/10 bg-[#0b1220]"
    >
      <iframe
        src={`${fileUrl}#toolbar=1&navpanes=0`}
        title={title}
        className="h-full w-full min-h-[min(70vh,640px)]"
      />
      <object
        data={fileUrl}
        type="application/pdf"
        className="hidden"
        aria-hidden
      >
        <p className="p-6 text-sm text-slate-400">
          Tu navegador no puede mostrar PDF embebidos. Usa Descargar para abrir el archivo.
        </p>
      </object>
    </motion.div>
  );
}
