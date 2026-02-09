import { EmailTemplate, createContactEmailTemplate } from '../template';
import { ContactFormData } from '../../types/contact';

describe('EmailTemplate', () => {
    const mockData: ContactFormData = {
        firstName: 'John',
        lastName: 'Doe',
        email: 'john@example.com',
        message: 'This is a test message'
    };

    describe('generate', () => {
        it('should generate valid HTML email', () => {
            const template = new EmailTemplate();
            const html = template.generate(mockData);

            expect(html).toContain('<!DOCTYPE html>');
            expect(html).toContain('<html lang="en">');
            expect(html).toContain('</html>');
        });

        it('should include contact details', () => {
            const template = new EmailTemplate();
            const html = template.generate(mockData);

            expect(html).toContain('John Doe');
            expect(html).toContain('john@example.com');
            expect(html).toContain('mailto:john@example.com');
        });

        it('should include message content', () => {
            const template = new EmailTemplate();
            const html = template.generate(mockData);

            expect(html).toContain('This is a test message');
        });

        it('should escape HTML in message', () => {
            const data: ContactFormData = {
                ...mockData,
                message: '<script>alert("xss")</script>'
            };

            const template = new EmailTemplate();
            const html = template.generate(data);

            expect(html).not.toContain('<script>');
            expect(html).toContain('&lt;script&gt;');
        });

        it('should escape special characters', () => {
            const data: ContactFormData = {
                firstName: 'John & Jane',
                lastName: "O'Brien",
                email: 'test@example.com',
                message: 'Hello "world" & goodbye'
            };

            const template = new EmailTemplate();
            const html = template.generate(data);

            expect(html).toContain('John &amp; Jane');
            expect(html).toContain('Hello &quot;world&quot; &amp; goodbye');
        });

        it('should include portfolio URL', () => {
            const template = new EmailTemplate('https://custom.com');
            const html = template.generate(mockData);

            expect(html).toContain('https://custom.com');
        });

        it('should use default portfolio URL', () => {
            const template = new EmailTemplate();
            const html = template.generate(mockData);

            expect(html).toContain('https://dev.dxvil.com');
        });

        it('should include current date', () => {
            const template = new EmailTemplate();
            const html = template.generate(mockData);

            const currentYear = new Date().getFullYear();
            expect(html).toContain(currentYear.toString());
        });

        it('should include reply-to mailto link', () => {
            const template = new EmailTemplate();
            const html = template.generate(mockData);

            expect(html).toContain('mailto:john@example.com?subject=Re: Portfolio Contact');
            expect(html).toContain('Reply to John');
        });

        it('should preserve line breaks in message', () => {
            const data: ContactFormData = {
                ...mockData,
                message: 'Line 1\nLine 2\nLine 3'
            };

            const template = new EmailTemplate();
            const html = template.generate(data);

            // The template uses white-space: pre-wrap to preserve line breaks
            expect(html).toContain('white-space: pre-wrap');
            expect(html).toContain('Line 1\nLine 2\nLine 3');
        });

        it('should include email header section', () => {
            const template = new EmailTemplate();
            const html = template.generate(mockData);

            expect(html).toContain('New Contact Message');
            expect(html).toContain('dev.dxvil.com');
            expect(html).toContain('✉️');
        });

        it('should include contact details section', () => {
            const template = new EmailTemplate();
            const html = template.generate(mockData);

            expect(html).toContain('Contact Details');
            expect(html).toContain('Name:');
            expect(html).toContain('Email:');
        });

        it('should include message section', () => {
            const template = new EmailTemplate();
            const html = template.generate(mockData);

            expect(html).toContain('Message');
        });

        it('should include footer', () => {
            const template = new EmailTemplate();
            const html = template.generate(mockData);

            expect(html).toContain('This message was sent via your portfolio contact form');
        });

        it('should handle empty message', () => {
            const data: ContactFormData = {
                ...mockData,
                message: ''
            };

            const template = new EmailTemplate();
            const html = template.generate(data);

            expect(html).toContain('<!DOCTYPE html>');
            expect(html).toContain('Message');
        });

        it('should handle long names', () => {
            const data: ContactFormData = {
                firstName: 'Christopher',
                lastName: 'Montgomery-Wellington',
                email: 'test@example.com',
                message: 'Test'
            };

            const template = new EmailTemplate();
            const html = template.generate(data);

            expect(html).toContain('Christopher Montgomery-Wellington');
        });

        it('should handle unicode characters', () => {
            const data: ContactFormData = {
                firstName: 'José',
                lastName: 'García',
                email: 'test@example.com',
                message: 'Héllo wörld! 你好 🎉'
            };

            const template = new EmailTemplate();
            const html = template.generate(data);

            expect(html).toContain('José García');
            expect(html).toContain('Héllo wörld! 你好 🎉');
        });
    });

    describe('createContactEmailTemplate helper', () => {
        it('should create email template with default settings', () => {
            const html = createContactEmailTemplate(mockData);

            expect(html).toContain('<!DOCTYPE html>');
            expect(html).toContain('John Doe');
            expect(html).toContain('john@example.com');
        });

        it('should be consistent with EmailTemplate class', () => {
            const helperHtml = createContactEmailTemplate(mockData);
            const template = new EmailTemplate();
            const classHtml = template.generate(mockData);

            expect(helperHtml).toBe(classHtml);
        });
    });

    describe('styling', () => {
        it('should include CSS styles', () => {
            const template = new EmailTemplate();
            const html = template.generate(mockData);

            expect(html).toContain('background:');
            expect(html).toContain('color:');
            expect(html).toContain('font-family:');
        });

        it('should use inline styles for email compatibility', () => {
            const template = new EmailTemplate();
            const html = template.generate(mockData);

            // Check that styles are inline
            expect(html).toContain('style=');
            // Should not have <style> tags (inline styles only)
            expect(html).not.toContain('<style>');
        });

        it('should include responsive meta tag', () => {
            const template = new EmailTemplate();
            const html = template.generate(mockData);

            expect(html).toContain('viewport');
            expect(html).toContain('width=device-width');
        });
    });

    describe('security', () => {
        it('should escape all standard XSS vectors', () => {
            const xssData: ContactFormData = {
                firstName: '<img src=x onerror=alert(1)>',
                lastName: '"><script>alert(2)</script>',
                email: 'test@example.com',
                message: '<iframe src="evil.com"></iframe>'
            };

            const template = new EmailTemplate();
            const html = template.generate(xssData);

            expect(html).not.toContain('<img src=x');
            expect(html).not.toContain('<script>');
            expect(html).not.toContain('<iframe');
            expect(html).toContain('&lt;');
            expect(html).toContain('&gt;');
        });

        it('should escape apostrophes and quotes in all positions', () => {
            const data: ContactFormData = {
                firstName: "It's",
                lastName: 'Quote"Test',
                email: 'test@example.com',
                message: "She said \"hello\" and it's fine"
            };

            const template = new EmailTemplate();
            const html = template.generate(data);

            // Message should be escaped
            expect(html).toContain('&#039;');
            expect(html).toContain('&quot;');
        });
    });
});
