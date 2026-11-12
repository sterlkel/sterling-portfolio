import rehypeHighlight from "rehype-highlight";
import rehypeStringify from "rehype-stringify";
import remarkGfm from "remark-gfm";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import { unified } from "unified";

// Minimal mdast shape; enough for the footnote rewrite below.
type Node = { type: string; identifier?: string; value?: string; children?: Node[]; data?: Record<string, unknown> };

const walk = (node: Node, visit: (node: Node) => void) => { visit(node); node.children?.forEach(child => walk(child, visit)); };
const sup = (n: number): Node => ({ type: "noteNumber", data: { hName: "sup" }, children: [{ type: "text", value: String(n) }] });

// Turns Markdown footnotes into inline notes: each reference becomes a number,
// and the note's text is placed directly under the block that references it.
function inlineNotes() {
  return (tree: Node) => {
    const notes = new Map<string, Node[]>();
    tree.children = (tree.children ?? []).filter(node => {
      if (node.type !== "footnoteDefinition") return true;
      // A note is one line of text, so its paragraphs are flattened into a single run.
      notes.set(node.identifier!, (node.children ?? []).flatMap(child => child.children ?? []));
      return false;
    });

    let count = 0;
    tree.children = tree.children.flatMap(block => {
      const after: Node[] = [];
      walk(block, node => {
        node.children = node.children?.map(child => {
          if (child.type !== "footnoteReference" || !notes.has(child.identifier!)) return child;
          count += 1;
          after.push({
            type: "inlineNote",
            data: { hName: "aside", hProperties: { className: ["inline-note"] } },
            children: [sup(count), { type: "text", value: " " }, ...notes.get(child.identifier!)!],
          });
          return sup(count);
        });
      });
      return [block, ...after];
    });
  };
}

const processor = unified()
  .use(remarkParse)
  .use(remarkGfm)
  .use(inlineNotes)
  .use(remarkRehype)
  .use(rehypeHighlight, { detect: false })
  .use(rehypeStringify);

// Markdown → HTML, at build time. Content comes from this repo, so raw HTML in Markdown is dropped rather than trusted.
export const renderMarkdown = (markdown: string) => String(processor.processSync(markdown));
