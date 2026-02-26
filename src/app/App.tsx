import { useEffect, useRef, useState } from "react";
import { RouterProvider } from "react-router";
import { router } from "./routes";

function App() {
  const [showIntro, setShowIntro] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    videoRef.current?.play().catch(() => {});
  }, []);

  return (
    <>
      {/* VIDEO INTRO FULLSCREEN */}
      {showIntro && (
        <div className="fixed inset-0 z-[9999] bg-black">
          <video
            ref={videoRef}
            src="https://zvovjo2h7zyeq3tg.public.blob.vercel-storage.com/render.mp4"
            autoPlay
            muted
            playsInline
            onEnded={() => setShowIntro(false)}
            className="w-screen h-screen object-cover"
          />
        </div>
      )}

      {/* APP NORMAL */}
      {!showIntro && <RouterProvider router={router} />}
    </>
  );
}

export default App;