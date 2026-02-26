// src/lib/answerUserQuestion.ts
import { AI_CONFIG } from "./api-config";
import type { SectionKey } from "./pdfMap";
import { PDF_PATH_BY_SECTION } from "./pdfMap";
import { askGemini } from "./askGemini";
import { pickRelevantChunks } from "./retrieval";

// Carga texto ya convertido (recomendado mientras no puedas instalar pdfjs-dist).
// Debes crear estos .txt en /public/assets/texts/ (o donde sirvas estáticos).
const TEXT_PATH_BY_SECTION: Record<SectionKey, string> = {
  "Normatividad institucional": "/assets/texts/normatividad_institucional.txt",
  "Normatividad Académica": "/assets/texts/normatividad_academica.txt",
  "Términos y condiciones": "/assets/texts/terminos_y_condiciones.txt",
  "Reglamento de bienestar": "/assets/texts/reglamento_bienestar.txt",
};

async function fetchText(url: string) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`No se pudo cargar: ${url}`);
  return await res.text();
}

export async function answerUserQuestion(section: SectionKey, question: string) {
  // 1) Cargar corpus (texto del “PDF”)
  const corpus = await fetchText(TEXT_PATH_BY_SECTION[section]);

  // 2) Recuperar fragmentos relevantes
  const chunks = pickRelevantChunks(corpus, question);

  if (chunks.length === 0) {
    return "No encuentro esa información en el documento seleccionado. ¿Quieres que lo busque en otra sección?";
  }

  // 3) Prompt final
  const finalPrompt = `
${AI_CONFIG.systemPrompt}

SECCIÓN: ${section}
DOCUMENTO: ${PDF_PATH_BY_SECTION[section]}

FRAGMENTOS (usa solo esto):
${chunks.map((c, i) => `--- CHUNK ${i + 1} ---\n${c}`).join("\n\n")}

PREGUNTA:
${question}

INSTRUCCIONES:
- Responde SOLO con base en los fragmentos.
- Si no es suficiente, dilo y sugiere cambiar de sección.
- Cierra con: "Fuente: ${section}".
`;

  // 4) Llamar IA
  return await askGemini(finalPrompt);
}