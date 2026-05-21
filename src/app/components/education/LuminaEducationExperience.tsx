import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import type { SchoolTheme } from "../../data/schoolThemes";
import { UploadDocumentStep } from "./UploadDocumentStep";
import { AnalysisStep } from "./AnalysisStep";
import { DocumentGenerationGrid } from "./DocumentGenerationGrid";
import {
  isAllowedFile,
  FILE_VALIDATION_MESSAGES,
} from "./educationFileUtils";

type Phase = "upload" | "analyzing" | "generate";

interface LuminaEducationExperienceProps {
  theme: SchoolTheme;
}

export function LuminaEducationExperience({ theme }: LuminaEducationExperienceProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [fileError, setFileError] = useState<string | null>(null);
  const [phase, setPhase] = useState<Phase>("upload");
  const [analysisDone, setAnalysisDone] = useState(false);

  const fileLoaded = selectedFile !== null;

  const handleFileSelect = useCallback((file: File | null) => {
    setFileError(null);
    if (!file) {
      setSelectedFile(null);
      return;
    }
    if (!isAllowedFile(file)) {
      setFileError(FILE_VALIDATION_MESSAGES.invalidFormat);
      setSelectedFile(null);
      return;
    }
    setSelectedFile(file);
    setPhase("upload");
    setAnalysisDone(false);
  }, []);

  const handleAnalyze = useCallback(() => {
    if (!selectedFile) {
      setFileError(FILE_VALIDATION_MESSAGES.noFile);
      return;
    }
    setFileError(null);
    setPhase("analyzing");
    setAnalysisDone(false);
  }, [selectedFile]);

  const handleAnalysisComplete = useCallback(() => {
    setAnalysisDone(true);
    setPhase("generate");
  }, []);

  const uploadComplete = analysisDone || phase !== "upload";
  const step2Active = phase === "analyzing" || analysisDone;
  const step3Active = phase === "generate" && analysisDone;

  return (
    <AnimatePresence mode="wait">
      <motion.section
        key={theme.id}
        id="lumina-education-experience"
        initial={{ opacity: 0, filter: "blur(10px)", y: 16 }}
        animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
        exit={{ opacity: 0, filter: "blur(8px)", y: -12 }}
        transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
        className="mt-12 md:mt-16"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.08 }}
          className="mb-8 text-center md:text-left"
        >
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 tracking-tight">
            Crea documentos educativos con LUMINA
          </h2>
          <p className="mt-2 text-sm text-slate-600 max-w-2xl mx-auto md:mx-0">
            {theme.flowContext}
          </p>
          <p
            className="mt-2 text-xs font-medium max-w-2xl mx-auto md:mx-0"
            style={{ color: theme.accentColor }}
          >
            {theme.assistantContext}
          </p>
        </motion.div>

        <div
          className="rounded-[2rem] border bg-white/50 p-4 md:p-6 lg:p-8 backdrop-blur-2xl shadow-xl space-y-4 md:space-y-5 transition-colors duration-500"
          style={{
            borderColor: theme.floatingCardBorder,
            boxShadow: `0 24px 64px -24px ${theme.glowColor}, inset 0 1px 0 rgba(255,255,255,0.9)`,
          }}
        >
          <UploadDocumentStep
            accentColor={theme.accentColor}
            selectedFile={selectedFile}
            fileError={fileError}
            isActive={phase === "upload" && !analysisDone}
            isComplete={uploadComplete && fileLoaded}
            onFileSelect={handleFileSelect}
            onAnalyze={handleAnalyze}
            onClearError={() => setFileError(null)}
          />

          <AnalysisStep
            accentColor={theme.accentColor}
            analyzingLabel={theme.analyzingPrefix}
            isActive={step2Active}
            isComplete={analysisDone}
            onComplete={handleAnalysisComplete}
          />

          <DocumentGenerationGrid
            accentColor={theme.accentColor}
            enabled={analysisDone}
            isActive={step3Active}
            isComplete={step3Active}
          />
        </div>
      </motion.section>
    </AnimatePresence>
  );
}
