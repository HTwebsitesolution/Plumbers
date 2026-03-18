/**
 * Send a WhatsApp message to the admin via Twilio WhatsApp API.
 * No-op if Twilio or admin number is not configured.
 */
export async function sendAdminWhatsApp(body: string): Promise<void> {
  const accountSid = process.env.TWILIO_ACCOUNT_SID;
  const authToken = process.env.TWILIO_AUTH_TOKEN;
  const from = process.env.TWILIO_WHATSAPP_FROM; // e.g. "whatsapp:+14155238886"
  const toRaw = process.env.ADMIN_WHATSAPP_NUMBER; // e.g. "447123456789,+447987654321"
  const contentSid = process.env.TWILIO_WHATSAPP_CONTENT_SID; // e.g. "HXxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"

  if (!accountSid || !authToken || !from || !toRaw) {
    console.warn('sendAdminWhatsApp: missing Twilio config or admin numbers', {
      hasAccountSid: Boolean(accountSid),
      hasAuthToken: Boolean(authToken),
      hasFrom: Boolean(from),
      hasAdminNumbers: Boolean(toRaw),
    });
    return;
  }

  const url = `https://api.twilio.com/2010-04-01/Accounts/${accountSid}/Messages.json`;
  const auth = Buffer.from(`${accountSid}:${authToken}`).toString('base64');

  const recipients = toRaw
    .split(',')
    .map((n) => n.trim())
    .filter(Boolean);

  if (recipients.length === 0) {
    console.warn('sendAdminWhatsApp: ADMIN_WHATSAPP_NUMBER contained no valid recipients');
    return;
  }

  console.log('sendAdminWhatsApp: sending WhatsApp notification', {
    recipientCount: recipients.length,
    mode: contentSid ? 'template' : 'freeform',
  });

  await Promise.all(
    recipients.map(async (raw) => {
      const normalized = raw.replace(/\s/g, '').replace(/^(\d)/, '+$1');
      const to = raw.startsWith('whatsapp:') ? raw : `whatsapp:${normalized}`;

      try {
        const params = new URLSearchParams({
          From: from,
          To: to,
        });

        if (contentSid) {
          // Template send (works outside WhatsApp 24h window)
          // Template should contain placeholders {{1}} and {{2}}.
          params.set('ContentSid', contentSid);
          params.set('ContentVariables', JSON.stringify({ '1': 'Boilable alert', '2': body }));
        } else {
          // Freeform send (only within WhatsApp 24h window)
          params.set('Body', body);
        }

        const res = await fetch(url, {
          method: 'POST',
          headers: {
            Authorization: `Basic ${auth}`,
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: params.toString(),
        });

        if (!res.ok) {
          const err = await res.text();
          console.error('Twilio WhatsApp error:', res.status, err);
        }
      } catch (err) {
        console.error('WhatsApp notification failed:', err);
      }
    })
  );
}
