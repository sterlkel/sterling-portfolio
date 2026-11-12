"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./page.module.css";

// The big email address. Clicking it copies the address and flips the pill to "copied!" for a moment.
export function CopyEmail({ email }: { email: string }) {
  const [copied, setCopied] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout>>();
  useEffect(() => () => clearTimeout(timer.current), []);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(email);
    } catch {
      return; // Clipboard blocked: leave the pill alone so it never claims a copy that didn't happen.
    }
    setCopied(true);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setCopied(false), 1600);
  };

  return (
    <button type="button" className={`${styles.email} ${copied ? styles.copied : ""}`} onClick={copy} title="Copy email">
      {email}
      <span className={styles.pill} aria-live="polite">{copied ? "copied!" : "copy"}</span>
    </button>
  );
}
