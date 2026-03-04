import { useRef, useState } from "react";
import { RouterProvider } from "react-router";
import { router } from "./routes";
import { LoginPage } from "./pages/LoginPage";
import { Maximize } from "lucide-react";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false); //Esta logeado/no esta logeado estado 
  const [showIntro, setShowIntro] = useState(true);
  const [started, setStarted] = useState(false); // usuario ya hizo click

  const videoRef = useRef<HTMLVideoElement>(null);

    // 1️⃣ LOGIN
  if (!isLoggedIn) { //Si no esta logeado, lo devuelve a la pagina principal 
    return <LoginPage onLogin={() => setIsLoggedIn(true)} />;
  }

  // reproducir video 
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

    // Fullscreen funcional
  const handleFullscreen = async () => {
    if (!videoRef.current) return;
    
    videoRef.current.requestFullscreen();

  };

  // omitir intro
  const skipIntro = () => {
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
    setShowIntro(false);
  };

    // pausar intro
  const pauseIntro = () => {
    if (videoRef.current) {
      videoRef.current.pause();
      setStarted(false);
    }
  };

  return (
    <>
      {/* VIDEO INTRO */}
      {showIntro && (
  <div className="fixed inset-0 flex items-center justify-center p-6 bg-cover bg-center bg-no-repeat"
    style={{ backgroundImage: "url('https://h6ajra25jkx2cstu.public.blob.vercel-storage.com/FONDO1.jpeg')"}}>

    <div className=" absolute inset-0 bg-slate-950/40 backdrop-blur-[4px]"> </div>
              

          {/* Contenedor centrado */}
          <div className="relative w-full max-w-6xl h-full max-h-[75vh] rounded-2xl overflow-hidden shadow-2xl border border-white/20 bg-black">

            <video
              ref={videoRef}
              src="https://res.cloudinary.com/dmihqer0q/video/upload/v1772470219/Lumina_lzxvcw.mp4"
              playsInline
              preload="auto"
              onEnded={() => setShowIntro(false)}
              className="w-full h-full object-contain"
            />

            {/* OVERLAY CLICK PARA click reporducir y pausar */}
            {started && (
              <div
                onClick={pauseIntro}
                className=" absolute inset-0 flex flex-col items-center justify-center cursor-pointer">
                </div>
              
            )
            }

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
            <>
                  <button
                onClick={skipIntro}
                className="
                  absolute bottom-6 right-6
                  px-6 py-3
                  bg-white/20 backdrop-blur-md border border-blue-600 text-white font-semibold rounded-xl hover:bg-white/30 transition-all shadow-lg"
              >
                Omitir intro
              </button>

              {/* Botón Fullscreen */}
                <button
                  onClick={handleFullscreen}
                  className="absolute bottom-6 left-6 p-3 bg-white/20 backdrop-blur-md border border-blue-600 text-white rounded-xl hover:bg-white/30 transition-all shadow-lg"
                >
                  <Maximize size={20} />
                </button>
            </>
              
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