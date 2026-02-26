import { PDF_PATH_BY_SECTION, type SectionKey } from "./pdfMap";
import { pdfToText } from "./pdfText";

const cache = new Map<SectionKey, string>();

export async function getSectionText(section: SectionKey) {
  const cached = cache.get(section);
  if (cached) return cached;

  const url = PDF_PATH_BY_SECTION[section];
  const text = await pdfToText(url);
  cache.set(section, text);
  return text;
}