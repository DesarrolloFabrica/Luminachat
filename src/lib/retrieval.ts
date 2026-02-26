function normalize(s: string) {
  return s
    .toLowerCase()
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .replace(/[^\p{L}\p{N}\s]/gu, " ");
}

export function pickRelevantChunks(corpus: string, query: string, chunkSize = 1200) {
  const q = normalize(query);
  const keywords = q.split(/\s+/).filter((w) => w.length >= 4);

  const chunks: string[] = [];
  for (let i = 0; i < corpus.length; i += chunkSize) chunks.push(corpus.slice(i, i + chunkSize));

  const scored = chunks
    .map((c) => {
      const nc = normalize(c);
      let score = 0;
      for (const k of keywords) if (nc.includes(k)) score++;
      return { c, score };
    })
    .sort((a, b) => b.score - a.score);

  return scored.slice(0, 3).filter((x) => x.score > 0).map((x) => x.c);
}