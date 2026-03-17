import { NextResponse } from 'next/server';
import { getSupabaseServerClient } from '@/lib/supabase/server';
import { generateQuoteRef } from '@/lib/quote-utils';
import { OutOfAreaEnquiry } from '@/lib/types';
import { sendAdminWhatsApp } from '@/lib/whatsapp';

const RESEND_API_KEY = process.env.RESEND_API_KEY;
const FROM_EMAIL = process.env.FROM_EMAIL;
const INSTALLER_NOTIFY_EMAIL = process.env.INSTALLER_NOTIFY_EMAIL;

function getCustomerAcknowledgementEmail(data: OutOfAreaEnquiry & { quoteRef: string }) {
  return {
    subject: `Thanks for your enquiry (${data.quoteRef})`,
    html: `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Thanks for your enquiry</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f8fafc;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f8fafc; padding: 40px 20px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
          <tr>
            <td style="background-color: #2563eb; padding: 40px; text-align: center;">
              <h1 style="margin: 0; color: #ffffff; font-size: 28px; font-weight: 700;">Boilable</h1>
            </td>
          </tr>
          <tr>
            <td style="padding: 40px;">
              <h2 style="margin: 0 0 16px 0; color: #1e293b; font-size: 24px; font-weight: 600;">Thanks for your enquiry!</h2>
              <p style="margin: 0 0 24px 0; color: #64748b; font-size: 16px; line-height: 1.6;">Hi ${data.customerName},</p>
              <p style="margin: 0 0 24px 0; color: #64748b; font-size: 16px; line-height: 1.6;">Thank you for your interest in Boilable. We've received your enquiry for postcode ${data.postcode}.</p>
              <p style="margin: 0 0 24px 0; color: #64748b; font-size: 16px; line-height: 1.6;">While this area is currently outside our service coverage, we're always looking to expand. We'll be in touch if we're able to help.</p>

              <div style="background-color: #f1f5f9; border-radius: 8px; padding: 24px; margin: 24px 0;">
                <div style="color: #64748b; font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 4px;">Reference</div>
                <div style="color: #1e293b; font-size: 18px; font-weight: 600; font-family: monospace;">${data.quoteRef}</div>
              </div>

              <div style="border-top: 1px solid #e2e8f0; margin-top: 32px; padding-top: 24px;">
                <p style="margin: 0 0 8px 0; color: #64748b; font-size: 14px;">Questions? We're here to help.</p>
                <p style="margin: 0; color: #64748b; font-size: 14px;">Reply to this email or visit our website.</p>
              </div>
            </td>
          </tr>
          <tr>
            <td style="background-color: #f8fafc; padding: 24px; text-align: center;">
              <p style="margin: 0; color: #94a3b8; font-size: 12px;">&copy; 2024 Boilable. All rights reserved.</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
    `.trim(),
  };
}

function getInstallerOutOfAreaNotification(data: OutOfAreaEnquiry & { quoteRef: string }) {
  return {
    subject: `Out-of-Area Enquiry: ${data.postcode} (${data.outwardCode}) - ${data.quoteRef}`,
    html: `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Out-of-Area Enquiry</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f8fafc;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f8fafc; padding: 40px 20px;">
    <tr>
      <td align="center">
        <table width="700" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
          <tr>
            <td style="background-color: #f59e0b; padding: 30px; text-align: center;">
              <h1 style="margin: 0; color: #ffffff; font-size: 24px; font-weight: 700;">Out-of-Area Enquiry</h1>
              <p style="margin: 8px 0 0 0; color: #fef3c7; font-size: 14px;">${data.quoteRef}</p>
            </td>
          </tr>
          <tr>
            <td style="padding: 40px;">
              <div style="background-color: #fef3c7; border-left: 4px solid #f59e0b; padding: 16px; margin-bottom: 32px; border-radius: 4px;">
                <p style="margin: 0; color: #92400e; font-size: 14px; line-height: 1.6;"><strong>Note:</strong> This enquiry is from outside our current service area (${data.outwardCode}).</p>
              </div>

              <h2 style="margin: 0 0 24px 0; color: #1e293b; font-size: 20px; font-weight: 600;">Customer Information</h2>

              <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom: 32px;">
                <tr>
                  <td style="padding: 12px 0; border-bottom: 1px solid #e2e8f0;">
                    <span style="color: #64748b; font-size: 14px;">Name</span>
                  </td>
                  <td style="padding: 12px 0; border-bottom: 1px solid #e2e8f0; text-align: right;">
                    <span style="color: #1e293b; font-size: 14px; font-weight: 600;">${data.customerName}</span>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 12px 0; border-bottom: 1px solid #e2e8f0;">
                    <span style="color: #64748b; font-size: 14px;">Email</span>
                  </td>
                  <td style="padding: 12px 0; border-bottom: 1px solid #e2e8f0; text-align: right;">
                    <a href="mailto:${data.customerEmail}" style="color: #2563eb; font-size: 14px; font-weight: 600; text-decoration: none;">${data.customerEmail}</a>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 12px 0; border-bottom: 1px solid #e2e8f0;">
                    <span style="color: #64748b; font-size: 14px;">Phone</span>
                  </td>
                  <td style="padding: 12px 0; border-bottom: 1px solid #e2e8f0; text-align: right;">
                    <a href="tel:${data.customerPhone}" style="color: #2563eb; font-size: 14px; font-weight: 600; text-decoration: none;">${data.customerPhone}</a>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 12px 0; border-bottom: 1px solid #e2e8f0;">
                    <span style="color: #64748b; font-size: 14px;">Postcode</span>
                  </td>
                  <td style="padding: 12px 0; border-bottom: 1px solid #e2e8f0; text-align: right;">
                    <span style="color: #1e293b; font-size: 14px; font-weight: 600;">${data.postcode}</span>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 12px 0; border-bottom: 1px solid #e2e8f0;">
                    <span style="color: #64748b; font-size: 14px;">Outward Code</span>
                  </td>
                  <td style="padding: 12px 0; border-bottom: 1px solid #e2e8f0; text-align: right;">
                    <span style="color: #1e293b; font-size: 14px; font-weight: 600;">${data.outwardCode}</span>
                  </td>
                </tr>
              </table>

              ${data.customerNotes ? `
              <h3 style="margin: 0 0 16px 0; color: #1e293b; font-size: 18px; font-weight: 600;">Customer Notes</h3>
              <div style="background-color: #fef3c7; border-left: 4px solid #f59e0b; padding: 16px; margin-bottom: 32px; border-radius: 4px;">
                <p style="margin: 0; color: #92400e; font-size: 14px; line-height: 1.6;">${data.customerNotes}</p>
              </div>
              ` : ''}

              <div style="background-color: #dbeafe; border-left: 4px solid #2563eb; padding: 16px; margin-top: 24px; border-radius: 4px;">
                <p style="margin: 0; color: #1e40af; font-size: 14px; line-height: 1.6;"><strong>Action:</strong> Consider following up if expanding service area or contact them to discuss alternative options.</p>
              </div>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
    `.trim(),
  };
}

export async function POST(request: Request) {
  try {
    const body: OutOfAreaEnquiry = await request.json();

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

    if (body.coverageStatus !== 'out_of_area') {
      return NextResponse.json(
        { error: 'Invalid coverage status for this endpoint' },
        { status: 400 }
      );
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
      console.error('Database error:', dbError);
      return NextResponse.json(
        { error: 'Failed to save enquiry' },
        { status: 500 }
      );
    }

    if (RESEND_API_KEY && FROM_EMAIL) {
      try {
        const dataWithRef = { ...body, quoteRef };

        const customerEmail = getCustomerAcknowledgementEmail(dataWithRef);
        const installerEmail = getInstallerOutOfAreaNotification(dataWithRef);

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

    sendAdminWhatsApp(
      `🔔 Out-of-area enquiry: ${quoteRef}\n${body.postcode} (${body.outwardCode})\n${body.customerName} – ${body.customerPhone}`
    ).catch(() => {});

    return NextResponse.json({ success: true, quoteRef }, { status: 201 });
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
