import type { Metadata } from "next";
import Link from "next/link";
import { Elsewhere } from "@/redesign/components/Elsewhere";
import { Writing } from "@/redesign/components/Writing";
import { getAllPosts } from "@/redesign/content/posts";
import { projects, workHref } from "@/redesign/content/projects";
import { elsewhere } from "@/redesign/site";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Index",
  description: "Every post and every project, on one page.",
};

export default function IndexPage() {
  return (
    <div className="wrap pg">
      <p className="eyebrow">{"// index"}</p>
      <h1 className="page-title">Writing &amp; work.</h1>
      <p className="page-sub">Every post and every project, on one page.</p>

      <div className={styles.everything}>
        <section id="writing" aria-labelledby="writing-h">
          <h2 className={styles.chapter} id="writing-h"><span />Writing</h2>
          <Writing posts={getAllPosts()} variant="index" />
        </section>
        <section id="work" aria-labelledby="work-h">
          <h2 className={styles.chapter} id="work-h"><span />Work</h2>
          <div className={styles.work}>
            {projects.map(project => (
              <Link href={workHref(project)} key={project.slug}>
                <span>{project.title}</span><small>{project.type}</small>
              </Link>
            ))}
          </div>
        </section>
      </div>

      <Elsewhere className={styles.elsewhere} links={elsewhere.filter(link => link.href !== "/index")} />
    </div>
  );
}
