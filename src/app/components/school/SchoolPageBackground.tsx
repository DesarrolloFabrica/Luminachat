import { motion } from "motion/react";
import type { School } from "../../../lib/schools";

const GRADIENT_BY_SCHOOL: Record<string, string> = {
  administrativas: "from-slate-50 via-cyan-50/80 to-teal-100/90",
  sociales: "from-slate-50 via-blue-50/80 to-indigo-100/80",
  artes: "from-slate-50 via-fuchsia-50/70 to-pink-100/80",
  ingenieria: "from-slate-50 via-emerald-50/70 to-cyan-100/80",
  negocios: "from-slate-50 via-orange-50/70 to-amber-100/80",
};

export function SchoolPageBackground({ school }: { school: School }) {
  const gradient = GRADIENT_BY_SCHOOL[school.id] ?? "from-slate-50 via-white to-slate-100";

  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
      <div className={`absolute inset-0 bg-gradient-to-br ${gradient}`} />

      <motion.div
        animate={{ scale: [1, 1.08, 1], opacity: [0.35, 0.5, 0.35] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -top-[20%] -right-[10%] h-[55vh] w-[55vh] rounded-full blur-[100px]"
        style={{ backgroundColor: `${school.accentColor}30` }}
      />
      <motion.div
        animate={{ scale: [1, 1.1, 1], opacity: [0.25, 0.4, 0.25] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute bottom-[10%] -left-[15%] h-[45vh] w-[45vh] rounded-full blur-[90px]"
        style={{ backgroundColor: `${school.accentColor}22` }}
      />

      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `radial-gradient(circle at 70% 30%, ${school.accentColor} 0%, transparent 45%)`,
        }}
      />
    </div>
  );
}
