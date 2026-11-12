// Site-wide identity and navigation for the Portrait redesign (STI-342).

export const siteUrl = "https://sterling-portfolio.vercel.app";

export const person = {
  name: "Sterling Kelly",
  title: "Full Stack Software Engineer",
  // TODO(STI-346): placeholders from the mock. Replace both with the real address and booking link before this ships.
  email: "hello@sterlingkelly.dev",
  booking: "https://cal.com/sterlingkelly",
  github: "https://github.com/sterlkel",
  linkedin: "https://www.linkedin.com/in/sterling-kelly-2970241b0/",
};

export const navLinks = [
  { label: "Index", href: "/index" },
  { label: "About", href: "/about" },
  { label: "Resume", href: "/resume" },
  { label: "Contact", href: "/contact" },
];

// The résumé is public/resume.pdf; replace that file to update it. The PDF carries no date of its own,
// so bump this label when the file changes.
export const resume = { file: "/resume.pdf", updated: "Jun 2024" };

// The one-line "Elsewhere" list at the bottom of the homepage and Index.
export const elsewhere = [
  { label: "index", href: "/index" },
  { label: "about", href: "/about" },
  { label: "résumé", href: "/resume" },
  { label: "contact", href: "/contact" },
  { label: "card", href: "/card" },
];
