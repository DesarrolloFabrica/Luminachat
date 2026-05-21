const ALLOWED_EXTENSIONS = [".pdf", ".docx", ".txt"] as const;

const ALLOWED_MIME_TYPES = [
  "application/pdf",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "text/plain",
] as const;

export function formatFileSize(bytes: number): string {
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
}

export function getFileTypeLabel(file: File): string {
  const ext = file.name.split(".").pop()?.toLowerCase() ?? "";
  if (ext === "pdf") return "PDF";
  if (ext === "docx") return "DOCX";
  if (ext === "txt") return "TXT";
  if (file.type === "application/pdf") return "PDF";
  if (
    file.type ===
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
  ) {
    return "DOCX";
  }
  if (file.type === "text/plain") return "TXT";
  return ext.toUpperCase() || "Archivo";
}

export function isAllowedFile(file: File): boolean {
  const name = file.name.toLowerCase();
  const hasAllowedExt = ALLOWED_EXTENSIONS.some((ext) => name.endsWith(ext));
  if (hasAllowedExt) return true;
  if (file.type === "") return false;
  return (ALLOWED_MIME_TYPES as readonly string[]).includes(file.type);
}

export const FILE_INPUT_ACCEPT =
  ".pdf,.docx,.txt,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document,text/plain";

export const FILE_VALIDATION_MESSAGES = {
  noFile: "Primero sube un documento para iniciar el análisis.",
  invalidFormat: "Formato no permitido. Usa PDF, DOCX o TXT.",
} as const;
