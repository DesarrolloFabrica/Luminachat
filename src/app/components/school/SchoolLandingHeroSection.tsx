import { motion, AnimatePresence } from "motion/react";
import type { School } from "../../../lib/schools";
import type { SchoolTheme } from "../../data/schoolThemes";
import { DynamicSchoolHero } from "../visual/DynamicSchoolHero";
import { LuminaCoreAnimation } from "../visual/LuminaCoreAnimation";
import { useMouseParallax } from "../../hooks/useMouseParallax";

interface SchoolLandingHeroSectionProps {
  school: School;
  theme: SchoolTheme;
  onStartChat: () => void;
  onScrollToFlow?: () => void;
}

/** Hero de escuela + núcleo LUMINA (columna derecha en desktop, debajo en móvil) */
export function SchoolLandingHeroSection({
  school,
  theme,
  onStartChat,
  onScrollToFlow,
}: SchoolLandingHeroSectionProps) {
  const { getOffset } = useMouseParallax();
  const parallax = { x: getOffset(0.6).x, y: getOffset(0.6).y };

  return (
    <AnimatePresence mode="wait">
      <motion.section
        key={theme.id}
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -12 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_minmax(260px,340px)] xl:grid-cols-[minmax(0,1fr)_360px] gap-10 lg:gap-8 xl:gap-12 items-start mb-10 md:mb-14 lg:mb-16"
      >
        <div className="min-w-0 relative z-10">
          <DynamicSchoolHero
            theme={theme}
            school={school}
            onStartChat={onStartChat}
            onScrollToFlow={onScrollToFlow}
          />
        </div>

        <div className="flex justify-center lg:justify-end lg:items-center pointer-events-none relative z-0 pt-4 lg:pt-12">
          <LuminaCoreAnimation
            size="school"
            accentColor={theme.accentColor}
            parallax={parallax}
            className="max-w-full"
          />
        </div>
      </motion.section>
    </AnimatePresence>
  );
}
