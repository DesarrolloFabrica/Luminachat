import { motion } from "motion/react";

interface VideoResultPreviewProps {
  fileUrl: string;
  title: string;
}

export function VideoResultPreview({ fileUrl, title }: VideoResultPreviewProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className="relative flex h-full min-h-[min(60vh,520px)] w-full items-center justify-center overflow-hidden rounded-2xl border border-cyan-400/10 bg-black/60"
      style={{ boxShadow: "inset 0 0 80px rgba(34,211,238,0.06)" }}
    >
      <video
        src={fileUrl}
        controls
        playsInline
        className="max-h-[min(70vh,600px)] w-full object-contain"
        title={title}
      />
    </motion.div>
  );
}
