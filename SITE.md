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
- **What We Do** (`/what-we-do`) — Service category hero with 6 filter buttons (Design, Writing & Copy, Digital & UI Design, Videography & Media, Events Design & Media, Workshops & Audits). Clicking a button animates the service detail section below it (icon, title, description, CTA, and list of sub-services). Auto-cycles every 4 seconds. Featured Services static cards (AI Brand Kit, Print & Production) below that. Static portfolio grid at the bottom shows all projects.
- **Workshops & Audits** (`/workshops-audits`) — Hero on dark burgundy, Workshops card (coral/red), Audits card (salmon), testimonial, light footer

## Components

- **Navbar** (`components/Navbar.tsx`) — Fixed top bar with Nectarine logo + red hamburger button. Click hamburger to open full-screen coral menu with nav links. Has two logo states: default (nectarine-logo-4.svg) and menu-open (nectarine-logo-5.svg).
- **Footer** (`components/Footer.tsx`) — Two variants: `variant="dark"` (burgundy bg, used on most pages) and `variant="light"` (pale peach bg, used on Workshops page). Contains company blurb, social links, email button, and large wordmark logo.

## Assets

Assets live in `.shipstudio/assets/`, but are actually served from `public/.shipstudio/assets/` — a separate copy of the folder (not a live symlink, despite the name). New files added to `.shipstudio/assets/` must also be copied into `public/.shipstudio/assets/` to show up on the site.

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

### Fuzz Tax cards (Homepage)

The 4 stacked/rotating cards in "The Fuzz Tax" section are images, not coded text — each card is its own image file so you can export a new design from Figma and drop it in without touching code.

- Files: `.shipstudio/assets/fuzz-card-1.png` through `fuzz-card-4.png`
- Card 1 is the real exported design ("A Tax on Your Opportunities"). Cards 2-4 are cropped from your reference screenshot as stand-ins ("A Tax on Your Audience", "A Tax on Your Team", "A Tax on You…") — swap them for cleaner exports whenever you're ready.
- Recommended export size: ~1130×770px (ratio 1.47:1) so they match the carousel's card shape exactly. Other ratios will get slightly cropped/stretched.
- To swap one: tell Claude "replace fuzz-card-2 with this image" and attach the export — it'll drop the file in place; no code changes needed.

## Portfolio Data Schema

Projects live in `data/content/projects.ts` using the `Project` type from `types/portfolio.ts`. Each project has:
- `title`, `slug`, `body` — name, URL slug, case study text
- `coverMedia` — `{ type: 'image' | 'video', url: string }` — image or video cover
- `attributes` — array of `'web design' | 'copywriting' | 'strategy' | 'branding'`
- `clientQuote` — `{ text, author, role, isFeatured: boolean }` — set `isFeatured: true` to feature in testimonial slider

Helper functions in `lib/portfolio.ts`: `getAllProjects()`, `getProjectsByAttribute()`, `getFeaturedProjects()`

Portfolio asset files go in `.shipstudio/assets/portfolio/` (served at `/.shipstudio/assets/portfolio/your-file.jpg`).

Current projects: Pinkston for Tennessee, Frontier Operators, David Bruce Winery (video cover), Faith Driven Talent. Featured (in testimonials): Frontier Operators + David Bruce Winery.

## Service Content

Service copy lives in `data/content/services.ts`. Each service has a `label` (button text), `icon` (SVG path), `title`, `description`, `ctaText`, `ctaHref`, and `items` (array of 5 sub-services with title + desc). To update copy for any category, edit that service's entry in this file.

- **2026-07-14:** Fixed the Fuzz Tax card swipe/drag direction — it was inverted (dragging down moved things up, and vice versa). Now dragging or swiping in a direction moves the cards the same direction, for both touch and mouse.
- **2026-07-14:** Fuzz Tax cards can now be clicked and dragged with a mouse (not just touch-swiped) to manually flip through them — the cursor shows a "grab" hand to indicate it's draggable.
- **2026-07-14:** Fixed the mobile (horizontal swipe) version of the Fuzz Tax cards getting their top/bottom edges clipped when rotated — the slider box below 768px is now a slightly taller shape (6:5 instead of the image's native 1130:770) so the tilted cards have room to clear the edges.
- **2026-07-14:** Fuzz Tax section now switches to two columns starting at 768px (tablet width) instead of 1024px — the text column and image slider scale proportionally between 768-1023px, then lock to their fixed desktop sizing at 1024px+. This also means the full-height slider and extra text padding now kick in starting at 768px too.
- **2026-07-14:** Fuzz Tax section responsive tuning — at 1024px (tablet/small-laptop width) the layout now matches the full desktop version exactly (previously it looked slightly different until 1280px). Below 768px, the card animation switched from vertical (cards peek from top/bottom, swipe up/down) to horizontal (cards peek from left/right, swipe left/right) — a better fit for narrow phone screens.
- **2026-07-14:** Fuzz Tax text padding increased to 100px top/bottom. Also fixed the rotating cards getting their left/right edges clipped when tilted — each card is now sized at 90% of the slider width (instead of 100%) and centered, so the rotated corners stay inside the container instead of getting cut off by the edge.
- **2026-07-14:** Real Fuzz Tax card images are in and showing correctly. Also increased the top/bottom padding on the left text column by another 20% (50px → 60px) for more breathing room. Note: when adding new files to `.shipstudio/assets/`, they also need to be copied into `public/.shipstudio/assets/` — the folder that used to be a symlink (`public/.shipstudio → ../.shipstudio`) is now a real, separate copy, so new assets don't show up automatically until copied over.
- **2026-07-14:** Fuzz Tax section layout — the image slider on the right now stretches to the full height of the section (no more gap above/below it), and the text column on the left got its own top/bottom padding so it has breathing room instead of relying on the section's padding.
- **2026-07-14:** Rebuilt the Fuzz Tax carousel to show 4 distinct card images (one per "tax" — Opportunities, Audience, Team, You…) instead of repeating one placeholder. Card 1 uses the real exported design; cards 2-4 use cropped stand-ins from your reference screenshot. Carousel card shape now matches the real export ratio (1130x770). See "Fuzz Tax cards" above for how to swap in your own exports.
- **2026-07-13:** Rewired `/what-we-do` so the animated section is the service detail area (icon, title, description, CTA, and sub-service list), not the portfolio grid. Portfolio grid at the bottom is now static and always shows all projects. Service content pulled from `data/content/services.ts` — edit that file to update copy for any category.
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
