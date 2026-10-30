// Homepage preview content. Add future posts and projects here instead of editing the page component.
export const writingDrafts = [
  { title: "Building a personal CLI I actually use", status: "editing", progress: 82 },
  { title: "Declaring my whole Mac with nix-darwin", status: "drafting", progress: 55 },
  { title: "On finishing a novel", status: "outlining", progress: 20 },
] as const;

export const selectedWork = [
  {
    title: "Sterling Portfolio",
    pitch: "A hand-built home for my work, writing and experiments.",
    href: "/",
    coverBackground: "linear-gradient(135deg, var(--accent), #8d78ff 55%, #171525)",
  },
] as const;

export const elsewhere = [
  { label: "index", href: "/" },
  { label: "résumé", href: "/resume" },
  { label: "contact", href: "/contact" },
] as const;
