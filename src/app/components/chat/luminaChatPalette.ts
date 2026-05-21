/** Tokens visuales compartidos — chat / document flow LUMINA */

export const LUMINA_BG = {
  page: "bg-[#0f172a]",
  deep: "bg-[#0b1220]",
  shell: "bg-[#111827]/75",
  header: "bg-[#081120]/80",
  input: "bg-[#0b1220]/70",
} as const;

export const LUMINA_GLASS = {
  surface: "bg-white/[0.04] backdrop-blur-[24px]",
  surfaceHover: "bg-white/[0.06]",
  elevated: "bg-white/[0.08] backdrop-blur-[24px]",
  border: "border-cyan-400/10",
  borderSoft: "border-white/[0.08]",
  borderTeal: "border-teal-400/15",
} as const;

export const LUMINA_GLOW = {
  shell: "shadow-[0_0_80px_rgba(34,211,238,0.06),0_24px_64px_-24px_rgba(15,23,42,0.8)]",
  card: "shadow-[0_0_40px_rgba(34,211,238,0.08)]",
  cardHover: "hover:shadow-[0_0_48px_rgba(34,211,238,0.14)]",
  cyan: "shadow-[0_0_32px_rgba(34,211,238,0.12)]",
} as const;

export const LUMINA_TEXT = {
  primary: "text-white",
  secondary: "text-slate-300",
  muted: "text-slate-400",
  dim: "text-slate-500",
} as const;

export const LUMINA_ACCENT = {
  cyan: "#22d3ee",
  teal: "#14b8a6",
  blue: "#60a5fa",
} as const;

/** Gradiente premium para botones IA */
export const luminaPrimaryButtonClass =
  "bg-gradient-to-r from-cyan-400 to-teal-400 text-slate-950 font-bold hover:brightness-110 hover:scale-[1.02] hover:shadow-[0_0_28px_rgba(34,211,238,0.35)] transition-all";

/** Card documento (glass luminoso) */
export const luminaDocCardClass =
  "border border-cyan-400/10 bg-gradient-to-b from-white/[0.06] to-white/[0.03] backdrop-blur-[24px] hover:border-cyan-400/25 hover:-translate-y-1 hover:shadow-[0_0_48px_rgba(34,211,238,0.12)] transition-all duration-300";
