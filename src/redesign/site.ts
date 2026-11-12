// Site-wide identity and navigation for the Portrait redesign (STI-342).

export const person = {
  name: "Sterling Kelly",
  github: "https://github.com/sterlkel",
  linkedin: "https://www.linkedin.com/in/sterling-kelly-2970241b0/",
};

// About and Card join these lists when their pages land (STI-350, STI-351).
// Resume and Contact point at the old pages until STI-256 and STI-255 replace them.
export const navLinks = [
  { label: "Index", href: "/index" },
  { label: "Resume", href: "/resume" },
  { label: "Contact", href: "/contact" },
];

// The one-line "Elsewhere" list at the bottom of the homepage and Index.
export const elsewhere = [
  { label: "index", href: "/index" },
  { label: "résumé", href: "/resume" },
  { label: "contact", href: "/contact" },
];
