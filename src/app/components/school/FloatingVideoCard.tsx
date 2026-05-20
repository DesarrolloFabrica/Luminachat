import { useRef, useState } from "react";
import { motion } from "motion/react";
import { Maximize2, Pause, Play } from "lucide-react";
import type { School } from "../../../lib/schools";
import { fadeUp } from "./schoolMotion";

interface FloatingVideoCardProps {
  school: School;
  onExpand?: () => void;
  className?: string;
}

export function FloatingVideoCard({ school, onExpand, className }: FloatingVideoCardProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlay = () => {
    videoRef.current?.play();
    setIsPlaying(true);
  };

  const handlePause = (e: React.MouseEvent) => {
    e.stopPropagation();
    videoRef.current?.pause();
    setIsPlaying(false);
  };

  return (
    <motion.div
      variants={fadeUp}
      whileHover={{ scale: 1.02, y: -6 }}
      transition={{ type: "spring", stiffness: 260, damping: 22 }}
      className={className}
      style={{
        boxShadow: `0 32px 80px -20px ${school.accentColor}35, 0 24px 48px rgba(15,23,42,0.12)`,
      }}
    >
      <div
        className="relative w-full aspect-[4/3] lg:aspect-video rounded-3xl overflow-hidden border border-white/60 bg-white/40 backdrop-blur-xl cursor-pointer group"
        onClick={() => {
          if (!isPlaying) handlePlay();
        }}
      >
        <motion.div
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="absolute inset-0"
        >
          <video
            ref={videoRef}
            src={school.introVideoUrl}
            playsInline
            poster={school.videoPlaceholder}
            onEnded={() => setIsPlaying(false)}
            className="absolute inset-0 h-full w-full object-cover"
          />
        </motion.div>

        <div
          className="absolute -inset-4 rounded-[2rem] opacity-40 blur-2xl -z-10 pointer-events-none"
          style={{ backgroundColor: `${school.accentColor}25` }}
        />

        {!isPlaying && <div className="absolute inset-0 bg-slate-900/15 z-10" />}

        {!isPlaying && (
          <div className="absolute inset-0 z-20 flex flex-col items-center justify-center">
            <motion.div
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.95 }}
              className="flex h-20 w-20 items-center justify-center rounded-full border border-white/50 bg-white/25 backdrop-blur-md text-white shadow-xl"
              style={{ boxShadow: `0 0 40px ${school.accentColor}50` }}
            >
              <Play size={32} fill="currentColor" className="ml-1" />
            </motion.div>
            <p className="mt-4 text-xs font-bold uppercase tracking-[0.2em] text-white drop-shadow-md">
              Reproducir
            </p>
          </div>
        )}

        {isPlaying && (
          <button
            type="button"
            className="absolute top-4 right-4 z-30 rounded-full border border-white/25 bg-black/40 p-2.5 text-white backdrop-blur-md hover:bg-black/55"
            onClick={handlePause}
          >
            <Pause size={18} fill="currentColor" />
          </button>
        )}

        {onExpand && (
          <button
            type="button"
            className="absolute top-4 left-4 z-30 rounded-full border border-white/25 bg-black/40 p-2 text-white backdrop-blur-md opacity-0 group-hover:opacity-100 transition-opacity"
            onClick={(e) => {
              e.stopPropagation();
              onExpand();
            }}
          >
            <Maximize2 size={16} />
          </button>
        )}

        {!isPlaying && (
          <div className="absolute bottom-0 left-0 right-0 z-20 bg-gradient-to-t from-slate-900/75 via-slate-900/30 to-transparent p-6 pt-16">
            <h3 className="text-lg font-bold text-white drop-shadow-sm">{school.name}</h3>
            <p className="text-sm text-white/75">Video institucional</p>
          </div>
        )}
      </div>
    </motion.div>
  );
}
