import type { Transition, Variants } from "motion/react";

export const EASE_SMOOTH: Transition["ease"] = [0.16, 1, 0.3, 1];

export const fadeBlurUp: Variants = {
  hidden: {
    opacity: 0,
    y: 32,
    filter: "blur(12px)",
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.8,
      ease: EASE_SMOOTH,
    },
  },
};

export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.2,
    },
  },
};

export const heroCardEntrance: Variants = {
  hidden: { opacity: 0, scale: 0.92 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.7, ease: EASE_SMOOTH },
  },
};

export function cardFloat(duration = 6, delay = 0): Variants {
  return {
    animate: {
      y: [0, -10, 0],
      rotate: [-1, 1, -1],
      transition: {
        duration,
        delay,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };
}

export const navEntrance: Variants = {
  hidden: { opacity: 0, y: -24, filter: "blur(10px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.7, ease: EASE_SMOOTH },
  },
};

export const navFloat: Variants = {
  animate: {
    y: [0, -3, 0],
    transition: { duration: 6, repeat: Infinity, ease: "easeInOut" },
  },
};

export const bottomBarEntrance: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.75, delay: 1.1, ease: EASE_SMOOTH },
  },
};

export const featureCardReveal: Variants = {
  hidden: { opacity: 0, y: 40, scale: 0.96 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.75,
      delay: 0.55 + i * 0.12,
      ease: EASE_SMOOTH,
    },
  }),
};
