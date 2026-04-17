import { NextResponse } from 'next/server';
import { getSupabaseServerClient } from '@/lib/supabase/server';
import { generateQuoteRef } from '@/lib/quote-utils';
import { getCustomerEmailTemplate, getInstallerEmailTemplate } from '@/lib/email-templates';
import { QuoteFormData, OutOfAreaEnquiry, isAllowedFuelType } from '@/lib/types';
import { sendAdminWhatsApp } from '@/lib/whatsapp';
import { sendPushoverPush } from '@/lib/notifications/pushover';
import { getSiteBaseUrl } from '@/lib/site-config';

const RESEND_API_KEY = process.env.RESEND_API_KEY;
const FROM_EMAIL = process.env.FROM_EMAIL;
const INSTALLER_NOTIFY_EMAIL = process.env.INSTALLER_NOTIFY_EMAIL;

function isOutOfAreaEnquiry(body: any): body is OutOfAreaEnquiry {
  return body.coverageStatus === 'out_of_area';
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    if (isOutOfAreaEnquiry(body)) {
      const requiredFields: (keyof OutOfAreaEnquiry)[] = [
        'postcode',
        'outwardCode',
        'coverageStatus',
        'customerName',
        'customerEmail',
        'customerPhone',
      ];

      for (const field of requiredFields) {
        if (!body[field]) {
          return NextResponse.json(
            { error: `Missing required field: ${field}` },
            { status: 400 }
          );
        }
      }

      const quoteRef = generateQuoteRef();

      const supabaseAdmin = getSupabaseServerClient();

      const { error: dbError } = await supabaseAdmin.from('leads').insert({
        quote_ref: quoteRef,
        postcode: body.postcode,
        outward_code: body.outwardCode,
        coverage_status: body.coverageStatus,
        customer_name: body.customerName,
        customer_email: body.customerEmail,
        customer_phone: body.customerPhone,
        customer_notes: body.customerNotes || null,
        property_type: null,
        bedrooms: null,
        bathrooms: null,
        fuel_type: null,
        current_boiler_type: null,
        boiler_location: null,
        tier_name: null,
        from_price: null,
        warranty_years: null,
        brand_preference: null,
        address_line1: null,
        preferred_contact_method: null,
        preferred_time_window: null,
      });

      if (dbError) {
        console.error('Database error (out-of-area enquiry):', dbError);
        const msg = String((dbError as any).message || '').toLowerCase();
        if (msg.includes('duplicate') || msg.includes('unique')) {
          return NextResponse.json({ success: true, quoteRef, deduped: true }, { status: 200 });
        }
        return NextResponse.json(
          { error: 'Failed to save enquiry' },
          { status: 500 }
        );
      }

      sendAdminWhatsApp(
        `🔔 Out-of-area enquiry: ${quoteRef}\n${body.postcode} (${body.outwardCode})\n${body.customerName} – ${body.customerPhone}`
      ).catch(() => {});

      const baseUrl = getSiteBaseUrl();
      const pushTitle = 'Out-of-area enquiry';
      const pushMessage =
        `Ref ${quoteRef}\n` +
        `${body.postcode} (${body.outwardCode})\n` +
        `Contact: ${body.customerName} • ${body.customerPhone}`;

      const enquiryPushResult = await sendPushoverPush({
        title: pushTitle,
        message: pushMessage,
        url: `${baseUrl}/admin`,
        url_title: 'Open admin',
        priority: 0,
      });

      if (!enquiryPushResult.ok) {
        console.warn('Pushover push failed (out-of-area enquiry):', enquiryPushResult.error, enquiryPushResult.details);
      }

      return NextResponse.json({ success: true, quoteRef }, { status: 201 });
    }

    const fullQuote = body as QuoteFormData;

    const requiredFields: (keyof QuoteFormData)[] = [
      'postcode',
      'propertyType',
      'bedrooms',
      'bathrooms',
      'fuelType',
      'currentBoilerType',
      'boilerLocation',
      'tierName',
      'fromPrice',
      'warrantyYears',
      'brandPreference',
      'customerName',
      'customerEmail',
      'customerPhone',
      'preferredContactMethod',
      'preferredTimeWindow',
    ];

    for (const field of requiredFields) {
      if (!fullQuote[field]) {
        return NextResponse.json(
          { error: `Missing required field: ${field}` },
          { status: 400 }
        );
      }
    }

    if (!isAllowedFuelType(fullQuote.fuelType)) {
      return NextResponse.json(
        {
          error:
            'We only provide quotes for natural gas and LPG boilers. We do not install or service oil-fired boilers.',
        },
        { status: 400 }
      );
    }

    const quoteRef = generateQuoteRef();

    const supabaseAdmin = getSupabaseServerClient();

    const { error: dbError } = await supabaseAdmin.from('leads').insert({
      quote_ref: quoteRef,
      postcode: fullQuote.postcode,
      outward_code: fullQuote.outwardCode || null,
      coverage_status: fullQuote.coverageStatus || null,
      property_type: fullQuote.propertyType,
      bedrooms: fullQuote.bedrooms,
      bathrooms: fullQuote.bathrooms,
      fuel_type: fullQuote.fuelType,
      current_boiler_type: fullQuote.currentBoilerType,
      boiler_location: fullQuote.boilerLocation,
      tier_name: fullQuote.tierName,
      from_price: fullQuote.fromPrice,
      warranty_years: fullQuote.warrantyYears,
      brand_preference: fullQuote.brandPreference,
      customer_name: fullQuote.customerName,
      customer_email: fullQuote.customerEmail,
      customer_phone: fullQuote.customerPhone,
      address_line1: fullQuote.addressLine1 || null,
      preferred_contact_method: fullQuote.preferredContactMethod,
      preferred_time_window: fullQuote.preferredTimeWindow,
      customer_notes: fullQuote.customerNotes || null,
    });

    if (dbError) {
      console.error('Database error (lead):', dbError);
      const msg = String((dbError as any).message || '').toLowerCase();
      if (msg.includes('duplicate') || msg.includes('unique')) {
        return NextResponse.json({ success: true, quoteRef, deduped: true }, { status: 200 });
      }
      return NextResponse.json(
        { error: 'Failed to save lead' },
        { status: 500 }
      );
    }

    if (RESEND_API_KEY && FROM_EMAIL) {
      try {
        const dataWithRef = { ...fullQuote, quoteRef };

        const installerEmail = getInstallerEmailTemplate(dataWithRef);

        const emailPromises = [];

        if (fullQuote.coverageStatus === 'in_area') {
          const customerEmail = getCustomerEmailTemplate(dataWithRef);
          emailPromises.push(
            fetch('https://api.resend.com/emails', {
              method: 'POST',
              headers: {
                'Authorization': `Bearer ${RESEND_API_KEY}`,
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                from: FROM_EMAIL,
                to: fullQuote.customerEmail,
                subject: customerEmail.subject,
                html: customerEmail.html,
              }),
            })
          );
        }

        if (INSTALLER_NOTIFY_EMAIL) {
          emailPromises.push(
            fetch('https://api.resend.com/emails', {
              method: 'POST',
              headers: {
                'Authorization': `Bearer ${RESEND_API_KEY}`,
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                from: FROM_EMAIL,
                to: INSTALLER_NOTIFY_EMAIL,
                subject: installerEmail.subject,
                html: installerEmail.html,
              }),
            })
          );
        }

        const results = await Promise.allSettled(emailPromises);

        results.forEach((result, index) => {
          if (result.status === 'rejected') {
            console.error(`Email ${index + 1} failed:`, result.reason);
          }
        });
      } catch (emailError) {
        console.error('Email error:', emailError);
      }
    }

    // --- Notifications (best effort; never block the response) ---
    const baseUrl = getSiteBaseUrl();

    const pushTitle = `New boiler quote: ${fullQuote.tierName}`;
    const pushMessage =
      `Ref ${quoteRef}\n` +
      `${fullQuote.postcode}${fullQuote.outwardCode ? ` (${fullQuote.outwardCode})` : ''} • ${fullQuote.fuelType}\n` +
      `Tier: ${fullQuote.tierName} • From £${fullQuote.fromPrice} • ${fullQuote.warrantyYears}yr\n` +
      `Contact: ${fullQuote.customerName} • ${fullQuote.customerPhone}\n` +
      `Pref: ${fullQuote.preferredContactMethod} • ${fullQuote.preferredTimeWindow}\n` +
      `Coverage: ${fullQuote.coverageStatus ?? 'unknown'}`;

    // WhatsApp best-effort (do not block user submission)
    sendAdminWhatsApp(
      `🔔 New boiler lead: ${quoteRef}\n${fullQuote.postcode} – ${fullQuote.tierName} from £${fullQuote.fromPrice}\n${fullQuote.customerName} – ${fullQuote.customerPhone}`
    ).catch(() => {});

    // Pushover: await so serverless execution reliably sends the notification
    const leadPushResult = await sendPushoverPush({
      title: pushTitle,
      message: pushMessage,
      url: `${baseUrl}/admin`,
      url_title: 'Open admin',
      priority: 0,
    });

    if (!leadPushResult.ok) {
      console.warn('Pushover push failed (lead):', leadPushResult.error, leadPushResult.details);
    }

    return NextResponse.json({ success: true, quoteRef }, { status: 201 });
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
