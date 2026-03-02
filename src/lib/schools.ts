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
}

// URLS DE EJEMPLO (Pexels - Libres de derechos)
// Puedes reemplazar estas URLs con tus propios videos.
// =================================================================================================
// SECCIÓN DE VIDEOS
// =================================================================================================

const VIDEOS = {
  // --- VIDEOS DE INTRODUCCIÓN (Presentación de la Facultad) ---
  INTRO_ADMIN: "https://res.cloudinary.com/dmihqer0q/video/upload/v1772211970/Salud_y_bienestar_zlkwkt.mp4",
  INTRO_LAW: "https://res.cloudinary.com/dmihqer0q/video/upload/v1772212143/Ciencias_sociales_jur%C3%ADdicas_y_gobierno_ahyije.mp4",
  INTRO_ART: "https://res.cloudinary.com/dmihqer0q/video/upload/v1772212088/Dise%C3%B1o_y_Comunicaci%C3%B3n_knognf.mp4",
  INTRO_TECH: "https://res.cloudinary.com/dmihqer0q/video/upload/v1772212041/Ingenieria_e1xjfw.mp4",
  INTRO_BUSINESS: "https://res.cloudinary.com/dmihqer0q/video/upload/v1772211849/Transformaci%C3%B3n_empresarial_rsfjeu.mp4",

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
      "Diplomado en Psicología del Comportamiento y Psiconeuroinmunología: Enfoque a la Salud y Bienestar..",
      "Diplomado en Atención al Adulto Mayor y Bienestar Mental.",
      "Diplomado en Ayudas Diagnósticas para Salud Visual."
    ],
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
      "DERECHO - PRESENCIAL.",
      "ADMINISTRACIÓN PÚBLICA - VIRTUAL.",
      "ESPECIALIZACIÓN EN PAZ Y DESARROLLO TERRITORIAL - VIRTUAL.",
      "ESPECIALIZACIÓN EN CONTRATACIÓN ESTATAL - VIRTUAL.",
    ],
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
      "DISEÑO DE MODAS - PRESENCIAL.",
      "DISEÑO GRÁFICO - PRESENCIAL / VIRTUAL.",
      "DIRECCIÓN Y PRODUCCIÓN DE MEDIOS AUDIOVISUALES - PRESENCIAL / VIRTUAL.",
      "COMUNICACIÓN SOCIAL - PRESENCIAL / VIRTUAL.",
      "PUBLICIDAD Y MERCADEO - VIRTUAL.",
      "ESPECIALIZACIÓN EN MARKETING DIGITAL - VIRTUAL.",
      "ESPECIALIZACIÓN EN GESTIÓN DE LA INNOVACIÓN DEL SISTEMA MODA - VIRTUAL.",
    ],
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
      "INGENIERÍA INDUSTRIAL - VIRTUAL.",
      "INGENIERÍA ELECTRÓNICA - PRESENCIAL.",
      "INGENIERÍA DE SISTEMAS - PRESENCIAL / VIRTUAL.",
      "ESPECIALIZACIÓN EN ANALÍTICA DE DATOS - VIRTUAL.",
      "ESPECIALIZACIÓN EN TRANSFORMACIÓN DIGITAL - VIRTUAL.",
      "ESPECIALIZACIÓN GESTIÓN DE TECNOLOGÍAS DE LA INFORMACIÓN - VIRTUAL.",
      "ESPECIALIZACIÓN EN GERENCIA PARA LA TRANSICIÓN ENERGÉTICA - VIRTUAL",
    ],
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
      "ADMINISTRACIÓN DE EMPRESAS - PRESE / VIRTU / DISTA.",
      "ADMINISTRACIÓN DEPORTIVA - PRESENCIAL.",
      "ADMINISTRACIÓN DE LA SEGURIDAD SOCIAL - PRESENCIAL / VIRTUAL.",
      "ADMINISTRACIÓN DE SERVICIOS DE SALUD - PRESENCIAL.",
      "ADMINISTRACIÓN EMPRESAS AGROINDUSTRIALES - VIRTUAL.",
      "CONTADURÍA PÚBLICA - VIRTUAL.",
      "ESPECIALIZACIÓN EN GERENCIA DE LA MARCA - VIRTUAL.",
      "ESPECIALIZACIÓN EN GERENCIA EDUCATIVA - VIRTUAL.",
      "ESPECIALIZACIÓN EN GESTIÓN DE NEGOCIOS DIGITALES - VIRTUAL.",
    ],
  },
];