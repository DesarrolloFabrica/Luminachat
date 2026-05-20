import { motion } from "motion/react";
import { fadeBlurUp, staggerContainer } from "../../lib/motionVariants";
import { useReducedMotion } from "../../hooks/useReducedMotion";

const WORDS_LINE1 = ["Bienvenido/a"];
const WORDS_LINE2 = ["a", "LUMINA"];

function KineticWord({
  children,
  className,
  gradient,
}: {
  children: string;
  className?: string;
  gradient?: boolean;
}) {
  return (
    <motion.span
      variants={fadeBlurUp}
      className={className}
      style={{ display: "inline-block" }}
    >
      {gradient ? (
        <span className="animate-lumina-gradient text-transparent bg-clip-text bg-gradient-to-r from-[#60a5fa] via-[#a78bfa] via-[#14b8a6] to-white bg-[length:200%_200%]">
          {children}
        </span>
      ) : (
        children
      )}
    </motion.span>
  );
}

export function KineticTitle() {
  const reducedMotion = useReducedMotion();

  if (reducedMotion) {
    return (
      <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight leading-[1.1]">
        Bienvenido/a <br />
        <span className="animate-lumina-gradient text-transparent bg-clip-text bg-gradient-to-r from-[#60a5fa] via-[#a78bfa] to-[#14b8a6]">
          a LUMINA
        </span>
      </h1>
    );
  }

  return (
    <motion.h1
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
      className="text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight leading-[1.15]"
    >
      <span className="block">
        {WORDS_LINE1.map((word) => (
          <KineticWord key={word} className="mr-[0.2em]">
            {word}
          </KineticWord>
        ))}
      </span>
      <span className="block mt-1">
        {WORDS_LINE2.map((word, i) => (
          <KineticWord
            key={word}
            className={i === 0 ? "mr-[0.25em] text-white/95" : undefined}
            gradient={word === "LUMINA"}
          >
            {word}
          </KineticWord>
        ))}
      </span>
    </motion.h1>
  );
}
