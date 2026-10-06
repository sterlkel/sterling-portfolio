"use client";

import { useRef } from "react";
import { drafts, elsewhere, navLinks, person, projects } from "@/trial/data";
import { FlowCanvas, RiseWords, Tilt } from "@/trial/interactive";
import { ThemeToggle } from "./ThemeToggle";
import s from "./page.module.css";

export default function TrialCss() {
  const hero = useRef<HTMLElement>(null);
  return (
    <>
      <header className={s.nav}>
        <a className={s.brand} href="#"><i />{person.name}</a>
        <nav className={s.links}>{navLinks.map(l => <a key={l} href="#">{l}</a>)}</nav>
        <ThemeToggle className={s.themeBtn} />
      </header>

      <section className={s.hero} ref={hero}>
        <FlowCanvas className={s.flow} clickTargetRef={hero} signature sigX={0.5} sigY={0.86} sigSize={0.32} />
        <div className={s.inner}>
          <div>
            <div className={s.wave}>👋</div>
            <h1 className={s.h1}><RiseWords text={`Hi, I'm ${person.first}.`} wordClassName={s.word} /></h1>
            <p className={s.sub}>I&apos;m a software engineer who builds <span className={s.hl}>small, useful tools</span> and writes about them. One-time founder, published novelist.</p>
            <div className={s.cta}>
              <a className={s.btn} href="#">Read the blog</a>
              <a className={`${s.btn} ${s.ghost}`} href="#">See my work</a>
            </div>
          </div>
          <Tilt className={s.face}><img src={person.photo} alt={person.name} /></Tilt>
        </div>
        <div className={s.hint}>click anywhere · hold still for a moment</div>
      </section>

      <main className={s.wrap}>
        <section className={s.two}>
          <div>
            <div className={s.colHead}><h2>Latest writing</h2><a href="#">all posts →</a></div>
            <p className={s.soonLede}>First posts are on the way<span className={s.cursor} /></p>
            <p className={s.soonSub}>I&apos;m writing the first few now. Here&apos;s what&apos;s on the desk:</p>
            {drafts.map(d => (
              <div className={s.draft} key={d.title}>
                <b>{d.title}</b>
                <span className={s.draftMeta}>
                  <span className={d.status === "editing" ? s.statusHot : s.status}>{d.status}</span>
                  <span className={s.bar}><i style={{ width: `${d.pct}%` }} /></span>
                </span>
              </div>
            ))}
          </div>
          <div>
            <div className={s.colHead}><h2>Selected work</h2><a href="#">all work →</a></div>
            {projects.map(p => (
              <a className={s.row} href="#" key={p.key}>
                <div className={`${s.cover} ${s[p.key]}`}>{p.key === "cli" && <code>$ sting notes today<br />→ opened 10-01.md</code>}</div>
                <div><b>{p.title}</b><span>{p.pitch}</span></div>
              </a>
            ))}
          </div>
        </section>
        <p className={s.else}>Elsewhere: {elsewhere.map(([l, h], i) => <span key={l}><a href={h}>{l}</a>{i < elsewhere.length - 1 ? ", " : "."}</span>)}</p>
      </main>
    </>
  );
}
