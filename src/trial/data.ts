// Content for the styling trial. Mirrors design/demos/shared/data.js.
export const person = {
  first: "Sterling",
  name: "Sterling Kelly",
  photo: "/Sterling.jpg",
};

export const drafts = [
  { title: "Building a personal CLI I actually use", status: "editing", pct: 82 },
  { title: "Declaring my whole Mac with nix-darwin", status: "drafting", pct: 55 },
  { title: "On finishing a novel", status: "outlining", pct: 20 },
] as const;

export const projects = [
  { key: "cli", title: "sting-cli", pitch: "A personal command line for notes, AI and automation." },
  { key: "music", title: "Apple Music Manager", pitch: "Tools to tame a sprawling music library." },
  { key: "meal", title: "Meal Planner", pitch: "Plan the week, generate the grocery list." },
] as const;

export const elsewhere = [
  ["index", "#"],
  ["about", "#"],
  ["résumé", "#"],
  ["contact", "#"],
  ["card", "#"],
] as const;

export const navLinks = ["Index", "About", "Resume", "Contact"] as const;
