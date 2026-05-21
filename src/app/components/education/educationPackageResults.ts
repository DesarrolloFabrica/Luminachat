import type { LucideIcon } from "lucide-react";
import {
  BookOpen,
  Image,
  Clapperboard,
  Newspaper,
  NotebookPen,
  MousePointerClick,
} from "lucide-react";

export type GenerationStatus = "idle" | "generating" | "generated";

export type ResultType = "pdf" | "video" | "interactive" | "placeholder" | "presentation";

/** Revista interactiva — Adobe Publish Online */
export const ADOBE_REVISTA_INTERACTIVA_URL =
  "https://indd.adobe.com/view/8f7a1b8d-63f8-4410-88c4-500eb7b0fc77";

export interface EducationalPackage {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
  resultType: ResultType;
  fileUrl?: string;
  downloadName?: string;
  downloadDisabled?: boolean;
  placeholderMessage?: string;
  interactiveIframeSrc?: string;
  /** true = iframe a dominio externo (Adobe, etc.) */
  interactiveExternal?: boolean;
}

const MOCK_BASE = "/mock-results";

export const EDUCATIONAL_PACKAGES: EducationalPackage[] = [
  {
    id: "glosario",
    title: "GLOSARIO",
    description:
      "Listado organizado de conceptos clave con definiciones claras y aplicables.",
    icon: BookOpen,
    resultType: "pdf",
    fileUrl: `${MOCK_BASE}/glosario.pdf`,
    downloadName: "infografia-glosario.pdf",
  },
  {
    id: "infografia",
    title: "INFOGRAFIA",
    description:
      "Recurso visual estático para sintetizar ideas principales del documento.",
    icon: Image,
    resultType: "pdf",
    fileUrl: `${MOCK_BASE}/infografia-ingenieria-electronica.pdf`,
    downloadName: "INFOGRAFIA_INGENIERIA_ELECTRONICA.pdf",
  },
  {
    id: "infografia-movimiento",
    title: "INFOGRAFIA CON MOVIMIENTO",
    description:
      "Versión animada de la infografía para explicar conceptos de forma dinámica.",
    icon: Clapperboard,
    resultType: "video",
    fileUrl: `${MOCK_BASE}/infografia-ingenieria-electronica.mp4`,
    downloadName: "INFOGRAFIA_INGENIERIA_ELECTRONICA.mp4",
  },
  {
    id: "revista",
    title: "REVISTA",
    description:
      "Documento editorial estructurado con secciones, títulos y contenido académico.",
    icon: Newspaper,
    resultType: "pdf",
    fileUrl: `${MOCK_BASE}/revista-ingenieria-electronica-estatica.pdf`,
    downloadName: "Revista-Ingenieria-electronica-ESTATICA.pdf",
  },
  {
    id: "revista-notebook",
    title: "REVISTA CON NOTEBOOK",
    description:
      "Técnica profesional en procesos de programación — revista con espacios de trabajo y notas guiadas.",
    icon: NotebookPen,
    resultType: "presentation",
    fileUrl: `${MOCK_BASE}/revista-notebook-tecnica-profesional.pdf`,
    downloadName: "Tecnica-Profesional-Programacion-Software.pdf",
  },
  {
    id: "revista-interactiva",
    title: "REVISTA INTERACTIVA",
    description:
      "Experiencia digital con navegación, interacción y contenido multimedia.",
    icon: MousePointerClick,
    resultType: "interactive",
    interactiveIframeSrc: ADOBE_REVISTA_INTERACTIVA_URL,
    interactiveExternal: true,
    downloadDisabled: true,
  },
];

/** Dispara descarga del archivo mock */
export function downloadPackageFile(pkg: EducationalPackage) {
  if (pkg.downloadDisabled || !pkg.fileUrl || !pkg.downloadName) return;
  const anchor = document.createElement("a");
  anchor.href = pkg.fileUrl;
  anchor.download = pkg.downloadName;
  anchor.rel = "noopener";
  document.body.appendChild(anchor);
  anchor.click();
  document.body.removeChild(anchor);
}
