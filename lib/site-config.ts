/**
 * Whitelabel / per-deployment branding. Set on Vercel (or .env.local).
 * Defaults suit the Plumbers showcase; per-client deployments override via env.
 */

function trimTrailingSlash(url: string): string {
  return url.replace(/\/+$/, '');
}

export type SiteConfig = {
  siteName: string;
  /** Canonical origin, no trailing slash */
  siteUrl: string;
  /** Host only, for legal copy e.g. example.co.uk */
  siteHost: string;
  logoSrc: string;
  logoAlt: string;
  tagline: string;
  /** Shown under footer logo; optional second line */
  footerLegalLine: string;
  /** Footer column heading for general links (was a brand column) */
  footerLinksHeading: string;
  ogImageAlt: string;
  businessDescription: string;
  /** Structured data telephone, E.164 if possible */
  businessPhone: string;
  /** Controller / trading entity for legal pages */
  legalEntityName: string;
  copyrightYear: number;
};

export function getSiteConfig(): SiteConfig {
  const siteUrl = trimTrailingSlash(
    process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'
  );
  let siteHost = 'localhost:3000';
  try {
    siteHost = new URL(siteUrl).host;
  } catch {
    /* keep default */
  }

  const siteName = process.env.NEXT_PUBLIC_SITE_NAME || 'Plumbers';

  return {
    siteName,
    siteUrl,
    siteHost,
    logoSrc: process.env.NEXT_PUBLIC_LOGO_PATH || '/brand/site-logo.svg',
    logoAlt: process.env.NEXT_PUBLIC_LOGO_ALT || `${siteName} logo`,
    tagline:
      process.env.NEXT_PUBLIC_SITE_TAGLINE ||
      'Quality boiler installations with transparent pricing and expert service.',
    footerLegalLine:
      process.env.NEXT_PUBLIC_FOOTER_LEGAL_LINE ||
      'Gas Safe registered engineers. Replace this line with your trading details.',
    footerLinksHeading: process.env.NEXT_PUBLIC_FOOTER_LINKS_HEADING || 'Company',
    ogImageAlt:
      process.env.NEXT_PUBLIC_OG_IMAGE_ALT ||
      `${siteName} — boiler installation estimates`,
    businessDescription:
      process.env.NEXT_PUBLIC_BUSINESS_DESCRIPTION ||
      'Boiler installations, servicing and repairs with transparent pricing and expert service.',
    businessPhone: process.env.NEXT_PUBLIC_BUSINESS_PHONE || '',
    legalEntityName:
      process.env.NEXT_PUBLIC_LEGAL_ENTITY_NAME || 'Your Company Ltd',
    copyrightYear: new Date().getFullYear(),
  };
}

/** Server-side: transactional email From header */
export function getMailFrom(): string {
  return (
    process.env.MAIL_FROM ||
    `${getSiteConfig().siteName} <noreply@example.com>`
  );
}

/** Server-side: links in emails and APIs */
export function getSiteBaseUrl(): string {
  return trimTrailingSlash(
    process.env.SITE_BASE_URL || process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'
  );
}

export function getEmailFooterCopyright(): string {
  const { siteName, copyrightYear } = getSiteConfig();
  return `© ${copyrightYear} ${siteName}. All rights reserved.`;
}
