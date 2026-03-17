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
| `ADMIN_WHATSAPP_NUMBER` | Admin’s mobile in international form, e.g. `447712345678` or `+447712345678` |

For local testing, add the same variables to `.env.local` in the project root.

## 4. Redeploy

Trigger a new deployment on Vercel (e.g. push a commit or use “Redeploy” in the Vercel dashboard) so the new env vars are used.

---

After this, new boiler leads, out-of-area enquiries, servicing requests, and repair requests will send a WhatsApp notification to the admin’s phone.
