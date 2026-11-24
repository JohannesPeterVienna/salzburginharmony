# Salzburg in Harmony – www.salzburginharmony.com

Static site, built from `src/` into `docs/`. `docs/` is the complete upload package for the World4You web space
`/html/salzburg` (Apache, document root of www.salzburginharmony.com; salzburginharmony.com redirects to www).
`UPLOAD-MANIFEST.txt` lists every file to upload with SHA-256 and size, the old live files covered by redirects and the
legacy URL mapping. Upload selectively; never delete anything on the server (traffic*.php must stay untouched).

- `npm run build` – deletes and rewrites `docs/` (pages, `.htaccess`, sitemap, robots, ads.txt, 404), `BILDER.md`
  and `UPLOAD-MANIFEST.txt`. Static assets (CSS, JS, images) live in `src/static/` and are copied unchanged.
- `npm test` – unit tests (consent decision, analytics choice, day planner) and static checks (`tests/check-pages.mjs`):
  links, metadata, hreflang, ads only below the content, legal texts identical to the live release of 23.11.2026,
  contact form identical to the live form, no placeholders/announcements, and the naming rule over the whole repo.
- `npm run test:browser` – Playwright: every page at 390 and 1366 px (no JS errors, no horizontal overflow, no dead
  local links, analytics window, walk mode, planner, ad box ≥150 px from controls when filled).
- Legal texts: `src/content/legal-live.mjs` holds the live fragments verbatim; `src/pages/legal.mjs` composes the
  pages and lists every deviation (`DEVIATIONS`).
- Images: only licensed photos with an entry in `src/content/credits.mjs` and `BILDNACHWEISE.md` are shown; stops
  without a photo are designed without one. `BILDER.md` (generated) lists what exists and what is missing.

Hosts Anton and Dora are fictional, AI-generated characters; this is stated on the site. No names of a certain family,
film, songs or roles are used anywhere (checked by `tests/check-pages.mjs`).
