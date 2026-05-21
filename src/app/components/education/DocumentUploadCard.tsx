import { motion } from "motion/react";
import type { LucideIcon } from "lucide-react";
import { clsx } from "clsx";
import { luminaDocCardClass, LUMINA_TEXT } from "../chat/luminaChatPalette";

interface DocumentUploadCardProps {
  icon: LucideIcon;
  label: string;
  description?: string;
  accentColor: string;
  onClick: () => void;
  delay?: number;
}

export function DocumentUploadCard({
  icon: Icon,
  label,
  description,
  accentColor,
  onClick,
  delay = 0,
}: DocumentUploadCardProps) {
  return (
    <motion.button
      type="button"
      initial={{ opacity: 0, y: 20, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -4, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={clsx(
        "group relative flex flex-col items-start gap-3 rounded-2xl p-5 text-left",
        luminaDocCardClass,
      )}
      style={{ ["--accent-glow" as string]: "rgba(34,211,238,0.15)" }}
    >
      <div
        className="flex h-11 w-11 items-center justify-center rounded-xl border border-cyan-400/20 bg-cyan-400/10 transition-transform duration-300 group-hover:scale-110"
        style={{ boxShadow: `0 0 20px ${accentColor}22` }}
      >
        <Icon size={22} className="text-cyan-400" style={{ color: accentColor }} />
      </div>
      <div>
        <p className={clsx("text-sm font-bold", LUMINA_TEXT.primary)}>{label}</p>
        {description && (
          <p className={clsx("mt-1 text-xs leading-relaxed", LUMINA_TEXT.muted)}>{description}</p>
        )}
      </div>
    </motion.button>
  );
}
