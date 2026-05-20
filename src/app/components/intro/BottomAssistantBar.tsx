import { motion, AnimatePresence } from "motion/react";
import { ChevronLeft, ChevronRight, Search, Bot } from "lucide-react";
import { bottomBarEntrance } from "../../lib/motionVariants";
import { useReducedMotion } from "../../hooks/useReducedMotion";

interface BottomAssistantBarProps {
  accentColor: string;
  title: string;
  subtitle: string;
  onPrev: () => void;
  onNext: () => void;
  onExplore?: () => void;
}

export function BottomAssistantBar({
  accentColor,
  title,
  subtitle,
  onPrev,
  onNext,
  onExplore,
}: BottomAssistantBarProps) {
  const reducedMotion = useReducedMotion();

  return (
    <motion.footer
      variants={bottomBarEntrance}
      initial="hidden"
      animate="visible"
      className="fixed bottom-4 left-1/2 z-50 w-[min(92vw,560px)] -translate-x-1/2"
    >
      <motion.div
        whileHover={reducedMotion ? undefined : { y: -2 }}
        transition={{ duration: 0.3 }}
        className="flex items-center gap-3 rounded-[1.75rem] border border-white/20 bg-white/10 px-4 py-3 shadow-[0_12px_48px_rgba(0,0,0,0.45)] backdrop-blur-xl md:px-5 hover:border-white/30 hover:shadow-[0_16px_56px_rgba(0,0,0,0.5)] transition-shadow duration-300"
        style={{
          boxShadow: `0 12px 48px rgba(0,0,0,0.45), 0 0 40px -8px ${accentColor}30`,
        }}
      >
        <button
          type="button"
          onClick={onPrev}
          className="p-2 rounded-full text-white/70 hover:bg-white/10 hover:text-white transition-colors shrink-0"
          aria-label="Anterior"
        >
          <ChevronLeft size={20} />
        </button>

        <div className="relative flex h-12 w-12 shrink-0 items-center justify-center">
          {!reducedMotion && (
            <motion.span
              className="absolute inset-0 rounded-full border-2"
              style={{ borderColor: `${accentColor}50` }}
              animate={{ scale: [1, 1.35, 1], opacity: [0.5, 0, 0.5] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            />
          )}
          <div
            className="relative flex h-12 w-12 items-center justify-center rounded-full border-2 overflow-hidden transition-colors duration-300"
            style={{ borderColor: `${accentColor}80` }}
          >
            <div
              className="h-full w-full flex items-center justify-center"
              style={{
                background: `linear-gradient(135deg, ${accentColor}55, transparent)`,
              }}
            >
              <Bot size={22} style={{ color: accentColor }} />
            </div>
          </div>
        </div>

        <div className="flex-1 min-w-0 overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.2 }}
            >
              <p className="text-sm font-bold text-white truncate">{title}</p>
              <p className="text-[11px] text-white/55 truncate">{subtitle}</p>
            </motion.div>
          </AnimatePresence>
        </div>

        <button
          type="button"
          onClick={onExplore}
          className="p-2.5 rounded-xl border border-white/20 bg-white/10 text-white/80 hover:bg-white/15 transition-colors shrink-0"
          aria-label="Explorar"
        >
          <Search size={18} />
        </button>

        <button
          type="button"
          onClick={onNext}
          className="p-2 rounded-full text-white/70 hover:bg-white/10 hover:text-white transition-colors shrink-0"
          aria-label="Siguiente"
        >
          <ChevronRight size={20} />
        </button>
      </motion.div>
    </motion.footer>
  );
}
