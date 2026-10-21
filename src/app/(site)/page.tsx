"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";
import { elsewhere, selectedWork, writingDrafts } from "@/redesign/home";
import { FlowCanvas, RiseWords, Tilt } from "@/redesign/interactive";
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

      <div className={styles.content}>
        <section className={styles.two} aria-label="Writing and selected work">
          <section id="latest-writing">
            <div className={styles.colHead}>
              <h2>Latest writing</h2>
              <a href="#latest-writing">all posts →</a>
            </div>
            <p className={styles.soonLede}>First posts are on the way<span className={styles.cursor} /></p>
            <p className={styles.soonSub}>I&apos;m writing the first few now. Here&apos;s what&apos;s on the desk:</p>
            {writingDrafts.map((draft) => (
              <div className={styles.draft} key={draft.title}>
                <b>{draft.title}</b>
                <span className={styles.draftMeta}>
                  <span className={draft.status === "editing" ? styles.statusHot : styles.status}>{draft.status}</span>
                  <span className={styles.bar} aria-label={`${draft.progress}% complete`}><i style={{ width: `${draft.progress}%` }} /></span>
                </span>
              </div>
            ))}
          </section>

          <section id="selected-work">
            <div className={styles.colHead}>
              <h2>Selected work</h2>
              <Link href="/projects">all work →</Link>
            </div>
            {selectedWork.map((work) => (
              <Link className={styles.row} href="/projects" key={work.key}>
                <div className={`${styles.cover} ${styles[work.key]}`} aria-hidden="true">
                  {work.key === "cli" && <code>$ sting notes today<br />→ opened 10-01.md</code>}
                </div>
                <div><b>{work.title}</b><span>{work.pitch}</span></div>
              </Link>
            ))}
          </section>
        </section>

        <p className={styles.elsewhere}>
          Elsewhere: {elsewhere.map(({ label, href }, index) => (
            <span key={label}><Link href={href}>{label}</Link>{index < elsewhere.length - 1 ? ", " : "."}</span>
          ))}
        </p>
      </div>
    </>
  );
}
