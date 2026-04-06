import Link from 'next/link';
import { Metadata } from 'next';
import { PageLayout } from '@/components/page-layout';
import { pageMetadata } from '@/lib/metadata';

export const metadata: Metadata = pageMetadata.privacy;

export default function PrivacyPage() {
  return (
    <PageLayout>
      <div className="bg-gradient-to-b from-blue-50 to-white py-14">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <p className="text-sm text-slate-500">
            <Link href="/terms" className="text-brand-cyan hover:underline">
              Terms &amp; Conditions
            </Link>
            {' · '}
            Last updated: 6 April 2026
          </p>
          <h1 className="mt-3 text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
            Privacy Policy
          </h1>
          <p className="mt-4 text-lg text-slate-600">
            This policy explains how we handle personal information when you use{' '}
            <strong className="font-semibold text-slate-800">boilable.co.uk</strong> and related
            services operated under the Boilable brand.
          </p>
        </div>
      </div>

      <div className="bg-white pb-20">
        <div className="mx-auto max-w-3xl space-y-10 px-4 text-slate-600 sm:px-6 lg:px-8">
          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-slate-900">1. Who we are</h2>
            <p>
              Boilable is operated by{' '}
              <strong className="font-semibold text-slate-800">Delaney &amp; Salter Ltd</strong>{' '}
              (&quot;we&quot;, &quot;us&quot;, &quot;our&quot;). For data protection law purposes we
              act as the <strong className="font-semibold text-slate-800">data controller</strong>{' '}
              of personal data collected through this website, unless we state otherwise (for example
              where we process data only on behalf of another organisation).
            </p>
            <p>
              Contact for privacy enquiries: use the details on our{' '}
              <Link href="/contact" className="text-brand-cyan hover:underline">
                Contact
              </Link>{' '}
              page, marking your message &quot;Privacy&quot;.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-slate-900">2. What personal data we collect</h2>
            <p>We may collect and process the following categories of information:</p>
            <ul className="list-disc space-y-2 pl-6">
              <li>
                <strong className="font-semibold text-slate-800">Identity and contact data</strong>{' '}
                such as name, email address, phone number, and postal address or postcode when you
                submit a quote request, servicing or repair request, enquiry, review, or contact us.
              </li>
              <li>
                <strong className="font-semibold text-slate-800">Property and job-related data</strong>{' '}
                such as property type, boiler details, tier choices, notes you provide, and reference
                codes we assign to your request.
              </li>
              <li>
                <strong className="font-semibold text-slate-800">Technical and usage data</strong>{' '}
                such as IP address, browser type, device information, and pages visited. This may be
                collected through cookies and similar technologies (including third-party analytics and
                advertising tools).
              </li>
              <li>
                <strong className="font-semibold text-slate-800">Communications</strong> you send to
                us (including email content and call notes where applicable).
              </li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-slate-900">3. How we use your data and legal bases</h2>
            <p>We use personal data for purposes including:</p>
            <ul className="list-disc space-y-2 pl-6">
              <li>
                <strong className="font-semibold text-slate-800">Providing our services</strong> —
                responding to enquiries, generating provisional quotes, arranging surveys, delivering
                installations, servicing, or repairs.{' '}
                <em>Legal basis:</em> performance of a contract or steps at your request prior to a
                contract (UK GDPR Article 6(1)(b)), and sometimes legitimate interests (Article
                6(1)(f)) in managing our business.
              </li>
              <li>
                <strong className="font-semibold text-slate-800">Customer communications</strong> —
                confirmations, updates, and follow-up related to your request.{' '}
                <em>Legal basis:</em> contract and/or legitimate interests.
              </li>
              <li>
                <strong className="font-semibold text-slate-800">Reviews and testimonials</strong> —{' '}
                publishing approved reviews where you have submitted them.{' '}
                <em>Legal basis:</em> consent where required, and/or legitimate interests in
                showcasing genuine customer feedback.
              </li>
              <li>
                <strong className="font-semibold text-slate-800">Website operation and improvement</strong>{' '}
                — security, debugging, usage statistics, and improving the site.{' '}
                <em>Legal basis:</em> legitimate interests and, where required, your consent for
                non-essential cookies or similar technologies.
              </li>
              <li>
                <strong className="font-semibold text-slate-800">Marketing and advertising measurement</strong>{' '}
                — for example Meta (Facebook) Pixel to understand ad performance and build
                audiences.{' '}
                <em>Legal basis:</em> consent and/or legitimate interests, depending on the
                mechanism and applicable guidance; you can use browser controls and ad platform
                settings to limit tracking.
              </li>
              <li>
                <strong className="font-semibold text-slate-800">Legal and compliance</strong> —{' '}
                record-keeping, fraud prevention, and complying with law.{' '}
                <em>Legal basis:</em> legal obligation and/or legitimate interests.
              </li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-slate-900">4. Cookies and similar technologies</h2>
            <p>
              Our site may use cookies and similar technologies to remember preferences, keep the
              site secure, and measure traffic and advertising effectiveness. Third-party scripts
              (such as Meta Pixel) may set or read cookies subject to their own policies. You can
              manage cookies through your browser settings.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-slate-900">5. Who we share data with</h2>
            <p>
              We may share personal data with service providers who process it on our instructions
              (&quot;processors&quot;), including for example:
            </p>
            <ul className="list-disc space-y-2 pl-6">
              <li>Hosting and infrastructure (e.g. Vercel)</li>
              <li>Database and backend services (e.g. Supabase)</li>
              <li>Email delivery (e.g. Resend)</li>
              <li>Messaging or notification providers where configured (e.g. Twilio, Pushover)</li>
              <li>Analytics and advertising platforms (e.g. Meta)</li>
            </ul>
            <p>
              We require processors to protect your data appropriately. Some providers may process
              data outside the UK; where they do, we aim to ensure appropriate safeguards (such as
              UK-approved standard contractual clauses) apply as required by law.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-slate-900">6. How long we keep data</h2>
            <p>
              We retain personal data only as long as necessary for the purposes above, including
              legal, accounting, and warranty requirements. Retention periods vary by data type; quote
              and customer records are typically kept for a number of years after last contact unless
              a shorter or longer period is required by law or legitimate business need.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-slate-900">7. Your rights (UK GDPR)</h2>
            <p>Depending on circumstances, you may have the right to:</p>
            <ul className="list-disc space-y-2 pl-6">
              <li>Access a copy of your personal data</li>
              <li>Rectify inaccurate data</li>
              <li>Erasure (&quot;right to be forgotten&quot;) in certain cases</li>
              <li>Restrict or object to processing in certain cases</li>
              <li>Data portability for data you provided, where processing is automated and based on
                consent or contract</li>
              <li>Withdraw consent at any time, where we rely on consent</li>
              <li>Lodge a complaint with the ICO (see below)</li>
            </ul>
            <p>
              To exercise these rights, contact us via the{' '}
              <Link href="/contact" className="text-brand-cyan hover:underline">
                Contact
              </Link>{' '}
              page. We may need to verify your identity before responding.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-slate-900">8. Complaints</h2>
            <p>
              If you are unhappy with how we use personal data, please contact us first. You also
              have the right to complain to the{' '}
              <a
                href="https://ico.org.uk/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-brand-cyan hover:underline"
              >
                Information Commissioner&apos;s Office (ICO)
              </a>
              , the UK supervisory authority for data protection.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-slate-900">9. Children</h2>
            <p>
              Our services are directed at adults. We do not knowingly collect personal data from
              children.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-slate-900">10. Changes</h2>
            <p>
              We may update this policy from time to time. The &quot;Last updated&quot; date at the
              top will change when we do; continued use of the site after changes constitutes
              acceptance where permitted by law.
            </p>
          </section>

          <section className="rounded-xl border border-slate-200 bg-slate-50 p-5 text-sm text-slate-600">
            <p>
              This policy is provided for general information. It is not legal advice. For
              business-specific wording (registered office, company number, named DPO), ask your
              solicitor or accountant to review and amend this page.
            </p>
          </section>
        </div>
      </div>
    </PageLayout>
  );
}
