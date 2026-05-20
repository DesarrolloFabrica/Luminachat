import { motion } from "motion/react";
import { HelpCircle, Menu, Search, Sparkles } from "lucide-react";
import { navEntrance, navFloat } from "../../lib/motionVariants";
import { useReducedMotion } from "../../hooks/useReducedMotion";

const LOGO_URL =
  "https://res.cloudinary.com/dk79pc0vp/image/upload/v1771619759/Recurso_1_vcntst.png";

export function FloatingNav() {
  const reducedMotion = useReducedMotion();

  return (
    <motion.header
      variants={navEntrance}
      initial="hidden"
      animate="visible"
      className="fixed top-4 left-1/2 z-50 w-[min(92vw,720px)] -translate-x-1/2"
    >
      <motion.nav
        variants={reducedMotion ? undefined : navFloat}
        animate={reducedMotion ? undefined : "animate"}
        className="flex items-center justify-between gap-3 rounded-full border border-white/20 bg-white/10 px-4 py-2.5 shadow-[0_8px_32px_rgba(0,0,0,0.35)] backdrop-blur-xl md:px-6"
      >
        <div className="flex items-center gap-2 min-w-0">
          <img
            src={LOGO_URL}
            alt="Luminachat"
            className="h-7 w-auto brightness-0 invert opacity-90 shrink-0"
          />
          <span className="hidden sm:inline text-sm font-semibold text-white/90 tracking-tight truncate">
            Luminachat
          </span>
        </div>

        <div className="flex items-center gap-2 rounded-full bg-white/5 px-3 py-1 border border-white/10">
          <Sparkles size={14} className="text-blue-300 shrink-0" />
          <span className="text-xs md:text-sm font-medium text-white/80 whitespace-nowrap">
            Campus Virtual CUN
          </span>
        </div>

        <div className="flex items-center gap-1 shrink-0">
          {[Search, HelpCircle, Menu].map((Icon, i) => (
            <button
              key={i}
              type="button"
              className="p-2 rounded-full text-white/70 hover:text-white hover:bg-white/10 transition-colors"
              aria-label={i === 0 ? "Buscar" : i === 1 ? "Ayuda" : "Menú"}
            >
              <Icon size={18} />
            </button>
          ))}
        </div>
      </motion.nav>
    </motion.header>
  );
}
