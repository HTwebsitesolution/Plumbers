# Plumbers (whitelabel boiler site template)

Next.js app for **new boiler installations**, **servicing**, and **repairs**, with quote and booking flows. This repo is the product template (forked from the original Boilable build). **Branding and legal copy are driven by environment variables** so one codebase can power a neutral demo and per-client Vercel projects.

## Environment variables

Copy [`.env.example`](.env.example) to `.env.local` and set values for your deployment.

**Minimum for a neutral demo**

- `NEXT_PUBLIC_SITE_NAME` — default in code is **Plumbers**; override per client (e.g. `Boilable`)
- `NEXT_PUBLIC_SITE_URL` — canonical URL (used for metadata and JSON-LD)

**Optional**

- `NEXT_PUBLIC_LOGO_PATH` — default `/brand/site-logo.svg`; for a client logo use e.g. `/brand/client-logo.png`
- `NEXT_PUBLIC_FOOTER_LEGAL_LINE`, `NEXT_PUBLIC_LEGAL_ENTITY_NAME`, `NEXT_PUBLIC_FOOTER_LINKS_HEADING`, etc.
- `NEXT_PUBLIC_FACEBOOK_PIXEL_ID` — if unset, the Meta Pixel script is not loaded (recommended for generic demos)
- `MAIL_FROM` — used by servicing/repairs email helper (`Resend` `from` field)
- `FROM_EMAIL` — used by lead/enquiry routes when `RESEND_API_KEY` is set
- `SITE_BASE_URL` — server-side absolute links (defaults to `NEXT_PUBLIC_SITE_URL`)

**Existing Boilable production (example)**

On the Boilable Vercel project, set e.g. `NEXT_PUBLIC_SITE_NAME=Boilable`, `NEXT_PUBLIC_SITE_URL=https://boilable.co.uk`, `NEXT_PUBLIC_LOGO_PATH=/brand/Boilable.co.uk_logo.png`, plus `NEXT_PUBLIC_LEGAL_ENTITY_NAME`, footer lines, `MAIL_FROM`, `FROM_EMAIL`, and `NEXT_PUBLIC_FACEBOOK_PIXEL_ID` as needed.

## Scripts

```bash
npm install
npm run dev
npm run build
npm run lint
npm run test:run
```

## Remote

Canonical GitHub remote for ongoing work: [HTwebsitesolution/Plumbers](https://github.com/HTwebsitesolution/Plumbers).
