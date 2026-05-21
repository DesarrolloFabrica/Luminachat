import { useState, useCallback, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import { GitBranch, GraduationCap, Sparkles } from "lucide-react";
import { schools } from "../../../lib/schools";
import { FloatingNav } from "./FloatingNav";
import { SchoolOrbitCards, type IntroSlide } from "./SchoolOrbitCards";
import { BottomAssistantBar } from "./BottomAssistantBar";
import { SPATIAL_BACKGROUND_IMAGE } from "./spatialConstants";
import { useMouseParallax } from "../../hooks/useMouseParallax";
import { AnimatedBackgroundLayers } from "../visual/AnimatedBackgroundLayers";
import { LuminaMarquee } from "../visual/LuminaMarquee";
import { FeatureIntroCards, type FeatureCardData } from "./FeatureIntroCards";

export { SPATIAL_BACKGROUND_IMAGE };

const FEATURE_CARDS: FeatureCardData[] = [
  {
    icon: GitBranch,
    title: "Chat guiado",
    description:
      "Árbol de decisión con temas, subtemas y preguntas sobre normatividad institucional y académica.",
    accent: "#3b82f6",
  },
  {
    icon: Sparkles,
    title: "Respuestas con IA",
    description:
      "Gemini responde con base en fragmentos del documento seleccionado, sin inventar normas.",
    accent: "#8b5cf6",
  },
  {
    icon: GraduationCap,
    title: "Contenido por escuela",
    description:
      "Cinco escuelas CUN con avatar, videos y asistente contextual para cada comunidad.",
    accent: "#14b8a6",
  },
];

const TRANSITION_MS = 420;

function buildIntroSlides(): IntroSlide[] {
  return [
    { kind: "hero" },
    ...schools.map((school, schoolIndex) => ({
      kind: "school" as const,
      school,
      schoolIndex,
    })),
  ];
}

export interface SpatialCampusExperienceProps {
  onStartExperience: () => void;
  onViewSchools: () => void;
  onExploreSchool: (schoolId: string) => void;
}

export function SpatialCampusExperience({
  onStartExperience,
  onViewSchools,
  onExploreSchool,
}: SpatialCampusExperienceProps) {
  const slides = useMemo(() => buildIntroSlides(), []);
  const [activeSlide, setActiveSlide] = useState(0);
  const [direction, setDirection] = useState(1);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const { getOffset, reducedMotion } = useMouseParallax();
  const bgParallax = getOffset(12);
  const glowParallax = getOffset(22);
  const parallax = { x: getOffset(1).x, y: getOffset(1).y };

  const current = slides[activeSlide];
  const accentColor =
    current.kind === "school" ? current.school.accentColor : "#6366f1";

  const runPremiumTransition = useCallback((action: () => void) => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    const delay = reducedMotion ? 80 : TRANSITION_MS;
    window.setTimeout(() => {
      action();
      setIsTransitioning(false);
    }, delay);
  }, [isTransitioning, reducedMotion]);

  const goExplore = useCallback(() => {
    runPremiumTransition(() => {
      if (current.kind === "hero") {
        onStartExperience();
        return;
      }
      onExploreSchool(current.school.id);
    });
  }, [current, onStartExperience, onExploreSchool, runPremiumTransition]);

  const handleStartClick = useCallback(() => {
    runPremiumTransition(() => {
      if (current.kind === "school") {
        onExploreSchool(current.school.id);
        return;
      }
      onStartExperience();
    });
  }, [current, onStartExperience, onExploreSchool, runPremiumTransition]);

  const handleViewSchoolsClick = useCallback(() => {
    onViewSchools();
    setDirection(1);
    setActiveSlide(1);
    document
      .getElementById("lumina-carousel")
      ?.scrollIntoView({ behavior: "smooth", block: "center" });
  }, [onViewSchools]);

  const goToSlide = (index: number) => {
    setDirection(index > activeSlide ? 1 : -1);
    setActiveSlide(index);
  };

  const prevSlide = () => {
    setDirection(-1);
    setActiveSlide((i) => (i - 1 + slides.length) % slides.length);
  };

  const nextSlide = () => {
    setDirection(1);
    setActiveSlide((i) => (i + 1) % slides.length);
  };

  return (
    <div className="relative min-h-[100dvh] w-full overflow-x-hidden overflow-y-auto">
      <div className="fixed inset-0 z-0">
        <motion.img
          src={SPATIAL_BACKGROUND_IMAGE}
          alt=""
          className="h-full w-full object-cover scale-105"
          style={{
            x: reducedMotion ? 0 : bgParallax.x,
            y: reducedMotion ? 0 : bgParallax.y,
          }}
        />
        <div className="absolute inset-0 bg-slate-950/65 backdrop-blur-[2px]" />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900/40 via-transparent to-slate-950/80" />
        <motion.div
          className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[80vw] h-[50vh] rounded-full opacity-30 blur-[100px]"
          style={{
            background: `radial-gradient(circle, ${accentColor}55 0%, transparent 70%)`,
            x: reducedMotion ? 0 : glowParallax.x,
            y: reducedMotion ? 0 : glowParallax.y,
          }}
        />
        <AnimatedBackgroundLayers accentColor={accentColor} parallax={glowParallax} />
      </div>

      <AnimatePresence>
        {isTransitioning && !reducedMotion && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            className="fixed inset-0 z-[45] pointer-events-none flex items-center justify-center"
          >
            <div
              className="h-[min(70vw,420px)] w-[min(70vw,420px)] rounded-full blur-[80px] opacity-60"
              style={{
                background: `radial-gradient(circle, ${accentColor}88 0%, transparent 70%)`,
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      <FloatingNav />

      <main className="relative z-10 flex flex-col min-h-[100dvh] pt-24 pb-32 px-4 md:px-8">
        <section
          id="lumina-carousel"
          className="hidden sm:block flex-1 flex flex-col items-center justify-center py-4 md:py-6"
        >
          <SchoolOrbitCards
            slides={slides}
            activeIndex={activeSlide}
            direction={direction}
            onSelectIndex={goToSlide}
            onStartClick={handleStartClick}
            onViewSchoolsClick={handleViewSchoolsClick}
            parallax={parallax}
            isTransitioning={isTransitioning}
          />
        </section>

        <section
          id="lumina-carousel-mobile"
          className="sm:hidden flex flex-col gap-4 py-4 min-h-[min(85vh,680px)]"
        >
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={activeSlide}
              custom={direction}
              initial={{ opacity: 0, x: direction > 0 ? 40 : -40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: direction > 0 ? -40 : 40 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              <SchoolOrbitCards
                slides={slides}
                activeIndex={activeSlide}
                direction={direction}
                onSelectIndex={goToSlide}
                onStartClick={handleStartClick}
                onViewSchoolsClick={handleViewSchoolsClick}
                parallax={parallax}
                isTransitioning={isTransitioning}
              />
            </motion.div>
          </AnimatePresence>

          <div className="flex justify-center gap-1.5">
            {slides.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => goToSlide(i)}
                className="h-1.5 rounded-full transition-all"
                style={{
                  width: i === activeSlide ? 24 : 6,
                  backgroundColor:
                    i === activeSlide ? accentColor : "rgba(255,255,255,0.25)",
                }}
                aria-label={`Ir a diapositiva ${i + 1}`}
              />
            ))}
          </div>
        </section>

        <LuminaMarquee />

        <FeatureIntroCards cards={FEATURE_CARDS} parallax={parallax} />
      </main>

      <BottomAssistantBar
        accentColor={accentColor}
        title={
          current.kind === "hero" ? "Asistente Lumina" : current.school.name
        }
        subtitle={
          current.kind === "hero"
            ? "Luminachat · Campus Virtual CUN"
            : "Normatividad · Bienestar · Escuelas"
        }
        onPrev={prevSlide}
        onNext={nextSlide}
        onExplore={goExplore}
      />
    </div>
  );
}
