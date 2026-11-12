// Content for the About page. Edit this file to update the bio, experience list or skills.

// TODO(STI-346): the mock's second paragraph ends with a line about the current role. Add it once that's decided.
export const bio = [
  "I'm a full stack engineer who likes building tools that make everyday things a little less annoying, for the people I work with and for myself.",
  "I studied Information Science at Cornell, co-founded a civic tech company straight out of school, and have spent the years since shipping product on platform teams.",
  "Outside of work I write. I've published a fantasy novel, and this site is where I'm starting to write more often, mostly about tech, sometimes about life.",
];

export type Experience = {
  years: string; // shown as-is, e.g. "2020–2022"
  title: string;
  org: string;
  milestone?: boolean; // a milestone reads "B.A. … Cornell" rather than "… at Cornell"
  text?: string; // a sentence or two, shown when the row is expanded
};

// Newest first.
// TODO(STI-346): add the current role (title, company, start year) at the top, the year the Bonterra role ended,
// and the Cobu internship's years. The old site's dates for those were out of date, so they are left out here.
export const experience: Experience[] = [
  { years: "2021", title: "Full Stack Software Engineer", org: "Bonterra",
    text: "C#, React and SQL on Mobile Messaging and Process Automation for the NGP VAN Action Platform. Led Redux refactors and shipped a payments integration on an expedited timeline." },
  { years: "2020–2022", title: "Co-Founder & CEO", org: "Swing Campaign",
    text: "Built an app that showed people who best represented them. React Native + Django, led design, ran user interviews." },
  { years: "2020", title: "B.A. Information Science", org: "Cornell University", milestone: true },
  { years: "2019", title: "Research Analyst", org: "Cornell CCT Lab",
    text: "A Chrome extension that produced toxicity reports for Reddit threads, backed by research into which words start arguments." },
  { years: "", title: "Full Stack Engineer Intern", org: "Cobu (formerly Doorbell.me)",
    text: "Built admin tooling the operations team asked for and talked to residents about what would make the app better." },
];

// `level` is 1–5 and shows as stars on the key; level 5 keys are wide and accent-coloured.
export const skills = [
  { name: "React", level: 5 }, { name: "TypeScript", level: 5 }, { name: "C#", level: 4 }, { name: "Python", level: 4 }, { name: "SQL", level: 4 },
  { name: "JavaScript", level: 4 }, { name: "Django", level: 3 }, { name: "Redux", level: 3 }, { name: "Next.js", level: 3 }, { name: "Git", level: 3 },
  { name: "Nix", level: 2 }, { name: "Swift", level: 2 }, { name: "Java", level: 2 }, { name: "Docker", level: 2 },
];
