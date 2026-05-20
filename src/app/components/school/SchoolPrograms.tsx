import { motion } from "motion/react";
import type { School } from "../../../lib/schools";
import { fadeUp, stagger } from "./schoolMotion";

export function SchoolPrograms({ school }: { school: School }) {
  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      variants={stagger}
      className="py-10 lg:py-14"
    >
      <motion.div variants={fadeUp} className="mb-8">
        <p
          className="text-xs font-bold uppercase tracking-[0.2em] mb-2"
          style={{ color: school.accentColor }}
        >
          Oferta académica
        </p>
        <h2 className="text-2xl lg:text-3xl font-bold text-slate-900">{school.highlightsTitle}</h2>
      </motion.div>

      <div className="flex flex-col gap-3">
        {school.highlights.map((program) => (
          <motion.div
            key={program}
            variants={fadeUp}
            whileHover={{ x: 6 }}
            className="group flex items-start gap-4 rounded-2xl border border-white/50 bg-white/40 px-5 py-4 backdrop-blur-xl shadow-sm transition-all hover:bg-white/65 hover:shadow-md"
            style={{
              borderColor: `transparent`,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = `${school.accentColor}40`;
              e.currentTarget.style.boxShadow = `0 8px 30px -10px ${school.accentColor}35`;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "rgba(255,255,255,0.5)";
              e.currentTarget.style.boxShadow = "";
            }}
          >
            <span
              className="mt-2 h-2.5 w-2.5 shrink-0 rounded-full transition-transform group-hover:scale-125"
              style={{ backgroundColor: school.accentColor }}
            />
            <p className="text-sm lg:text-base text-slate-700 leading-relaxed group-hover:text-slate-900 transition-colors">
              {program}
            </p>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}
