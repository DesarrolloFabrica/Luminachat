import { useState, useCallback, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  FileText,
  FileType,
  ClipboardPaste,
  LayoutTemplate,
  Upload,
  CheckCircle2,
} from "lucide-react";
import { clsx } from "clsx";
import { DocumentUploadCard } from "./DocumentUploadCard";
import { DocumentTypeGrid } from "./DocumentTypeGrid";
import { MOCK_ANALYSIS } from "./educationMock";
import {
  FILE_INPUT_ACCEPT,
  FILE_VALIDATION_MESSAGES,
  formatFileSize,
  getFileTypeLabel,
  isAllowedFile,
} from "./educationFileUtils";
import { LuminaChatShell, LuminaChatScrollArea } from "../chat/LuminaChatShell";
import { LuminaChatHeader } from "../chat/LuminaChatHeader";
import { LuminaMessage } from "../chat/LuminaMessage";
import { LuminaThinkingState } from "../chat/LuminaThinkingState";
import { LuminaInput } from "../chat/LuminaInput";
import { messageLine } from "../chat/chatMotion";

export type FlowStep = "welcome" | "upload" | "analysis" | "result";

interface ChatLine {
  id: string;
  role: "user" | "assistant";
  content: string;
}

interface EducationalDocumentFlowProps {
  schoolName: string;
  accentColor: string;
  onBack?: () => void;
  onWelcome?: () => void;
  onBotTyping?: (typing: boolean) => void;
}

export function EducationalDocumentFlow({
  schoolName,
  accentColor,
  onBack,
  onWelcome,
  onBotTyping,
}: EducationalDocumentFlowProps) {
  const [step, setStep] = useState<FlowStep>("welcome");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [fileError, setFileError] = useState<string | null>(null);
  const [isDragOver, setIsDragOver] = useState(false);
  const [chatLines, setChatLines] = useState<ChatLine[]>([]);
  const [isReplying, setIsReplying] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const fileLoaded = selectedFile !== null;

  const documentAnalysisMode =
    step === "analysis" || (fileLoaded && step === "upload");

  const goToUpload = useCallback(() => {
    setStep("upload");
    setSelectedFile(null);
    setFileError(null);
    setChatLines((prev) => [
      ...prev,
      {
        id: `u-${Date.now()}`,
        role: "user",
        content: "Quiero subir un documento académico.",
      },
    ]);
  }, []);

  const handleUploadClick = useCallback(() => {
    setFileError(null);
    fileInputRef.current?.click();
  }, []);

  const applyFile = useCallback((file: File) => {
    setFileError(null);
    setSelectedFile(file);
    setChatLines((prev) => [
      ...prev,
      {
        id: `u-file-${Date.now()}`,
        role: "user",
        content: `Documento cargado: ${file.name} (${formatFileSize(file.size)}, ${getFileTypeLabel(file)})`,
      },
    ]);
    window.setTimeout(() => setStep("analysis"), 450);
  }, []);

  const handleFileChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0] ?? null;
      event.target.value = "";
      if (!file) return;
      if (!isAllowedFile(file)) {
        setFileError(FILE_VALIDATION_MESSAGES.invalidFormat);
        setSelectedFile(null);
        return;
      }
      applyFile(file);
    },
    [applyFile],
  );

  const handleDropFile = useCallback(
    (file: File | null) => {
      if (!file) return;
      if (!isAllowedFile(file)) {
        setFileError(FILE_VALIDATION_MESSAGES.invalidFormat);
        return;
      }
      applyFile(file);
    },
    [applyFile],
  );

  const finishAnalysis = useCallback(() => {
    setStep("result");
    setChatLines((prev) => [
      ...prev,
      {
        id: `a-result-${Date.now()}`,
        role: "assistant",
        content:
          "Análisis completado. Ya puedes generar los paquetes educativos disponibles.",
      },
    ]);
  }, []);

  const resetFlow = useCallback(() => {
    setStep("welcome");
    setSelectedFile(null);
    setFileError(null);
    setChatLines([]);
  }, []);

  const handleAnalyzeClick = useCallback(() => {
    if (!selectedFile) {
      setFileError(FILE_VALIDATION_MESSAGES.noFile);
      return;
    }
    setStep("analysis");
  }, [selectedFile]);

  const handleChatSend = useCallback(
    (text: string) => {
      setChatLines((prev) => [...prev, { id: `u-${Date.now()}`, role: "user", content: text }]);
      setIsReplying(true);
      onBotTyping?.(true);
      window.setTimeout(() => {
        setIsReplying(false);
        onBotTyping?.(false);
        setChatLines((prev) => [
          ...prev,
          {
            id: `a-${Date.now()}`,
            role: "assistant",
            content:
              "Recibido. Puedes cargar un PDF, DOCX o TXT con el botón de adjuntar para iniciar el flujo de generación de paquetes educativos.",
          },
        ]);
      }, 1400);
    },
    [onBotTyping],
  );

  const inputDisabled = step === "analysis";

  return (
    <LuminaChatShell
      accentColor={accentColor}
      documentAnalysisMode={documentAnalysisMode}
      documentName={selectedFile?.name}
      className="h-full"
    >
      <LuminaChatHeader
        schoolName={schoolName}
        accentColor={accentColor}
        onBack={onBack}
        isProcessing={step === "analysis" || isReplying}
        modeLabel={step === "result" ? "IA ACTIVA" : "MODO SIMULADO"}
      />

      <LuminaChatScrollArea>
        <AnimatePresence mode="popLayout">
          {chatLines.map((line) => (
            <LuminaMessage key={line.id} role={line.role} accentColor={accentColor}>
              {line.content}
            </LuminaMessage>
          ))}
        </AnimatePresence>

        <AnimatePresence mode="wait">
          {step === "welcome" && (
            <motion.div
              key="welcome"
              initial={{ opacity: 0, filter: "blur(8px)" }}
              animate={{ opacity: 1, filter: "blur(0px)" }}
              exit={{ opacity: 0, filter: "blur(6px)" }}
              transition={{ duration: 0.45 }}
              className="space-y-5"
            >
              <LuminaMessage role="assistant" accentColor={accentColor} staggerContent>
                <motion.p variants={messageLine}>
                  Hola, soy <strong className="text-white">LUMINA</strong>. Estoy lista para
                  ayudarte a generar documentos educativos para{" "}
                  <span style={{ color: accentColor }}>{schoolName}</span>.
                </motion.p>
                <motion.p variants={messageLine} className="text-slate-400">
                  Carga un documento académico o elige una opción de entrada para comenzar.
                </motion.p>
              </LuminaMessage>

              <p className="text-xs font-semibold uppercase tracking-widest text-slate-500 pl-12">
                Opciones de entrada
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pl-0 md:pl-12">
                <DocumentUploadCard
                  icon={FileText}
                  label="Cargar PDF"
                  description="Syllabus, guía o lectura en PDF"
                  accentColor={accentColor}
                  onClick={goToUpload}
                  delay={0.1}
                />
                <DocumentUploadCard
                  icon={FileType}
                  label="Cargar Word"
                  description="DOCX con contenido del módulo"
                  accentColor={accentColor}
                  onClick={goToUpload}
                  delay={0.18}
                />
                <DocumentUploadCard
                  icon={ClipboardPaste}
                  label="Pegar contenido"
                  description="Texto académico desde portapapeles"
                  accentColor={accentColor}
                  onClick={goToUpload}
                  delay={0.26}
                />
                <DocumentUploadCard
                  icon={LayoutTemplate}
                  label="Subir documento"
                  description="Abrir explorador de archivos"
                  accentColor={accentColor}
                  onClick={() => {
                    onWelcome?.();
                    goToUpload();
                    handleUploadClick();
                  }}
                  delay={0.34}
                />
              </div>
            </motion.div>
          )}

          {step === "upload" && (
            <motion.div
              key="upload"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              className="space-y-4"
            >
              <LuminaMessage role="assistant" accentColor={accentColor}>
                Arrastra tu archivo o usa el botón para abrir el explorador. Formatos: PDF, DOCX
                o TXT.
              </LuminaMessage>

              <div className="md:pl-12">
                <button
                  type="button"
                  onClick={resetFlow}
                  className="mb-4 text-xs text-slate-400 hover:text-cyan-300 transition-colors"
                >
                  ← Volver al inicio
                </button>

                <input
                  ref={fileInputRef}
                  type="file"
                  accept={FILE_INPUT_ACCEPT}
                  className="hidden"
                  onChange={handleFileChange}
                />

                <motion.div
                  onDragOver={(e) => {
                    e.preventDefault();
                    setIsDragOver(true);
                  }}
                  onDragLeave={() => setIsDragOver(false)}
                  onDrop={(e) => {
                    e.preventDefault();
                    setIsDragOver(false);
                    handleDropFile(e.dataTransfer.files?.[0] ?? null);
                  }}
                  animate={{
                    scale: isDragOver ? 1.02 : 1,
                    borderColor: isDragOver
                      ? "rgba(34,211,238,0.45)"
                      : "rgba(34,211,238,0.15)",
                  }}
                  className={clsx(
                    "relative rounded-[2rem] border-2 border-dashed p-10 md:p-12 text-center backdrop-blur-[24px]",
                    isDragOver ? "bg-cyan-400/10" : "bg-white/[0.04]",
                  )}
                  style={{
                    boxShadow: isDragOver
                      ? "0 0 48px rgba(34,211,238,0.12)"
                      : "0 0 32px rgba(34,211,238,0.04)",
                  }}
                >
                  <motion.div
                    animate={{ y: [0, -6, 0] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl border border-cyan-400/20 bg-cyan-400/10"
                    style={{ boxShadow: "0 0 28px rgba(34,211,238,0.15)" }}
                  >
                    <Upload size={28} className="text-cyan-400" />
                  </motion.div>
                  <h3 className="text-lg font-bold text-white mb-2">
                    Arrastra tu documento aquí
                  </h3>
                  <p className="text-sm text-slate-400 mb-6">PDF, DOCX o TXT</p>
                  <button
                    type="button"
                    onClick={handleUploadClick}
                    className="rounded-xl px-6 py-3 text-sm font-bold text-slate-950 bg-gradient-to-r from-cyan-400 to-teal-400 shadow-lg transition-all hover:brightness-110 hover:scale-[1.03] active:scale-[0.98] hover:shadow-[0_0_32px_rgba(34,211,238,0.3)]"
                  >
                    Subir PDF
                  </button>
                </motion.div>

                {fileError && (
                  <p className="mt-4 text-sm text-amber-300/90">{fileError}</p>
                )}

                <AnimatePresence>
                  {fileLoaded && selectedFile && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.92, y: 12 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      className="mt-6 flex items-center gap-3 rounded-2xl border border-teal-400/25 bg-teal-400/10 p-4 backdrop-blur-[24px]"
                      style={{ boxShadow: "0 0 32px rgba(20,184,166,0.1)" }}
                    >
                      <CheckCircle2 className="text-teal-400 shrink-0" size={22} />
                      <div className="text-left min-w-0 flex-1">
                        <p className="text-sm font-bold text-white truncate">
                          {selectedFile.name}
                        </p>
                        <p className="text-xs text-slate-400">
                          {formatFileSize(selectedFile.size)} ·{" "}
                          {getFileTypeLabel(selectedFile)} · Documento cargado correctamente
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={handleAnalyzeClick}
                        className="shrink-0 rounded-xl px-4 py-2 text-xs font-bold text-slate-950 bg-gradient-to-r from-cyan-400 to-teal-400 hover:brightness-110 transition-all"
                      >
                        Analizar
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          )}

          {step === "analysis" && (
            <motion.div
              key="analysis"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-4"
            >
              <LuminaThinkingState accentColor={accentColor} />
              <AnalysisProgressBridge onComplete={finishAnalysis} />
            </motion.div>
          )}

          {step === "result" && (
            <motion.div
              key="result"
              initial={{ opacity: 0, filter: "blur(8px)" }}
              animate={{ opacity: 1, filter: "blur(0px)" }}
              exit={{ opacity: 0 }}
              className="space-y-6"
            >
              <LuminaMessage role="assistant" accentColor={accentColor} staggerContent>
                <motion.p variants={messageLine}>
                  <strong className="text-white">Análisis completado</strong> — basado en{" "}
                  {selectedFile?.name ?? "tu documento"}.
                </motion.p>
              </LuminaMessage>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="rounded-[1.75rem] border border-cyan-400/10 bg-gradient-to-b from-white/[0.06] to-white/[0.03] p-6 backdrop-blur-[24px] grid grid-cols-1 md:grid-cols-2 gap-6 md:ml-12"
                style={{ boxShadow: "0 0 48px rgba(34,211,238,0.06)" }}
              >
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-2">
                    Tema principal
                  </p>
                  <p className="text-lg font-semibold text-white">{MOCK_ANALYSIS.mainTopic}</p>
                </div>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-2">
                    Temas detectados
                  </p>
                  <ol className="space-y-1.5">
                    {MOCK_ANALYSIS.topics.map((t, i) => (
                      <li key={t} className="text-sm text-slate-300 flex gap-2">
                        <span style={{ color: accentColor }}>{i + 1}.</span> {t}
                      </li>
                    ))}
                  </ol>
                </div>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-2">
                    Competencias
                  </p>
                  <ul className="flex flex-wrap gap-2">
                    {MOCK_ANALYSIS.competencies.map((c) => (
                      <li
                        key={c}
                        className="rounded-full border border-cyan-400/15 bg-cyan-400/5 px-3 py-1 text-xs text-slate-300"
                      >
                        {c}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-2">
                    Resultados de aprendizaje
                  </p>
                  <ul className="space-y-1.5">
                    {MOCK_ANALYSIS.learningOutcomes.map((o) => (
                      <li key={o} className="text-sm text-slate-300 flex gap-2">
                        <span className="text-slate-500">•</span> {o}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>

              <div className="md:pl-12">
                <button
                  type="button"
                  onClick={resetFlow}
                  className="mb-4 text-xs font-semibold uppercase tracking-wider text-white/40 hover:text-white/70"
                >
                  Nuevo documento
                </button>
                <DocumentTypeGrid accentColor={accentColor} />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {isReplying && <LuminaThinkingState accentColor={accentColor} />}
      </LuminaChatScrollArea>

      <LuminaInput
        accentColor={accentColor}
        onSend={handleChatSend}
        onUploadClick={() => {
          if (step === "welcome") goToUpload();
          handleUploadClick();
        }}
        disabled={inputDisabled}
      />
    </LuminaChatShell>
  );
}

/** Dispara onComplete tras duración del análisis simulado */
function AnalysisProgressBridge({
  onComplete,
  durationMs = 7500,
}: {
  onComplete: () => void;
  durationMs?: number;
}) {
  useEffect(() => {
    const t = window.setTimeout(onComplete, durationMs);
    return () => window.clearTimeout(t);
  }, [onComplete, durationMs]);
  return null;
}
