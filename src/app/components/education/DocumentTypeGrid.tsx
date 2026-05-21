import { useState } from "react";
import { EDUCATIONAL_PACKAGES } from "./educationPackageResults";
import { GeneratedDocumentCard } from "./GeneratedDocumentCard";
import { GeneratedResultViewer } from "../results/GeneratedResultViewer";
import type { EducationalPackage } from "./educationPackageResults";

interface DocumentTypeGridProps {
  accentColor: string;
}

export function DocumentTypeGrid({ accentColor }: DocumentTypeGridProps) {
  const [viewerPackage, setViewerPackage] = useState<EducationalPackage | null>(null);

  return (
    <div>
      <h3 className="text-sm font-bold text-white mb-1 tracking-tight">
        Documentos disponibles para generar
      </h3>
      <p className="text-xs text-slate-400 mb-4">
        Paquetes educativos según el análisis del documento
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
        {EDUCATIONAL_PACKAGES.map((pkg, i) => (
          <GeneratedDocumentCard
            key={pkg.id}
            package={pkg}
            accentColor={accentColor}
            delay={0.08 * i}
            enabled
            variant="dark"
            onViewResult={setViewerPackage}
          />
        ))}
      </div>

      <GeneratedResultViewer
        open={viewerPackage !== null}
        package={viewerPackage}
        accentColor={accentColor}
        onClose={() => setViewerPackage(null)}
      />
    </div>
  );
}

export { EDUCATIONAL_PACKAGES as DOCUMENT_TYPES };
