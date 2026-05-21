import { motion } from "motion/react";
import { ExternalLink, MessageSquare } from "lucide-react";
import type { School } from "../../../lib/schools";
import type { SchoolTheme } from "../../data/schoolThemes";
import { fadeUp, stagger } from "../school/schoolMotion";

interface DynamicSchoolHeroProps {
  theme: SchoolTheme;
  school: School;
  onStartChat: () => void;
  onScrollToFlow?: () => void;
}

export function DynamicSchoolHero({
  theme,
  school,
  onStartChat,
  onScrollToFlow,
}: DynamicSchoolHeroProps) {
  const Icon = theme.icon;

  return (
    <motion.section
      key={theme.id}
      initial="hidden"
      animate="visible"
      variants={stagger}
      className="flex flex-col gap-6 pt-6 lg:pt-8 max-w-3xl"
    >
      <motion.div
        variants={fadeUp}
        className="inline-flex w-fit items-center gap-2 rounded-full border px-4 py-2 text-xs font-bold uppercase tracking-wider shadow-sm backdrop-blur-md"
        style={{
          color: theme.accentColor,
          borderColor: theme.floatingCardBorder,
          backgroundColor: `${theme.accentColor}14`,
          boxShadow: `0 8px 32px -8px ${theme.glowColor}`,
        }}
      >
        <Icon size={16} />
        {theme.badge}
      </motion.div>

      <motion.h1
        variants={fadeUp}
        className="text-3xl sm:text-4xl xl:text-[2.75rem] font-bold text-slate-900 leading-[1.1] tracking-tight"
      >
        {theme.heroTitle}
      </motion.h1>

      <motion.p
        variants={fadeUp}
        className="text-lg sm:text-xl text-slate-700 font-medium leading-relaxed max-w-2xl"
      >
        {theme.subtitle}
      </motion.p>

      <motion.p
        variants={fadeUp}
        className="text-base text-slate-600 leading-relaxed max-w-2xl border-l-[3px] pl-5"
        style={{ borderColor: theme.accentColor }}
      >
        {theme.description}
      </motion.p>

      <motion.div variants={fadeUp} className="flex flex-wrap gap-3 pt-1">
        <button
          type="button"
          onClick={onStartChat}
          className="inline-flex items-center gap-3 rounded-2xl px-8 py-4 text-sm font-bold text-white shadow-lg transition-transform hover:scale-[1.03] active:scale-[0.98] group"
          style={{
            backgroundColor: theme.accentColor,
            boxShadow: `0 14px 40px -10px ${theme.glowColor}`,
          }}
        >
          <MessageSquare size={20} className="group-hover:rotate-12 transition-transform" />
          Hablar con Asistente
        </button>
        {onScrollToFlow && (
          <button
            type="button"
            onClick={onScrollToFlow}
            className="inline-flex items-center gap-2 rounded-2xl border bg-white/55 px-6 py-4 text-sm font-semibold text-slate-700 shadow-sm backdrop-blur-xl transition-all hover:bg-white/80 hover:shadow-md"
            style={{ borderColor: theme.floatingCardBorder }}
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
