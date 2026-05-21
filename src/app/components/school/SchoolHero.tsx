import { motion } from "motion/react";
import { ExternalLink, MessageSquare } from "lucide-react";
import type { School } from "../../../lib/schools";
import { fadeUp, stagger } from "./schoolMotion";

interface SchoolHeroProps {
  school: School;
  /** Abre la consola de chat con LUMINA */
  onStartChat: () => void;
  /** Scroll al flujo de 3 pasos en la misma página */
  onScrollToFlow?: () => void;
}

export function SchoolHero({ school, onStartChat, onScrollToFlow }: SchoolHeroProps) {
  const Icon = school.icon;

  return (
    <motion.section
      initial="hidden"
      animate="visible"
      variants={stagger}
      className="flex flex-col gap-6 pt-6 lg:pt-8 max-w-3xl"
    >
      <motion.div
        variants={fadeUp}
        className="inline-flex w-fit items-center gap-2 rounded-full border px-4 py-2 text-xs font-bold uppercase tracking-wider shadow-sm backdrop-blur-md"
        style={{
          color: school.accentColor,
          borderColor: `${school.accentColor}45`,
          backgroundColor: `${school.accentColor}12`,
        }}
      >
        <Icon size={16} />
        {school.name}
      </motion.div>

      <motion.h1
        variants={fadeUp}
        className="text-3xl sm:text-4xl xl:text-[2.75rem] font-bold text-slate-900 leading-[1.1] tracking-tight"
      >
        LUMINA para {school.name}
      </motion.h1>

      <motion.p
        variants={fadeUp}
        className="text-lg sm:text-xl text-slate-700 font-medium leading-relaxed max-w-2xl"
      >
        Un asistente académico inteligente para crear, analizar y organizar documentos
        educativos con apoyo de IA.
      </motion.p>

      <motion.p
        variants={fadeUp}
        className="text-base text-slate-600 leading-relaxed max-w-2xl border-l-[3px] pl-5"
        style={{ borderColor: school.accentColor }}
      >
        Carga documentos, analiza contenidos académicos y prepara recursos como
        presentaciones, foros, actividades, quiz, PDA, guías y rúbricas desde una
        experiencia visual simple y guiada.
      </motion.p>

      <motion.div variants={fadeUp} className="flex flex-wrap gap-3 pt-1">
        <button
          type="button"
          onClick={onStartChat}
          className="inline-flex items-center gap-3 rounded-2xl px-8 py-4 text-sm font-bold text-white shadow-lg transition-transform hover:scale-[1.03] active:scale-[0.98] group"
          style={{
            backgroundColor: school.accentColor,
            boxShadow: `0 14px 40px -12px ${school.accentColor}90`,
          }}
        >
          <MessageSquare size={20} className="group-hover:rotate-12 transition-transform" />
          Hablar con Asistente
        </button>
        {onScrollToFlow && (
          <button
            type="button"
            onClick={onScrollToFlow}
            className="inline-flex items-center gap-2 rounded-2xl border border-white/70 bg-white/55 px-6 py-4 text-sm font-semibold text-slate-700 shadow-sm backdrop-blur-xl transition-all hover:bg-white/80 hover:shadow-md"
          >
            Probar flujo aquí
          </button>
        )}
        <a
          href={school.sitio}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-3 rounded-2xl border border-white/70 bg-white/55 px-6 py-4 text-sm font-semibold text-slate-700 shadow-sm backdrop-blur-xl transition-all hover:bg-white/80 hover:shadow-md"
        >
          <ExternalLink size={18} />
          Sitio oficial
        </a>
      </motion.div>
    </motion.section>
  );
}
