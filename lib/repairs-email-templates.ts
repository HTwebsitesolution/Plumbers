export interface RepairsRequestData {
  repairRef: string;
  requestType: 'repairs' | 'out_of_area_enquiry';
  postcode: string;
  outwardCode?: string;
  coverageStatus?: 'in_area' | 'out_of_area';
  issueCategory?: string;
  errorCode?: string;
  urgency?: string;
  gasSmell?: boolean;
  fuelType?: string;
  boilerType?: string;
  boilerMake?: string;
  boilerModel?: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  preferredContactMethod?: string;
  preferredTimeWindow?: string;
  customerNotes?: string;
}

export function getRepairsCustomerEmailTemplate(data: RepairsRequestData) {
  return {
    subject: `Your Boiler Repair Request (${data.repairRef})`,
    html: `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Your Repair Request</title>
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
              <h2 style="margin: 0 0 16px 0; color: #1e293b; font-size: 24px; font-weight: 600;">Thank you for your repair request!</h2>
              <p style="margin: 0 0 24px 0; color: #64748b; font-size: 16px; line-height: 1.6;">Hi ${data.customerName},</p>
              <p style="margin: 0 0 24px 0; color: #64748b; font-size: 16px; line-height: 1.6;">We've received your boiler repair request. Our team will be in touch soon to arrange a convenient time for your repair.</p>

              <div style="background-color: #f1f5f9; border-radius: 8px; padding: 24px; margin: 24px 0;">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px;">
                  <div>
                    <div style="color: #64748b; font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 4px;">Repair Reference</div>
                    <div style="color: #1e293b; font-size: 18px; font-weight: 600; font-family: monospace;">${data.repairRef}</div>
                  </div>
                </div>
              </div>

              <h3 style="margin: 32px 0 16px 0; color: #1e293b; font-size: 18px; font-weight: 600;">What happens next?</h3>

              <ol style="margin: 0; padding-left: 20px; color: #64748b; font-size: 15px; line-height: 1.8;">
                <li style="margin-bottom: 12px;">Our team will review your repair request</li>
                <li style="margin-bottom: 12px;">We'll contact you to discuss the issue and arrange a visit</li>
                <li style="margin-bottom: 12px;">Our Gas Safe engineer will diagnose and repair your boiler</li>
                <li>You'll receive confirmation once the repair is complete</li>
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

export function getRepairsInstallerEmailTemplate(data: RepairsRequestData) {
  const urgencyColor = data.urgency === 'Emergency today' ? '#dc2626' : data.urgency === 'ASAP' ? '#f59e0b' : '#10b981';
  const timeWindowText = data.preferredTimeWindow ? `You mentioned ${data.preferredTimeWindow} works best for you.` : 'When would suit you?';
  const whatsappMessage = `Hi ${data.customerName}, this is [Your Name] from Boilable. Thanks for your repair request (${data.repairRef}). I'd like to arrange a visit to fix your boiler issue. ${timeWindowText}`;

  return {
    subject: `New Repair Request${data.urgency === 'Emergency today' ? ' - EMERGENCY' : ''}: ${data.postcode} (${data.repairRef})`,
    html: `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New Repair Request</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f8fafc;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f8fafc; padding: 40px 20px;">
    <tr>
      <td align="center">
        <table width="700" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
          <tr>
            <td style="background-color: ${data.urgency === 'Emergency today' ? '#dc2626' : '#dc2626'}; padding: 30px; text-align: center;">
              <h1 style="margin: 0; color: #ffffff; font-size: 24px; font-weight: 700;">New Repair Request${data.urgency === 'Emergency today' ? ' - EMERGENCY' : ''}</h1>
              <p style="margin: 8px 0 0 0; color: #fee2e2; font-size: 14px;">${data.repairRef}</p>
            </td>
          </tr>
          <tr>
            <td style="padding: 40px;">
              ${data.urgency ? `
              <div style="background-color: ${urgencyColor === '#dc2626' ? '#fee2e2' : urgencyColor === '#f59e0b' ? '#fef3c7' : '#d1fae5'}; border-left: 4px solid ${urgencyColor}; padding: 16px; margin-bottom: 24px; border-radius: 4px;">
                <div>
                  <div style="color: ${urgencyColor === '#dc2626' ? '#7f1d1d' : urgencyColor === '#f59e0b' ? '#92400e' : '#065f46'}; font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 4px;">Urgency Level</div>
                  <div style="color: ${urgencyColor === '#dc2626' ? '#7f1d1d' : urgencyColor === '#f59e0b' ? '#92400e' : '#065f46'}; font-size: 18px; font-weight: 700;">${data.urgency}</div>
                </div>
              </div>
              ` : ''}

              ${data.coverageStatus === 'out_of_area' ? `
              <div style="background-color: #fef3c7; border-left: 4px solid #f59e0b; padding: 16px; margin-bottom: 24px; border-radius: 4px;">
                <div style="color: #92400e; font-size: 14px; font-weight: 600;">Out of Area Enquiry - ${data.outwardCode || data.postcode}</div>
              </div>
              ` : ''}

              ${(data.issueCategory || data.errorCode) ? `
              <h2 style="margin: 0 0 16px 0; color: #1e293b; font-size: 20px; font-weight: 600;">Issue Details</h2>

              <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom: 32px;">
                ${data.issueCategory ? `
                <tr>
                  <td style="padding: 12px 0; border-bottom: 1px solid #e2e8f0;">
                    <span style="color: #64748b; font-size: 14px;">Issue Type</span>
                  </td>
                  <td style="padding: 12px 0; border-bottom: 1px solid #e2e8f0; text-align: right;">
                    <span style="color: #1e293b; font-size: 14px; font-weight: 600;">${data.issueCategory}</span>
                  </td>
                </tr>
                ` : ''}
                ${data.errorCode ? `
                <tr>
                  <td style="padding: 12px 0; border-bottom: 1px solid #e2e8f0;">
                    <span style="color: #64748b; font-size: 14px;">Error Code</span>
                  </td>
                  <td style="padding: 12px 0; border-bottom: 1px solid #e2e8f0; text-align: right;">
                    <span style="color: #dc2626; font-size: 16px; font-weight: 700; font-family: monospace;">${data.errorCode}</span>
                  </td>
                </tr>
                ` : ''}
                ${data.gasSmell !== undefined ? `
                <tr>
                  <td style="padding: 12px 0; border-bottom: 1px solid #e2e8f0;">
                    <span style="color: #64748b; font-size: 14px;">Gas Smell</span>
                  </td>
                  <td style="padding: 12px 0; border-bottom: 1px solid #e2e8f0; text-align: right;">
                    <span style="color: ${data.gasSmell ? '#dc2626' : '#10b981'}; font-size: 14px; font-weight: 700;">${data.gasSmell ? 'YES - REFER TO EMERGENCY' : 'No'}</span>
                  </td>
                </tr>
                ` : ''}
              </table>
              ` : ''}

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
                ${data.preferredContactMethod ? `
                <tr>
                  <td style="padding: 12px 0; border-bottom: 1px solid #e2e8f0;">
                    <span style="color: #64748b; font-size: 14px;">Preferred Contact</span>
                  </td>
                  <td style="padding: 12px 0; border-bottom: 1px solid #e2e8f0; text-align: right;">
                    <span style="color: #1e293b; font-size: 14px; font-weight: 600;">${data.preferredContactMethod}</span>
                  </td>
                </tr>
                ` : ''}
                ${data.preferredTimeWindow ? `
                <tr>
                  <td style="padding: 12px 0; border-bottom: 1px solid #e2e8f0;">
                    <span style="color: #64748b; font-size: 14px;">Preferred Time</span>
                  </td>
                  <td style="padding: 12px 0; border-bottom: 1px solid #e2e8f0; text-align: right;">
                    <span style="color: #1e293b; font-size: 14px; font-weight: 600;">${data.preferredTimeWindow}</span>
                  </td>
                </tr>
                ` : ''}
              </table>

              ${(data.fuelType || data.boilerType || data.boilerMake || data.boilerModel) ? `
              <h3 style="margin: 0 0 16px 0; color: #1e293b; font-size: 18px; font-weight: 600;">Boiler Details</h3>

              <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom: 32px;">
                ${data.fuelType ? `
                <tr>
                  <td style="padding: 12px 0; border-bottom: 1px solid #e2e8f0;">
                    <span style="color: #64748b; font-size: 14px;">Fuel Type</span>
                  </td>
                  <td style="padding: 12px 0; border-bottom: 1px solid #e2e8f0; text-align: right;">
                    <span style="color: #1e293b; font-size: 14px; font-weight: 600;">${data.fuelType}</span>
                  </td>
                </tr>
                ` : ''}
                ${data.boilerType ? `
                <tr>
                  <td style="padding: 12px 0; border-bottom: 1px solid #e2e8f0;">
                    <span style="color: #64748b; font-size: 14px;">Boiler Type</span>
                  </td>
                  <td style="padding: 12px 0; border-bottom: 1px solid #e2e8f0; text-align: right;">
                    <span style="color: #1e293b; font-size: 14px; font-weight: 600;">${data.boilerType}</span>
                  </td>
                </tr>
                ` : ''}
                ${data.boilerMake ? `
                <tr>
                  <td style="padding: 12px 0; border-bottom: 1px solid #e2e8f0;">
                    <span style="color: #64748b; font-size: 14px;">Make</span>
                  </td>
                  <td style="padding: 12px 0; border-bottom: 1px solid #e2e8f0; text-align: right;">
                    <span style="color: #1e293b; font-size: 14px; font-weight: 600;">${data.boilerMake}</span>
                  </td>
                </tr>
                ` : ''}
                ${data.boilerModel ? `
                <tr>
                  <td style="padding: 12px 0; border-bottom: 1px solid #e2e8f0;">
                    <span style="color: #64748b; font-size: 14px;">Model</span>
                  </td>
                  <td style="padding: 12px 0; border-bottom: 1px solid #e2e8f0; text-align: right;">
                    <span style="color: #1e293b; font-size: 14px; font-weight: 600;">${data.boilerModel}</span>
                  </td>
                </tr>
                ` : ''}
              </table>
              ` : ''}

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
