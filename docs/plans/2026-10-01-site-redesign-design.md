# Site redesign: design decisions

The chosen mock, **Final A · Portrait**, lives in `design/demos/final-a/` (open `design/demos/index.html`). Implementation is tracked in Linear under STI-342. The component sketches and the exploration demos referenced below (rounds 1 and 2, Final B) were removed from the tree once Portrait was chosen; they remain in git history at commit `0d0999a`.

## Goals
- Blog-forward enough to start writing now. Drafts private, published posts public, tagged **Tech** (most) or **Life**.
- Keep everything the current site has: projects, resume + PDF, contact, about.
- Add a short `/card` link that works as a business card.

## Component decisions

| Component | Decision |
|---|---|
| Themes | Abyss (navy, teal, violet) = dark; Ink on paper (cream, ink, red) = light. Toggle on every page. |
| Hero | Flow field: lines **part** around the cursor, **click shockwave**, "SK" emerges when idle. No vortex. Constellation links only in one demo. |
| Structure | Mostly one scrolling homepage + detail pages; minimalist demo uses separate pages. |
| Experience | A: scroll-drawn spine (default). D: minimal expandable list (minimalist). B: sticky chapters as a separate "Story" page. Two-track dropped. |
| Work | A: big two-up with case-study pages (default). Index-with-peek for minimalist. Must scale past 6 items. |
| Projects | sting-cli, Apple Music Manager, Meal Planner, nix config, Swing Campaign, The Unknown (+ more coming). |
| Skills | Bubbles and keycaps preferred; bouncy marquee as backup. Physics pit / terminal rejected. Wanted non-pill forms. |
| Resume | Native web resume with print stylesheet (single source of truth); interactive skill-highlight variant in one demo. |
| Blog | Index: plain list (minimal) or magazine with featured post (inviting). Post: literary (minimal) or TOC + sidenotes. |
| Contact | Email-first with copy, channel cards, **booking link**. Conversational form in the playful demo. |
| Card | Phone-first card (photo, name, Save contact vCard) + link list; flips to a QR code. |
| Dividers | Soft wave, scroll-drawn line, chapter rule, flow strip. |

## The five demos
1. **Abyss**: portfolio-first scroll story.
2. **Constellation**: playful; constellation links, keycaps, soft waves, conversational form, Story page.
3. **Field Notes**: equal weight; writing | work split, chapter rules, Life posts auto-switch to literary layout.
4. **Notebook**: blog-first, light by default.
5. **Plain Text**: minimalist, separate pages.

## Open items
- Current role (title, company, start), Bonterra end date, Cobu dates, *The Unknown* publication year, location.
- Real email address and booking provider (placeholders: `hello@sterlingkelly.dev`, `cal.com/sterlingkelly`).
- "Zola" business-card reference: clarify which product was meant.
- Tech decisions after choosing a demo: blog authoring + private drafts (MDX in repo vs. hosted CMS vs. third-party redirect), booking provider, vCard/QR generation, whether to keep Mantine/MUI/Bootstrap.

## Round 1 feedback → round 2
Favorites: **Notebook (4)** and **Plain Text (5)**; the rest felt busy.
- Résumé should look like the file: **embed the PDF**, update by uploading a new one.
- Keep: big bold landing + buttons (Constellation's > Abyss's), keycaps, Field Notes' latest-writing list, Notebook's "Elsewhere" cards, the card page, Plain Text's blog and about/experience list.
- Drop: long single-page scroll, bubbles (off-theme), Story page, conversational form (contact should be simple), massive featured post (no thumbnails), blog-as-homepage for now.
- Work layout must not sprawl; drawn lines didn't cleanly separate the hero from the content.

Round 2 demos (all multi-page, short homepages, PDF résumé, simple contact): **Hello**, **Margin**, **Index Card**, **Paper**, **Sidebar**.

## Round 2 feedback → final mock
- **Margin** is the base. Keep the face up front, and make it bigger.
- Bring back Hello's interactivity: flow hero with shockwave and signature, waving hand, rising headline, bouncy buttons.
- Needs a **coming-soon writing state** while the first posts are drafted.
- Index Card's writing | work lists as their own **Index** page, plus its one-line Elsewhere.
- Drop Paper and Sidebar. FundingDesk is *not* the current role (placeholders stay).

Final options: **Final A · Portrait** (full interactive hero with a large tilting portrait, Margin below) and **Final B · Margin+** (Margin with a big playful portrait and a taller interactive ink strip).

## Decision
**Final A · Portrait** (`design/demos/final-a/`) is the chosen direction.
- Nav: **Index, About, Resume, Contact**. Separate Writing and Work pages are dropped; the **Index** page (writing | work lists) holds both, and every "all posts / all work" link points there.
- Contact uses Notebook's version: large copyable email + channel cards with a highlighted booking card.
- Everything else as in Final A: tilting portrait hero with flow field, coming-soon writing state, literary posts, case-study pages, About with experience list + keycaps, embedded PDF résumé, business card.
