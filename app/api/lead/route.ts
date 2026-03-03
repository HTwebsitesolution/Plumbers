import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';
import { generateQuoteRef } from '@/lib/quote-utils';
import { getCustomerEmailTemplate, getInstallerEmailTemplate } from '@/lib/email-templates';
import { QuoteFormData } from '@/lib/types';

const RESEND_API_KEY = process.env.RESEND_API_KEY;
const FROM_EMAIL = process.env.FROM_EMAIL;
const INSTALLER_NOTIFY_EMAIL = process.env.INSTALLER_NOTIFY_EMAIL;

export async function POST(request: Request) {
  try {
    const body: QuoteFormData = await request.json();

    const requiredFields = [
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
      if (!body[field as keyof QuoteFormData]) {
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
      property_type: body.propertyType,
      bedrooms: body.bedrooms,
      bathrooms: body.bathrooms,
      fuel_type: body.fuelType,
      current_boiler_type: body.currentBoilerType,
      boiler_location: body.boilerLocation,
      tier_name: body.tierName,
      from_price: body.fromPrice,
      warranty_years: body.warrantyYears,
      brand_preference: body.brandPreference,
      customer_name: body.customerName,
      customer_email: body.customerEmail,
      customer_phone: body.customerPhone,
      address_line1: body.addressLine1 || null,
      preferred_contact_method: body.preferredContactMethod,
      preferred_time_window: body.preferredTimeWindow,
      customer_notes: body.customerNotes || null,
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
        const dataWithRef = { ...body, quoteRef };

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
              to: body.customerEmail,
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
