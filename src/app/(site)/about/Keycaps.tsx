"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./page.module.css";

type Skill = { name: string; level: number };

// A keyboard of skills. Hovering presses a key; typing a letter presses every key that starts with it and names them.
export function Keycaps({ skills }: { skills: readonly Skill[] }) {
  const board = useRef<HTMLDivElement>(null);
  const [typed, setTyped] = useState("");
  const rows = [skills.slice(0, 5), skills.slice(5, 10), skills.slice(10)];

  const press = (key: Element) => key.classList.add(styles.down);
  const release = (key: Element) => {
    key.classList.remove(styles.down, styles.boing);
    void (key as HTMLElement).offsetWidth; // restart the spring-back animation
    key.classList.add(styles.boing);
  };

  useEffect(() => {
    const keysFor = (e: KeyboardEvent) =>
      e.key.length === 1 ? Array.from(board.current?.querySelectorAll(`[data-letter="${CSS.escape(e.key.toLowerCase())}"]`) ?? []) : [];
    const down = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      // Leave typing in form fields and keyboard shortcuts alone.
      if (e.repeat || e.ctrlKey || e.metaKey || e.altKey || target?.closest("input, textarea, select, [contenteditable]")) return;
      const keys = keysFor(e);
      if (!keys.length) return;
      keys.forEach(press);
      setTyped(keys.map(key => (key as HTMLElement).dataset.name).join(" · "));
    };
    const up = (e: KeyboardEvent) => keysFor(e).forEach(key => { if (key.classList.contains(styles.down)) release(key); });
    window.addEventListener("keydown", down);
    window.addEventListener("keyup", up);
    return () => { window.removeEventListener("keydown", down); window.removeEventListener("keyup", up); };
  }, []);

  return (
    <div>
      <div className={styles.kb} ref={board}>
        {rows.map((row, r) => (
          <div className={styles.kbRow} key={r}>
            {row.map((skill, i) => (
              <div
                key={skill.name}
                className={`${styles.key} ${skill.level >= 5 ? styles.wide : (i + r) % 4 === 2 ? styles.hi : ""}`}
                data-letter={skill.name[0].toLowerCase()}
                data-name={skill.name}
                onPointerEnter={e => press(e.currentTarget)}
                onPointerLeave={e => release(e.currentTarget)}
              >
                <small aria-hidden="true">{"★".repeat(skill.level)}</small>{skill.name}
              </div>
            ))}
          </div>
        ))}
      </div>
      <div className={styles.typed} aria-live="polite">{typed}</div>
      <p className={styles.kbHint}>hover the keys · or type on your keyboard</p>
    </div>
  );
}
