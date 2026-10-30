"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";
import { elsewhere, selectedWork } from "@/redesign/home";
import { FlowCanvas, RiseWords, Tilt } from "@/redesign/interactive";
import { Reveal } from "@/redesign/chrome/Reveal";
import styles from "./page.module.css";

export default function HomePage() {
  const hero = useRef<HTMLElement>(null);
  const [waving, setWaving] = useState(false);

  const waveAgain = () => {
    setWaving(false);
    requestAnimationFrame(() => setWaving(true));
  };

  return (
    <>
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
              <a className="btn" href="#selected-work">See my work</a>
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

      <div className={styles.content}>
        <Reveal className={styles.workReveal}>
          <section id="selected-work" className={styles.work} aria-label="Selected work">
            <div className={styles.colHead}>
              <h2>Selected work</h2>
              <Link href="/projects">all work →</Link>
            </div>
            {selectedWork.map((work) => (
              <Link className={styles.row} href={work.href} key={work.title}>
                <div className={styles.cover} style={{ background: work.coverBackground }} aria-hidden="true" />
                <div><b>{work.title}</b><span>{work.pitch}</span></div>
              </Link>
            ))}
          </section>
        </Reveal>

        <p className={styles.elsewhere}>
          Elsewhere: {elsewhere.map(({ label, href }, index) => (
            <span key={label}><Link href={href}>{label}</Link>{index < elsewhere.length - 1 ? ", " : "."}</span>
          ))}
        </p>
      </div>
    </>
  );
}
