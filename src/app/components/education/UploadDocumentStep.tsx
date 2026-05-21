import { useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { FileText, CheckCircle2, AlertCircle, Upload } from "lucide-react";
import { clsx } from "clsx";
import {
  FILE_INPUT_ACCEPT,
  FILE_VALIDATION_MESSAGES,
  formatFileSize,
  getFileTypeLabel,
} from "./educationFileUtils";

interface UploadDocumentStepProps {
  accentColor: string;
  selectedFile: File | null;
  fileError: string | null;
  isActive: boolean;
  isComplete: boolean;
  onFileSelect: (file: File | null) => void;
  onAnalyze: () => void;
  onClearError: () => void;
}

export function UploadDocumentStep({
  accentColor,
  selectedFile,
  fileError,
  isActive,
  isComplete,
  onFileSelect,
  onAnalyze,
  onClearError,
}: UploadDocumentStepProps) {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const fileLoaded = selectedFile !== null;

  const handleUploadClick = () => {
    onClearError();
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] ?? null;
    event.target.value = "";
    onFileSelect(file);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: isActive || isComplete ? 1 : 0.55, y: 0 }}
      className={clsx(
        "rounded-2xl border p-5 md:p-6 transition-colors",
        isActive
          ? "border-white/80 bg-white/70 shadow-lg"
          : "border-white/50 bg-white/40",
      )}
      style={
        isActive
          ? { boxShadow: `0 12px 40px -16px ${accentColor}35` }
          : undefined
      }
    >
      <input
        ref={fileInputRef}
        type="file"
        accept={FILE_INPUT_ACCEPT}
        className="hidden"
        onChange={handleFileChange}
        aria-hidden
      />

      <div className="flex items-center gap-3 mb-4">
        <span
          className="flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold text-white"
          style={{ backgroundColor: isComplete ? "#10b981" : accentColor }}
        >
          {isComplete ? "✓" : "1"}
        </span>
        <h3 className="text-base font-bold text-slate-900">Carga tu documento</h3>
      </div>

      <motion.div
        animate={isActive && !fileLoaded ? { scale: [1, 1.01, 1] } : undefined}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        className={clsx(
          "rounded-2xl border-2 border-dashed p-8 text-center transition-colors",
          fileLoaded ? "border-emerald-400/50 bg-emerald-50/50" : "border-slate-200 bg-slate-50/80",
        )}
      >
        <motion.div
          animate={{ y: [0, -4, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl border border-white bg-white shadow-sm"
        >
          <FileText size={28} style={{ color: accentColor }} />
        </motion.div>
        <p className="text-sm font-semibold text-slate-800 mb-1">Sube un PDF, DOCX o TXT</p>
        <p className="text-xs text-slate-500 mb-4">
          Selecciona un archivo desde tu equipo
        </p>
        <button
          type="button"
          onClick={handleUploadClick}
          className="inline-flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-bold text-white transition-transform hover:scale-[1.02] active:scale-[0.98]"
          style={{ backgroundColor: accentColor }}
        >
          <Upload size={16} />
          Subir PDF
        </button>
      </motion.div>

      <AnimatePresence>
        {fileError && (
          <motion.div
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            className="mt-4 flex items-start gap-2 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900"
          >
            <AlertCircle size={18} className="shrink-0 mt-0.5" />
            <p>{fileError}</p>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {fileLoaded && selectedFile && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="mt-4 rounded-xl border border-emerald-200 bg-emerald-50/80 px-4 py-4"
          >
            <div className="flex items-start gap-3">
              <CheckCircle2 className="text-emerald-600 shrink-0 mt-0.5" size={20} />
              <div className="min-w-0 flex-1 text-left">
                <p className="text-sm font-bold text-slate-800 truncate">
                  {selectedFile.name}
                </p>
                <div className="mt-2 grid grid-cols-2 gap-x-4 gap-y-1 text-xs text-slate-600">
                  <span>
                    <span className="font-semibold text-slate-700">Tamaño:</span>{" "}
                    {formatFileSize(selectedFile.size)}
                  </span>
                  <span>
                    <span className="font-semibold text-slate-700">Tipo:</span>{" "}
                    {getFileTypeLabel(selectedFile)}
                  </span>
                </div>
                <p className="mt-2 text-xs font-semibold text-emerald-700">
                  Documento cargado correctamente
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={handleUploadClick}
              className="mt-3 text-xs font-semibold underline-offset-2 hover:underline"
              style={{ color: accentColor }}
            >
              Cambiar archivo
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        type="button"
        onClick={onAnalyze}
        disabled={!fileLoaded}
        className="mt-4 w-full rounded-xl py-3 text-sm font-bold text-white transition-all disabled:opacity-40 disabled:cursor-not-allowed hover:enabled:scale-[1.01]"
        style={{ backgroundColor: accentColor }}
      >
        Analizar documento
      </button>
      {/* TODO: lectura real de PDF */}
    </motion.div>
  );
}
