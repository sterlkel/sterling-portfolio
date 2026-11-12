// Every project, in the order it appears on the Index page. Each one gets a case-study page at /work/<slug>.
// `cover` names a CSS-drawn stand-in cover until real screenshots exist.
export type Project = {
  slug: string;
  title: string;
  pitch: string;
  type: "Tools" | "Apps" | "Ventures" | "Writing";
  year: string;
  stack: string[];
  cover: "cli" | "music" | "meal" | "nix" | "swing" | "book";
};

export const projects: Project[] = [
  { slug: "sting-cli", title: "sting-cli", pitch: "A personal command line for notes, AI and automation.", type: "Tools", year: "2026", stack: ["Python", "uv", "Claude API"], cover: "cli" },
  { slug: "apple-music-manager", title: "Apple Music Manager", pitch: "Tools to tame a sprawling music library.", type: "Apps", year: "2026", stack: ["Swift", "AppleScript"], cover: "music" },
  { slug: "meal-planner", title: "Meal Planner", pitch: "Plan the week, generate the grocery list.", type: "Apps", year: "2026", stack: ["TypeScript", "React"], cover: "meal" },
  { slug: "nix-config", title: "nix config", pitch: "My whole machine, declared and reproducible.", type: "Tools", year: "2026", stack: ["Nix", "nix-darwin", "home-manager"], cover: "nix" },
  { slug: "swing-campaign", title: "Swing Campaign", pitch: "A civic app showing who really represents you.", type: "Ventures", year: "2020", stack: ["React Native", "Django"], cover: "swing" },
  { slug: "the-unknown", title: "The Unknown", pitch: "A published fantasy novel.", type: "Writing", year: "—", stack: ["Ink", "Stubbornness"], cover: "book" },
];

export const workHref = (project: Project) => `/work/${project.slug}`;
