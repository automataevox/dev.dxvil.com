import { POST } from '../route';
import { NextRequest } from 'next/server';
import * as emailService from '@/lib/email/service';
import * as validation from '@/lib/validation/contact';

// Mock the email service and validation
jest.mock('@/lib/email/service');
jest.mock('@/lib/validation/contact');

describe('POST /api/contact', () => {
    const validRequestBody = {
        firstName: 'John',
        lastName: 'Doe',
        email: 'john@example.com',
        message: 'Hello, this is a test message'
    };

    let mockEmailService: {
        send: jest.Mock;
    };

    beforeEach(() => {
        jest.clearAllMocks();

        // Setup default mock for validation
        (validation.validateContactForm as jest.Mock).mockReturnValue({
            isValid: true,
            error: undefined
        });

        // Setup default mock for email service
        mockEmailService = {
            send: jest.fn().mockResolvedValue({
                success: true,
                message: 'Message sent successfully',
                emailId: 'test_email_123'
            })
        };

        (emailService.EmailServiceFactory.createResendService as jest.Mock)
            .mockReturnValue(mockEmailService);
    });

    describe('successful email sending', () => {
        it('should return 200 with success message', async () => {
            const request = new NextRequest('http://localhost:3000/api/contact', {
                method: 'POST',
                body: JSON.stringify(validRequestBody)
            });

            const response = await POST(request);
            const data = await response.json();

            expect(response.status).toBe(200);
            expect(data).toEqual({
                success: true,
                message: 'Message sent successfully'
            });
        });

        it('should validate the form data', async () => {
            const request = new NextRequest('http://localhost:3000/api/contact', {
                method: 'POST',
                body: JSON.stringify(validRequestBody)
            });

            await POST(request);

            expect(validation.validateContactForm).toHaveBeenCalledWith(validRequestBody);
        });

        it('should create email service with correct config', async () => {
            const request = new NextRequest('http://localhost:3000/api/contact', {
                method: 'POST',
                body: JSON.stringify(validRequestBody)
            });

            await POST(request);

            expect(emailService.EmailServiceFactory.createResendService).toHaveBeenCalledWith(
                process.env.RESEND_API_KEY,
                expect.any(String),
                expect.any(Array)
            );
        });

        it('should call email service send method', async () => {
            const request = new NextRequest('http://localhost:3000/api/contact', {
                method: 'POST',
                body: JSON.stringify(validRequestBody)
            });

            await POST(request);

            expect(mockEmailService.send).toHaveBeenCalledWith(validRequestBody);
        });

        it('should handle different valid inputs', async () => {
            const testCases = [
                {
                    firstName: 'Alice',
                    lastName: 'Smith',
                    email: 'alice@example.com',
                    message: 'Short message'
                },
                {
                    firstName: 'Bob',
                    lastName: 'Johnson-Williams',
                    email: 'bob.johnson@company.co.uk',
                    message: 'A much longer message with multiple sentences. This should still work fine.'
                }
            ];

            for (const testCase of testCases) {
                const request = new NextRequest('http://localhost:3000/api/contact', {
                    method: 'POST',
                    body: JSON.stringify(testCase)
                });

                const response = await POST(request);
                const data = await response.json();

                expect(response.status).toBe(200);
                expect(data.success).toBe(true);
            }
        });
    });

    describe('validation errors', () => {
        it('should return 400 when validation fails', async () => {
            (validation.validateContactForm as jest.Mock).mockReturnValue({
                isValid: false,
                error: 'Email is required'
            });

            const request = new NextRequest('http://localhost:3000/api/contact', {
                method: 'POST',
                body: JSON.stringify({ ...validRequestBody, email: '' })
            });

            const response = await POST(request);
            const data = await response.json();

            expect(response.status).toBe(400);
            expect(data).toEqual({
                error: 'Email is required'
            });
        });

        it('should return 400 for missing firstName', async () => {
            (validation.validateContactForm as jest.Mock).mockReturnValue({
                isValid: false,
                error: 'First name is required'
            });

            const request = new NextRequest('http://localhost:3000/api/contact', {
                method: 'POST',
                body: JSON.stringify({ ...validRequestBody, firstName: '' })
            });

            const response = await POST(request);
            expect(response.status).toBe(400);
        });

        it('should return 400 for invalid email format', async () => {
            (validation.validateContactForm as jest.Mock).mockReturnValue({
                isValid: false,
                error: 'Invalid email format'
            });

            const request = new NextRequest('http://localhost:3000/api/contact', {
                method: 'POST',
                body: JSON.stringify({ ...validRequestBody, email: 'invalid' })
            });

            const response = await POST(request);
            const data = await response.json();

            expect(response.status).toBe(400);
            expect(data.error).toBe('Invalid email format');
        });

        it('should use default validation error message when no specific error', async () => {
            (validation.validateContactForm as jest.Mock).mockReturnValue({
                isValid: false,
                error: undefined
            });

            const request = new NextRequest('http://localhost:3000/api/contact', {
                method: 'POST',
                body: JSON.stringify(validRequestBody)
            });

            const response = await POST(request);
            const data = await response.json();

            expect(response.status).toBe(400);
            expect(data.error).toBeDefined();
        });
    });

    describe('email service errors', () => {
        it('should return 500 when email service fails', async () => {
            mockEmailService.send.mockRejectedValue(new Error('Email service error'));

            const request = new NextRequest('http://localhost:3000/api/contact', {
                method: 'POST',
                body: JSON.stringify(validRequestBody)
            });

            const response = await POST(request);
            const data = await response.json();

            expect(response.status).toBe(500);
            expect(data.error).toContain('Email service error');
        });

        it('should return 500 when email service factory fails', async () => {
            (emailService.EmailServiceFactory.createResendService as jest.Mock)
                .mockImplementation(() => {
                    throw new Error('RESEND_API_KEY is not configured');
                });

            const request = new NextRequest('http://localhost:3000/api/contact', {
                method: 'POST',
                body: JSON.stringify(validRequestBody)
            });

            const response = await POST(request);
            const data = await response.json();

            expect(response.status).toBe(500);
            expect(data.error).toContain('RESEND_API_KEY is not configured');
        });

        it('should handle unknown errors gracefully', async () => {
            mockEmailService.send.mockRejectedValue('Unknown error');

            const request = new NextRequest('http://localhost:3000/api/contact', {
                method: 'POST',
                body: JSON.stringify(validRequestBody)
            });

            const response = await POST(request);
            const data = await response.json();

            expect(response.status).toBe(500);
            expect(data.error).toBeDefined();
        });
    });

    describe('request parsing errors', () => {
        it('should handle malformed JSON', async () => {
            const request = new NextRequest('http://localhost:3000/api/contact', {
                method: 'POST',
                body: 'not valid json'
            });

            const response = await POST(request);
            
            expect(response.status).toBe(500);
        });

        it('should handle empty request body', async () => {
            const request = new NextRequest('http://localhost:3000/api/contact', {
                method: 'POST',
                body: '{}'
            });

            (validation.validateContactForm as jest.Mock).mockReturnValue({
                isValid: false,
                error: 'All fields are required'
            });

            const response = await POST(request);
            
            expect(response.status).toBe(400);
        });
    });

    describe('logging', () => {
        let consoleLogSpy: jest.SpyInstance;
        let consoleErrorSpy: jest.SpyInstance;

        beforeEach(() => {
            consoleLogSpy = jest.spyOn(console, 'log').mockImplementation();
            consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation();
        });

        afterEach(() => {
            consoleLogSpy.mockRestore();
            consoleErrorSpy.mockRestore();
        });

        it('should log success on successful email send', async () => {
            const request = new NextRequest('http://localhost:3000/api/contact', {
                method: 'POST',
                body: JSON.stringify(validRequestBody)
            });

            await POST(request);

            expect(consoleLogSpy).toHaveBeenCalledWith(
                'Email sent successfully:',
                expect.objectContaining({
                    emailId: 'test_email_123',
                    replyTo: 'john@example.com'
                })
            );
        });

        it('should log error on failure', async () => {
            mockEmailService.send.mockRejectedValue(new Error('Test error'));

            const request = new NextRequest('http://localhost:3000/api/contact', {
                method: 'POST',
                body: JSON.stringify(validRequestBody)
            });

            await POST(request);

            expect(consoleErrorSpy).toHaveBeenCalledWith(
                'Contact form error:',
                expect.any(Error)
            );
        });
    });

    describe('integration scenarios', () => {
        it('should handle complete successful flow', async () => {
            const request = new NextRequest('http://localhost:3000/api/contact', {
                method: 'POST',
                body: JSON.stringify(validRequestBody)
            });

            const response = await POST(request);
            const data = await response.json();

            // Verify the complete flow
            expect(validation.validateContactForm).toHaveBeenCalled();
            expect(emailService.EmailServiceFactory.createResendService).toHaveBeenCalled();
            expect(mockEmailService.send).toHaveBeenCalled();
            expect(response.status).toBe(200);
            expect(data.success).toBe(true);
        });

        it('should stop at validation if it fails', async () => {
            (validation.validateContactForm as jest.Mock).mockReturnValue({
                isValid: false,
                error: 'Validation failed'
            });

            const request = new NextRequest('http://localhost:3000/api/contact', {
                method: 'POST',
                body: JSON.stringify(validRequestBody)
            });

            await POST(request);

            // Email service should not be called if validation fails
            expect(mockEmailService.send).not.toHaveBeenCalled();
        });

        it('should handle rapid successive requests', async () => {
            const requests = Array(5).fill(null).map(() => 
                new NextRequest('http://localhost:3000/api/contact', {
                    method: 'POST',
                    body: JSON.stringify(validRequestBody)
                })
            );

            const responses = await Promise.all(requests.map(req => POST(req)));

            responses.forEach(response => {
                expect(response.status).toBe(200);
            });

            expect(mockEmailService.send).toHaveBeenCalledTimes(5);
        });
    });
});
