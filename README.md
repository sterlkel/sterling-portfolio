## Sterling Kelly's Portfolio!!!

Hello and welcome! You have made it to my github and are looking at my repo for portfolio! This website should exclusively be used to check out whatever I have going on!

This is a [Next.js](https://nextjs.org/) project, deployed on Vercel. It is styled with plain CSS: design tokens in `src/redesign/tokens.css`, shared styles in `src/redesign/base.css`, and a CSS module beside each page or component. There is no UI library.

Give it a look! Any recommendations are welcomed!

## Getting Started

First, run the development server:

```bash
bun install
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Where things live

- `src/app/(site)/` holds the pages: home, `/index`, `/about`, `/resume`, `/contact`, `/card`, `/writing/<slug>` and `/work/<slug>`.
- `src/redesign/site.ts` holds the name, email, booking link, social links and navigation.
- `src/redesign/content/` holds the projects list, the About page content and the Markdown loaders.
- `content/` holds posts and case-study write-ups as Markdown. See `content/README.md`.
- `public/resume.pdf` is the résumé. Replace the file to update it.
- `design/demos/` holds the original HTML mock the site was built from.
