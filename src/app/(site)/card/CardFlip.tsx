"use client";

import Image from "next/image";
import { useState } from "react";
import { FlowCanvas } from "@/redesign/interactive";
import { person } from "@/redesign/site";
import styles from "./page.module.css";

// The card: photo, name, title and email on the front; tapping flips it to a QR code for this page.
export function CardFlip({ qrSvg }: { qrSvg: string }) {
  const [flipped, setFlipped] = useState(false);

  return (
    <button
      type="button"
      className={`${styles.card} ${flipped ? styles.flipped : ""}`}
      onClick={() => setFlipped(f => !f)}
      aria-pressed={flipped}
      aria-label={flipped ? "Show the front of the card" : "Flip the card to show its QR code"}
    >
      <span className={styles.flip}>
        <span className={styles.face} aria-hidden={flipped}>
          <FlowCanvas className={styles.flow} density={300} shockwave={false} />
          <Image className={styles.avatar} src="/Sterling.jpg" alt="" width={224} height={224} priority />
          <span className={styles.name}>{person.name}</span>
          <span className={styles.role}>{person.title}</span>
          <span className={styles.mail}>{person.email}</span>
          <span className={styles.tap}>tap to flip ↻</span>
        </span>
        <span className={`${styles.face} ${styles.back}`} aria-hidden={!flipped}>
          <span className={styles.qr} role="img" aria-label="QR code for this card" dangerouslySetInnerHTML={{ __html: qrSvg }} />
          <span className={styles.tap}>scan to open this card</span>
        </span>
      </span>
    </button>
  );
}
