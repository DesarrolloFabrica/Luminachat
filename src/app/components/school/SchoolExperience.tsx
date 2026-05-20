import { motion } from "motion/react";
import { GitBranch, MessageSquare, Sparkles } from "lucide-react";
import type { School } from "../../../lib/schools";
import { fadeUp, stagger } from "./schoolMotion";

const STEPS = [
  { n: "01", title: "Elige un tema", desc: "Normatividad, bienestar o procesos institucionales." },
  { n: "02", title: "Selecciona un subtema", desc: "Profundiza en el área que necesitas consultar." },
  { n: "03", title: "Pregunta al asistente", desc: "Recibe respuestas con base en documentos oficiales." },
];

export function SchoolExperience({
  school,
  onStartChat,
}: {
  school: School;
  onStartChat: () => void;
}) {
  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      variants={stagger}
      className="py-12 lg:py-20"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center">
        <motion.div
          variants={fadeUp}
          className="relative rounded-3xl border border-white/55 bg-white/45 p-6 lg:p-8 backdrop-blur-2xl shadow-xl overflow-hidden"
        >
          <div
            className="absolute -top-20 -right-20 h-48 w-48 rounded-full blur-[60px] opacity-50"
            style={{ backgroundColor: school.accentColor }}
          />

          <div className="relative flex items-center gap-3 mb-6 pb-4 border-b border-slate-200/60">
            <div
              className="flex h-10 w-10 items-center justify-center rounded-xl text-white"
              style={{ backgroundColor: school.accentColor }}
            >
              <Sparkles size={18} />
            </div>
            <div>
              <p className="text-sm font-bold text-slate-800">Asistente Lumina</p>
              <p className="text-xs text-slate-500">En línea · {school.name}</p>
            </div>
          </div>

          <div className="space-y-3">
            <div className="rounded-2xl bg-slate-100/80 px-4 py-3 text-sm text-slate-600 max-w-[85%]">
              Elige un tema para comenzar
            </div>
            <div
              className="ml-auto rounded-2xl px-4 py-3 text-sm text-white max-w-[85%]"
              style={{ backgroundColor: school.accentColor }}
            >
              Normatividad académica
            </div>
            <div className="rounded-2xl border border-dashed border-slate-300/80 px-4 py-6 text-center text-xs text-slate-400">
              Escribe tu pregunta…
            </div>
          </div>

          <motion.div
            animate={{ y: [0, -6, 0] }}
            transition={{ duration: 4, repeat: Infinity }}
            className="absolute -bottom-4 -left-4 h-24 w-24 rounded-2xl border border-white/40 bg-white/30 backdrop-blur-md shadow-lg hidden sm:block"
          />
        </motion.div>

        <div className="flex flex-col gap-8">
          <motion.div variants={fadeUp}>
            <p
              className="text-xs font-bold uppercase tracking-[0.2em] mb-2"
              style={{ color: school.accentColor }}
            >
              Experiencia Luminachat
            </p>
            <h2 className="text-2xl lg:text-3xl font-bold text-slate-900 mb-4">
              Guía paso a paso con IA
            </h2>
            <p className="text-slate-600 leading-relaxed">
              El asistente te guía mediante temas, subtemas y preguntas contextualizadas
              para resolver dudas normativas sin perder el hilo de la conversación.
            </p>
          </motion.div>

          <div className="space-y-4">
            {STEPS.map((step) => (
              <motion.div
                key={step.n}
                variants={fadeUp}
                className="flex gap-4 rounded-2xl border border-white/45 bg-white/30 px-5 py-4 backdrop-blur-lg"
              >
                <span
                  className="text-lg font-black shrink-0"
                  style={{ color: school.accentColor }}
                >
                  {step.n}
                </span>
                <div>
                  <p className="font-semibold text-slate-800 flex items-center gap-2">
                    <GitBranch size={14} className="opacity-60" />
                    {step.title}
                  </p>
                  <p className="text-sm text-slate-500 mt-0.5">{step.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.button
            variants={fadeUp}
            type="button"
            onClick={onStartChat}
            className="inline-flex w-fit items-center gap-2 rounded-2xl px-6 py-3.5 text-sm font-bold text-white shadow-lg hover:scale-[1.02] transition-transform"
            style={{ backgroundColor: school.accentColor }}
          >
            <MessageSquare size={18} />
            Probar asistente
          </motion.button>
        </div>
      </div>
    </motion.section>
  );
}
