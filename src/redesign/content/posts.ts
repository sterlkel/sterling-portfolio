import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

export type Post = {
  slug: string;
  title: string;
  date: string; // YYYY-MM-DD
  category: "tech" | "life";
  excerpt: string;
  minutes: number;
  body: string;
};

// Published posts live in content/posts. POSTS_DIR points the site at another folder,
// e.g. content/sample-posts to preview the site with posts in it.
const postsDir = () => path.join(process.cwd(), process.env.POSTS_DIR || "content/posts");

function readPost(file: string): Post {
  const { data, content } = matter(fs.readFileSync(path.join(postsDir(), file), "utf8"));
  const fail = (problem: string): never => { throw new Error(`${file}: ${problem}`); };

  for (const field of ["title", "date", "category", "excerpt"]) {
    if (!data[field]) fail(`missing "${field}" in the frontmatter`);
  }
  // YAML turns an unquoted 2026-10-01 into a Date.
  const date = data.date instanceof Date ? data.date.toISOString().slice(0, 10) : String(data.date);
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) fail(`"date" must look like 2026-10-01`);
  if (data.category !== "tech" && data.category !== "life") fail(`"category" must be tech or life`);

  return {
    slug: file.replace(/\.md$/, ""),
    title: String(data.title),
    date,
    category: data.category,
    excerpt: String(data.excerpt),
    minutes: Math.max(1, Math.round(content.split(/\s+/).filter(Boolean).length / 220)),
    body: content,
  };
}

// Every post, newest first.
export function getAllPosts(): Post[] {
  if (!fs.existsSync(postsDir())) return [];
  return fs.readdirSync(postsDir())
    .filter(file => file.endsWith(".md"))
    .map(readPost)
    .sort((a, b) => b.date.localeCompare(a.date) || a.slug.localeCompare(b.slug));
}

export const getPost = (slug: string) => getAllPosts().find(post => post.slug === slug);

const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

// "2026-10-01" → "Oct 1, 2026", or "Oct 2026" without the day.
export function formatDate(date: string, { day = true } = {}) {
  const [y, m, d] = date.split("-").map(Number);
  return day ? `${months[m - 1]} ${d}, ${y}` : `${months[m - 1]} ${y}`;
}
