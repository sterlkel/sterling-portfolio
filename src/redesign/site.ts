// Site-wide identity and navigation for the Portrait redesign (STI-342).

export const person = {
  name: "Sterling Kelly",
  github: "https://github.com/sterlkel",
  linkedin: "https://www.linkedin.com/in/sterling-kelly-2970241b0/",
};

// About and Card get their pages in STI-348 and STI-351, so they remain absent from navigation for now.
// Resume and Contact point at the old pages until STI-256 and STI-255 replace them.
export const navLinks = [
  { label: "Index", href: "/" },
  { label: "Resume", href: "/resume" },
  { label: "Contact", href: "/contact" },
];
