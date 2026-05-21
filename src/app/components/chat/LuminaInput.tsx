import { useState, useRef, useEffect } from "react";
import { motion } from "motion/react";
import { Paperclip, Send, Sparkles } from "lucide-react";
import { clsx } from "clsx";
import { LUMINA_BG, LUMINA_GLASS, LUMINA_TEXT } from "./luminaChatPalette";

interface LuminaInputProps {
  accentColor: string;
  onSend?: (text: string) => void;
  onUploadClick?: () => void;
  onToolsClick?: () => void;
  disabled?: boolean;
  placeholder?: string;
}

const PLACEHOLDERS = [
  "Pregúntale a LUMINA sobre generación educativa…",
  "Solicita un glosario o infografía…",
  "Pide ayuda con recursos para tu escuela…",
];

export function LuminaInput({
  accentColor,
  onSend,
  onUploadClick,
  onToolsClick,
  disabled = false,
  placeholder,
}: LuminaInputProps) {
  const [value, setValue] = useState("");
  const [placeholderIndex, setPlaceholderIndex] = useState(0);
  const [focused, setFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (focused || placeholder) return;
    const id = window.setInterval(() => {
      setPlaceholderIndex((i) => (i + 1) % PLACEHOLDERS.length);
    }, 4000);
    return () => window.clearInterval(id);
  }, [focused, placeholder]);

  const handleSubmit = () => {
    const text = value.trim();
    if (!text || disabled) return;
    onSend?.(text);
    setValue("");
  };

  const activePlaceholder = placeholder ?? PLACEHOLDERS[placeholderIndex];

  return (
    <div
      className={clsx(
        "relative shrink-0 border-t px-4 py-3 md:px-5 md:py-4",
        LUMINA_GLASS.border,
        LUMINA_BG.input,
        "backdrop-blur-[24px]",
      )}
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-400/20 to-transparent" />
      <motion.div
        animate={
          focused
            ? { boxShadow: "0 0 36px rgba(34,211,238,0.14)" }
            : { boxShadow: "0 0 0px transparent" }
        }
        className={clsx(
          "flex items-center gap-2 rounded-full border px-2 py-2 backdrop-blur-[24px] transition-colors",
          LUMINA_GLASS.surface,
          focused ? "border-cyan-400/40 bg-white/[0.06]" : LUMINA_GLASS.borderSoft,
          disabled && "opacity-60",
        )}
      >
        <button
          type="button"
          onClick={onUploadClick}
          disabled={disabled}
          className="shrink-0 rounded-full p-2.5 text-slate-400 hover:bg-cyan-400/10 hover:text-cyan-300 transition-colors disabled:opacity-40"
          title="Subir archivo"
        >
          <Paperclip size={18} />
        </button>
        <button
          type="button"
          onClick={onToolsClick}
          disabled={disabled}
          className="hidden sm:flex shrink-0 rounded-full p-2.5 text-slate-400 hover:bg-cyan-400/10 hover:text-cyan-300 transition-colors disabled:opacity-40"
          title="Herramientas IA"
        >
          <Sparkles size={18} />
        </button>
        <input
          ref={inputRef}
          type="text"
          value={value}
          disabled={disabled}
          onChange={(e) => setValue(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
          placeholder={activePlaceholder}
          className={clsx(
            "flex-1 min-w-0 bg-transparent text-sm outline-none",
            LUMINA_TEXT.primary,
            "placeholder:text-slate-400",
          )}
        />
        <button
          type="button"
          onClick={handleSubmit}
          disabled={disabled || !value.trim()}
          className={clsx(
            "shrink-0 rounded-full p-2.5 transition-all",
            "bg-gradient-to-r from-cyan-400 to-teal-400 text-slate-950",
            "hover:brightness-110 hover:scale-105 active:scale-95",
            "disabled:opacity-40 disabled:hover:scale-100",
          )}
          style={{
            boxShadow: `0 4px 24px -4px ${accentColor}50, 0 0 20px rgba(34,211,238,0.25)`,
          }}
          title="Enviar"
        >
          <Send size={18} />
        </button>
      </motion.div>
    </div>
  );
}
