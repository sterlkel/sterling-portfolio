import type { Metadata } from "next";
import Image from "next/image";
import { bio, experience, skills } from "@/redesign/content/about";
import { Tilt } from "@/redesign/interactive";
import { person } from "@/redesign/site";
import { ExperienceList } from "./ExperienceList";
import { Keycaps } from "./Keycaps";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "About",
  description: bio[0],
};

export default function AboutPage() {
  return (
    <div className="wrap pg">
      <div className={styles.about}>
        <Tilt className={styles.portrait} max={10}>
          <Image src="/Sterling.jpg" alt={person.name} width={1403} height={951} priority sizes="(max-width: 760px) 360px, 420px" />
        </Tilt>
        <div>
          <h1 className={`page-title ${styles.title}`}>Hello, I&apos;m Sterling.</h1>
          <div className={styles.bio}>{bio.map(paragraph => <p key={paragraph}>{paragraph}</p>)}</div>
        </div>
      </div>

      <h2 className="sub-h">Experience</h2>
      <ExperienceList items={experience} />

      <h2 className="sub-h">Tools I reach for</h2>
      <Keycaps skills={skills} />
    </div>
  );
}
