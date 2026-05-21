import { Download, Eye } from "lucide-react";
import { clsx } from "clsx";
import { luminaPrimaryButtonClass } from "../chat/luminaChatPalette";

interface ResultActionButtonsProps {
  onView: () => void;
  onDownload: () => void;
  downloadDisabled?: boolean;
  layout?: "row" | "stack";
  className?: string;
}

export function ResultActionButtons({
  onView,
  onDownload,
  downloadDisabled = false,
  layout = "stack",
  className,
}: ResultActionButtonsProps) {
  return (
    <div
      className={clsx(
        "gap-2",
        layout === "row" ? "flex flex-row" : "flex flex-col",
        className,
      )}
    >
      <button
        type="button"
        onClick={onView}
        className={clsx(
          "flex-1 inline-flex items-center justify-center gap-1.5 rounded-xl py-2.5 text-xs font-bold transition-all",
          luminaPrimaryButtonClass,
          "text-slate-950 hover:brightness-110",
        )}
      >
        <Eye size={14} /> Ver resultado
      </button>
      <button
        type="button"
        onClick={onDownload}
        disabled={downloadDisabled}
        className={clsx(
          "flex-1 inline-flex items-center justify-center gap-1.5 rounded-xl py-2.5 text-xs font-bold border transition-all",
          downloadDisabled
            ? "border-white/10 bg-white/[0.03] text-slate-500 cursor-not-allowed opacity-60"
            : "border-cyan-400/20 bg-cyan-400/10 text-cyan-200 hover:bg-cyan-400/15 hover:border-cyan-400/30",
        )}
      >
        <Download size={14} /> Descargar
      </button>
    </div>
  );
}
