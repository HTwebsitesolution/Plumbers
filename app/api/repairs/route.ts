import { NextResponse } from 'next/server';
import { getSupabaseServerClient } from '@/lib/supabase/server';
import { getRepairsCustomerEmailTemplate, getRepairsInstallerEmailTemplate, RepairsRequestData } from '@/lib/repairs-email-templates';
import { isAllowedFuelType } from '@/lib/types';
import { sendAdminWhatsApp } from '@/lib/whatsapp';
import { sendPushoverPush } from '@/lib/notifications/pushover';
import { getMailFrom, getSiteBaseUrl } from '@/lib/site-config';

function generateRepairRef(): string {
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');

  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let random = '';
  for (let i = 0; i < 4; i++) {
    random += chars.charAt(Math.floor(Math.random() * chars.length));
  }

  return `REP-${year}${month}${day}-${random}`;
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
        from: getMailFrom(),
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
      issueCategory,
      errorCode,
      urgency,
      gasSmell,
      fuelType,
      boilerType,
      boilerMake,
      boilerModel,
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

    if (fuelType != null && fuelType !== '' && !isAllowedFuelType(fuelType)) {
      return NextResponse.json(
        {
          error:
            'We only repair natural gas and LPG boilers. We do not repair oil-fired boilers.',
        },
        { status: 400 }
      );
    }

    const repairRef = generateRepairRef();

    const supabase = getSupabaseServerClient();

    const { error: insertError } = await supabase
      .from('repairs_requests')
      .insert({
        repair_ref: repairRef,
        request_type: requestType || 'repairs',
        service: 'repairs',
        postcode,
        outward_code: outwardCode,
        coverage_status: coverageStatus,
        issue_category: issueCategory,
        error_code: errorCode,
        urgency,
        gas_smell: gasSmell,
        fuel_type: fuelType,
        boiler_type: boilerType,
        boiler_make: boilerMake,
        boiler_model: boilerModel,
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
        { error: 'Failed to save repair request' },
        { status: 500 }
      );
    }

    const emailData: RepairsRequestData = {
      repairRef,
      requestType: requestType || 'repairs',
      postcode,
      outwardCode,
      coverageStatus,
      issueCategory,
      errorCode,
      urgency,
      gasSmell,
      fuelType,
      boilerType,
      boilerMake,
      boilerModel,
      customerName,
      customerEmail,
      customerPhone,
      preferredContactMethod,
      preferredTimeWindow,
      customerNotes,
    };

    const customerEmailTemplate = getRepairsCustomerEmailTemplate(emailData);
    await sendEmail(customerEmail, customerEmailTemplate.subject, customerEmailTemplate.html, customerEmailTemplate.text);

    const installerEmail = process.env.INSTALLER_EMAIL || 'installer@example.com';
    const installerEmailTemplate = getRepairsInstallerEmailTemplate(emailData);
    await sendEmail(installerEmail, installerEmailTemplate.subject, installerEmailTemplate.html);

    sendAdminWhatsApp(
      `🔔 Repair request: ${repairRef}\n${postcode} – ${customerName} – ${customerPhone}${urgency ? ` (${urgency})` : ''}`
    ).catch(() => {});

    const baseUrl = getSiteBaseUrl();
    const repairsPriority = urgency === 'Emergency today' ? 1 : 0;
    const repairsPushTitle = `New repair request: ${issueCategory || 'General issue'}`;
    const repairsPushMessage =
      `Ref ${repairRef}\n` +
      `${postcode}${outwardCode ? ` (${outwardCode})` : ''}${fuelType ? ` • ${fuelType}` : ''}\n` +
      `Urgency: ${urgency || 'Unspecified'}${errorCode ? ` • Code: ${errorCode}` : ''}\n` +
      `Contact: ${customerName} • ${customerPhone}`;

    const repairsPushResult = await sendPushoverPush({
      title: repairsPushTitle,
      message: repairsPushMessage,
      url: `${baseUrl}/admin`,
      url_title: 'Open admin',
      priority: repairsPriority,
    });

    if (!repairsPushResult.ok) {
      console.warn('Pushover push failed (repairs):', repairsPushResult.error, repairsPushResult.details);
    }

    return NextResponse.json({
      success: true,
      repairRef,
    });
  } catch (error) {
    console.error('Error processing repair request:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
