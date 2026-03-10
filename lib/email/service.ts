import { Resend } from 'resend';
import { ContactFormData, EmailResponse } from '../types/contact';
import { createContactEmailTemplate } from './template';

// Email Service Interface (Dependency Inversion Principle)
export interface IEmailService {
    send(data: ContactFormData): Promise<EmailResponse>;
}

// Abstract Email Service (Open/Closed Principle)
abstract class BaseEmailService implements IEmailService {
    protected readonly from: string;
    protected readonly to: readonly string[];

    constructor(from: string, to: readonly string[]) {
        this.from = from;
        this.to = to;
    }

    abstract send(data: ContactFormData): Promise<EmailResponse>;

    protected generateEmailHTML(data: ContactFormData): string {
        return createContactEmailTemplate(data);
    }

    protected createSuccessMessage(): string {
        return 'Message sent successfully';
    }
}

// Resend Implementation (Single Responsibility Principle)
export class ResendEmailService extends BaseEmailService {
    private readonly resend: Resend;

    constructor(apiKey: string, from: string, to: readonly string[]) {
        super(from, to);
        this.resend = new Resend(apiKey);
    }

    async send(data: ContactFormData): Promise<EmailResponse> {
        try {
            const emailHTML = this.generateEmailHTML(data);

            const { data: responseData, error } = await this.resend.emails.send({
                from: this.from,
                to: [...this.to], // Convert readonly to mutable for Resend API
                subject: this.createEmailSubject(data),
                replyTo: data.email,
                html: emailHTML
            });

            if (error) {
                throw new Error(error.message || 'Failed to send email');
            }

            return {
                success: true,
                message: this.createSuccessMessage(),
                emailId: responseData?.id
            };
        } catch (error) {
            throw this.handleError(error);
        }
    }

    private createEmailSubject(data: ContactFormData): string {
        return `Portfolio Contact: ${data.firstName} ${data.lastName}`;
    }

    private handleError(error: unknown): Error {
        if (error instanceof Error) {
            return new Error(`Email service error: ${error.message}`);
        }
        return new Error('Unknown email service error');
    }
}

// Factory Pattern for Email Service Creation
export class EmailServiceFactory {
    static createResendService(
        apiKey: string | undefined,
        from: string,
        to: readonly string[]
    ): IEmailService {
        if (!apiKey) {
            throw new Error('RESEND_API_KEY is not configured');
        }

        return new ResendEmailService(apiKey, from, to);
    }
}
