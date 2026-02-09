import { ContactFormData } from '../types/contact';

interface EmailTemplateOptions {
    firstName: string;
    lastName: string;
    email: string;
    message: string;
    portfolioUrl: string;
}

export class EmailTemplate {
    private readonly portfolioUrl: string;

    constructor(portfolioUrl: string = 'https://dev.dxvil.com') {
        this.portfolioUrl = portfolioUrl;
    }

    generate(data: ContactFormData): string {
        return this.buildHTML({
            ...data,
            portfolioUrl: this.portfolioUrl
        });
    }

    private buildHTML(options: EmailTemplateOptions): string {
        const { firstName, lastName, email, message, portfolioUrl } = options;
        const currentDate = new Date().toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });

        // Escape all user inputs to prevent XSS
        const safeFirstName = this.escapeHtml(firstName);
        const safeLastName = this.escapeHtml(lastName);
        const safeEmail = this.escapeHtml(email);
        const safeMessage = this.escapeHtml(message);

        return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Portfolio Contact - ${safeFirstName} ${safeLastName}</title>
</head>
<body style="${this.getBodyStyles()}">
    ${this.buildMainTable(safeFirstName, safeLastName, safeEmail, safeMessage, portfolioUrl, currentDate)}
</body>
</html>`;
    }

    private getBodyStyles(): string {
        return [
            'margin: 0',
            'padding: 0',
            'font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
            'background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)',
            'color: #e5e5e5'
        ].join('; ') + ';';
    }

    private buildMainTable(
        firstName: string,
        lastName: string,
        email: string,
        message: string,
        portfolioUrl: string,
        date: string
    ): string {
        return `
    <table role="presentation" style="width: 100%; border-collapse: collapse; background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%);">
        <tr>
            <td align="center" style="padding: 40px 20px;">
                <table role="presentation" style="max-width: 600px; background: #343434; border-radius: 16px; box-shadow: 0 20px 60px rgba(0, 0, 0, 0.4); overflow: hidden;">
                    ${this.buildHeader()}
                    ${this.buildContent(firstName, lastName, email, message)}
                    ${this.buildCallToAction(firstName, email)}
                    ${this.buildFooter(portfolioUrl, date)}
                </table>
            </td>
        </tr>
    </table>`;
    }

    private buildHeader(): string {
        return `
                    <tr>
                        <td style="background: linear-gradient(135deg, #4a4a4a 0%, #343434 100%); padding: 40px 30px; text-align: center; border-bottom: 2px solid rgba(255, 255, 255, 0.1);">
                            <div style="display: inline-block; width: 64px; height: 64px; background: rgba(222, 222, 222, 0.1); border-radius: 50%; margin-bottom: 16px; display: flex; align-items: center; justify-content: center;">
                                <span style="font-size: 32px;">✉️</span>
                            </div>
                            <h1 style="margin: 0; font-size: 28px; font-weight: 700; color: #dedede; letter-spacing: -0.5px;">New Contact Message</h1>
                            <p style="margin: 8px 0 0; color: #b0b0b0; font-size: 14px;">dev.dxvil.com</p>
                        </td>
                    </tr>`;
    }

    private buildContent(firstName: string, lastName: string, email: string, message: string): string {
        return `
                    <tr>
                        <td style="padding: 40px 30px;">
                            ${this.buildContactDetails(firstName, lastName, email)}
                            ${this.buildMessageBox(message)}
                        </td>
                    </tr>`;
    }

    private buildContactDetails(firstName: string, lastName: string, email: string): string {
        return `
                            <div style="background: rgba(94, 94, 94, 0.3); border-radius: 12px; padding: 24px; margin-bottom: 24px; border-left: 4px solid #dedede;">
                                <h2 style="margin: 0 0 16px; font-size: 18px; font-weight: 600; color: #dedede;">Contact Details</h2>
                                <table role="presentation" style="width: 100%; border-collapse: collapse;">
                                    <tr>
                                        <td style="padding: 8px 0; color: #b0b0b0; font-size: 14px; width: 100px;">Name:</td>
                                        <td style="padding: 8px 0; color: #e5e5e5; font-size: 14px; font-weight: 500;">${firstName} ${lastName}</td>
                                    </tr>
                                    <tr>
                                        <td style="padding: 8px 0; color: #b0b0b0; font-size: 14px;">Email:</td>
                                        <td style="padding: 8px 0;">
                                            <a href="mailto:${email}" style="color: #dedede; text-decoration: none; font-size: 14px; font-weight: 500; border-bottom: 1px solid rgba(222, 222, 222, 0.3); transition: border-color 0.3s;">${email}</a>
                                        </td>
                                    </tr>
                                </table>
                            </div>`;
    }

    private buildMessageBox(message: string): string {
        return `
                            <div style="background: rgba(94, 94, 94, 0.2); border-radius: 12px; padding: 24px; border: 1px solid rgba(255, 255, 255, 0.1);">
                                <h2 style="margin: 0 0 16px; font-size: 18px; font-weight: 600; color: #dedede;">Message</h2>
                                <p style="margin: 0; color: #e5e5e5; font-size: 15px; line-height: 1.6; white-space: pre-wrap;">${message}</p>
                            </div>`;
    }

    private buildCallToAction(firstName: string, email: string): string {
        return `
                    <tr>
                        <td style="padding: 0 30px 40px;">
                            <table role="presentation" style="width: 100%; border-collapse: collapse;">
                                <tr>
                                    <td align="center">
                                        <a href="mailto:${email}?subject=Re: Portfolio Contact" style="display: inline-block; background: #dedede; color: #252525; padding: 14px 32px; border-radius: 8px; text-decoration: none; font-size: 15px; font-weight: 600; transition: all 0.3s;">Reply to ${firstName}</a>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>`;
    }

    private buildFooter(portfolioUrl: string, date: string): string {
        return `
                    <tr>
                        <td style="background: rgba(0, 0, 0, 0.2); padding: 24px 30px; text-align: center; border-top: 1px solid rgba(255, 255, 255, 0.1);">
                            <p style="margin: 0 0 8px; color: #b0b0b0; font-size: 13px;">This message was sent via your portfolio contact form</p>
                            <p style="margin: 0; color: #808080; font-size: 12px;">
                                <a href="${portfolioUrl}" style="color: #dedede; text-decoration: none; border-bottom: 1px solid rgba(222, 222, 222, 0.3);">dev.dxvil.com</a> • ${date}
                            </p>
                        </td>
                    </tr>`;
    }

    private escapeHtml(text: string): string {
        const map: Record<string, string> = {
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            "'": '&#039;'
        };
        return text.replace(/[&<>"']/g, (char) => map[char]);
    }
}

export const createContactEmailTemplate = (data: ContactFormData): string => {
    const template = new EmailTemplate();
    return template.generate(data);
};
