import type { Project } from "../content/projects";
import styles from "./Cover.module.css";

// CSS-drawn stand-in covers, one per project, until real screenshots exist.
export function Cover({ cover, className = "" }: { cover: Project["cover"]; className?: string }) {
  return (
    <div className={`${styles.cover} ${styles[cover]} ${className}`} aria-hidden="true">
      <div className={styles.art}>
        {cover === "cli" && (
          <div>
            $ sting notes today<br /><span>→ opened 2026-10-01.md</span><br />
            $ sting ai &quot;summarize inbox&quot;<br /><span>→ 3 threads need replies</span><br />$ ▍
          </div>
        )}
        {cover === "nix" && "❄"}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        {cover === "swing" && <img src="/swingIcon1.png" alt="" />}
        {cover === "book" && <div>THE UNKNOWN<small>JATO LEE CHRONICLES · I</small></div>}
      </div>
    </div>
  );
}
