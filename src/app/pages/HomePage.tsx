import { useRef, useState } from "react";
import { schools } from "../../lib/schools";
import { SchoolCard } from "../components/SchoolCard";
import { Layout } from "../components/Layout";
import { motion, AnimatePresence } from "motion/react";
import { ArrowRight, MessageCircle, Info, X } from "lucide-react";
import { useNavigate } from "react-router";
import { useOutletContext } from "react-router";

/**
 * ==============================================================================
 * CONFIGURACIÓN DE CONTENIDO DEL HOME
 * ==============================================================================
 * Edita aquí los textos, videos e imágenes de la página de inicio.
 */

type LayoutContextType = {
  openSidebar: () => void;
};



const HOME_CONTENT = {
  // Sección Principal (Hero)
  HERO: {
    badge: "Campus Virtual 2.0",
    titleLine1: "Bienvenido/a",
    titleHighlight: "a LUMINA", // Texto con gradiente
    description: "Tu asistente inteligente para Administrativos, Docentes y Estudiantes. Resuelve dudas al instante.",
    buttonPrimary: "¿Iniciamos?",

    videoUrl: 'https://res.cloudinary.com/deziju7gu/video/upload/v1771620210/naranja_TnrkPbSH_p8f5yc.mp4', // URL del video de fondo
  },

  // Pop-up de Selección de Facultad
  POPUP: {
    title: "Selecciona tu Facultad",
    description: "Para brindarte la mejor asistencia, por favor elige una de las escuelas para resolver tus dudas específicas.",
    buttonText: "Ver Escuelas"
  },

  // Sección de Escuelas
  SCHOOLS_SECTION: {
    title: "Nuestras Escuelas"
  }
};

/**
 * ==============================================================================
 * FIN DE LA CONFIGURACIÓN
 * ==============================================================================
 */

export function HomePage() {
  const schoolsRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const [showPopup, setShowPopup] = useState(false);
  const { openSidebar } = useOutletContext<LayoutContextType>();


  const scrollToSchools = () => {
    schoolsRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleStartConversation = () => {
    setShowPopup(true);
  };

  return (
    <div className="flex flex-col">

      {/* Popup Modal */}
      <AnimatePresence>
        {showPopup && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-[90%] max-w-md bg-[#0f1420] border border-white/20 p-8 rounded-3xl shadow-2xl backdrop-blur-xl text-center"
          >
            <button
              onClick={() => setShowPopup(false)}
              className="absolute top-4 right-4 text-white/50 hover:text-white"
            >
              <X size={20} />
            </button>

            <div className="w-16 h-16 bg-blue-500/10 rounded-full flex items-center justify-center mx-auto mb-6 text-blue-400 border border-blue-500/20 shadow-[0_0_30px_rgba(59,130,246,0.2)]">
              <Info size={32} />
            </div>

            <h3 className="text-2xl font-bold text-white mb-3">
              {HOME_CONTENT.POPUP.title}
            </h3>

            <p className="text-white/70 mb-8 leading-relaxed">
              {HOME_CONTENT.POPUP.description}
            </p>

            <button
              onClick={() => { setShowPopup(false); openSidebar() }}
              className="w-full py-4 bg-white text-black font-bold rounded-xl hover:scale-105 active:scale-95 transition-all shadow-lg"
            >
              {HOME_CONTENT.POPUP.buttonText}
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Backdrop for Popup */}
      <AnimatePresence>
        {showPopup && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowPopup(false)}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
          />
        )}
      </AnimatePresence>

      {/* Hero Section — Fullscreen Video */}
<section
  className="
    relative w-screen h-[100svh] overflow-hidden left-1/2 -translate-x-1/2 -mt-[40px] -mb-[40px]">

        {/* Video de fondo */}
        <video
          src={HOME_CONTENT.HERO.videoUrl}
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover scale-105"
        />

        {/* Overlay negro */}
        <div className="absolute inset-0 bg-black/60" />

        {/* Contenido Hero */}
        <div className="relative z-10 h-full flex items-center justify-center px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-center space-y-6 max-w-3xl"
          >
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full border border-blue-300/30 bg-blue-500/10 text-xs font-medium text-blue-300 w-fit mx-auto backdrop-blur-sm">
              <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
              <span className="tracking-wide uppercase">{HOME_CONTENT.HERO.badge}</span>
            </div>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white leading-[1.1]">
              {HOME_CONTENT.HERO.titleLine1} <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 via-indigo-300 to-purple-300">
                {HOME_CONTENT.HERO.titleHighlight}
              </span>
            </h1>

            <p className="text-lg text-white/70 font-light max-w-xl mx-auto leading-relaxed">
              {HOME_CONTENT.HERO.description}
            </p>

            <div className="flex flex-wrap gap-4 pt-2 justify-center">
              <button
                onClick={handleStartConversation}
                className="px-6 py-3 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-500 transition-all hover:scale-105 shadow-lg shadow-blue-500/30 flex items-center gap-2 group active:scale-95"
              >
                <MessageCircle size={18} className="group-hover:rotate-12 transition-transform" />
                {HOME_CONTENT.HERO.buttonPrimary}
              </button>
            </div>
          </motion.div>
        </div>
      </section>

    </div>
  );
}