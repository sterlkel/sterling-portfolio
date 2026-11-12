"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { FlowCanvas, RiseWords, Tilt } from "@/redesign/interactive";
import styles from "./page.module.css";

// The interactive homepage hero: flow field, waving hand, rising headline and tilting portrait.
export function Hero() {
  const hero = useRef<HTMLElement>(null);
  const [waving, setWaving] = useState(false);

  const waveAgain = () => {
    setWaving(false);
    requestAnimationFrame(() => setWaving(true));
  };

  return (
    <section className={styles.hero} data-hero id="top" ref={hero}>
      <FlowCanvas
        className={styles.flow}
        clickTargetRef={hero}
        signature
        sigX={0.5}
        sigY={0.86}
        sigSize={0.32}
        shockwave
      />
      <div className={styles.inner}>
        <div className={styles.copy}>
          <button
            type="button"
            className={`${styles.wave} ${waving ? styles.waveClicked : ""}`}
            onClick={waveAgain}
            aria-label="Wave hello"
          >
            <span aria-hidden="true">👋</span>
          </button>
          <h1 className={styles.h1}>
            <RiseWords text="Hi, I'm Sterling." wordClassName={styles.word} />
          </h1>
          <p className={styles.sub}>
            I&apos;m a software engineer who builds <span className={styles.highlight}>small, useful tools</span> and writes about them. One-time founder, published novelist.
          </p>
          <div className={styles.cta}>
            <a className="btn" href="#latest-writing">Read the blog</a>
            <a className="btn ghost" href="#selected-work">See my work</a>
          </div>
        </div>
        <Tilt className={styles.face}>
          <div className={styles.faceImage}>
            <Image src="/Sterling.jpg" alt="Sterling Kelly" width={800} height={1000} priority sizes="(max-width: 820px) 280px, 420px" />
          </div>
        </Tilt>
      </div>
      <p className={styles.hint}>click anywhere · hold still for a moment</p>
    </section>
  );
}
