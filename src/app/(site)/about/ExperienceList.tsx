"use client";

import { useState } from "react";
import type { Experience } from "@/redesign/content/about";
import styles from "./page.module.css";

// Year · role · company rows. Rows with a description are buttons that expand to show it.
export function ExperienceList({ items }: { items: Experience[] }) {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <div className={styles.rows}>
      {items.map((item, i) => {
        const summary = (
          <>
            <span className={styles.years}>{item.years}</span>
            <span><b>{item.title}</b> <span className={styles.org}>{item.milestone ? "" : "at "}{item.org}</span></span>
          </>
        );
        if (!item.text) return <div className={styles.row} key={item.title}><div className={styles.summary}>{summary}</div></div>;

        const isOpen = open === i;
        return (
          <div className={`${styles.row} ${isOpen ? styles.open : ""}`} key={item.title}>
            <button type="button" className={styles.summary} aria-expanded={isOpen} aria-controls={`exp-${i}`} onClick={() => setOpen(isOpen ? null : i)}>
              {summary}
              <span className={styles.plus} aria-hidden="true">+</span>
            </button>
            <div className={styles.more} id={`exp-${i}`} hidden={!isOpen}>{item.text}</div>
          </div>
        );
      })}
    </div>
  );
}
