import {
  LucideIcon,
  Scale,
  Landmark,
  Palette,
  Zap,
  Briefcase,
} from "lucide-react";

/**
 * CONFIGURACIÓN DE ESCUELAS Y MULTIMEDIA
 * --------------------------------------
 * Aquí puedes definir la información de cada escuela y sus videos correspondientes.
 *
 * INSTRUCCIONES PARA CAMBIAR VIDEOS:
 * 1. Sube tu video (MP4 recomendado) a un servicio de hosting o a la carpeta public/ de tu proyecto.
 * 2. Reemplaza la URL en el campo 'introVideoUrl' o 'avatarVideoUrl'.
 * 3. Asegúrate de que el enlace sea directo al archivo de video.
 */

export interface School {
  id: string;
  name: string;
  shortName: string;
  description: string;
  icon: LucideIcon;

  // Configuración de Estilos
  color: string; // Clase de Tailwind (referencia)
  accentColor: string; // Código Hexadecimal para bordes, sombras y brillos
  gradient: string; // Gradiente de fondo

  // Multimedia
  videoPlaceholder: string; // Imagen de previsualización (poster)
  introVideoUrl: string; // Video de introducción de la facultad
  avatarVideoUrl: string; // Video del "avatar" o asistente (loop)

  // Textos
  welcomeMessage: string;
  highlightsTitle: string; // Título de la lista de puntos destacados
  highlights: string[]; // Lista de puntos destacados visibles bajo las estadísticas
  sitio: string;
}

// URLS DE EJEMPLO (Pexels - Libres de derechos)
// Puedes reemplazar estas URLs con tus propios videos.
// =================================================================================================
// SECCIÓN DE VIDEOS
// =================================================================================================

const VIDEOS = {
  // --- VIDEOS DE INTRODUCCIÓN (Presentación de la Facultad) ---
  INTRO_ADMIN: "https://res.cloudinary.com/dmihqer0q/video/upload/v1772541615/Salud_y_bienestar_mqgb9r.mp4",
  INTRO_LAW: "https://res.cloudinary.com/dmihqer0q/video/upload/v1772541777/Ciencias_sociales_c9fv8a.mp4",
  INTRO_ART: "https://res.cloudinary.com/dmihqer0q/video/upload/v1772541711/Dise%C3%B1o_y_Comunicaci%C3%B3n_w7eyav.mp4",
  INTRO_TECH: "https://res.cloudinary.com/dmihqer0q/video/upload/v1772541665/Ingenieria_nfbp5w.mp4",
  INTRO_BUSINESS: "https://res.cloudinary.com/dmihqer0q/video/upload/v1772541562/Transformaci%C3%B3n_empresarial_dmhm7l.mp4",

  // --- VIDEOS DE AVATAR (Asistente Virtual - Loop) ---
  // Cada escuela tiene su propio video de fondo para el avatar
  AVATAR_ADMIN: "https://res.cloudinary.com/deziju7gu/video/upload/v1771620530/aguamarina_zoCthzWs_m7jmyk.mp4", // Tecnología abstracta azul
  AVATAR_LAW: "https://res.cloudinary.com/deziju7gu/video/upload/v1771620725/azul-rey_4AOIpXLW_vaghtn.mp4", // Red de conexiones suave
  AVATAR_ART: "https://res.cloudinary.com/deziju7gu/video/upload/v1771620876/fucsia_ulo7oCoj_lfudqa.mp4", // Fluidos coloridos
  AVATAR_TECH: "https://res.cloudinary.com/deziju7gu/video/upload/v1771621114/verde_bUvIFSWP_ev95j7.mp4", // Matriz digital verde
  AVATAR_BUSINESS: "https://res.cloudinary.com/deziju7gu/video/upload/v1771620210/naranja_TnrkPbSH_p8f5yc.mp4", // Edificios abstractos/datos
};

export const schools: School[] = [
  {
    id: "administrativas",
    name: "Salud y bienestar",
    shortName: "",
    description:
      "Liderazgo y gestión pública con visión global.",
    icon: Scale,
    color: "teal-500",
    accentColor: "#14b8a6", // Teal-500
    gradient: "from-teal-500/20 to-teal-700/5",
    videoPlaceholder:
      "https://res.cloudinary.com/dk79pc0vp/image/upload/v1771609065/aguamarina_0-00-08-08_cbzafy.png",
    welcomeMessage:
      "Bienvenido a la Escuela de salud y bienestar.",

    // =====================================
    // CONFIGURACIÓN DE VIDEO - ADMINISTRATIVAS
    // =====================================
    introVideoUrl: VIDEOS.INTRO_ADMIN,   // Video Principal
    avatarVideoUrl: VIDEOS.AVATAR_ADMIN, // Video del Avatar
    highlightsTitle: "Salud y bienestar",
    highlights: [
      "Diplomado en Psicología del Comportamiento y Psiconeuroinmunología: Enfoque a la Salud y Bienestar.",
      "Diplomado en Atención al Adulto Mayor y Bienestar Mental.",
      "Diplomado en Ayudas Diagnósticas para Salud Visual."
    ],
    sitio: "https://cun.edu.co/escuela-de-salud/"
  },
  {
    id: "sociales",
    name: "Ciencias sociales, juridicas y gobierno",
    shortName: "",
    description:
      "Justicia, derecho y comprensión de la sociedad.",
    icon: Landmark,
    color: "blue-600",
    accentColor: "#2563eb", // Blue-600
    gradient: "from-blue-600/20 to-blue-800/5",
    videoPlaceholder:
      "https://res.cloudinary.com/dk79pc0vp/image/upload/v1771610940/azul_rey_0-00-05-10_xf88vu.png",
    welcomeMessage:
      "Explora el impacto de las leyes en nuestro entorno.",

    // =====================================
    // CONFIGURACIÓN DE VIDEO - SOCIALES
    // =====================================
    introVideoUrl: VIDEOS.INTRO_LAW,
    avatarVideoUrl: VIDEOS.AVATAR_LAW,
    highlightsTitle: "Ciencias Jurídicas y Sociales",
    highlights: [
      "Derecho - presencial.",
      "Administración pública - virtual.",
      "Especialización en paz y desarrollo territorial - virtual.",
      "Especialización en contratación estatal - virtual.",
    ],
    sitio: "https://cun.edu.co/escuela-de-ciencias-sociales-juridicas-y-de-gobierno/"
  },
  {
    id: "artes",
    name: "Diseño y comunicación",
    shortName: "",
    description: "Creatividad, expresión y nuevos medios.",
    icon: Palette,
    color: "fuchsia-600",
    accentColor: "#c026d3", // Fuchsia-600
    gradient: "from-fuchsia-600/20 to-fuchsia-800/5",
    videoPlaceholder:
      "https://res.cloudinary.com/dk79pc0vp/image/upload/v1771612051/fucsia_0-00-19-03_cakmhk.png",
    welcomeMessage:
      "Donde la creatividad se encuentra con la técnica.",

    // =====================================
    // CONFIGURACIÓN DE VIDEO - ARTES
    // =====================================
    introVideoUrl: VIDEOS.INTRO_ART,
    avatarVideoUrl: VIDEOS.AVATAR_ART,
    highlightsTitle: "¿Por qué estudiar Comunicación y Artes?",
    highlights: [
      "Diseño de modas - presencial.",
      "Diseño gráfico - presencial / virtual.",
      "Dirección y producción de medios audiovisuales - presencial / virtual.",
      "Comunicación social - presencial / virtual.",
      "Publicidad y mercadeo - virtual.",
      "Especialización en marketing digital - virtual.",
      "Especialización en gestión de la innovación del sistema moda - virtual.",
    ],
    sitio: "https://cun.edu.co/escuela-de-diseno-y-comunicacion/"
  },
  {
    id: "ingenieria",
    name: "Escuela de Ingeniería",
    shortName: "",
    description:
      "Innovación tecnológica y soluciones prácticas.",
    icon: Zap,
    color: "emerald-600",
    accentColor: "#09cadf", // Teal-500
    gradient: "from-emerald-600/20 to-emerald-800/5",
    videoPlaceholder:
      "https://res.cloudinary.com/dk79pc0vp/image/upload/v1771618938/verde_0-00-03-16_oid9ck.png",
    welcomeMessage: "Construyendo el futuro con innovación.",

    // =====================================
    // CONFIGURACIÓN DE VIDEO - INGENIERÍA
    // =====================================
    introVideoUrl: VIDEOS.INTRO_TECH,
    avatarVideoUrl: VIDEOS.AVATAR_TECH,
    highlightsTitle: "Programas escuela de ingenieria",
    highlights: [
      "Ingeniería industrial - virtual.",
      "Ingeniería electrónica - presencial.",
      "Ingeniería de sistemas - presencial / virtual.",
      "Especialización en analítica de datos - virtual.",
      "Especialización en transformación digital - virtual.",
      "Especialización gestión de tecnologías de la información - virtual.",
      "Especialización en gerencia para la transición energética - virtual",
    ],
    sitio: "https://cun.edu.co/escuela-de-ingenieria/"
  },
  {
    id: "negocios",
    name: "Transformación empresarial",
    shortName: "",
    description: "Finanzas, economía y emprendimiento.",
    icon: Briefcase,
    color: "orange-500",
    accentColor: "#f97316", // Orange-500
    gradient: "from-orange-500/20 to-orange-700/5",
    videoPlaceholder:
      "https://res.cloudinary.com/dk79pc0vp/image/upload/v1771609066/naranja_2_0-00-06-20_z9azo2.png",
    welcomeMessage:
      "Entiende los mercados y lidera el mundo empresarial.",

    // =====================================
    // CONFIGURACIÓN DE VIDEO - NEGOCIOS
    // =====================================
    introVideoUrl: VIDEOS.INTRO_BUSINESS,
    avatarVideoUrl: VIDEOS.AVATAR_BUSINESS,
    highlightsTitle: "Programas de escuela de transformación empresarial",
    highlights: [
      "Administración de empresas - presencial / virtual / distancia.",
      "Administración deportiva - presencial.",
      "Administración de la seguridad social - presencial / virtual.",
      "Administración de servicios de salud - presencial.",
      "Administración empresas agroindustriales - virtual.",
      "Contaduría pública - virtual.",
      "Especialización en gerencia de la marca - virtual.",
      "Especialización en gerencia educativa - virtual.",
      "Especialización en gestión de negocios digitales - virtual.",
    ],
    sitio: "https://cun.edu.co/escuela-de-transformacion-empresarial/"
  },
];