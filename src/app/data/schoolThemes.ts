import type { LucideIcon } from "lucide-react";
import { Scale, Landmark, Palette, Zap, Briefcase } from "lucide-react";
import { schools, type School } from "../../lib/schools";

export interface SchoolTheme {
  id: string;
  /** Nombre visible de la escuela */
  name: string;
  badge: string;
  icon: LucideIcon;
  /** Título hero: LUMINA para … */
  heroTitle: string;
  subtitle: string;
  description: string;
  assistantContext: string;
  flowContext: string;
  analyzingPrefix: string;
  accentColor: string;
  glowColor: string;
  backgroundGlow: string;
  secondaryGlow: string;
  /** Clases Tailwind gradiente de página */
  pageGradient: string;
  /** Gradiente texto (referencia) */
  gradient: string;
  floatingCardBorder: string;
  particleColor: string;
  mood: "calm" | "institutional" | "creative" | "tech" | "executive";
}

const THEMES: Record<string, SchoolTheme> = {
  administrativas: {
    id: "administrativas",
    name: "Salud y bienestar",
    badge: "Salud y bienestar",
    icon: Scale,
    heroTitle: "LUMINA para Salud y bienestar",
    subtitle:
      "Un asistente académico inteligente para crear, analizar y organizar documentos educativos con apoyo de IA.",
    description:
      "Carga documentos, analiza contenidos académicos y prepara recursos como presentaciones, foros, actividades, quiz, PDA, guías y rúbricas desde una experiencia visual simple y guiada.",
    assistantContext:
      "LUMINA está preparada para apoyar la generación de recursos educativos en el área de Salud y bienestar.",
    flowContext:
      "Flujo guiado en tres pasos — recursos educativos para Salud y bienestar.",
    analyzingPrefix: "LUMINA analiza contenido para Salud y bienestar",
    accentColor: "#14b8a6",
    glowColor: "rgba(20,184,166,0.38)",
    backgroundGlow: "#14b8a6",
    secondaryGlow: "#06b6d4",
    pageGradient: "from-slate-50 via-cyan-50/80 to-teal-100/90",
    gradient: "from-teal-400 to-cyan-500",
    floatingCardBorder: "rgba(20,184,166,0.35)",
    particleColor: "#5eead4",
    mood: "calm",
  },
  sociales: {
    id: "sociales",
    name: "Ciencias sociales, jurídicas y gobierno",
    badge: "Ciencias sociales, jurídicas y gobierno",
    icon: Landmark,
    heroTitle: "LUMINA para Ciencias sociales, jurídicas y gobierno",
    subtitle:
      "Un asistente académico inteligente para crear, analizar y organizar documentos educativos con apoyo de IA.",
    description:
      "Carga documentos, analiza contenidos académicos y prepara recursos como presentaciones, foros, actividades, quiz, PDA, guías y rúbricas desde una experiencia visual simple y guiada.",
    assistantContext:
      "LUMINA está preparada para apoyar la generación de recursos educativos en Ciencias sociales, jurídicas y gobierno.",
    flowContext:
      "Flujo guiado en tres pasos — recursos educativos para Ciencias sociales, jurídicas y gobierno.",
    analyzingPrefix: "LUMINA analiza contenido para Ciencias sociales",
    accentColor: "#6366f1",
    glowColor: "rgba(99,102,241,0.4)",
    backgroundGlow: "#4f46e5",
    secondaryGlow: "#2563eb",
    pageGradient: "from-slate-50 via-indigo-50/75 to-violet-100/85",
    gradient: "from-indigo-500 to-blue-700",
    floatingCardBorder: "rgba(99,102,241,0.4)",
    particleColor: "#a5b4fc",
    mood: "institutional",
  },
  artes: {
    id: "artes",
    name: "Diseño y comunicación",
    badge: "Diseño y comunicación",
    icon: Palette,
    heroTitle: "LUMINA para Diseño y comunicación",
    subtitle:
      "Un asistente académico inteligente para crear, analizar y organizar documentos educativos con apoyo de IA.",
    description:
      "Carga documentos, analiza contenidos académicos y prepara recursos como presentaciones, foros, actividades, quiz, PDA, guías y rúbricas desde una experiencia visual simple y guiada.",
    assistantContext:
      "LUMINA está preparada para apoyar la generación de recursos educativos en Diseño y comunicación.",
    flowContext:
      "Flujo guiado en tres pasos — recursos educativos para Diseño y comunicación.",
    analyzingPrefix: "LUMINA analiza contenido creativo",
    accentColor: "#c026d3",
    glowColor: "rgba(192,38,211,0.42)",
    backgroundGlow: "#d946ef",
    secondaryGlow: "#ec4899",
    pageGradient: "from-slate-50 via-fuchsia-50/70 to-pink-100/85",
    gradient: "from-fuchsia-500 to-pink-500",
    floatingCardBorder: "rgba(192,38,211,0.4)",
    particleColor: "#f0abfc",
    mood: "creative",
  },
  ingenieria: {
    id: "ingenieria",
    name: "Escuela de Ingeniería",
    badge: "Escuela de Ingeniería",
    icon: Zap,
    heroTitle: "LUMINA para Escuela de Ingeniería",
    subtitle:
      "Un asistente académico inteligente para crear, analizar y organizar documentos educativos con apoyo de IA.",
    description:
      "Carga documentos, analiza contenidos académicos y prepara recursos como presentaciones, foros, actividades, quiz, PDA, guías y rúbricas desde una experiencia visual simple y guiada.",
    assistantContext:
      "LUMINA está preparada para apoyar la generación de recursos educativos en Escuela de Ingeniería.",
    flowContext:
      "Flujo guiado en tres pasos — recursos educativos para Ingeniería.",
    analyzingPrefix: "LUMINA analiza contenido tecnológico",
    accentColor: "#09cadf",
    glowColor: "rgba(9,202,223,0.45)",
    backgroundGlow: "#06b6d4",
    secondaryGlow: "#22d3ee",
    pageGradient: "from-slate-50 via-cyan-50/75 to-sky-100/90",
    gradient: "from-cyan-400 to-blue-500",
    floatingCardBorder: "rgba(9,202,223,0.45)",
    particleColor: "#67e8f9",
    mood: "tech",
  },
  negocios: {
    id: "negocios",
    name: "Transformación empresarial",
    badge: "Transformación empresarial",
    icon: Briefcase,
    heroTitle: "LUMINA para Transformación empresarial",
    subtitle:
      "Un asistente académico inteligente para crear, analizar y organizar documentos educativos con apoyo de IA.",
    description:
      "Carga documentos, analiza contenidos académicos y prepara recursos como presentaciones, foros, actividades, quiz, PDA, guías y rúbricas desde una experiencia visual simple y guiada.",
    assistantContext:
      "LUMINA está preparada para apoyar la generación de recursos educativos en Transformación empresarial.",
    flowContext:
      "Flujo guiado en tres pasos — recursos educativos para Transformación empresarial.",
    analyzingPrefix: "LUMINA analiza contenido empresarial",
    accentColor: "#f97316",
    glowColor: "rgba(249,115,22,0.4)",
    backgroundGlow: "#f97316",
    secondaryGlow: "#fbbf24",
    pageGradient: "from-slate-50 via-orange-50/75 to-amber-100/85",
    gradient: "from-orange-400 to-amber-500",
    floatingCardBorder: "rgba(249,115,22,0.4)",
    particleColor: "#fdba74",
    mood: "executive",
  },
};

const DEFAULT_THEME = THEMES.administrativas;

export function getSchoolTheme(schoolId: string): SchoolTheme {
  return THEMES[schoolId] ?? DEFAULT_THEME;
}

export function getSchoolThemeFromSchool(school: School): SchoolTheme {
  const base = getSchoolTheme(school.id);
  return {
    ...base,
    name: school.name,
    badge: school.name,
    heroTitle: `LUMINA para ${school.name}`,
    accentColor: school.accentColor || base.accentColor,
  };
}

export function getSchoolThemeByPath(pathname: string): SchoolTheme {
  const match = schools.find((s) => pathname.startsWith(`/school/${s.id}`));
  return match ? getSchoolThemeFromSchool(match) : DEFAULT_THEME;
}

export const schoolThemeIds = Object.keys(THEMES);
