import { motion } from "motion/react";
import { X } from "lucide-react";
import { clsx } from "clsx";
import type { School } from "../../../lib/schools";

interface SchoolMediaModalProps {
  school: School;
  mode: "intro" | "avatar";
  onClose: () => void;
}

export function SchoolMediaModal({ school, mode, onClose }: SchoolMediaModalProps) {
  const videoSrc = mode === "intro" ? school.introVideoUrl : school.avatarVideoUrl;
  const isAvatar = mode === "avatar";

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-white/50 p-4 backdrop-blur-md md:p-8"
      onClick={onClose}
    >
      <button
        type="button"
        onClick={onClose}
        className="absolute top-6 right-6 z-50 rounded-full border border-white/60 bg-white/80 p-3 text-slate-600 shadow-lg backdrop-blur-md transition-colors hover:bg-white"
      >
        <X size={28} />
      </button>

      <motion.div
        initial={{ scale: 0.92, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.92, opacity: 0 }}
        transition={{ type: "spring", damping: 26, stiffness: 300 }}
        className={clsx(
          "relative w-full max-h-[90vh] overflow-hidden rounded-3xl border border-white/60 bg-white shadow-2xl",
          isAvatar ? "max-w-2xl aspect-[9/16] md:aspect-auto" : "max-w-7xl aspect-video",
        )}
        onClick={(e) => e.stopPropagation()}
      >
        <video src={videoSrc} autoPlay controls playsInline className="h-full w-full bg-black object-contain" />
        <div className="pointer-events-none absolute inset-x-0 top-0 bg-gradient-to-b from-black/50 to-transparent p-6">
          <h3 className="text-lg font-bold text-white drop-shadow-md">
            {isAvatar ? "Asistente virtual" : school.name}
          </h3>
        </div>
      </motion.div>
    </motion.div>
  );
}
