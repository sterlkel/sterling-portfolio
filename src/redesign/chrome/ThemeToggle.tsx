"use client";

import styles from "./Nav.module.css";

export const THEME_KEY = "sk-theme";

// Runs in <head> before paint so the saved theme applies without a flash. Abyss (dark) is the default.
export const themeScript = `try{document.documentElement.dataset.theme=localStorage.getItem('${THEME_KEY}')||'dark'}catch(e){document.documentElement.dataset.theme='dark'}`;

export function ThemeToggle() {
  const toggle = () => {
    const root = document.documentElement;
    root.dataset.theme = root.dataset.theme === "light" ? "dark" : "light";
    try { localStorage.setItem(THEME_KEY, root.dataset.theme); } catch {}
  };
  return <button type="button" className={styles.themeBtn} onClick={toggle} aria-label="Toggle light and dark theme" />;
}
