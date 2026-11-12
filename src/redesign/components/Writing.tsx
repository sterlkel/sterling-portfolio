import Link from "next/link";
import { onTheDesk } from "../content/desk";
import { formatDate, type Post } from "../content/posts";
import styles from "./Writing.module.css";

const postHref = (post: Post) => `/writing/${post.slug}`;

// Shown in place of a post list while there are no published posts.
export function WritingSoon({ big = false }: { big?: boolean }) {
  return (
    <div className={big ? styles.big : undefined}>
      <p className={styles.lede}>First posts are on the way<span className={styles.cursor} /></p>
      <p className={styles.sub}>I&apos;m writing the first few now. Here&apos;s what&apos;s on the desk:</p>
      {onTheDesk.map(draft => (
        <div className={styles.draft} key={draft.title}>
          <b>{draft.title}</b>
          <span className={styles.draftMeta}>
            <span className={draft.status === "editing" ? styles.statusHot : styles.status}>{draft.status}</span>
            <span className={styles.bar} role="progressbar" aria-label={`${draft.title} progress`} aria-valuemin={0} aria-valuemax={100} aria-valuenow={draft.progress}><i style={{ width: `${draft.progress}%` }} /></span>
          </span>
        </div>
      ))}
      {big && <p className={styles.sub}>Meanwhile, <Link href="/index#work">see what I&apos;ve built →</Link></p>}
    </div>
  );
}

// Homepage list: date, title and excerpt.
export function LatestPosts({ posts }: { posts: Post[] }) {
  return (
    <div>
      {posts.map(post => (
        <Link className={styles.latest} href={postHref(post)} key={post.slug}>
          <span className={styles.date}>{formatDate(post.date, { day: false })}</span>
          <span>
            <b>{post.title}</b>{post.category === "life" && <i>life</i>}
            <span className={styles.excerpt}>{post.excerpt}</span>
          </span>
        </Link>
      ))}
    </div>
  );
}

// Index list: one dated serif line per post.
export function PostList({ posts }: { posts: Post[] }) {
  return (
    <div className={styles.plain}>
      {posts.map(post => (
        <div className={styles.plainPost} key={post.slug}>
          <span className={styles.plainDate}>{post.date.slice(0, 7).replace("-", ".")}</span>
          <span>
            <Link href={postHref(post)}>{post.title}</Link>
            {post.category === "life" && <span className={styles.lifeMark}>· life</span>}
          </span>
        </div>
      ))}
    </div>
  );
}

// The full list when posts exist, the coming-soon state when they don't.
export function Writing({ posts, variant }: { posts: Post[]; variant: "home" | "index" }) {
  if (!posts.length) return <WritingSoon big={variant === "index"} />;
  return variant === "home" ? <LatestPosts posts={posts.slice(0, 3)} /> : <PostList posts={posts} />;
}
