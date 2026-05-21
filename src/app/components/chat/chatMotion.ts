import type { Transition, Variants } from "motion/react";

export const CHAT_EASE: Transition["ease"] = [0.16, 1, 0.3, 1];

export const messageReveal: Variants = {
  hidden: {
    opacity: 0,
    y: 24,
    filter: "blur(10px)",
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.55, ease: CHAT_EASE },
  },
};

export const messageStagger: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08, delayChildren: 0.04 },
  },
};

export const messageLine: Variants = {
  hidden: { opacity: 0, y: 8 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.35, ease: CHAT_EASE },
  },
};

export const panelFloat: Variants = {
  animate: {
    y: [0, -4, 0],
    transition: { duration: 8, repeat: Infinity, ease: "easeInOut" },
  },
};

export const glowPulse: Variants = {
  animate: {
    opacity: [0.5, 0.82, 0.5],
    scale: [1, 1.02, 1],
    transition: { duration: 5, repeat: Infinity, ease: "easeInOut" },
  },
};
