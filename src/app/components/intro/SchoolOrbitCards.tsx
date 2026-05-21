import type { ReactNode } from "react";
import { motion, AnimatePresence } from "motion/react";
import type { School } from "../../../lib/schools";
import { SpatialCard } from "./SpatialCard";
import { MainHeroContent } from "./MainHeroContent";
import { LuminaCoreAnimation } from "../visual/LuminaCoreAnimation";
import { cardFloat, heroCardEntrance } from "../../lib/motionVariants";
import { useReducedMotion } from "../../hooks/useReducedMotion";
import type { ParallaxOffset } from "../../hooks/useMouseParallax";

export type IntroSlide =
  | { kind: "hero" }
  | { kind: "school"; school: School; schoolIndex: number };

interface SchoolOrbitCardsProps {
  slides: IntroSlide[];
  activeIndex: number;
  direction: number;
  onSelectIndex: (index: number) => void;
  onStartClick?: () => void;
  onViewSchoolsClick?: () => void;
  parallax?: ParallaxOffset;
  isTransitioning?: boolean;
}

/** Tarjeta + núcleo Lottie se desplazan juntos */
const slideVariants = {
  enter: (dir: number) => ({
    x: dir > 0 ? 140 : -140,
    opacity: 0,
    scale: 0.9,
    rotateY: dir > 0 ? -10 : 10,
    filter: "blur(6px)",
  }),
  center: {
    x: 0,
    opacity: 1,
    scale: 1,
    rotateY: 0,
    filter: "blur(0px)",
  },
  exit: (dir: number) => ({
    x: dir > 0 ? -140 : 140,
    opacity: 0,
    scale: 0.9,
    rotateY: dir > 0 ? 10 : -10,
    filter: "blur(6px)",
  }),
};

function wrapIndex(i: number, len: number) {
  return ((i % len) + len) % len;
}

function FloatingSideCard({
  children,
  side,
  accentColor,
  floatDuration,
  floatDelay,
  parallax,
}: {
  children: ReactNode;
  side: "left" | "right";
  accentColor: string;
  floatDuration: number;
  floatDelay: number;
  parallax: ParallaxOffset;
}) {
  const reducedMotion = useReducedMotion();
  const px = reducedMotion ? 0 : parallax.x * 16;
  const py = reducedMotion ? 0 : parallax.y * 10;
  const hoverX = side === "left" ? 10 : -10;

  return (
    <motion.div
      style={{ x: px, y: py }}
      variants={reducedMotion ? undefined : cardFloat(floatDuration, floatDelay)}
      animate={reducedMotion ? undefined : "animate"}
      whileHover={
        reducedMotion
          ? undefined
          : {
              scale: 1.04,
              x: hoverX,
              transition: { duration: 0.35, ease: [0.16, 1, 0.3, 1] },
            }
      }
      className="w-full"
    >
      <div
        className="transition-shadow duration-300 rounded-[2rem] hover:shadow-[0_20px_60px_-12px_var(--glow)]"
        style={{ ["--glow" as string]: `${accentColor}55` }}
      >
        {children}
      </div>
    </motion.div>
  );
}

export function SchoolOrbitCards({
  slides,
  activeIndex,
  direction,
  onSelectIndex,
  onStartClick,
  onViewSchoolsClick,
  parallax = { x: 0, y: 0 },
  isTransitioning = false,
}: SchoolOrbitCardsProps) {
  const reducedMotion = useReducedMotion();
  const len = slides.length;
  const leftIndex = wrapIndex(activeIndex - 1, len);
  const rightIndex = wrapIndex(activeIndex + 1, len);
  const leftSlide = slides[leftIndex];
  const rightSlide = slides[rightIndex];

  const leftAccent =
    leftSlide.kind === "school" ? leftSlide.school.accentColor : "#6366f1";
  const rightAccent =
    rightSlide.kind === "school" ? rightSlide.school.accentColor : "#6366f1";

  const centerPx = reducedMotion ? 0 : parallax.x * 8;
  const centerPy = reducedMotion ? 0 : parallax.y * 6;
  const activeSlide = slides[activeIndex];
  const centerAccent =
    activeSlide.kind === "hero" ? "#6366f1" : activeSlide.school.accentColor;

  const sideCardMotion = {
    opacity: 0.78,
    scale: 0.9,
    filter: "blur(0px)",
  };

  return (
    <div
      className="relative mx-auto h-[min(82vh,780px)] w-full max-w-6xl flex items-center justify-center"
      style={{ perspective: "1600px" }}
    >
      <div className="absolute left-[2%] md:left-[4%] top-[38%] w-[min(24vw,240px)] -translate-y-1/2 z-10 hidden md:block">
        <AnimatePresence mode="popLayout" custom={direction}>
          <motion.div
            key={`left-${leftIndex}`}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate={{ x: -8, rotateY: 14, ...sideCardMotion }}
            exit="exit"
            transition={{ type: "spring", stiffness: 280, damping: 28 }}
            style={{ transformStyle: "preserve-3d" }}
          >
            <FloatingSideCard
              side="left"
              accentColor={leftAccent}
              floatDuration={6}
              floatDelay={0}
              parallax={parallax}
            >
              <SideSlidePreview
                slide={leftSlide}
                onClick={() => onSelectIndex(leftIndex)}
              />
            </FloatingSideCard>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="absolute right-[2%] md:right-[4%] top-[38%] w-[min(24vw,240px)] -translate-y-1/2 z-10 hidden md:block">
        <AnimatePresence mode="popLayout" custom={direction}>
          <motion.div
            key={`right-${rightIndex}`}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate={{ x: 8, rotateY: -14, ...sideCardMotion }}
            exit="exit"
            transition={{ type: "spring", stiffness: 280, damping: 28 }}
            style={{ transformStyle: "preserve-3d" }}
          >
            <FloatingSideCard
              side="right"
              accentColor={rightAccent}
              floatDuration={7}
              floatDelay={0.4}
              parallax={parallax}
            >
              <SideSlidePreview
                slide={rightSlide}
                onClick={() => onSelectIndex(rightIndex)}
              />
            </FloatingSideCard>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="relative z-20 w-[min(92vw,560px)] flex flex-col items-center justify-start pt-4 md:pt-0">
        <motion.div
          style={{ x: centerPx, y: centerPy }}
          animate={{ scale: isTransitioning ? 0.98 : 1 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="w-full flex flex-col items-center"
        >
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={`center-${activeIndex}`}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ type: "spring", stiffness: 260, damping: 26 }}
              className="w-full flex flex-col items-center gap-10 md:gap-16 lg:gap-20"
              style={{ transformStyle: "preserve-3d" }}
            >
              <div className="w-full shrink-0 relative z-20">
                <CenterSlide
                  slide={activeSlide}
                  onStartClick={onStartClick}
                  onViewSchoolsClick={onViewSchoolsClick}
                />
              </div>
              <div className="w-full flex justify-center pointer-events-none relative z-10 pt-2 md:pt-4">
                <LuminaCoreAnimation
                  accentColor={centerAccent}
                  parallax={parallax}
                  compact
                />
              </div>
            </motion.div>
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
}

function CenterSlide({
  slide,
  onStartClick,
  onViewSchoolsClick,
}: {
  slide: IntroSlide;
  onStartClick?: () => void;
  onViewSchoolsClick?: () => void;
}) {
  if (slide.kind === "hero") {
    return (
      <motion.div variants={heroCardEntrance} initial="hidden" animate="visible">
        <SpatialCard
          depth="center"
          accentColor="#6366f1"
          className="p-6 md:p-8"
          skipEntrance
        >
          <MainHeroContent />
        </SpatialCard>
      </motion.div>
    );
  }

  const { school } = slide;
  const Icon = school.icon;

  return (
    <SpatialCard depth="center" accentColor={school.accentColor} className="p-8 md:p-10">
      <div className="text-center md:text-left">
        <span
          className="inline-flex items-center gap-2 rounded-full border border-white/20 px-3 py-1 text-[10px] font-semibold uppercase tracking-widest mb-4"
          style={{ color: school.accentColor, backgroundColor: `${school.accentColor}18` }}
        >
          Escuela CUN · Activa
        </span>
        <div
          className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl border border-white/20 mx-auto md:mx-0"
          style={{ backgroundColor: `${school.accentColor}25` }}
        >
          <Icon size={28} style={{ color: school.accentColor }} />
        </div>
        <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight mb-3">
          {school.name}
        </h2>
        <p className="text-sm md:text-base text-white/65 leading-relaxed max-w-md mx-auto md:mx-0 mb-6">
          {school.description}
        </p>
        <p className="text-xs text-white/45 mb-6 line-clamp-2">
          {school.highlights[0]}
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center md:justify-start">
          <button
            type="button"
            onClick={onStartClick}
            className="relative z-20 px-8 py-3.5 rounded-2xl text-white font-bold text-sm hover:scale-[1.03] active:scale-[0.98] transition-transform shadow-lg"
            style={{ backgroundColor: school.accentColor }}
          >
            Iniciar experiencia
          </button>
          <button
            type="button"
            onClick={onViewSchoolsClick}
            className="relative z-20 px-8 py-3.5 rounded-2xl border border-white/25 bg-white/10 text-white font-semibold text-sm hover:bg-white/15 transition-colors"
          >
            Ver escuelas
          </button>
        </div>
      </div>
    </SpatialCard>
  );
}

function SideSlidePreview({
  slide,
  onClick,
}: {
  slide: IntroSlide;
  onClick: () => void;
}) {
  if (slide.kind === "hero") {
    return (
      <SpatialCard depth="side" accentColor="#6366f1" className="p-4" onClick={onClick} skipEntrance>
        <p className="text-[10px] font-bold uppercase tracking-widest text-indigo-300 mb-2">
          Inicio
        </p>
        <h3 className="text-base font-semibold text-white">Luminachat</h3>
        <p className="text-xs text-white/50 mt-1">Campus Virtual CUN</p>
      </SpatialCard>
    );
  }

  const { school } = slide;
  const Icon = school.icon;

  return (
    <SpatialCard
      depth="side"
      accentColor={school.accentColor}
      className="p-4 hover:border-white/35"
      onClick={onClick}
      skipEntrance
    >
      <div className="flex flex-col gap-2">
        <div
          className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/20"
          style={{ backgroundColor: `${school.accentColor}22` }}
        >
          <Icon size={20} style={{ color: school.accentColor }} />
        </div>
        <h3 className="text-sm font-semibold text-white leading-snug line-clamp-3">
          {school.name}
        </h3>
      </div>
    </SpatialCard>
  );
}
