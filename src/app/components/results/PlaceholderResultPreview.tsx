import { motion } from "motion/react";
import { Construction } from "lucide-react";

interface PlaceholderResultPreviewProps {
  message: string;
}

export function PlaceholderResultPreview({ message }: PlaceholderResultPreviewProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className="flex min-h-[280px] flex-col items-center justify-center rounded-2xl border border-dashed border-cyan-400/20 bg-gradient-to-b from-white/[0.06] to-white/[0.02] p-10 text-center backdrop-blur-[24px]"
      style={{ boxShadow: "0 0 48px rgba(34,211,238,0.08)" }}
    >
      <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl border border-cyan-400/20 bg-cyan-400/10">
        <Construction size={28} className="text-cyan-400" />
      </div>
      <p className="text-sm leading-relaxed text-slate-300 max-w-md">{message}</p>
    </motion.div>
  );
}
