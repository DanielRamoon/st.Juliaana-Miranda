"use client";

import { useLayoutEffect } from "react";

const REVEALED_CLASS = "is-revealed";
const INTRO_DONE = ["leaving", "seen"];

export function ScrollReveal() {
  useLayoutEffect(() => {
    const root = document.documentElement;
    root.dataset.reveal = "ready";

    const elements = document.querySelectorAll<HTMLElement>("[data-reveal]");

    if (!("IntersectionObserver" in window)) {
      elements.forEach((el) => el.classList.add(REVEALED_CLASS));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add(REVEALED_CLASS);
          observer.unobserve(entry.target);
        });
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.12 },
    );

    const start = () => elements.forEach((el) => observer.observe(el));

    let introWatcher: MutationObserver | undefined;
    if (INTRO_DONE.includes(root.dataset.intro ?? "")) {
      start();
    } else {
      introWatcher = new MutationObserver(() => {
        if (!INTRO_DONE.includes(root.dataset.intro ?? "")) return;
        introWatcher?.disconnect();
        start();
      });
      introWatcher.observe(root, {
        attributes: true,
        attributeFilter: ["data-intro"],
      });
    }

    return () => {
      observer.disconnect();
      introWatcher?.disconnect();
    };
  }, []);

  return null;
}
