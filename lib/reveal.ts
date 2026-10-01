import type { CSSProperties } from "react";

export type RevealVariant = "up" | "left" | "right" | "zoom" | "fade";

const STEP_MS = 90;

export function reveal(variant: RevealVariant = "up", step = 0) {
  return {
    "data-reveal": variant,
    style: { "--reveal-delay": `${step * STEP_MS}ms` } as CSSProperties,
  };
}
