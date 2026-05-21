import { useState } from "react";
import { motion } from "motion/react";
import { clsx } from "clsx";
import { EDUCATIONAL_PACKAGES } from "./educationPackageResults";
import type { EducationalPackage } from "./educationPackageResults";
import { GeneratedDocumentCard } from "./GeneratedDocumentCard";
import { GeneratedResultViewer } from "../results/GeneratedResultViewer";

interface DocumentGenerationGridProps {
  accentColor: string;
  enabled: boolean;
  isActive: boolean;
  isComplete: boolean;
}

export function DocumentGenerationGrid({
  accentColor,
  enabled,
  isActive,
  isComplete,
}: DocumentGenerationGridProps) {
  const [viewerPackage, setViewerPackage] = useState<EducationalPackage | null>(null);

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: isActive || isComplete ? 1 : 0.5, y: 0 }}
        className={clsx(
          "rounded-2xl border p-5 md:p-6 transition-colors",
          isActive
            ? "border-white/80 bg-white/70 shadow-lg"
            : "border-white/50 bg-white/40",
        )}
        style={
          isActive ? { boxShadow: `0 12px 40px -16px ${accentColor}35` } : undefined
        }
      >
        <div className="flex items-center gap-3 mb-2">
          <span
            className="flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold text-white"
            style={{ backgroundColor: isComplete ? "#10b981" : accentColor }}
          >
            {isComplete ? "✓" : "3"}
          </span>
          <h3 className="text-base font-bold text-slate-900">
            Documentos disponibles para generar
          </h3>
        </div>
        <p className="text-xs text-slate-500 mb-5 ml-11">
          Paquetes educativos listos según el análisis del documento
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
          {EDUCATIONAL_PACKAGES.map((pkg, i) => (
            <GeneratedDocumentCard
              key={pkg.id}
              package={pkg}
              accentColor={accentColor}
              delay={enabled ? 0.08 * i : 0}
              enabled={enabled}
              variant="light"
              onViewResult={setViewerPackage}
            />
          ))}
        </div>
      </motion.div>

      <GeneratedResultViewer
        open={viewerPackage !== null}
        package={viewerPackage}
        accentColor={accentColor}
        onClose={() => setViewerPackage(null)}
      />
    </>
  );
}
