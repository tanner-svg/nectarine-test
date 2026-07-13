# Nectarine Studio

> A creative studio developing timeless, world-class brands for holistic, impact-driven companies.

## Brand Identity

- **Personality:** Bold, warm, intentional — human-centered creative studio
- **Primary Color:** Deep burgundy `#380102` (used for text and dark backgrounds)
- **Accent Color:** Coral red `#d7432a` (buttons, highlights, hover states)
- **Background Colors:** Cream `#fcf8f3`, peach `#f8e4cc`, pale peach `#f7dec1`, salmon `#ffc1a7`, yellow `#f9ce6a`
- **Display Font:** Belanosima (headings, buttons, labels) — loaded via `next/font/google` (baked in at build time, no external request)
- **Body Font:** Aleo (body text, quotes, section headings) — loaded via `next/font/google`
- **Form Font:** Inter (form field labels and inputs) — loaded via `next/font/google`
- **Logo:** SVG files in `.shipstudio/assets/` — `nectarine-logo-4.svg` (light navbar), `nectarine-logo-5.svg` (dark/menu navbar), `nectarine-logo-footer-4.svg` (dark footer), `nectarine-logo-footer-5.svg` (light footer)

## Pages

- **Homepage** (`/`) — Hero with "Make Your Brand Sticky", portfolio grid (4 cards), The Fuzz Tax section, Strategy & Consultations (Workshops + Audits cards), Creative Services (Growth Plans + Projects), parallax yellow section, What We Do services grid, Patrick Lowndes testimonial, contact form
- **Our Work** (`/work`) — Featured case study (Pinkston for TN) with sticky sidebar + scrolling image grid, additional portfolio cards grid. Click "Read the full story" to open case study overlay modal.
- **What We Do** (`/what-we-do`) — Service category hero with filter tags, Design service breakdown with dropdown list, Featured Services cards (AI Brand Kit, Print & Production), portfolio preview grid
- **Workshops & Audits** (`/workshops-audits`) — Hero on dark burgundy, Workshops card (coral/red), Audits card (salmon), testimonial, light footer

## Components

- **Navbar** (`components/Navbar.tsx`) — Fixed top bar with Nectarine logo + red hamburger button. Click hamburger to open full-screen coral menu with nav links. Has two logo states: default (nectarine-logo-4.svg) and menu-open (nectarine-logo-5.svg).
- **Footer** (`components/Footer.tsx`) — Two variants: `variant="dark"` (burgundy bg, used on most pages) and `variant="light"` (pale peach bg, used on Workshops page). Contains company blurb, social links, email button, and large wordmark logo.

## Assets

All assets live in `.shipstudio/assets/` and are served via a symlink at `public/.shipstudio → ../.shipstudio`.

Icons used: `workshop-icon.svg`, `audit-icon.svg`, `design-icon.svg`, `copywriting-icon.svg`, `websites-icon.svg`, `video-icon.svg`, `events-icon.svg`, `strategy-icon.svg`, `cancel.svg`, `parallax-bg.svg`
Photos: `patrick-image.png` (testimonial section)

## Image Placeholders

Portfolio/case study images throughout the site are currently shown as gray placeholder boxes. To replace:
- Tell Claude: "Replace [logo-anim-1] with your-image.jpg" 
- Or: "Add the real Pinkston campaign photos to the work page"

| Placeholder | Location | Size |
|-------------|----------|------|
| Portfolio cards | Homepage, /work, /what-we-do | Various |
| [logo-anim-1] through [Tezza-5956] | /work page image grid | Various |
| [workshop-photo] | /workshops-audits Workshops card | 639x345 |
| [contact-illustration] | Homepage contact section | 492x350 |
| [case-study-image] | Case study overlay modal | 513x681 |

## Portfolio Data Schema

Projects live in `data/content/projects.ts` using the `Project` type from `types/portfolio.ts`. Each project has:
- `title`, `slug`, `body` — name, URL slug, case study text
- `coverMedia` — `{ type: 'image' | 'video', url: string }` — image or video cover
- `attributes` — array of `'web design' | 'copywriting' | 'strategy' | 'branding'`
- `clientQuote` — `{ text, author, role, isFeatured: boolean }` — set `isFeatured: true` to feature in testimonial slider

Helper functions in `lib/portfolio.ts`: `getAllProjects()`, `getProjectsByAttribute()`, `getFeaturedProjects()`

Portfolio asset files go in `.shipstudio/assets/portfolio/` (served at `/.shipstudio/assets/portfolio/your-file.jpg`).

Current projects: Pinkston for Tennessee, Frontier Operators, David Bruce Winery (video cover), Faith Driven Talent. Featured (in testimonials): Frontier Operators + David Bruce Winery.

## Recent Changes

- **2026-07-13:** Wired homepage portfolio bento grid and testimonial slider to live project data. The 4 bento cards now pull from `getAllProjects()`, render real cover images/videos, and link to `/portfolio/[slug]`. The testimonial slider pulls from `getFeaturedProjects()`, shows real client quotes with author/role, and links to each project's case study page. Image placeholders will fill in once asset files are added to `.shipstudio/assets/portfolio/`.
- **2026-07-13:** Three homepage refinements — button text now smoothly fades between colors on hover (instead of snapping), all 4 portfolio bento cards have equal image height (380px fixed), Workshops and Audits cards now expand on hover with ease-in-out animation (Workshops stays red, Audits stays pink).
- **2026-07-12:** Built entire site from Figma design brief — 4 pages + Navbar + Footer components. Set up Belanosima + Aleo fonts, brand color tokens, symlinked `.shipstudio/assets/` into `public/` for asset serving. Enabled `images.unoptimized` and `dangerouslyAllowSVG` in next.config.ts.

## How to Customize

- **To change colors:** Edit the CSS variables in `app/globals.css` under `:root`
- **To add a new page:** Create a new folder in `app/` (e.g. `app/about/`) with a `page.tsx` file inside it
- **To swap placeholder images:** Drop your image file into `public/` and tell Claude which placeholder to replace
- **To update copy:** Find the text in the relevant page file (`app/page.tsx` for homepage, etc.) and edit directly
- **To add a new portfolio project:** Add a new entry to `data/content/projects.ts` following the existing format, then drop the cover image/video into `.shipstudio/assets/portfolio/`
- **To feature a client quote in the testimonial slider:** Set `clientQuote.isFeatured: true` on that project in `data/content/projects.ts`
