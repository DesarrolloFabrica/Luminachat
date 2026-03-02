import { useParams } from "react-router";
import { schools } from "../../lib/schools";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Play, MessageSquare, ExternalLink, X, Maximize2, Pause } from "lucide-react";
import { clsx } from "clsx";
import { ChatInterface } from "../components/ChatInterface";
import { ReactiveAvatar } from "../components/ReactiveAvatar";

export function SchoolPage() {
  const { schoolId } = useParams();
  const school = schools.find((s) => s.id === schoolId);
  
  const [showChat, setShowChat] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [isResponding, setIsResponding] = useState(false);
  const [expandedMedia, setExpandedMedia] = useState<'intro' | 'avatar' | null>(null);
  const [audioTrigger, setAudioTrigger] = useState<'welcome' | 'defaultResponse' | null>(null);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const introVideoRef = useRef<HTMLVideoElement>(null);
  const [mobileVideoPlaying, setMobileVideoPlaying] = useState(false);
  const mobileVideoRef = useRef<HTMLVideoElement>(null);

  // Reset state when changing schools
  useEffect(() => {
    setShowChat(false);
    setIsTyping(false);
    setIsResponding(false);
    setExpandedMedia(null);
    setAudioTrigger(null);
    setIsVideoPlaying(false);
    setMobileVideoPlaying(false);
  }, [schoolId]);

  // Lock Body Scroll when Media is Expanded
  useEffect(() => {
    if (expandedMedia) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [expandedMedia]);

  if (!school) return <div>School not found</div>;

  // Render dedicated Media Modal
  const renderMediaModal = () => {
    if (!expandedMedia) return null;
    
    const videoSrc = expandedMedia === 'intro' ? school.introVideoUrl : school.avatarVideoUrl;
    const isAvatar = expandedMedia === 'avatar';

    return (
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="fixed inset-0 z-[100] bg-white/95 backdrop-blur-md flex items-center justify-center p-4 md:p-8"
        onClick={() => setExpandedMedia(null)}
      >
        <button 
          onClick={() => setExpandedMedia(null)}
          className="absolute top-6 right-6 p-4 rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200 transition-all z-50 backdrop-blur-md border border-gray-200 group shadow-sm"
        >
          <X size={32} className="group-hover:rotate-90 transition-transform" />
        </button>

        <motion.div 
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className={clsx(
            "relative w-full max-h-[90vh] bg-white rounded-3xl overflow-hidden shadow-2xl border border-gray-200",
            isAvatar ? "max-w-2xl aspect-[9/16] md:aspect-auto" : "max-w-7xl aspect-video"
          )}
          onClick={(e) => e.stopPropagation()}
        >
          <video
            src={videoSrc}
            autoPlay
            controls // Enable controls for the user
            playsInline
            className="w-full h-full object-contain bg-black"
          />
          
          <div className="absolute top-0 left-0 p-6 bg-gradient-to-b from-black/60 to-transparent w-full pointer-events-none">
            <h3 className="text-white font-bold text-lg drop-shadow-md">
              {isAvatar ? "Asistente Virtual" : school.name}
            </h3>
          </div>
        </motion.div>
      </motion.div>
    );
  };

  return (
<div className="relative w-full min-h-[calc(100vh-80px)] lg:h-[calc(100vh-80px)] overflow-y-auto">
      
      {/* Background Ambience based on school color */}
      <div 
        className="fixed inset-0 pointer-events-none opacity-10 z-0"
        style={{ background: `radial-gradient(circle at 80% 20%, ${school.accentColor} 0%, transparent 50%)` }}
      />
      
      {/* Full Screen Media Overlay */}
      <AnimatePresence>
        {expandedMedia && renderMediaModal()}
      </AnimatePresence>

      {/* ── MOBILE ONLY: video de fondo para chat view — fuera del AnimatePresence para cubrir todo ── */}
      {showChat && (
        <div className="lg:hidden fixed inset-0 z-[19] pointer-events-none">
          <video
            key={school.avatarVideoUrl}
            src={school.avatarVideoUrl}
            autoPlay
            loop
            muted
            playsInline
            style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
          />
          {/* Overlay ligero — sube el alpha para más oscuridad, bájalo para más video */}
          <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.30)' }} />
        </div>
      )}

      <AnimatePresence mode="wait">
        {!showChat ? (
          /* ==================== INTRO / WELCOME VIEW ==================== */
          <motion.div 
            key="intro-view"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.4 }}
            className="grid grid-cols-12 gap-6 lg:h-full w-full relative z-10 pb-8 lg:pb-0"
          >
            {/* Left Column (50%) - Content */}
            <div className="col-span-12 lg:col-span-6 flex flex-col lg:justify-start pt-12 pr-4 lg:pr-8 py-6 pl-4 lg:pl-0 lg:overflow-y-auto">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className="flex flex-col min-h-fit gap-4"
              >
                <div 
                  className="inline-flex items-center gap-2 mb-6 px-4 py-1.5 rounded-full border border-gray-200 bg-white/100 backdrop-blur-sm text-sm font-medium w-fit shadow-sm"
                  style={{ 
                    color: school.accentColor, 
                    borderColor: `${school.accentColor}40`,
                    backgroundColor: `${school.accentColor}10` 
                  }}
                >
                  <school.icon size={18} />
                  <span className="tracking-wide uppercase text-xs font-bold">{school.name}</span>
                </div>

                <h1 className="  text-3xl md:text-4xl lg:text-4xl xl:text-5xl 2xl:text-6xl font-bold text-gray-900 mb-6 leading-tight tracking-tight max-w-2xl break-words">
                  {school.welcomeMessage}
                </h1>

                <p className="text-lg text-gray-600 mb-8 max-w-xl leading-relaxed border-l-2 pl-4" style={{ borderColor: school.accentColor }}>
                  {school.description}
                  <br className="mb-4" />
                  <span className="text-sm opacity-80 mt-2 block font-medium text-gray-500">
                    Descubre nuestros programas académicos, recursos exclusivos y conecta con nuestra comunidad.
                  </span>
                </p>

                <div className="flex flex-wrap gap-4 mt-auto lg:mt-0">
                   <button
                     onClick={() => setShowChat(true)}
                     className="px-8 py-4 rounded-2xl font-bold text-white hover:scale-105 transition-all flex items-center gap-3 shadow-lg group"
                     style={{ backgroundColor: school.accentColor, boxShadow: `0 10px 30px -10px ${school.accentColor}80` }}
                   >
                     <MessageSquare size={22} className="group-hover:rotate-12 transition-transform" />
                     <span>Hablar con Asistente</span>
                   </button>
                   
                   <button className="px-6 py-4 rounded-2xl border border-gray-200 bg-white text-gray-700 hover:bg-gray-50 transition-colors flex items-center gap-3 shadow-sm hover:shadow-md">
                     <ExternalLink size={20} />
                     <span>Sitio Oficial</span>
                   </button>
                </div>

                {/* Mobile Video Section — inline playback + fullscreen horizontal */}
                <div className="lg:hidden w-full mt-8">
                  <div className="relative w-full aspect-video rounded-2xl overflow-hidden shadow-lg border border-gray-200 bg-white">

                    {/* Video inline mobile */}
                    <video
                      ref={mobileVideoRef}
                      key={`mobile-${school.introVideoUrl}`}
                      src={school.introVideoUrl}
                      playsInline
                      poster={school.videoPlaceholder}
                      onPlay={() => setMobileVideoPlaying(true)}
                      onPause={() => setMobileVideoPlaying(false)}
                      onEnded={() => setMobileVideoPlaying(false)}
                      className="absolute inset-0 w-full h-full object-cover"
                    />

                    {/* Overlay con play — solo visible cuando NO está reproduciendo */}
                    {!mobileVideoPlaying && (
                      <div
                        className="absolute inset-0 z-10 flex flex-col items-center justify-center cursor-pointer bg-black/30"
                        onClick={() => {
                          if (mobileVideoRef.current) {
                            mobileVideoRef.current.play();
                          }
                        }}
                      >
                        <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-md border border-white/40 flex items-center justify-center text-white shadow-lg">
                          <Play size={24} fill="currentColor" className="ml-1" />
                        </div>
                        <p className="mt-3 text-white font-bold tracking-widest uppercase text-xs opacity-90 drop-shadow-md">
                          REPRODUCIR
                        </p>
                      </div>
                    )}

                    {/* Botón pantalla completa — siempre visible en esquina */}
                    <button
                      className="absolute top-3 right-3 z-20 p-2 rounded-full bg-black/40 hover:bg-black/60 text-white backdrop-blur-sm border border-white/20 transition-colors"
                      onClick={async () => {
                        const v = mobileVideoRef.current as HTMLVideoElement & {
                          webkitEnterFullscreen?: () => void;
                        };
                        if (!v) return;

                        // Asegurar que el video esté corriendo
                        try { await v.play(); } catch (_) {}

                        // Rotar a landscape PRIMERO (debe ocurrir en gesto del usuario)
                        try {
                          await (screen.orientation as any).lock('landscape');
                        } catch (_) {
                          // Si el navegador no soporta lock, se ignora
                        }

                        // Entrar a fullscreen
                        try {
                          if (v.requestFullscreen) {
                            await v.requestFullscreen();
                          } else if (v.webkitEnterFullscreen) {
                            v.webkitEnterFullscreen(); // iOS Safari entra landscape nativo
                          }
                        } catch (_) {}

                        // Restaurar orientación portrait al salir de fullscreen
                        const onFsChange = () => {
                          if (!document.fullscreenElement) {
                            try { (screen.orientation as any).unlock(); } catch (_) {}
                            document.removeEventListener('fullscreenchange', onFsChange);
                            document.removeEventListener('webkitfullscreenchange', onFsChange);
                          }
                        };
                        document.addEventListener('fullscreenchange', onFsChange);
                        document.addEventListener('webkitfullscreenchange', onFsChange);
                      }}
                    >
                      <Maximize2 size={16} />
                    </button>
                  </div>
                </div>

                {/* Stats */}
                <div className="mt-12 grid grid-cols-3 gap-6 border-t border-gray-200 pt-8">
                  {[
                    { label: "Programas", value: "12+" },
                    { label: "Estudiantes", value: "2.5k" },
                    { label: "Empleabilidad", value: "98%" }
                  ].map((stat, i) => (
                    <div key={i} className="group cursor-default">
                      <h4 className="text-3xl font-bold group-hover:scale-105 transition-transform origin-left" style={{ color: school.accentColor }}>
                        {stat.value}
                      </h4>
                      <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mt-1 group-hover:text-gray-600 transition-colors">
                        {stat.label}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Highlights — lista específica por escuela */}
                <div className="mt-8">
                  <p className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: school.accentColor }}>
                    {school.highlightsTitle}
                  </p>
                  <ul className="space-y-2.5">
                    {school.highlights.map((item, i) => (
                      <motion.li
                        key={i}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.15 * i, duration: 0.35 }}
                        className="flex items-start gap-3 text-sm text-gray-600 leading-snug"
                      >
                        <span
                          className="mt-[5px] w-2 h-2 rounded-full shrink-0"
                          style={{ backgroundColor: school.accentColor }}
                        />
                        {item}
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            </div>

            {/* Right Column (50%) - Intro Video */}
            {/* ============================================================
                TAMAÑO Y POSICIÓN DEL RECUADRO DE VIDEO
                - Ancho del recuadro:  controlado por el padre "col-span-6"
                  y por las clases del motion.div: "w-full" (ocupa todo el col)
                - Alto del recuadro:   clase "h-[420px]" — cámbiala para ajustar la altura
                - Aspect ratio:        "aspect-video" (16:9) — quítalo si prefieres altura fija
                - Posición vertical:   "justify-center" en el padre flex
                - Margen/padding:      "py-4 pr-4" en el contenedor padre
                ============================================================ */}
            <div className="hidden lg:flex col-span-12 lg:col-span-6 relative h-full flex-col justify-center py-4 pr-4">
              <motion.div
                className="relative w-full aspect-video rounded-[2rem] overflow-hidden border border-gray-200 shadow-2xl bg-white cursor-pointer"
                onClick={() => {
                  if (!isVideoPlaying) {
                    introVideoRef.current?.play();
                    setIsVideoPlaying(true);
                  }
                }}
              >
                {/* Video — siempre presente, se reproduce inline al hacer clic */}
                <video
                  ref={introVideoRef}
                  key={school.introVideoUrl}
                  src={school.introVideoUrl}
                  playsInline
                  poster={school.videoPlaceholder}
                  onEnded={() => setIsVideoPlaying(false)}
                  className="absolute inset-0 w-full h-full object-contain"
                />

                {/* Overlay oscuro solo cuando NO está reproduciendo */}
                {!isVideoPlaying && (
                  <div className="absolute inset-0 bg-black/20 z-10" />
                )}

                {/* Play overlay — se oculta cuando el video está corriendo */}
                {!isVideoPlaying && (
                  <div className="absolute inset-0 z-20 flex flex-col items-center justify-center">
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="w-24 h-24 rounded-full bg-white/20 backdrop-blur-md border border-white/40 flex items-center justify-center text-white shadow-lg hover:bg-white/30 transition-colors"
                    >
                      <Play size={36} fill="currentColor" className="ml-2" />
                    </motion.div>
                    <p className="mt-6 text-white font-bold tracking-widest uppercase text-sm opacity-80 drop-shadow-md">
                      REPRODUCIR
                    </p>
                  </div>
                )}

                {/* Botón Pausa — visible solo mientras el video corre */}
                {isVideoPlaying && (
                  <button
                    className="absolute top-4 right-4 z-30 p-3 rounded-full bg-black/40 hover:bg-black/60 text-white backdrop-blur-sm border border-white/20 transition-colors"
                    onClick={(e) => {
                      e.stopPropagation();
                      introVideoRef.current?.pause();
                      setIsVideoPlaying(false);
                    }}
                  >
                    <Pause size={18} fill="currentColor" />
                  </button>
                )}

                {/* Info en la parte inferior — solo cuando no está reproduciendo */}
                {!isVideoPlaying && (
                  <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent z-20">
                    <h3 className="text-xl font-bold text-white mb-1 drop-shadow-md">{school.name}</h3>
                    <p className="text-white/80 text-sm font-medium drop-shadow-sm">Video Institucional • 2:30 min</p>
                  </div>
                )}
              </motion.div>
            </div>
          </motion.div>
        ) : (
          /* ==================== CHAT MODE VIEW (FULL SCREEN) ==================== */
          <motion.div 
            key="chat-view"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.4 }}
            className="flex flex-col lg:flex-row h-full w-full gap-4 lg:gap-6 lg:p-4 relative z-20"
          >
            {/* Chat Interface - full width mobile, 70% desktop LEFT */}
            <div className="relative z-10 w-full lg:w-[70%] flex-shrink-0 h-full lg:h-full flex flex-col
              rounded-3xl lg:rounded-[2rem]
              border border-white/20 lg:border-gray-200
              shadow-2xl lg:shadow-2xl
              overflow-hidden
              bg-white/10 backdrop-blur-sm
              lg:bg-white/80 lg:backdrop-blur-xl">
              <ChatInterface
                accentColor={school.accentColor}
                schoolName={school.shortName}
                onBotResponse={() => {
                  setIsResponding(true);
                  setTimeout(() => setIsResponding(false), 4000);
                }}
                onBotTyping={setIsTyping}
                onBack={() => setShowChat(false)}
                onAudioTrigger={setAudioTrigger}
              />
            </div>

            {/* Avatar Section — SOLO DESKTOP (lg+) */}
            <div className="hidden lg:flex lg:w-[30%] flex-shrink-0 flex-col gap-4 h-full">
               {/* Avatar Container — [&_.motion-div-inner]:w-full fuerza el video a llenar todo */}
               <div
                 className="relative rounded-[2rem] overflow-hidden w-full flex-1 border border-gray-200 shadow-xl bg-white group cursor-pointer [&_video]:!object-cover"
                 onClick={() => setExpandedMedia('avatar')}
               >
                  {/* Expand Icon Hint */}
                  <div className="absolute top-4 right-4 z-30 opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="p-2 bg-black/20 hover:bg-black/40 rounded-full text-white transition-colors backdrop-blur-sm">
                      <Maximize2 size={16} />
                    </div>
                  </div>

                  <ReactiveAvatar
                     isTyping={isTyping}
                     isResponding={isResponding}
                     accentColor={school.accentColor}
                     videoUrl={school.avatarVideoUrl}
                     className="w-full h-full object-cover"
                     playAudio={audioTrigger}
                   />

                   {/* Avatar Status Overlay */}
                   <div className="absolute bottom-6 left-0 right-0 flex justify-center pointer-events-none z-20">
                      <div className="px-4 py-2 bg-white/80 backdrop-blur-md rounded-full border border-gray-200 text-[10px] font-bold text-gray-800 uppercase tracking-wider flex items-center gap-2 shadow-lg">
                       <span className={clsx("w-2 h-2 rounded-full transition-colors duration-300", isResponding ? "bg-green-500 animate-pulse shadow-sm" : "bg-gray-300")} />
                        {isResponding ? "Hablando..." : (isTyping ? "Procesando..." : "Escuchando")}
                      </div>
                   </div>
               </div>

               {/* Info Card */}
               <div className="flex-shrink-0 h-[100px] bg-white border border-gray-200 rounded-[1.5rem] p-4 flex flex-col justify-center items-center text-center shadow-lg">
                   <p className="text-[10px] text-gray-400 font-semibold uppercase tracking-widest mb-2">Estado del Sistema</p>
                   <div className="flex items-center gap-2 mb-2">
                     <div className={clsx("w-2.5 h-2.5 rounded-full", (isTyping || isResponding) ? "bg-green-500 animate-pulse shadow-sm" : "bg-blue-500")} />
                     <span className="text-gray-800 text-sm font-bold">{(isTyping || isResponding) ? "Activo" : "En espera"}</span>
                   </div>
                   <p className="text-[10px] text-gray-500 leading-tight max-w-[180px]">
                     IA conectada a la base de datos de {school.shortName}. Haz tus preguntas ahora.
                   </p>
                </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}