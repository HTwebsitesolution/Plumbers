import { NextResponse } from 'next/server';
import { getSupabaseServerClient } from '@/lib/supabase/server';
import { getServicingCustomerEmailTemplate, getServicingInstallerEmailTemplate, ServicingRequestData } from '@/lib/email-templates';
import { sendAdminWhatsApp } from '@/lib/whatsapp';

function generateServicingRef(): string {
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');

  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let random = '';
  for (let i = 0; i < 4; i++) {
    random += chars.charAt(Math.floor(Math.random() * chars.length));
  }

  return `SERV-${year}${month}${day}-${random}`;
}

async function sendEmail(to: string, subject: string, html: string, text?: string) {
  const resendApiKey = process.env.RESEND_API_KEY;

  if (!resendApiKey) {
    console.warn('RESEND_API_KEY not configured. Email not sent.');
    return;
  }

  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${resendApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'Boilable <noreply@boilable.co.uk>',
        to: [to],
        subject,
        html,
        text,
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      console.error('Failed to send email:', error);
    }
  } catch (error) {
    console.error('Error sending email:', error);
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const {
      requestType,
      postcode,
      outwardCode,
      coverageStatus,
      fuelType,
      boilerType,
      boilerMake,
      boilerModel,
      lastServiced,
      name: customerName,
      email: customerEmail,
      phone: customerPhone,
      preferredContactMethod,
      preferredTimeWindow,
      notes: customerNotes,
    } = body;

    if (!customerName || !customerEmail || !customerPhone || !postcode) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const serviceRef = generateServicingRef();

    const supabase = getSupabaseServerClient();

    const { error: insertError } = await supabase
      .from('servicing_requests')
      .insert({
        service_ref: serviceRef,
        request_type: requestType || 'servicing',
        service: 'servicing',
        postcode,
        outward_code: outwardCode,
        coverage_status: coverageStatus,
        fuel_type: fuelType,
        boiler_type: boilerType,
        boiler_make: boilerMake,
        boiler_model: boilerModel,
        last_serviced: lastServiced,
        customer_name: customerName,
        customer_email: customerEmail,
        customer_phone: customerPhone,
        preferred_contact_method: preferredContactMethod,
        preferred_time_window: preferredTimeWindow,
        customer_notes: customerNotes,
      });

    if (insertError) {
      console.error('Database insert error:', insertError);
      return NextResponse.json(
        { error: 'Failed to save servicing request' },
        { status: 500 }
      );
    }

    const emailData: ServicingRequestData = {
      serviceRef,
      requestType: requestType || 'servicing',
      postcode,
      outwardCode,
      coverageStatus,
      fuelType,
      boilerType,
      boilerMake,
      boilerModel,
      lastServiced,
      customerName,
      customerEmail,
      customerPhone,
      preferredContactMethod,
      preferredTimeWindow,
      customerNotes,
    };

    const customerEmailTemplate = getServicingCustomerEmailTemplate(emailData);
    await sendEmail(customerEmail, customerEmailTemplate.subject, customerEmailTemplate.html, customerEmailTemplate.text);

    const installerEmail = process.env.INSTALLER_EMAIL || 'installer@boilable.co.uk';
    const installerEmailTemplate = getServicingInstallerEmailTemplate(emailData);
    await sendEmail(installerEmail, installerEmailTemplate.subject, installerEmailTemplate.html);

    sendAdminWhatsApp(
      `🔔 Servicing request: ${serviceRef}\n${postcode} – ${customerName} – ${customerPhone}`
    ).catch(() => {});

    return NextResponse.json({
      success: true,
      serviceRef,
    });
  } catch (error) {
    console.error('Error processing servicing request:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
