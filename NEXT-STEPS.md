# Where to start when you log back in

**Goal:** Finish Twilio WhatsApp setup so the admin gets a message on their phone when there’s a new lead, enquiry, servicing request, or repair request.

---

## 1. Twilio account

- Go to [twilio.com](https://www.twilio.com) and sign in (or create an account).
- In the Twilio Console, copy your **Account SID** and **Auth Token**.

## 2. Enable WhatsApp (sandbox to start)

- In Twilio: **Messaging** → **Try it out** → **Send a WhatsApp message**.
- You’ll get a Twilio WhatsApp number (e.g. `+14155238886`) and a **join code**.
- From the **admin’s phone**, send that join code to the Twilio number in WhatsApp once. After that, the app can send messages to that phone.

## 3. Set environment variables

In **Vercel** → your project → **Settings** → **Environment Variables**, add:

| Variable | Value |
|----------|--------|
| `TWILIO_ACCOUNT_SID` | Your Twilio Account SID |
| `TWILIO_AUTH_TOKEN` | Your Twilio Auth Token |
| `TWILIO_WHATSAPP_FROM` | `whatsapp:+14155238886` (or your Twilio WhatsApp number with `whatsapp:` prefix) |
| `TWILIO_WHATSAPP_CONTENT_SID` | Optional (recommended): Twilio Content Template SID starting with `HX...` for template-based WhatsApp sends |
| `ADMIN_WHATSAPP_NUMBER` | Admin’s mobile in international form, e.g. `447712345678` or `+447712345678` |

For local testing, add the same variables to `.env.local` in the project root.

## 4. Redeploy

Trigger a new deployment on Vercel (e.g. push a commit or use “Redeploy” in the Vercel dashboard) so the new env vars are used.

---

After this, new boiler leads, out-of-area enquiries, servicing requests, and repair requests will send a WhatsApp notification to the admin’s phone.

---

## Template-based WhatsApp (recommended for production)

WhatsApp restricts free-text messages outside the 24-hour window. To reliably deliver admin alerts, use a WhatsApp-approved template via Twilio Content Templates.

1. In Twilio Console, create a **Content Template** for WhatsApp that contains placeholders `{{1}}` and `{{2}}` (e.g. title + message body).
2. Submit the template for approval and wait until it’s approved.
3. Copy the template’s **Content SID** (starts with `HX...`) and set it as `TWILIO_WHATSAPP_CONTENT_SID` in Vercel and `.env.local`.

Once set, the app will send WhatsApp notifications using the template automatically.
