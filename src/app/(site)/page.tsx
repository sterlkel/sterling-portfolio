import Link from "next/link";
import { Reveal } from "@/redesign/chrome/Reveal";
import { Elsewhere } from "@/redesign/components/Elsewhere";
import { Writing } from "@/redesign/components/Writing";
import { getAllPosts } from "@/redesign/content/posts";
import { selectedWork } from "@/redesign/home";
import { elsewhere } from "@/redesign/site";
import { Hero } from "./Hero";
import styles from "./page.module.css";

export default function HomePage() {
  return (
    <>
      <Hero />

      <div className={styles.content}>
        <Reveal className={styles.sectionsReveal}>
          <div className={styles.two}>
            <section id="latest-writing" aria-label="Latest writing">
              <div className={styles.colHead}>
                <h2>Latest writing</h2>
                <Link href="/index#writing">all posts →</Link>
              </div>
              <Writing posts={getAllPosts()} variant="home" />
            </section>

            <section id="selected-work" aria-label="Selected work">
              <div className={styles.colHead}>
                <h2>Selected work</h2>
                <Link href="/index#work">all work →</Link>
              </div>
              {selectedWork.map((work) => (
                <Link className={styles.row} href={work.href} key={work.title}>
                  <div className={styles.cover} style={{ background: work.coverBackground }} aria-hidden="true" />
                  <div><b>{work.title}</b><span>{work.pitch}</span></div>
                </Link>
              ))}
            </section>
          </div>
        </Reveal>

        <Elsewhere className={styles.elsewhere} links={elsewhere} />
      </div>
    </>
  );
}
