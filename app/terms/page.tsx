import Link from 'next/link';
import { Metadata } from 'next';
import { PageLayout } from '@/components/page-layout';
import { pageMetadata } from '@/lib/metadata';
import { getSiteConfig } from '@/lib/site-config';

export const metadata: Metadata = pageMetadata.terms;

export default function TermsPage() {
  const site = getSiteConfig();
  return (
    <PageLayout>
      <div className="bg-gradient-to-b from-blue-50 to-white py-14">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <p className="text-sm text-slate-500">
            <Link href="/privacy" className="text-brand-cyan hover:underline">
              Privacy Policy
            </Link>
            {' · '}
            Last updated: 6 April 2026
          </p>
          <h1 className="mt-3 text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
            Terms &amp; Conditions
          </h1>
          <p className="mt-4 text-lg text-slate-600">
            These terms govern your use of the website{' '}
            <strong className="font-semibold text-slate-800">{site.siteHost}</strong> and related{' '}
            {site.siteName} online services operated by{' '}
            <strong className="font-semibold text-slate-800">{site.legalEntityName}</strong>.
          </p>
        </div>
      </div>

      <div className="bg-white pb-20">
        <div className="mx-auto max-w-3xl space-y-10 px-4 text-slate-600 sm:px-6 lg:px-8">
          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-slate-900">1. Agreement</h2>
            <p>
              By accessing or using this website, you agree to these terms. If you do not agree, do
              not use the site. We may change these terms; the date above shows when they were last
              revised.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-slate-900">2. About {site.siteName}</h2>
            <p>
              {site.siteName} provides information about boiler installation, servicing, and repairs and
              offers ways to request quotes or bookings online. Gas work is carried out by
              appropriately qualified engineers (e.g. Gas Safe registered) where applicable; specific
              engineer credentials are confirmed as part of the job process, not by this website
              alone.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-slate-900">3. Provisional quotes and contracts</h2>
            <p>
              Any prices or packages shown on the site (including online quote tools) are{' '}
              <strong className="font-semibold text-slate-800">provisional estimates</strong> unless
              we confirm otherwise in writing after a site survey or formal quotation. A contract
              for work is formed only when you and we expressly agree terms (for example signed
              quote, written acceptance, or other clear agreement), not merely by submitting a web
              form.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-slate-900">4. Acceptable use</h2>
            <p>You agree not to:</p>
            <ul className="list-disc space-y-2 pl-6">
              <li>Use the site unlawfully or in a way that harms others or our systems</li>
              <li>Attempt unauthorised access to our systems, data, or accounts</li>
              <li>Scrape, overload, or automate access in a way that could impair the service</li>
              <li>Submit false, misleading, or malicious information</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-slate-900">5. Intellectual property</h2>
            <p>
              Content on this site (text, design, logos, images, and layout) is owned by us or our
              licensors. You may view and print pages for personal, non-commercial use. You may not
              copy, republish, or exploit our content commercially without permission.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-slate-900">6. Third-party links</h2>
            <p>
              The site may link to third parties. We are not responsible for their content or
              practices. Their terms and privacy policies apply to your use of their services.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-slate-900">7. Disclaimer</h2>
            <p>
              The site is provided &quot;as is&quot; to the extent permitted by law. We do not
              guarantee uninterrupted or error-free operation. Information is for general guidance
              and may change without notice.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-slate-900">8. Limitation of liability</h2>
            <p>
              To the fullest extent permitted by applicable law, we exclude liability for loss or
              damage arising from your use of the website, except where such exclusion is not allowed
              (for example death or personal injury caused by negligence, or fraud). Nothing in
              these terms limits your statutory rights as a consumer where applicable.
            </p>
            <p>
              Separate terms and consumer protections will apply to any contract for installation,
              servicing, or repair work once agreed between you and us (or our trading entity).
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-slate-900">9. Personal data (GDPR)</h2>
            <p>
              Our use of personal data is described in the{' '}
              <Link href="/privacy" className="text-brand-cyan hover:underline">
                Privacy Policy
              </Link>
              , which explains your rights under UK data protection law and how to contact us or the
              ICO.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-slate-900">10. Governing law</h2>
            <p>
              These terms are governed by the laws of England and Wales. The courts of England and
              Wales have non-exclusive jurisdiction, subject to mandatory consumer protections if
              you live elsewhere in the UK.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-slate-900">11. Contact</h2>
            <p>
              Questions about these terms: use our{' '}
              <Link href="/contact" className="text-brand-cyan hover:underline">
                Contact
              </Link>{' '}
              page.
            </p>
          </section>

          <section className="rounded-xl border border-slate-200 bg-slate-50 p-5 text-sm text-slate-600">
            <p>
              These terms are a practical template for a small business website. They are not a
              substitute for legal advice. Ask a solicitor to review them, especially if you add
              e-commerce, finance, or complex contractual flows.
            </p>
          </section>
        </div>
      </div>
    </PageLayout>
  );
}
