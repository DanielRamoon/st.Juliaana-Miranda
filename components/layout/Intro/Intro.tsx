"use client";

import { useLayoutEffect, useState, type AnimationEvent } from "react";
import Image from "next/image";
import { INTRO_STORAGE_KEY } from "./constants";
import styles from "./Intro.module.css";

const RING_RADIUS = 96;
const RING_LENGTH = 2 * Math.PI * RING_RADIUS;

export function Intro() {
  const [done, setDone] = useState(false);

  useLayoutEffect(() => {
    if (sessionStorage.getItem(INTRO_STORAGE_KEY)) {
      document.documentElement.dataset.intro = "seen";
      return;
    }
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  const finish = () => {
    sessionStorage.setItem(INTRO_STORAGE_KEY, "1");
    document.documentElement.dataset.intro = "seen";
    document.body.style.overflow = "";
    setDone(true);
  };

  const handlePanelExit = (event: AnimationEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      document.documentElement.dataset.intro = "leaving";
    }
  };

  const handleCurtainEnd = (event: AnimationEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) finish();
  };

  if (done) return null;

  return (
    <div className={styles.intro} role="presentation">
      <div className={styles.curtain} onAnimationEnd={handleCurtainEnd} />

      <div className={styles.panel} onAnimationStart={handlePanelExit}>
        <div className={styles.content}>
          <div className={styles.emblem}>
            <svg
              className={styles.ring}
              viewBox="0 0 200 200"
              aria-hidden
              style={{ ["--ring-length" as string]: RING_LENGTH }}
            >
              <circle cx="100" cy="100" r={RING_RADIUS} />
            </svg>
            <Image
              src="/assets/img/logo-monograma.png"
              alt=""
              width={457}
              height={419}
              priority
              className={styles.monogram}
            />
          </div>

          <Image
            src="/assets/img/logo-texto.png"
            alt="Juliana Miranda - Nails, Manicure e Pedicure"
            width={1444}
            height={265}
            priority
            className={styles.wordmark}
          />

          <span className={styles.line} aria-hidden />

          <p className={styles.tagline}>Cuidar de pessoas através dos detalhes</p>
        </div>

        <button type="button" className={styles.skip} onClick={finish}>
          Pular
        </button>
      </div>
    </div>
  );
}
