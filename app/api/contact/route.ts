import { NextRequest, NextResponse } from 'next/server';
import { ContactFormData } from '@/lib/types/contact';
import { validateContactForm } from '@/lib/validation/contact';
import { EmailServiceFactory } from '@/lib/email/service';
import { EMAIL_CONFIG, ERROR_MESSAGES } from '@/lib/constants';

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        
        // Validate input
        const validation = validateContactForm(body);
        if (!validation.isValid) {
            return NextResponse.json(
                { error: validation.error || ERROR_MESSAGES.validationFailed },
                { status: 400 }
            );
        }

        const formData: ContactFormData = body as ContactFormData;

        // Send email using service
        const emailService = EmailServiceFactory.createResendService(
            process.env.RESEND_API_KEY,
            EMAIL_CONFIG.from,
            EMAIL_CONFIG.to
        );

        const result = await emailService.send(formData);

        // Log success
        console.log('Email sent successfully:', {
            emailId: result.emailId,
            to: EMAIL_CONFIG.to,
            replyTo: formData.email
        });

        return NextResponse.json({
            success: result.success,
            message: result.message
        });

    } catch (error) {
        console.error('Contact form error:', error);
        
        const errorMessage = error instanceof Error 
            ? error.message 
            : ERROR_MESSAGES.emailSendFailed;

        return NextResponse.json(
            { error: errorMessage },
            { status: 500 }
        );
    }
}
