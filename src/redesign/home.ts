// Homepage content from the approved Portrait mock.
export const writingDrafts = [
  { title: "Building a personal CLI I actually use", status: "editing", progress: 82 },
  { title: "Declaring my whole Mac with nix-darwin", status: "drafting", progress: 55 },
  { title: "On finishing a novel", status: "outlining", progress: 20 },
] as const;

export const selectedWork = [
  { key: "cli", title: "sting-cli", pitch: "A personal command line for notes, AI and automation." },
  { key: "music", title: "Apple Music Manager", pitch: "Tools to tame a sprawling music library." },
  { key: "meal", title: "Meal Planner", pitch: "Plan the week, generate the grocery list." },
] as const;

export const elsewhere = [
  { label: "index", href: "/" },
  { label: "résumé", href: "/resume" },
  { label: "contact", href: "/contact" },
] as const;
