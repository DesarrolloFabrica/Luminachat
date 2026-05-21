import { motion } from "motion/react";

import type { School } from "../../../lib/schools";

import type { SchoolTheme } from "../../data/schoolThemes";

import { EducationalDocumentFlow } from "../education/EducationalDocumentFlow";

import { LuminaSideConsole } from "../chat/LuminaSideConsole";



/**

 * Modo normativo (árbol de decisión + Gemini + PDFs):

 * import { ChatInterface } from "../ChatInterface";

 */



interface SchoolChatViewProps {

  school: School;

  theme: SchoolTheme;

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

  theme,

  isTyping,

  isResponding,

  audioTrigger,

  onBack,

  onBotTyping,

  onAudioTrigger,

  onExpandAvatar,

}: SchoolChatViewProps) {

  return (

    <motion.div

      key="chat-view"

      initial={{ opacity: 0, scale: 0.98 }}

      animate={{ opacity: 1, scale: 1 }}

      exit={{ opacity: 0, scale: 0.98 }}

      transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}

      className="relative z-20 flex flex-col lg:flex-row h-[calc(100dvh-5rem)] lg:h-[calc(100vh-4rem)] w-full gap-4 lg:gap-6 max-w-[1680px] mx-auto px-2 sm:px-0"

    >

      <div className="relative z-10 w-full lg:w-[72%] flex-shrink-0 h-full min-h-0">

        <EducationalDocumentFlow

          schoolName={theme.name}

          accentColor={theme.accentColor}

          onBack={onBack}

          onWelcome={() => onAudioTrigger("welcome")}

          onBotTyping={onBotTyping}

        />

      </div>



      <div className="hidden lg:block lg:w-[28%] flex-shrink-0 h-full min-h-0">

        <LuminaSideConsole

          schoolName={theme.name}

          accentColor={theme.accentColor}

          isTyping={isTyping}

          isResponding={isResponding}

          onExpand={onExpandAvatar}

        />

      </div>

    </motion.div>

  );

}

