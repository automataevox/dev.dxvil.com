# Email Service Integration Guide

The contact form is functional and currently opens your default email client with pre-filled information as a fallback. To enable server-side email sending, you can integrate with any of the following services:

## Option 1: Resend (Recommended)

[Resend](https://resend.com) is a modern email API built for developers with a generous free tier.

### Setup:

1. Install Resend:
```bash
npm install resend
```

2. Sign up at [resend.com](https://resend.com) and get your API key

3. Add to `.env.local`:
```env
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxx
CONTACT_EMAIL=dev@dxvil.com
```

4. Update `app/api/contact/route.ts`:

```typescript
import { Resend } from 'resend';
import { createEmailHTML } from './route'; // Import the existing HTML template function

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { firstName, lastName, email, message } = body;

        // Validation...

        const emailHTML = createEmailHTML(firstName, lastName, email, message);

        const { data, error } = await resend.emails.send({
            from: 'Portfolio <onboarding@resend.dev>',
            to: [process.env.CONTACT_EMAIL || 'dev@dxvil.com'],
            subject: `Portfolio Contact: ${firstName} ${lastName}`,
            replyTo: email,
            html: emailHTML
        });

        if (error) {
            throw error;
        }

        return NextResponse.json({
            success: true,
            message: `Thank you, ${firstName}! Your message has been sent and I'll get back to you soon.`
        });
    } catch (error) {
        console.error('Contact form error:', error);
        return NextResponse.json(
            { error: 'Failed to send message' },
            { status: 500 }
        );
    }
}
```

**Note:** The email template is already styled to match your portfolio's dark theme with gradient effects, rounded corners, and modern typography. The `createEmailHTML` function is defined in the route file.

## Option 2: SendGrid

[SendGrid](https://sendgrid.com) is a reliable email service with a free tier.

### Setup:

1. Install SendGrid:
```bash
npm install @sendgrid/mail
```

2. Get your API key from SendGrid

3. Add to `.env.local`:
```env
SENDGRID_API_KEY=SG.xxxxxxxxxxxxxxxxxxxx
CONTACT_EMAIL=dev@dxvil.com
```

4. Update `app/api/contact/route.ts`:

```typescript
import sgMail from '@sendgrid/mail';
import { createEmailHTML } from './route'; // Import the existing HTML template function

sgMail.setApiKey(process.env.SENDGRID_API_KEY!);

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { firstName, lastName, email, message } = body;

        // Validation...

        const emailHTML = createEmailHTML(firstName, lastName, email, message);

        await sgMail.send({
            to: process.env.CONTACT_EMAIL || 'dev@dxvil.com',
            from: 'noreply@yourdomain.com', // Must be verified in SendGrid
            subject: `Portfolio Contact: ${firstName} ${lastName}`,
            replyTo: email,
            html: emailHTML
        });

        return NextResponse.json({
            success: true,
            message: `Thank you, ${firstName}! Your message has been sent and I'll get back to you soon.`
        });
    } catch (error) {
        console.error('Contact form error:', error);
        return NextResponse.json(
            { error: 'Failed to send message' },
            { status: 500 }
        );
    }
}
```

## Option 3: Nodemailer (SMTP)

Use any SMTP provider (Gmail, Office365, custom server).

### Setup:

1. Install Nodemailer:
```bash
npm install nodemailer
npm install -D @types/nodemailer
```

2. Add to `.env.local`:
```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
CONTACT_EMAIL=dev@dxvil.com
```

3. Update `app/api/contact/route.ts`:

```typescript
import nodemailer from 'nodemailer';
import { createEmailHTML } from './route'; // Import the existing HTML template function

const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT || '587'),
    secure: false,
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
    },
});

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { firstName, lastName, email, message } = body;

        // Validation...

        const emailHTML = createEmailHTML(firstName, lastName, email, message);

        await transporter.sendMail({
            from: process.env.SMTP_USER,
            to: process.env.CONTACT_EMAIL || 'dev@dxvil.com',
            subject: `Portfolio Contact: ${firstName} ${lastName}`,
            replyTo: email,
            html: emailHTML
        });

        return NextResponse.json({
            success: true,
            message: `Thank you, ${firstName}! Your message has been sent and I'll get back to you soon.`
        });
    } catch (error) {
        console.error('Contact form error:', error);
        return NextResponse.json(
            { error: 'Failed to send message' },
            { status: 500 }
        );
    }
}
```

## Current Fallback Behavior

Without configuring an email service, the form will:
1. Validate the input
2. Show a success message
3. Open your default email client with pre-filled information
4. Log the submission to the server console

This ensures the form is always functional, even without an email service configured.

## Testing

You can test the form locally:

```bash
npm run dev
```

Navigate to the contact section and submit the form. Check:
- Form validation works
- Loading state appears during submission
- Success/error messages display correctly
- Email client opens with pre-filled data (if no service configured)
- Server logs show the submission details

## Adding Environment Variables to Vercel

1. Go to your project settings in Vercel
2. Navigate to Settings → Environment Variables
3. Add your chosen service's variables
4. Redeploy the project

## Security Notes

- Never commit `.env.local` to git
- Use environment variables for all sensitive data
- Validate and sanitize all user inputs (already implemented)
- Consider rate limiting for production
- Use CAPTCHA for additional spam protection if needed
