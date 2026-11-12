import type { Metadata } from "next";
import { resume } from "@/redesign/site";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Résumé",
  description: "Sterling Kelly's résumé, as a PDF.",
};

export default function ResumePage() {
  return (
    <div className={styles.page}>
      <header className={styles.bar}>
        <div>
          <h1 className="page-title">Résumé</h1>
          <span className={styles.updated}>PDF · updated {resume.updated}</span>
        </div>
        <div className={styles.actions}>
          <a className="btn ghost" href={resume.file} target="_blank" rel="noopener">Open</a>
          <a className="btn" href={resume.file} download="Sterling Kelly Resume.pdf">Download</a>
        </div>
      </header>

      <div className={styles.desk}>
        <div className={styles.sheet}>
          {/* The link sits behind the frame, so it shows wherever the browser can't draw the PDF inline. */}
          <a className={styles.fallback} href={resume.file}>
            <span>Your browser can&apos;t show the PDF here.</span>
            <b className="btn">Open the résumé →</b>
          </a>
          <iframe src={`${resume.file}#toolbar=0&navpanes=0&view=FitH`} title="Résumé PDF" loading="lazy" />
        </div>
      </div>
    </div>
  );
}
