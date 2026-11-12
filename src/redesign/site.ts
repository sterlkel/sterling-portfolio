// Site-wide identity and navigation for the Portrait redesign (STI-342).

export const siteUrl = "https://sterling-portfolio.vercel.app";

export const person = {
  name: "Sterling Kelly",
  // TODO(STI-346): placeholders from the mock. Replace both with the real address and booking link before this ships.
  email: "hello@sterlingkelly.dev",
  booking: "https://cal.com/sterlingkelly",
  github: "https://github.com/sterlkel",
  linkedin: "https://www.linkedin.com/in/sterling-kelly-2970241b0/",
};

// Card joins the Elsewhere list when its page lands (STI-351).
// Resume points at the old page until STI-256 replaces it.
export const navLinks = [
  { label: "Index", href: "/index" },
  { label: "About", href: "/about" },
  { label: "Resume", href: "/resume" },
  { label: "Contact", href: "/contact" },
];

// The one-line "Elsewhere" list at the bottom of the homepage and Index.
export const elsewhere = [
  { label: "index", href: "/index" },
  { label: "about", href: "/about" },
  { label: "résumé", href: "/resume" },
  { label: "contact", href: "/contact" },
];
