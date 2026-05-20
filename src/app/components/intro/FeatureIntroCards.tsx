import { motion } from "motion/react";
import type { LucideIcon } from "lucide-react";
import { featureCardReveal } from "../../lib/motionVariants";
import { SpatialCard } from "./SpatialCard";
import type { ParallaxOffset } from "../../hooks/useMouseParallax";
import { useReducedMotion } from "../../hooks/useReducedMotion";

export interface FeatureCardData {
  icon: LucideIcon;
  title: string;
  description: string;
  accent: string;
}

interface FeatureIntroCardsProps {
  cards: FeatureCardData[];
  parallax: ParallaxOffset;
}

export function FeatureIntroCards({ cards, parallax }: FeatureIntroCardsProps) {
  const reducedMotion = useReducedMotion();
  const px = reducedMotion ? 0 : parallax.x * 10;
  const py = reducedMotion ? 0 : parallax.y * 6;

  return (
    <motion.section
      className="relative z-10 max-w-6xl mx-auto w-full mt-4 md:mt-2 grid grid-cols-1 md:grid-cols-3 gap-4 pb-8"
      style={{ x: px, y: py }}
    >
      {cards.map((card, i) => {
        const Icon = card.icon;
        return (
          <motion.div
            key={card.title}
            custom={i}
            variants={featureCardReveal}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            whileHover={
              reducedMotion
                ? undefined
                : {
                    y: -8,
                    transition: { duration: 0.35, ease: [0.16, 1, 0.3, 1] },
                  }
            }
          >
            <SpatialCard
              depth="feature"
              accentColor={card.accent}
              skipEntrance
              className="p-6 h-full transition-shadow duration-300 hover:border-white/30 group"
            >
              <motion.div
                className="mb-4 flex h-11 w-11 items-center justify-center rounded-2xl border border-white/15 group-hover:border-white/25 transition-colors"
                style={{ backgroundColor: `${card.accent}22` }}
                whileHover={
                  reducedMotion ? undefined : { scale: 1.08, rotate: 4 }
                }
              >
                <Icon size={22} style={{ color: card.accent }} />
              </motion.div>
              <h3 className="text-lg font-bold text-white mb-2">{card.title}</h3>
              <p className="text-sm text-white/60 leading-relaxed">
                {card.description}
              </p>
            </SpatialCard>
          </motion.div>
        );
      })}
    </motion.section>
  );
}
