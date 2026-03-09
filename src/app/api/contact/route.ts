import { addContactMessage } from '@/lib/actions';
import nodemailer from 'nodemailer';

export const runtime = 'nodejs';

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const { name, email, phone, subject, budget, message } = data;

    // Validate required fields
    if (!name || !email || !subject || !message) {
      return new Response(JSON.stringify({ error: 'Lütfen zorunlu alanları doldurun.' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Save to database
    await addContactMessage({ name, email, phone, subject, budget, message });

    // Send email notification
    try {
      const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST || 'smtp.gmail.com',
        port: Number(process.env.SMTP_PORT) || 587,
        secure: false,
        auth: {
          user: process.env.SMTP_USER || '',
          pass: process.env.SMTP_PASS || '',
        },
      });

      const mailOptions = {
        from: `"Portfolyom" <${process.env.SMTP_USER || 'noreply@ridvancakar.com'}>`,
        to: process.env.CONTACT_EMAIL || process.env.SMTP_USER || '',
        subject: `🔔 Yeni Teklif İsteği: ${subject}`,
        html: `
          <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #0f1014; color: #e0e0e0; border-radius: 12px; overflow: hidden;">
            <div style="background: linear-gradient(135deg, #1a1f3a 0%, #0b1520 100%); padding: 2rem; text-align: center;">
              <h1 style="margin: 0; font-size: 1.4rem; color: #3b82f6;">📩 Yeni Teklif İsteği</h1>
              <p style="color: rgba(255,255,255,0.5); margin-top: 0.5rem; font-size: 0.9rem;">Portfolyo sitenizden yeni bir mesaj geldi</p>
            </div>
            <div style="padding: 1.5rem 2rem;">
              <table style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="padding: 0.75rem 0; color: rgba(255,255,255,0.5); width: 120px; vertical-align: top;">👤 İsim:</td>
                  <td style="padding: 0.75rem 0; font-weight: 600;">${name}</td>
                </tr>
                <tr>
                  <td style="padding: 0.75rem 0; color: rgba(255,255,255,0.5); vertical-align: top;">📧 E-posta:</td>
                  <td style="padding: 0.75rem 0;"><a href="mailto:${email}" style="color: #3b82f6; text-decoration: none;">${email}</a></td>
                </tr>
                ${phone ? `<tr>
                  <td style="padding: 0.75rem 0; color: rgba(255,255,255,0.5); vertical-align: top;">📱 Telefon:</td>
                  <td style="padding: 0.75rem 0;">${phone}</td>
                </tr>` : ''}
                <tr>
                  <td style="padding: 0.75rem 0; color: rgba(255,255,255,0.5); vertical-align: top;">📋 Konu:</td>
                  <td style="padding: 0.75rem 0; font-weight: 500;">${subject}</td>
                </tr>
                ${budget ? `<tr>
                  <td style="padding: 0.75rem 0; color: rgba(255,255,255,0.5); vertical-align: top;">💰 Bütçe:</td>
                  <td style="padding: 0.75rem 0;">${budget}</td>
                </tr>` : ''}
              </table>
              <div style="margin-top: 1.5rem; padding: 1.25rem; background: rgba(255,255,255,0.05); border-radius: 8px; border-left: 3px solid #3b82f6;">
                <p style="margin: 0 0 0.5rem 0; font-size: 0.85rem; color: rgba(255,255,255,0.5);">💬 Mesaj:</p>
                <p style="margin: 0; line-height: 1.6; white-space: pre-wrap;">${message}</p>
              </div>
            </div>
            <div style="padding: 1rem 2rem; text-align: center; font-size: 0.75rem; color: rgba(255,255,255,0.3); border-top: 1px solid rgba(255,255,255,0.05);">
              Bu e-posta portfolyo sitenizden otomatik olarak gönderilmiştir.
            </div>
          </div>
        `,
      };

      await transporter.sendMail(mailOptions);
    } catch (emailError) {
      // Email failed but the message was saved to DB — don't fail the request
      console.error('Email send error:', emailError);
    }

    return new Response(JSON.stringify({ success: true, message: 'Mesajınız başarıyla gönderildi!' }), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error: any) {
    console.error('Contact API Error:', error);
    return new Response(JSON.stringify({ error: 'Bir hata oluştu. Lütfen tekrar deneyin.' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
