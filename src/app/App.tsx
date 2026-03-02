import { useEffect, useRef, useState } from "react";
import { RouterProvider } from "react-router";
import { router } from "./routes";

function App() {
  const [showIntro, setShowIntro] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    videoRef.current?.play().catch(() => {});
  }, []);

    // función para omitir intro
  const skipIntro = () => {
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
    setShowIntro(false);
  };

  return (
    <>
      {/* VIDEO INTRO FULLSCREEN */}
      {showIntro && (
        <div className="fixed inset-0 z-[9999] bg-black">
          <video
            ref={videoRef}
            src="https://h6ajra25jkx2cstu.public.blob.vercel-storage.com/AUDIO18.mp4"
            autoPlay
            playsInline
            onEnded={() => setShowIntro(false)}
            className="w-screen h-screen object-cover"
          />

           {/* BOTÓN OMITIR */}
          <button
            onClick={skipIntro}
            className="
              absolute bottom-6 right-6
              px-6 py-3
              bg-white/20 backdrop-blur-md
              border border-white/30
              text-white font-semibold
              rounded-xl
              hover:bg-white/30
              transition-all
              shadow-lg
            "
          >
            Omitir intro
          </button>

        </div>
      )}

      {/* APP NORMAL */}
      {!showIntro && <RouterProvider router={router} />}
    </>
  );
}

export default App;