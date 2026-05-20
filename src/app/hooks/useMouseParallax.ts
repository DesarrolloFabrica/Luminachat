import { useCallback, useEffect, useState } from "react";
import { useReducedMotion } from "./useReducedMotion";

export interface ParallaxOffset {
  x: number;
  y: number;
}

export function useMouseParallax() {
  const reducedMotion = useReducedMotion();
  const [position, setPosition] = useState<ParallaxOffset>({ x: 0, y: 0 });

  useEffect(() => {
    if (reducedMotion) {
      setPosition({ x: 0, y: 0 });
      return;
    }

    const onMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 2;
      const y = (e.clientY / window.innerHeight - 0.5) * 2;
      setPosition({ x, y });
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, [reducedMotion]);

  const getOffset = useCallback(
    (intensity: number): ParallaxOffset => ({
      x: position.x * intensity,
      y: position.y * intensity,
    }),
    [position.x, position.y],
  );

  return {
    x: position.x,
    y: position.y,
    reducedMotion,
    getOffset,
  };
}
