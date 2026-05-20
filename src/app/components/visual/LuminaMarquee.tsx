import { useReducedMotion } from "../../hooks/useReducedMotion";

const MARQUEE_TEXT =
  "Campus Virtual • IA Académica • Normatividad • Bienestar • Escuelas • Gemini • CUN";

export function LuminaMarquee() {
  const reducedMotion = useReducedMotion();

  return (
    <div
      className="relative z-[5] w-full overflow-hidden py-6 md:py-8 select-none"
      aria-hidden
    >
      <div
        className={
          reducedMotion
            ? "flex justify-center"
            : "flex w-max animate-lumina-marquee"
        }
      >
        {[0, 1].map((copy) => (
          <span
            key={copy}
            className="shrink-0 px-8 text-xs md:text-sm font-semibold uppercase tracking-[0.35em] text-white/10 whitespace-nowrap"
          >
            {MARQUEE_TEXT}
            {reducedMotion ? null : " • "}
            {!reducedMotion && MARQUEE_TEXT}
          </span>
        ))}
      </div>
    </div>
  );
}
