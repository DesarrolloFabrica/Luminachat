import { motion } from "motion/react";
import type { School } from "../../../lib/schools";
import { fadeUp, stagger } from "./schoolMotion";

const STATS = [
  { label: "Programas", value: "12+" },
  { label: "Estudiantes", value: "2.5k" },
  { label: "Empleabilidad", value: "98%" },
];

export function SchoolStats({ school }: { school: School }) {
  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px" }}
      variants={stagger}
      className="grid grid-cols-1 sm:grid-cols-3 gap-4 lg:gap-6 py-12 lg:py-16"
    >
      {STATS.map((stat) => (
        <motion.div
          key={stat.label}
          variants={fadeUp}
          whileHover={{ y: -4, scale: 1.02 }}
          className="rounded-3xl border border-white/50 bg-white/45 p-6 lg:p-8 backdrop-blur-xl shadow-[0_12px_40px_rgba(15,23,42,0.06)] transition-shadow hover:shadow-[0_20px_50px_rgba(15,23,42,0.1)]"
          style={{
            boxShadow: `0 12px 40px rgba(15,23,42,0.06), 0 0 0 1px ${school.accentColor}12`,
          }}
        >
          <p
            className="text-3xl lg:text-4xl font-bold tracking-tight"
            style={{ color: school.accentColor }}
          >
            {stat.value}
          </p>
          <p className="mt-2 text-xs font-bold uppercase tracking-[0.15em] text-slate-500">
            {stat.label}
          </p>
        </motion.div>
      ))}
    </motion.section>
  );
}
