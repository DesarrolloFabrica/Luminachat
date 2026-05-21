import { motion } from "motion/react";
import { X } from "lucide-react";
import { clsx } from "clsx";
import type { School } from "../../../lib/schools";
import { LuminaCoreAnimation } from "../visual/LuminaCoreAnimation";
import { getSchoolThemeFromSchool } from "../../data/schoolThemes";

interface SchoolMediaModalProps {
  school: School;
  mode: "intro" | "avatar";
  onClose: () => void;
}

export function SchoolMediaModal({ school, mode, onClose }: SchoolMediaModalProps) {
  const isAvatar = mode === "avatar";
  const theme = getSchoolThemeFromSchool(school);
  const videoSrc = school.introVideoUrl;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className={clsx(
        "fixed inset-0 z-[100] flex items-center justify-center p-4 backdrop-blur-md md:p-8",
        isAvatar ? "bg-[#0f172a]/80" : "bg-white/50",
      )}
      onClick={onClose}
    >
      <button
        type="button"
        onClick={onClose}
        className={clsx(
          "absolute top-6 right-6 z-50 rounded-full border p-3 shadow-lg backdrop-blur-md transition-colors",
          isAvatar
            ? "border-cyan-400/25 bg-[#111827]/80 text-cyan-300 hover:bg-[#1e293b]"
            : "border-white/60 bg-white/80 text-slate-600 hover:bg-white",
        )}
      >
        <X size={28} />
      </button>

      <motion.div
        initial={{ scale: 0.92, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.92, opacity: 0 }}
        transition={{ type: "spring", damping: 26, stiffness: 300 }}
        className={clsx(
          "relative w-full max-h-[90vh] overflow-hidden rounded-3xl border shadow-2xl",
          isAvatar
            ? "max-w-lg aspect-square flex items-center justify-center border-cyan-400/15 bg-[#111827]/90"
            : "max-w-7xl aspect-video border-white/60 bg-white",
        )}
        onClick={(e) => e.stopPropagation()}
      >
        {isAvatar ? (
          <div className="flex h-full w-full items-center justify-center p-8">
            <LuminaCoreAnimation size="school" accentColor={theme.accentColor} />
          </div>
        ) : (
          <video
            src={videoSrc}
            autoPlay
            controls
            playsInline
            className="h-full w-full bg-black object-contain"
          />
        )}
        <div className="pointer-events-none absolute inset-x-0 top-0 bg-gradient-to-b from-black/50 to-transparent p-6">
          <h3 className="text-lg font-bold text-white drop-shadow-md">
            {isAvatar ? "Núcleo LUMINA" : school.name}
          </h3>
        </div>
      </motion.div>
    </motion.div>
  );
}
