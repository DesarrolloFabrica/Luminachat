/** Datos simulados — reemplazar con lectura real de PDF + análisis IA */

export const MOCK_ANALYSIS = {
  mainTopic: "Contenido académico base detectado",
  topics: [
    "Conceptos clave del documento",
    "Estructura temática",
    "Recursos visuales sugeridos",
    "Actividades de apropiación",
    "Productos educativos derivados",
  ],
  competencies: [
    "Comprensión conceptual",
    "Síntesis de información",
    "Comunicación visual",
    "Producción académica",
  ],
  learningOutcomes: [
    "Identifica conceptos principales del documento",
    "Organiza información en formatos educativos",
    "Transforma contenido académico en recursos visuales",
    "Prepara materiales de apoyo para aprendizaje",
  ],
};

export const ANALYSIS_MESSAGES = [
  "Leyendo documento…",
  "Detectando estructura académica…",
  "Identificando temas principales…",
  "Preparando paquetes educativos…",
  "Organizando recursos generables…",
] as const;

export {
  EDUCATIONAL_PACKAGES as DRIVE_PACKAGES,
  EDUCATIONAL_PACKAGES as DOCUMENT_TYPES,
  type EducationalPackage as DrivePackageItem,
  type GenerationStatus,
  type ResultType,
} from "./educationPackageResults";
