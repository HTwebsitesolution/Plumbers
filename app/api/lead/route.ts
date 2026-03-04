import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';
import { generateQuoteRef } from '@/lib/quote-utils';
import { getCustomerEmailTemplate, getInstallerEmailTemplate } from '@/lib/email-templates';
import { QuoteFormData, OutOfAreaEnquiry } from '@/lib/types';

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
        console.error('Database error:', dbError);
        return NextResponse.json(
          { error: 'Failed to save enquiry' },
          { status: 500 }
        );
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

    const quoteRef = generateQuoteRef();

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
      console.error('Database error:', dbError);
      return NextResponse.json(
        { error: 'Failed to save lead' },
        { status: 500 }
      );
    }

    if (RESEND_API_KEY && FROM_EMAIL) {
      try {
        const dataWithRef = { ...fullQuote, quoteRef };

        const customerEmail = getCustomerEmailTemplate(dataWithRef);
        const installerEmail = getInstallerEmailTemplate(dataWithRef);

        const emailPromises = [
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
          }),
        ];

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

    return NextResponse.json({ success: true, quoteRef }, { status: 201 });
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
