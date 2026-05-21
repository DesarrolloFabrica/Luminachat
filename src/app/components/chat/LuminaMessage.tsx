import { motion } from "motion/react";
import { User } from "lucide-react";
import { clsx } from "clsx";
import { LuminaCoreIcon } from "../visual/LuminaCoreIcon";
import { messageReveal, messageStagger, messageLine } from "./chatMotion";
import { LUMINA_TEXT } from "./luminaChatPalette";

interface LuminaMessageProps {
  role: "assistant" | "user";
  accentColor: string;
  children: React.ReactNode;
  className?: string;
  staggerContent?: boolean;
}

export function LuminaMessage({
  role,
  accentColor,
  children,
  className,
  staggerContent = false,
}: LuminaMessageProps) {
  const isAssistant = role === "assistant";

  return (
    <motion.div
      variants={messageReveal}
      initial="hidden"
      animate="visible"
      className={clsx(
        "flex w-full gap-3",
        isAssistant ? "justify-start" : "justify-end",
        className,
      )}
    >
      {isAssistant && <LuminaCoreIcon accentColor={accentColor} size="sm" />}

      <motion.div
        variants={staggerContent ? messageStagger : undefined}
        initial={staggerContent ? "hidden" : false}
        animate={staggerContent ? "visible" : undefined}
        className={clsx(
          "max-w-[min(100%,42rem)] rounded-2xl border px-4 py-3 md:px-5 md:py-4 backdrop-blur-[24px]",
          isAssistant
            ? "rounded-tl-md bg-cyan-400/5 border-cyan-400/10 shadow-[0_0_30px_rgba(34,211,238,0.06)]"
            : "rounded-tr-md bg-blue-400/5 border-blue-400/10 shadow-[0_0_24px_rgba(96,165,250,0.06)]",
        )}
        style={{
          background: isAssistant
            ? "linear-gradient(180deg, rgba(34,211,238,0.06) 0%, rgba(255,255,255,0.02) 100%)"
            : "linear-gradient(180deg, rgba(96,165,250,0.06) 0%, rgba(255,255,255,0.02) 100%)",
          boxShadow: isAssistant ? "inset 0 1px 0 rgba(255,255,255,0.06)" : undefined,
        }}
      >
        <div className={clsx("text-sm leading-relaxed", LUMINA_TEXT.secondary)}>{children}</div>
      </motion.div>

      {!isAssistant && (
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-blue-400/20 bg-blue-400/10">
          <User size={16} className="text-blue-300" />
        </div>
      )}
    </motion.div>
  );
}

export function LuminaMessageLine({ children }: { children: React.ReactNode }) {
  return (
    <motion.p variants={messageLine} className="text-sm text-slate-300 leading-relaxed">
      {children}
    </motion.p>
  );
}
