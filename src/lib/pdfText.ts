import * as pdfjsLib from "pdfjs-dist";

// En algunos setups necesitas worker. Si te da error, te digo cómo ajustarlo.
(pdfjsLib as any).GlobalWorkerOptions.workerSrc =
  `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/4.10.38/pdf.worker.min.mjs`;

export async function pdfToText(pdfUrl: string) {
  const loadingTask = (pdfjsLib as any).getDocument(pdfUrl);
  const pdf = await loadingTask.promise;

  let full = "";
  for (let i = 1; i <= pdf.numPages; i++) {
    const page = await pdf.getPage(i);
    const content = await page.getTextContent();
    const strings = content.items.map((it: any) => it.str);
    full += `\n\n--- PAGE ${i} ---\n` + strings.join(" ");
  }
  return full;
}