import { motion } from "motion/react";
import { Maximize2 } from "lucide-react";
import { clsx } from "clsx";
import type { School } from "../../../lib/schools";
import { ChatInterface } from "../ChatInterface";
import { ReactiveAvatar } from "../ReactiveAvatar";

interface SchoolChatViewProps {
  school: School;
  isTyping: boolean;
  isResponding: boolean;
  audioTrigger: "welcome" | "defaultResponse" | null;
  onBotResponse: () => void;
  onBotTyping: (v: boolean) => void;
  onBack: () => void;
  onAudioTrigger: (v: "welcome" | "defaultResponse" | null) => void;
  onExpandAvatar: () => void;
}

export function SchoolChatView({
  school,
  isTyping,
  isResponding,
  audioTrigger,
  onBotResponse,
  onBotTyping,
  onBack,
  onAudioTrigger,
  onExpandAvatar,
}: SchoolChatViewProps) {
  return (
    <motion.div
      key="chat-view"
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.98 }}
      transition={{ duration: 0.4 }}
      className="relative z-20 flex flex-col lg:flex-row h-[calc(100vh-6rem)] lg:h-[calc(100vh-5rem)] w-full gap-4 lg:gap-6 lg:p-4 max-w-[1600px] mx-auto"
    >
      <div
        className="relative z-10 w-full lg:w-[70%] flex-shrink-0 h-full flex flex-col rounded-3xl border border-white/60 overflow-hidden shadow-2xl bg-white/75 backdrop-blur-xl"
      >
        <ChatInterface
          accentColor={school.accentColor}
          schoolName={school.shortName || school.name}
          onBotResponse={onBotResponse}
          onBotTyping={onBotTyping}
          onBack={onBack}
          onAudioTrigger={onAudioTrigger}
        />
      </div>

      <div className="hidden lg:flex lg:w-[30%] flex-shrink-0 flex-col gap-4 h-full">
        <div
          className="relative flex-1 rounded-[2rem] overflow-hidden border border-white/60 shadow-xl bg-white/50 group cursor-pointer [&_video]:!object-cover"
          onClick={onExpandAvatar}
        >
          <div className="absolute top-4 right-4 z-30 opacity-0 group-hover:opacity-100 transition-opacity">
            <div className="rounded-full border border-white/30 bg-black/30 p-2 text-white backdrop-blur-sm">
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
        </div>

        <div className="flex-shrink-0 rounded-[1.5rem] border border-white/55 bg-white/60 p-4 flex flex-col justify-center items-center text-center shadow-lg backdrop-blur-xl">
          <p className="text-[10px] text-slate-400 font-semibold uppercase tracking-widest mb-2">
            Estado del sistema
          </p>
          <div className="flex items-center gap-2 mb-2">
            <div
              className={clsx(
                "w-2.5 h-2.5 rounded-full",
                isTyping || isResponding ? "bg-green-500 animate-pulse" : "bg-blue-500",
              )}
            />
            <span className="text-slate-800 text-sm font-bold">
              {isTyping || isResponding ? "Activo" : "En espera"}
            </span>
          </div>
          <p className="text-[10px] text-slate-500 leading-tight max-w-[200px]">
            IA conectada a la base de datos de {school.name}.
          </p>
        </div>
      </div>
    </motion.div>
  );
}
