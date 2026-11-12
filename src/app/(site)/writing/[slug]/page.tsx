import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ReadingProgress } from "@/redesign/components/ReadingProgress";
import prose from "@/redesign/components/Prose.module.css";
import { renderMarkdown } from "@/redesign/content/markdown";
import { formatDate, getAllPosts, getPost } from "@/redesign/content/posts";
import styles from "./page.module.css";

type Props = { params: { slug: string } };

// One static page per file in content/posts; any other slug is a 404.
export const dynamicParams = false;
export const generateStaticParams = () => getAllPosts().map(({ slug }) => ({ slug }));

export function generateMetadata({ params }: Props): Metadata {
  const post = getPost(params.slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.excerpt,
    // Posts have no cover art yet, so link previews fall back to the portrait.
    openGraph: { type: "article", title: post.title, description: post.excerpt, publishedTime: post.date, images: ["/Sterling.jpg"] },
  };
}

export default function PostPage({ params }: Props) {
  const post = getPost(params.slug);
  if (!post) notFound();

  return (
    <>
      <ReadingProgress className={styles.progress} />
      <article className={styles.post}>
        <div className={styles.meta}>
          <span className={`tag ${post.category === "life" ? "life" : ""}`}>{post.category}</span>
          <time dateTime={post.date}>{formatDate(post.date)}</time>
          <span>·</span>
          <span>{post.minutes} min read</span>
        </div>
        <h1 className={styles.title}>{post.title}</h1>
        <div className={prose.prose} dangerouslySetInnerHTML={{ __html: renderMarkdown(post.body) }} />
        <div className={styles.end}>
          <Link href="/index#writing">← All writing</Link>
          <span>Thanks for reading.</span>
        </div>
      </article>
    </>
  );
}
