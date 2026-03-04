import { QuoteFormData } from './types';
import { formatPrice } from './quote-utils';

export function getCustomerEmailTemplate(data: QuoteFormData & { quoteRef: string }) {
  return {
    subject: `Your Boiler Quote Request (${data.quoteRef})`,
    html: `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Your Boiler Quote</title>
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
              <h2 style="margin: 0 0 16px 0; color: #1e293b; font-size: 24px; font-weight: 600;">Thank you for your quote request!</h2>
              <p style="margin: 0 0 24px 0; color: #64748b; font-size: 16px; line-height: 1.6;">Hi ${data.customerName},</p>
              <p style="margin: 0 0 24px 0; color: #64748b; font-size: 16px; line-height: 1.6;">We've received your boiler installation quote request. Our team will be in touch soon to arrange your free, no-obligation site survey.</p>

              <div style="background-color: #f1f5f9; border-radius: 8px; padding: 24px; margin: 24px 0;">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px;">
                  <div>
                    <div style="color: #64748b; font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 4px;">Quote Reference</div>
                    <div style="color: #1e293b; font-size: 18px; font-weight: 600; font-family: monospace;">${data.quoteRef}</div>
                  </div>
                </div>
              </div>

              <h3 style="margin: 32px 0 16px 0; color: #1e293b; font-size: 18px; font-weight: 600;">Your Quote Summary</h3>

              <table width="100%" cellpadding="0" cellspacing="0" style="border: 1px solid #e2e8f0; border-radius: 8px; overflow: hidden; margin-bottom: 24px;">
                <tr>
                  <td style="padding: 16px; background-color: #f8fafc;">
                    <div style="display: flex; justify-content: space-between; align-items: center;">
                      <div>
                        <div style="color: #1e293b; font-size: 18px; font-weight: 600; margin-bottom: 4px;">${data.tierName}</div>
                        <div style="color: #64748b; font-size: 14px;">${data.warrantyYears} Year Warranty</div>
                      </div>
                      <div style="text-align: right;">
                        <div style="color: #64748b; font-size: 12px;">From</div>
                        <div style="color: #2563eb; font-size: 24px; font-weight: 700;">${formatPrice(data.fromPrice)}</div>
                      </div>
                    </div>
                  </td>
                </tr>
              </table>

              <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom: 24px;">
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
                    <span style="color: #64748b; font-size: 14px;">Area Code</span>
                  </td>
                  <td style="padding: 12px 0; border-bottom: 1px solid #e2e8f0; text-align: right;">
                    <span style="color: #1e293b; font-size: 14px; font-weight: 600;">${data.outwardCode}</span>
                  </td>
                </tr>
              </table>

              <div style="background-color: #dbeafe; border-left: 4px solid #2563eb; padding: 16px; margin: 24px 0; border-radius: 4px;">
                <p style="margin: 0; color: #1e40af; font-size: 14px; line-height: 1.6;"><strong>Important:</strong> This is a provisional estimate based on a standard installation. Your final price will be confirmed after our free site survey.</p>
              </div>

              <h3 style="margin: 32px 0 16px 0; color: #1e293b; font-size: 18px; font-weight: 600;">What happens next?</h3>

              <ol style="margin: 0; padding-left: 20px; color: #64748b; font-size: 15px; line-height: 1.8;">
                <li style="margin-bottom: 12px;">Our team will contact you within 24 hours</li>
                <li style="margin-bottom: 12px;">We'll arrange a convenient time for your free site survey</li>
                <li style="margin-bottom: 12px;">After the survey, you'll receive your confirmed price</li>
                <li>If you're happy, we'll schedule your installation</li>
              </ol>

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

export function getInstallerEmailTemplate(data: QuoteFormData & { quoteRef: string }) {
  const whatsappMessage = `Hi ${data.customerName}, this is [Your Name] from Boilable. Thanks for your ${data.tierName} quote request (${data.quoteRef}). I'd love to arrange your free site survey. When would be a good time to visit ${data.postcode}?`;

  return {
    subject: `New Lead: ${data.tierName} - ${data.postcode} (${data.quoteRef})`,
    html: `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New Lead Notification</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f8fafc;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f8fafc; padding: 40px 20px;">
    <tr>
      <td align="center">
        <table width="700" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
          <tr>
            <td style="background-color: #059669; padding: 30px; text-align: center;">
              <h1 style="margin: 0; color: #ffffff; font-size: 24px; font-weight: 700;">New Lead Received</h1>
              <p style="margin: 8px 0 0 0; color: #d1fae5; font-size: 14px;">${data.quoteRef}</p>
            </td>
          </tr>
          <tr>
            <td style="padding: 40px;">
              <div style="background-color: ${data.coverageStatus === 'in_area' ? '#d1fae5' : '#fef3c7'}; border-left: 4px solid ${data.coverageStatus === 'in_area' ? '#10b981' : '#f59e0b'}; padding: 16px; margin-bottom: 24px; border-radius: 4px;">
                <div style="display: flex; justify-content: space-between; align-items: center;">
                  <div>
                    <div style="color: ${data.coverageStatus === 'in_area' ? '#065f46' : '#92400e'}; font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 4px;">Coverage Status</div>
                    <div style="color: ${data.coverageStatus === 'in_area' ? '#065f46' : '#92400e'}; font-size: 16px; font-weight: 600;">${data.coverageStatus === 'in_area' ? 'In Service Area' : 'Out of Area'}</div>
                  </div>
                  <div style="text-align: right;">
                    <div style="color: ${data.coverageStatus === 'in_area' ? '#065f46' : '#92400e'}; font-size: 12px; margin-bottom: 4px;">Outward Code</div>
                    <div style="color: ${data.coverageStatus === 'in_area' ? '#065f46' : '#92400e'}; font-size: 18px; font-weight: 700; font-family: monospace;">${data.outwardCode}</div>
                  </div>
                </div>
              </div>

              <h2 style="margin: 0 0 24px 0; color: #1e293b; font-size: 20px; font-weight: 600;">Quote Details</h2>

              <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom: 32px;">
                <tr>
                  <td style="padding: 12px 0; border-bottom: 1px solid #e2e8f0;">
                    <span style="color: #64748b; font-size: 14px;">Selected Tier</span>
                  </td>
                  <td style="padding: 12px 0; border-bottom: 1px solid #e2e8f0; text-align: right;">
                    <span style="color: #1e293b; font-size: 14px; font-weight: 600;">${data.tierName}</span>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 12px 0; border-bottom: 1px solid #e2e8f0;">
                    <span style="color: #64748b; font-size: 14px;">From Price</span>
                  </td>
                  <td style="padding: 12px 0; border-bottom: 1px solid #e2e8f0; text-align: right;">
                    <span style="color: #1e293b; font-size: 14px; font-weight: 600;">${formatPrice(data.fromPrice)}</span>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 12px 0; border-bottom: 1px solid #e2e8f0;">
                    <span style="color: #64748b; font-size: 14px;">Warranty</span>
                  </td>
                  <td style="padding: 12px 0; border-bottom: 1px solid #e2e8f0; text-align: right;">
                    <span style="color: #1e293b; font-size: 14px; font-weight: 600;">${data.warrantyYears} Years</span>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 12px 0; border-bottom: 1px solid #e2e8f0;">
                    <span style="color: #64748b; font-size: 14px;">Brand Preference</span>
                  </td>
                  <td style="padding: 12px 0; border-bottom: 1px solid #e2e8f0; text-align: right;">
                    <span style="color: #1e293b; font-size: 14px; font-weight: 600;">${data.brandPreference}</span>
                  </td>
                </tr>
              </table>

              <h3 style="margin: 0 0 16px 0; color: #1e293b; font-size: 18px; font-weight: 600;">Customer Information</h3>

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
                ${data.addressLine1 ? `
                <tr>
                  <td style="padding: 12px 0; border-bottom: 1px solid #e2e8f0;">
                    <span style="color: #64748b; font-size: 14px;">Address</span>
                  </td>
                  <td style="padding: 12px 0; border-bottom: 1px solid #e2e8f0; text-align: right;">
                    <span style="color: #1e293b; font-size: 14px; font-weight: 600;">${data.addressLine1}</span>
                  </td>
                </tr>
                ` : ''}
                <tr>
                  <td style="padding: 12px 0; border-bottom: 1px solid #e2e8f0;">
                    <span style="color: #64748b; font-size: 14px;">Preferred Contact</span>
                  </td>
                  <td style="padding: 12px 0; border-bottom: 1px solid #e2e8f0; text-align: right;">
                    <span style="color: #1e293b; font-size: 14px; font-weight: 600;">${data.preferredContactMethod}</span>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 12px 0; border-bottom: 1px solid #e2e8f0;">
                    <span style="color: #64748b; font-size: 14px;">Preferred Time</span>
                  </td>
                  <td style="padding: 12px 0; border-bottom: 1px solid #e2e8f0; text-align: right;">
                    <span style="color: #1e293b; font-size: 14px; font-weight: 600;">${data.preferredTimeWindow}</span>
                  </td>
                </tr>
              </table>

              <h3 style="margin: 0 0 16px 0; color: #1e293b; font-size: 18px; font-weight: 600;">Property Details</h3>

              <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom: 32px;">
                <tr>
                  <td style="padding: 12px 0; border-bottom: 1px solid #e2e8f0;">
                    <span style="color: #64748b; font-size: 14px;">Property Type</span>
                  </td>
                  <td style="padding: 12px 0; border-bottom: 1px solid #e2e8f0; text-align: right;">
                    <span style="color: #1e293b; font-size: 14px; font-weight: 600;">${data.propertyType}</span>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 12px 0; border-bottom: 1px solid #e2e8f0;">
                    <span style="color: #64748b; font-size: 14px;">Bedrooms</span>
                  </td>
                  <td style="padding: 12px 0; border-bottom: 1px solid #e2e8f0; text-align: right;">
                    <span style="color: #1e293b; font-size: 14px; font-weight: 600;">${data.bedrooms}</span>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 12px 0; border-bottom: 1px solid #e2e8f0;">
                    <span style="color: #64748b; font-size: 14px;">Bathrooms</span>
                  </td>
                  <td style="padding: 12px 0; border-bottom: 1px solid #e2e8f0; text-align: right;">
                    <span style="color: #1e293b; font-size: 14px; font-weight: 600;">${data.bathrooms}</span>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 12px 0; border-bottom: 1px solid #e2e8f0;">
                    <span style="color: #64748b; font-size: 14px;">Fuel Type</span>
                  </td>
                  <td style="padding: 12px 0; border-bottom: 1px solid #e2e8f0; text-align: right;">
                    <span style="color: #1e293b; font-size: 14px; font-weight: 600;">${data.fuelType}</span>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 12px 0; border-bottom: 1px solid #e2e8f0;">
                    <span style="color: #64748b; font-size: 14px;">Current Boiler</span>
                  </td>
                  <td style="padding: 12px 0; border-bottom: 1px solid #e2e8f0; text-align: right;">
                    <span style="color: #1e293b; font-size: 14px; font-weight: 600;">${data.currentBoilerType}</span>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 12px 0; border-bottom: 1px solid #e2e8f0;">
                    <span style="color: #64748b; font-size: 14px;">Boiler Location</span>
                  </td>
                  <td style="padding: 12px 0; border-bottom: 1px solid #e2e8f0; text-align: right;">
                    <span style="color: #1e293b; font-size: 14px; font-weight: 600;">${data.boilerLocation}</span>
                  </td>
                </tr>
              </table>

              ${data.customerNotes ? `
              <h3 style="margin: 0 0 16px 0; color: #1e293b; font-size: 18px; font-weight: 600;">Additional Notes</h3>
              <div style="background-color: #fef3c7; border-left: 4px solid #f59e0b; padding: 16px; margin-bottom: 32px; border-radius: 4px;">
                <p style="margin: 0; color: #92400e; font-size: 14px; line-height: 1.6;">${data.customerNotes}</p>
              </div>
              ` : ''}

              <h3 style="margin: 0 0 16px 0; color: #1e293b; font-size: 18px; font-weight: 600;">WhatsApp Follow-up Message</h3>
              <div style="background-color: #f1f5f9; border-radius: 8px; padding: 16px; margin-bottom: 16px;">
                <p style="margin: 0; color: #475569; font-size: 14px; line-height: 1.6; font-style: italic;">${whatsappMessage}</p>
              </div>
              <p style="margin: 0; color: #64748b; font-size: 12px;">Copy this message to send via WhatsApp</p>
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
