# Salzburg in Harmony – www.salzburginharmony.com

Static site, built from `src/` into `docs/` (GitHub Pages, custom domain `www.salzburginharmony.com`).

- `npm run build` – writes `docs/` (pages, sitemap, robots, 404). Set `SHOP_LIVE=true` and `SHOP_CHECKOUT_URL=…` to publish the shop page.
- `npm test` – unit tests (consent decision, day planner) and static page checks.
- `npm run test:browser` – Playwright: every sitemap page at 390 and 1366 px (no JS errors, no horizontal overflow, no dead local links, ad boxes ≥150 px from controls).
- `BILDER.md` – list of the photos/illustrations still to be dropped into `docs/assets/img/` (file names are already referenced).

Hosts Alois and Felix are fictional, AI-generated characters; this is stated on the site. No trademarked film or family names are used anywhere on the site.
