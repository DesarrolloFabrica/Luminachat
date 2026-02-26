export type SectionKey =
  | "Normatividad institucional"
  | "Normatividad Académica"
  | "Términos y condiciones"
  | "Reglamento de bienestar";

export const PDF_PATH_BY_SECTION: Record<SectionKey, string> = {
  "Normatividad institucional": "/assets/pdfs/normatividad_institucional.pdf",
  "Normatividad Académica": "/assets/pdfs/normatividad_academica.pdf",
  "Términos y condiciones": "/assets/pdfs/terminos_y_condiciones.pdf",
  "Reglamento de bienestar": "/assets/pdfs/reglamento_bienestar.pdf",
};