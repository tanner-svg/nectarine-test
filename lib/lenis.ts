import type Lenis from "lenis";

// Lets other components (modals, overlays) pause/resume the site-wide
// smooth-scroll instance created in components/SmoothScroll.tsx, e.g. to
// stop the page behind a pop-up from scrolling while it's open.
export const lenisRef: { current: Lenis | null } = { current: null };
