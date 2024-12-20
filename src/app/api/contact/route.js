import { Resend } from 'resend';
import { NextResponse } from 'next/server';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req) {
  try {
    const { name, email, subject, message } = await req.json();

    // Form validasyonu
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: 'Tüm alanların doldurulması zorunludur.' },
        { status: 400 }
      );
    }

    const data = await resend.emails.send({
      from: 'İbrahim Art <noreply@ibrahimart.com>',
      to: ['info@ibrahimart.com'], // Kendi e-posta adresiniz
      reply_to: email,
      subject: `Yeni İletişim Formu: ${subject}`,
      html: `
        <h2>Yeni İletişim Formu Mesajı</h2>
        <p><strong>Gönderen:</strong> ${name}</p>
        <p><strong>E-posta:</strong> ${email}</p>
        <p><strong>Konu:</strong> ${subject}</p>
        <p><strong>Mesaj:</strong></p>
        <p>${message.replace(/\\n/g, '<br>')}</p>
      `,
    });

    return NextResponse.json(
      { message: 'E-posta başarıyla gönderildi.' },
      { status: 200 }
    );
  } catch (error) {
    console.error('E-posta gönderimi sırasında hata:', error);
    return NextResponse.json(
      { error: 'E-posta gönderilirken bir hata oluştu.' },
      { status: 500 }
    );
  }
} 