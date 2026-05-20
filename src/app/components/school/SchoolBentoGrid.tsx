import { motion } from "motion/react";
import { BookOpen, Heart, HelpCircle, Scale } from "lucide-react";
import type { School } from "../../../lib/schools";
import { fadeUp, stagger } from "./schoolMotion";

const SMALL_CARDS = [
  { title: "Normatividad académica", icon: BookOpen },
  { title: "Bienestar", icon: Heart },
  { title: "Procesos institucionales", icon: Scale },
  { title: "Preguntas frecuentes", icon: HelpCircle },
];

export function SchoolBentoGrid({ school }: { school: School }) {
  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      variants={stagger}
      className="py-8 lg:py-12"
    >
      <motion.div variants={fadeUp} className="mb-8 lg:mb-10">
        <p
          className="text-xs font-bold uppercase tracking-[0.2em] mb-2"
          style={{ color: school.accentColor }}
        >
          Recursos
        </p>
        <h2 className="text-2xl lg:text-3xl font-bold text-slate-900 tracking-tight">
          ¿Qué encontrarás?
        </h2>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-5 auto-rows-[minmax(140px,auto)]">
        <motion.article
          variants={fadeUp}
          whileHover={{ y: -4 }}
          className="md:col-span-2 lg:col-span-2 lg:row-span-2 rounded-3xl border border-white/50 bg-white/40 p-8 lg:p-10 backdrop-blur-xl shadow-lg flex flex-col justify-between min-h-[280px]"
          style={{ boxShadow: `0 20px 50px -24px ${school.accentColor}30` }}
        >
          <div
            className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl border border-white/60"
            style={{ backgroundColor: `${school.accentColor}18`, color: school.accentColor }}
          >
            <school.icon size={28} />
          </div>
          <div>
            <h3 className="text-xl lg:text-2xl font-bold text-slate-900 mb-3">
              Asistente académico por escuela
            </h3>
            <p className="text-slate-600 leading-relaxed max-w-md">
              Consulta normatividad, bienestar y procesos con respuestas guiadas por
              IA, contextualizadas para {school.name}.
            </p>
          </div>
        </motion.article>

        {SMALL_CARDS.map((card) => {
          const Icon = card.icon;
          return (
            <motion.article
              key={card.title}
              variants={fadeUp}
              whileHover={{ y: -4, scale: 1.01 }}
              className="rounded-3xl border border-white/45 bg-white/35 p-6 backdrop-blur-xl shadow-md transition-shadow hover:shadow-lg"
            >
              <div
                className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl"
                style={{ backgroundColor: `${school.accentColor}15`, color: school.accentColor }}
              >
                <Icon size={20} />
              </div>
              <h4 className="font-semibold text-slate-800 text-sm leading-snug">{card.title}</h4>
            </motion.article>
          );
        })}
      </div>
    </motion.section>
  );
}
