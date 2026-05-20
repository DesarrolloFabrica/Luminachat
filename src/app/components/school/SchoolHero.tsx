import { motion } from "motion/react";
import { ExternalLink, MessageSquare } from "lucide-react";
import type { School } from "../../../lib/schools";
import { fadeUp, stagger } from "./schoolMotion";
import { FloatingVideoCard } from "./FloatingVideoCard";

interface SchoolHeroProps {
  school: School;
  onStartChat: () => void;
  onExpandVideo?: () => void;
}

export function SchoolHero({ school, onStartChat, onExpandVideo }: SchoolHeroProps) {
  const Icon = school.icon;

  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      variants={stagger}
      className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center pt-6 lg:pt-10"
    >
      <div className="lg:col-span-7 flex flex-col gap-6">
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
          className="text-3xl sm:text-4xl xl:text-5xl 2xl:text-[3.25rem] font-bold text-slate-900 leading-[1.08] tracking-tight max-w-2xl"
        >
          {school.welcomeMessage}
        </motion.h1>

        <motion.p
          variants={fadeUp}
          className="text-lg text-slate-600 max-w-xl leading-relaxed border-l-[3px] pl-5"
          style={{ borderColor: school.accentColor }}
        >
          {school.description}
          <span className="mt-3 block text-sm font-medium text-slate-500">
            Descubre programas, recursos exclusivos y conecta con la comunidad CUN.
          </span>
        </motion.p>

        <motion.div variants={fadeUp} className="flex flex-wrap gap-4 pt-2">
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
      </div>

      <div className="lg:col-span-5">
        <FloatingVideoCard school={school} onExpand={onExpandVideo} />
      </div>
    </motion.section>
  );
}
