import { useRef, useState } from "react";
import { RouterProvider } from "react-router";
import { router } from "./routes";

function App() {
  const [showIntro, setShowIntro] = useState(true);
  const [started, setStarted] = useState(false); // usuario ya hizo click
  const videoRef = useRef<HTMLVideoElement>(null);

  // activar video con sonido (requiere interacción usuario)
  const startVideo = async () => {
    if (!videoRef.current) return;

    try {
      videoRef.current.muted = false;
      await videoRef.current.play();
      setStarted(true);
    } catch (err) {
      console.log("Autoplay bloqueado:", err);
    }
  };

  // omitir intro
  const skipIntro = () => {
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
    setShowIntro(false);
  };

  return (
    <>
      {/* VIDEO INTRO */}
      {showIntro && (
        <div className="fixed inset-0 z-[9999] bg-black flex items-center justify-center p-6">

          {/* Contenedor centrado */}
          <div className="relative w-full max-w-6xl h-full max-h-[85vh] rounded-3xl overflow-hidden shadow-2xl border border-white/20">

            <video
              ref={videoRef}
              src="https://res.cloudinary.com/dmihqer0q/video/upload/v1772470219/Lumina_lzxvcw.mp4"
              playsInline
              preload="auto"
              onEnded={() => setShowIntro(false)}
              className="w-full h-full object-contain bg-black"
            />

            {/* OVERLAY CLICK PARA REPRODUCIR */}
            {!started && (
              <div
                onClick={startVideo}
                className="
                  absolute inset-0
                  flex flex-col items-center justify-center
                  bg-black/40 backdrop-blur-md
                  cursor-pointer
                  transition-all
                "
              >
                <div className=" animate-pulse px-8 py-6 rounded-2xl bg-white/10 border border-blue-600 backdrop-blur-lg text-white text-center shadow-xl">
                  <p className="text-lg font-semibold tracking-wide">
                    Haz clic para reproducir
                  </p>

                </div>
              </div>
            )}

          
            {/* BOTÓN OMITIR — solo visible cuando ya empezó */}
            {started && (
              <button
                onClick={skipIntro}
                className="
                  absolute bottom-6 right-6
                  px-6 py-3
                  bg-white/20 backdrop-blur-md
                  border border-blue-600
                  text-white font-semibold
                  rounded-xl
                  hover:bg-white/30
                  transition-all
                  shadow-lg
                "
              >
                Omitir intro
              </button>
            )}

          </div>
        </div>
      )}

      {/* APP NORMAL */}
      {!showIntro && <RouterProvider router={router} />}
    </>
  );
}

export default App;