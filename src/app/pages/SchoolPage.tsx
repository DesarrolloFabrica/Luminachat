import { useParams } from "react-router";

import { schools } from "../../lib/schools";

import { useState, useEffect, useMemo } from "react";

import { AnimatePresence } from "motion/react";
import { clsx } from "clsx";

import { getSchoolThemeFromSchool } from "../data/schoolThemes";

import { SchoolAmbientBackground } from "../components/visual/SchoolAmbientBackground";

import { SchoolLandingView } from "../components/school/SchoolLandingView";

import { SchoolChatView } from "../components/school/SchoolChatView";

import { SchoolMediaModal } from "../components/school/SchoolMediaModal";



export function SchoolPage() {

  const { schoolId } = useParams();

  const school = schools.find((s) => s.id === schoolId);



  const theme = useMemo(

    () => (school ? getSchoolThemeFromSchool(school) : null),

    [school],

  );



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



  if (!school || !theme) {

    return (

      <div className="relative z-10 p-12 text-center text-slate-600">Escuela no encontrada</div>

    );

  }



  return (

    <div
      className={clsx(
        "relative w-full min-h-screen overflow-x-hidden",
        showChat && "bg-[#0f172a]",
      )}
    >
      {!showChat && <SchoolAmbientBackground theme={theme} />}



      {showChat && (
        <div className="lg:hidden fixed inset-0 z-[19] pointer-events-none overflow-hidden">
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse 80% 60% at 50% 40%, rgba(34,211,238,0.12) 0%, transparent 55%), #0f172a",
            }}
          />
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

            key={`landing-${theme.id}`}

            school={school}

            theme={theme}

            onOpenChat={() => setShowChat(true)}

          />

        ) : (

          <SchoolChatView

            key={`chat-${theme.id}`}

            school={school}

            theme={theme}

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


