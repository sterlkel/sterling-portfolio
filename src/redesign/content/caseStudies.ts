import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { renderMarkdown } from "./markdown";

export type CaseStudy = {
  role: string;
  timeline: string;
  stats: { value: string; label: string }[];
  sections: { heading: string; html: string }[];
};

// The write-up for a project, from content/work/<slug>.md. Projects without a file have no case study yet.
export function getCaseStudy(slug: string): CaseStudy | undefined {
  const file = path.join(process.cwd(), "content/work", `${slug}.md`);
  if (!fs.existsSync(file)) return undefined;

  const { data, content } = matter(fs.readFileSync(file, "utf8"));
  for (const field of ["role", "timeline"]) {
    if (!data[field]) throw new Error(`content/work/${slug}.md: missing "${field}" in the frontmatter`);
  }

  // Each "## Heading" starts a section; the page lays them out as heading-left, body-right rows.
  const sections = content.split(/^## +/m).slice(1).map(chunk => {
    const [heading, ...body] = chunk.split("\n");
    return { heading: heading.trim(), html: renderMarkdown(body.join("\n")) };
  });

  return {
    role: String(data.role),
    timeline: String(data.timeline),
    stats: (data.stats ?? []).map((s: { value: unknown; label: unknown }) => ({ value: String(s.value), label: String(s.label) })),
    sections,
  };
}
