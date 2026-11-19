"use client";

import { useEffect, useState } from "react";
import styles from "./SectionAtmosphere.module.css";

export type AtmosphereScene = {
  id: string;
  selector: string;
  image: string;
  label: string;
};

type SectionAtmosphereProps = {
  scenes: AtmosphereScene[];
};

export function SectionAtmosphere({ scenes }: SectionAtmosphereProps) {
  const [activeId, setActiveId] = useState(scenes[0]?.id ?? "");

  useEffect(() => {
    if (!scenes.length) return;

    const ratios = new Map<string, number>();

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const id = entry.target.getAttribute("data-atmosphere");
          if (!id) continue;
          ratios.set(id, entry.isIntersecting ? entry.intersectionRatio : 0);
        }

        let bestId = scenes[0].id;
        let bestRatio = -1;
        for (const scene of scenes) {
          const ratio = ratios.get(scene.id) ?? 0;
          if (ratio > bestRatio) {
            bestRatio = ratio;
            bestId = scene.id;
          }
        }
        setActiveId(bestId);
      },
      {
        threshold: [0.08, 0.18, 0.28, 0.4, 0.55, 0.7],
        rootMargin: "-12% 0px -28% 0px",
      },
    );

    const nodes: Element[] = [];
    for (const scene of scenes) {
      const node = document.querySelector(scene.selector);
      if (!node) continue;
      node.setAttribute("data-atmosphere", scene.id);
      observer.observe(node);
      nodes.push(node);
    }

    return () => {
      observer.disconnect();
      for (const node of nodes) node.removeAttribute("data-atmosphere");
    };
  }, [scenes]);

  if (!scenes.length) return null;

  return (
    <div className={styles.root} aria-hidden>
      <div className={styles.wash} />
      {scenes.map((scene) => (
        <div
          key={scene.id}
          className={`${styles.layer} ${activeId === scene.id ? styles.active : ""}`}
          style={{ backgroundImage: `url(${scene.image})` }}
          title={scene.label}
        />
      ))}
      <div className={styles.grain} />
      <div className={styles.vignette} />
    </div>
  );
}
