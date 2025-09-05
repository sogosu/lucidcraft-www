import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: NextRequest) {
  let name, email, message;
  
  try {
    const requestData = await request.json();
    name = requestData.name;
    email = requestData.email;
    message = requestData.message;

    // Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Create transporter (you'll need to configure this with your email provider)
    // For now, this is a placeholder - you'll need to add actual SMTP credentials
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'smtp.gmail.com',
      port: parseInt(process.env.SMTP_PORT || '587'),
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    // Email content
    const emailContent = {
      from: process.env.SMTP_USER,
      to: 'jerome@lucidcraft.studio',
      subject: `New Contact Form Submission from ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333;">New Contact Form Submission</h2>
          
          <div style="background: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #666; margin-top: 0;">Contact Details:</h3>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
          </div>
          
          <div style="background: #ffffff; padding: 20px; border: 1px solid #ddd; border-radius: 8px;">
            <h3 style="color: #666; margin-top: 0;">Message:</h3>
            <p style="line-height: 1.6; color: #333;">${message.replace(/\n/g, '<br>')}</p>
          </div>
          
          <div style="margin-top: 20px; padding: 15px; background: #e8f4fd; border-radius: 8px;">
            <p style="margin: 0; color: #666; font-size: 14px;">
              This message was sent from the Lucidcraft Studio website contact form.
            </p>
          </div>
        </div>
      `,
      text: `
New Contact Form Submission

Name: ${name}
Email: ${email}

Message:
${message}

---
This message was sent from the Lucidcraft Studio website contact form.
      `,
    };

    // Send email
    await transporter.sendMail(emailContent);

    return NextResponse.json(
      { message: 'Email sent successfully' },
      { status: 200 }
    );

  } catch (error) {
    console.error('Error sending email:', error);
    
    // For development/testing without SMTP configured
    if (process.env.NODE_ENV === 'development') {
      console.log('Development mode - email would be sent with:', {
        name,
        email,
        message,
      });
      
      return NextResponse.json(
        { message: 'Development mode - form submission received' },
        { status: 200 }
      );
    }
    
    return NextResponse.json(
      { error: 'Failed to send email' },
      { status: 500 }
    );
  }
}