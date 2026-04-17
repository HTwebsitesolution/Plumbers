# Plumbers — sales & showcase site

Next.js app for **new boiler installations**, **servicing**, and **repairs**, with quote and booking flows. This repository ([HTwebsitesolution/Plumbers](https://github.com/HTwebsitesolution/Plumbers)) is for **your marketing**: demonstrating what you can build for plumbers who have no site or a weak site. It is **not** the live codebase for paying clients.

**Repository policy**

- **Do all future development, commits, and pushes here** (`Plumbers` only).
- **Do not** push showcase or template work to the **Boilable** client repository. That repo belongs to the real client; treat it as frozen from your side unless they commission changes under a separate agreement.

Branding and legal copy are **environment-driven** (`NEXT_PUBLIC_*`, `MAIL_FROM`, etc.) so each Vercel deployment can look like a different business without forking for a first demo.

## Environment variables

Copy [`.env.example`](.env.example) to `.env.local` and set values for your deployment.

**Minimum for the public showcase**

- `NEXT_PUBLIC_SITE_NAME` — default in code is **Plumbers**; override when demoing a named package (e.g. your agency brand).
- `NEXT_PUBLIC_SITE_URL` — canonical URL of **this** Vercel project (metadata and JSON-LD).

**Optional**

- `NEXT_PUBLIC_LOGO_PATH` — default `/brand/site-logo.svg`; swap for a custom asset per campaign if needed.
- `NEXT_PUBLIC_FOOTER_LEGAL_LINE`, `NEXT_PUBLIC_LEGAL_ENTITY_NAME`, `NEXT_PUBLIC_FOOTER_LINKS_HEADING`, etc.
- `NEXT_PUBLIC_FACEBOOK_PIXEL_ID` — omit on generic demos if you do not want ad pixels firing.
- `MAIL_FROM`, `FROM_EMAIL`, `SITE_BASE_URL`, `INSTALLER_EMAIL` — set when you want real email from this showcase; otherwise leave unset or use test inboxes.

**When you win a client**

Give them their **own** repo (or a private fork), their own Vercel project, and env vars for their name, logo, legal entity, domains, and analytics — not this Plumbers deployment.

## Scripts

```bash
npm install
npm run dev
npm run build
npm run lint
npm run test:run
```

## Git remote

This clone should use **`origin` → `https://github.com/HTwebsitesolution/Plumbers.git`** so `git push` only updates the showcase repo.
