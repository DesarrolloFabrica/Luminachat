import { motion, AnimatePresence } from "motion/react";
import { clsx } from "clsx";
import { useEffect, useRef } from "react";

// ===========================
// CONFIGURACIÓN DE AUDIO
// ===========================
// Cambia estas URLs por los archivos de audio que desees usar
const AUDIO_CONFIG = {
  welcome: "/audio/welcome.mp3",           // Audio para mensaje de bienvenida
  defaultResponse: "/audio/response.mp3"   // Audio para respuestas predeterminadas (cuando no tiene respuesta la gema)
};

interface ReactiveAvatarProps {
  isTyping: boolean;
  isResponding: boolean; // Triggered when bot sends a message
  accentColor: string;
  videoUrl: string; // The URL to the video/GIF
  onClick?: () => void;
  className?: string; // Allow external styling
  playAudio?: 'welcome' | 'defaultResponse' | null; // Trigger para reproducir audio
}

export function ReactiveAvatar({ 
  isTyping, 
  isResponding, 
  accentColor, 
  videoUrl, 
  onClick, 
  className,
  playAudio = null 
}: ReactiveAvatarProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Control video playback based on responding state
  useEffect(() => {
    if (videoRef.current) {
      if (isResponding || isTyping) {
        videoRef.current.play().catch(e => console.log("Auto-play prevented", e));
      } else {
        videoRef.current.pause();
        // Optional: Reset to start frame if desired, but pausing is usually enough for "freezing"
        // videoRef.current.currentTime = 0; 
      }
    }
  }, [isResponding, isTyping]);

  // Sistema de reproducción de audio
  useEffect(() => {
    if (playAudio) {
      // Detener audio anterior si existe
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }

      // Crear y reproducir nuevo audio según el tipo
      const audioUrl = AUDIO_CONFIG[playAudio];
      if (audioUrl) {
        audioRef.current = new Audio(audioUrl);
        audioRef.current.play().catch(e => console.log("Audio playback prevented", e));
      }
    }

    // Cleanup: detener audio cuando el componente se desmonte
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, [playAudio]);

  return (
    <div 
      onClick={onClick}
      className={clsx(
        "relative flex items-center justify-center w-full h-full transition-all duration-500 cursor-pointer group",
        className
      )}
    >
      
      {/* Background Pulse Effect when Responding */}
      <AnimatePresence>
        {isResponding && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-0 pointer-events-none flex items-center justify-center"
          >
             {/* Strong outer glow - Reducida la opacidad para menos saturación */}
             <div 
                className="absolute w-[90%] h-[90%] rounded-full blur-3xl opacity-60 animate-pulse"
                style={{ background: `radial-gradient(circle, ${accentColor} 0%, transparent 70%)` }}
             />
             
             {/* Ring Wave Animation */}
             <span className="absolute w-[95%] h-[95%] rounded-full border-[8px] animate-ping opacity-40" style={{ borderColor: accentColor }} />
             <span className="absolute w-[85%] h-[85%] rounded-full border-[6px] animate-ping opacity-60 [animation-delay:0.2s]" style={{ borderColor: accentColor }} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Video/Avatar */}
      <motion.div
        animate={{
          scale: isTyping ? 1.05 : 1,
          filter: isResponding 
            ? `drop-shadow(0 0 20px ${accentColor}) brightness(1.15) contrast(1.05)` // Reducido brightness y contrast
            : "drop-shadow(0 0 0 transparent) brightness(1)",
        }}
        transition={{ duration: 0.3 }}
        className={clsx(
          "relative z-10 w-[85%] h-[85%] overflow-hidden transition-all duration-500 rounded-full border-4 shadow-2xl",
          "group-hover:scale-[1.05]"
        )}
        style={{ 
          borderColor: isResponding ? accentColor : 'rgba(255,255,255,0.1)',
          boxShadow: isResponding 
            ? `0 0 40px ${accentColor}, inset 0 0 20px ${accentColor}60` // Reducida la intensidad del shadow
            : '0 0 20px rgba(0,0,0,0.5)'
        }}
      >
         {/* Using a video tag for the avatar */}
         <video
            ref={videoRef}
            src={videoUrl}
            loop
            muted
            playsInline
            className="w-full h-full object-contain bg-gray-50"
         />
         
         {/* Screen Glitch/Scanline effect overlay for futuristic feel */}
         <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay pointer-events-none" />
         <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-transparent pointer-events-none rounded-full" />
      </motion.div>

      {/* Typing Indicator Overlay */}
      {isTyping && (
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex gap-1 px-4 py-2 bg-black/80 backdrop-blur-md rounded-full border border-white/20 shadow-xl">
          <span className="w-2 h-2 bg-white rounded-full animate-bounce [animation-delay:-0.3s]" />
          <span className="w-2 h-2 bg-white rounded-full animate-bounce [animation-delay:-0.15s]" />
          <span className="w-2 h-2 bg-white rounded-full animate-bounce" />
        </div>
      )}
    </div>
  );
}