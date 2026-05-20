import { useParams } from "react-router";
import { schools } from "../../lib/schools";
import { useState, useEffect } from "react";
import { AnimatePresence } from "motion/react";
import { SchoolPageBackground } from "../components/school/SchoolPageBackground";
import { SchoolLandingView } from "../components/school/SchoolLandingView";
import { SchoolChatView } from "../components/school/SchoolChatView";
import { SchoolMediaModal } from "../components/school/SchoolMediaModal";

export function SchoolPage() {
  const { schoolId } = useParams();
  const school = schools.find((s) => s.id === schoolId);

  const [showChat, setShowChat] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [isResponding, setIsResponding] = useState(false);
  const [expandedMedia, setExpandedMedia] = useState<"intro" | "avatar" | null>(null);
  const [audioTrigger, setAudioTrigger] = useState<"welcome" | "defaultResponse" | null>(null);

  useEffect(() => {
    setShowChat(false);
    setIsTyping(false);
    setIsResponding(false);
    setExpandedMedia(null);
    setAudioTrigger(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [schoolId]);

  useEffect(() => {
    document.body.style.overflow = expandedMedia ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [expandedMedia]);

  if (!school) {
    return (
      <div className="relative z-10 p-12 text-center text-slate-600">Escuela no encontrada</div>
    );
  }

  return (
    <div className="relative w-full min-h-screen overflow-x-hidden">
      <SchoolPageBackground school={school} />

      {showChat && (
        <div className="lg:hidden fixed inset-0 z-[19] pointer-events-none">
          <video
            key={school.avatarVideoUrl}
            src={school.avatarVideoUrl}
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-black/30" />
        </div>
      )}

      <AnimatePresence>
        {expandedMedia && (
          <SchoolMediaModal
            school={school}
            mode={expandedMedia}
            onClose={() => setExpandedMedia(null)}
          />
        )}
      </AnimatePresence>

      <AnimatePresence mode="wait">
        {!showChat ? (
          <SchoolLandingView
            key={`landing-${school.id}`}
            school={school}
            onStartChat={() => setShowChat(true)}
            onExpandVideo={() => setExpandedMedia("intro")}
          />
        ) : (
          <SchoolChatView
            key={`chat-${school.id}`}
            school={school}
            isTyping={isTyping}
            isResponding={isResponding}
            audioTrigger={audioTrigger}
            onBotResponse={() => {
              setIsResponding(true);
              setTimeout(() => setIsResponding(false), 4000);
            }}
            onBotTyping={setIsTyping}
            onBack={() => setShowChat(false)}
            onAudioTrigger={setAudioTrigger}
            onExpandAvatar={() => setExpandedMedia("avatar")}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
