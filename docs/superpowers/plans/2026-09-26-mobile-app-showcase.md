# Mobile App Showcase Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a polished, multilingual app gallery and dedicated product pages for Presi, Bandaa, and Be Viral AI to Jason’s portfolio.

**Architecture:** Keep the app catalog separate from the legacy automation-project data. Store localized product copy in typed locale files, share the same page and gallery components across French, English, and Spanish routes, and keep only verified product assets in the portfolio’s `public/apps` directory. Reuse the portfolio’s semantic theme classes, profile header, and Next.js metadata conventions.

**Tech Stack:** Next.js 15 App Router, React Server Components, TypeScript, Tailwind CSS, `next/image`, Lucide icons.

---

### Task 1: Create the localized app catalog and curate product assets

**Files:**
- Create: `lib/apps/types.ts`
- Create: `lib/apps/catalog-fr.ts`
- Create: `lib/apps/catalog-en.ts`
- Create: `lib/apps/catalog-es.ts`
- Create: `lib/apps/index.ts`
- Create: `public/apps/presi/icon.png`
- Create: `public/apps/presi/political-video.png`
- Create: `public/apps/presi/analysis-card.png`
- Create: `public/apps/bandaa/icon.png`
- Create: `public/apps/bandaa/guest-feed.png`
- Create: `public/apps/bandaa/shared-album.png`
- Create: `public/apps/be-viral-ai/icon.jpg`
- Create: `public/apps/be-viral-ai/performance-coach.png`
- Create: `public/apps/be-viral-ai/script-editor.png`
- Create: `docs/app-showcase-assets.md`

- [ ] Define `CandidateLocale`, `AppStatus`, `AppScreenshot`, `AppStoreLink`, `LocalizedAppContent`, and `MobileApp` in `lib/apps/types.ts`. The catalog must carry one common stack (`React Native`, `Expo`, `TypeScript`, `Convex`), per-app status/store links/icon, and localized tagline, description, problem, product response, role, and screenshot alt/caption text.
- [ ] Add the three apps in newest-first order: Presi (upcoming, planned early October 2026, no store links), Bandaa (published, Apple and Google Play links already present in `lib/candidate-content.ts`), and Be Viral AI (published, French App Store link `https://apps.apple.com/fr/app/be-viral-ai-analyse-contenu/id6746679101`). Do not invent a Google Play link or product metrics.
- [ ] Copy only visually verified source images into `public/apps`: Presi’s icon from `/Users/mata/App/26k/levels/docs/assets/presi/app-store-generator/public/app-icon.png` and its political app screens from `/Users/mata/App/26k/levels/docs/captures/t-n-le-nom/geste-presi-3-video.png` and `geste-presi-5-carte.png`; Bandaa’s icon from `/Users/mata/App/26k/panoptik/docs/assets/bandaa-mobile/app-store-generator/public/app-icon.png` and two actual app screens from its `public/screenshots/apple/iphone/en/{vertical-feed,book-moments}.png`; Be Viral AI’s icon from Apple’s official artwork URL `https://is1-ssl.mzstatic.com/image/thumb/Purple211/v4/9f/03/3b/9f033be7-3d8e-67d9-2476-cec52c01b29a/AppIcon-0-0-1x_U007epad-0-1-85-220.png/512x512bb.jpg` and actual French interface screens from `/Users/mata/App/26k/editia/docs/assets/be-viral-mobile/app-store-generator/public/screenshots/fr/{coach-score,script}.png`.
- [ ] Do not copy the known wrong Be Viral AI sliders icon, the mislabelled Bandaa “Creator Coach” capture, or the stale Presi `video-rail.png` capture that shows a cooking app. Record the source paths, selection, screen-language caveat, and store-link status in `docs/app-showcase-assets.md`.
- [ ] Export `getMobileApps(locale)` and `getMobileApp(slug, locale)` from `lib/apps/index.ts`; unknown slugs return `undefined`. Keep catalog files focused and under the project’s 150-line guideline.

### Task 2: Build reusable gallery and product-detail UI

**Files:**
- Create: `components/apps/app-card.tsx`
- Create: `components/apps/app-grid.tsx`
- Create: `components/apps/app-screenshot-gallery.tsx`
- Create: `components/apps/app-detail.tsx`
- Create: `components/apps/app-showcase-teaser.tsx`
- Create: `app/apps/page.tsx`
- Create: `app/apps/[slug]/page.tsx`
- Create: `app/[locale]/apps/page.tsx`
- Create: `app/[locale]/apps/[slug]/page.tsx`

- [ ] Build the overview at `/apps`, `/en/apps`, and `/es/apps`. Each app card shows its real icon, name, localized product line, availability badge, and internal detail link. Explain the shared React Native / Expo / TypeScript / Convex stack once on this page.
- [ ] Build one detail page per app in every locale. Present the user problem, product response, Jason’s role, a responsive real-screen gallery with localized alt text/captions, and only links to stores that are live.
- [ ] Add localized page titles/descriptions, canonical paths, and `fr`/`en`/`es` language alternates to both the overview and detail pages. The French route remains unprefixed; English and Spanish use `/en` and `/es`.
- [ ] Keep screens readable on mobile and desktop, use `next/image`, meaningful image dimensions, semantic theme classes, visible keyboard focus, and no autoplay video. Reuse the current portfolio visual language without adding raw color values.

### Task 3: Connect the showcase to existing portfolio navigation and discovery

**Files:**
- Modify: `app/page.tsx`
- Modify: `app/about/page.tsx`
- Modify: `components/candidate-home.tsx`
- Modify: `components/candidate-about.tsx`
- Modify: `components/work-card.tsx`
- Modify: `lib/candidate-content.ts`
- Modify: `middleware.ts`
- Modify: `app/sitemap.ts`

- [ ] Add a compact localized app-showcase teaser to the French home/about pages and the English/Spanish home/about pages. The teaser links to the gallery and avoids repeating the product details.
- [ ] Change the grouped independent-products work item’s sole link from Bandaa’s stores to the localized `/apps` gallery. Update `WorkCard` so internal links use Next navigation in the same tab and only external store links open a new tab.
- [ ] Extend the locale middleware matcher to `/apps/:path*`, `/en/apps/:path*`, and `/es/apps/:path*`.
- [ ] Add the overview and all nine localized detail URLs to `app/sitemap.ts`; point each URL to the matching page and emit its language alternates.
- [ ] Leave `app/projects/[slug]` and `public/data/projects.json` unchanged; they remain the automation case-study system.

### Task 4: Verify the complete local experience

**Files:**
- Review: all files created or modified above

- [ ] Run `npm run build` and `npm run lint:theme` from the feature worktree. Do not add or run automated test suites for this task.
- [ ] Start the portfolio from this worktree on a free local port and manually inspect `/apps`, all three French detail routes, and their `/en` and `/es` counterparts; verify image paths, store links, locale navigation, and the upcoming status.
- [ ] Inspect at one mobile width and one desktop width in the light and dark themes. Confirm every displayed screenshot belongs to its named product and no unpublished app has a store CTA.
- [ ] Review `git diff --check`, `git status --short`, and the final diff. Keep all implementation changes on `codex/mobile-app-showcase`; do not push or merge.
