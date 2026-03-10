import { ResendEmailService, EmailServiceFactory, IEmailService } from '../service';
import { ContactFormData } from '../../types/contact';
import { Resend } from 'resend';

// Mock Resend
jest.mock('resend');

describe('ResendEmailService', () => {
    const mockApiKey = 'test_api_key';
    const mockFrom = 'Test <test@example.com>';
    const mockTo = ['recipient@example.com'];
    
    const mockContactData: ContactFormData = {
        firstName: 'John',
        lastName: 'Doe',
        email: 'john@example.com',
        message: 'Test message'
    };

    let mockResendInstance: {
        emails: {
            send: jest.Mock;
        };
    };

    beforeEach(() => {
        jest.clearAllMocks();
        
        mockResendInstance = {
            emails: {
                send: jest.fn()
            }
        };

        (Resend as jest.MockedClass<typeof Resend>).mockImplementation(() => mockResendInstance as unknown as Resend);
    });

    describe('send', () => {
        it('should send email successfully', async () => {
            const mockEmailId = 'email_123';
            mockResendInstance.emails.send.mockResolvedValue({
                data: { id: mockEmailId },
                error: null
            });

            const service = new ResendEmailService(mockApiKey, mockFrom, mockTo);
            const result = await service.send(mockContactData);

            expect(result.success).toBe(true);
            expect(result.message).toBe('Message sent successfully');
            expect(result.emailId).toBe(mockEmailId);
        });

        it('should call Resend API with correct parameters', async () => {
            mockResendInstance.emails.send.mockResolvedValue({
                data: { id: 'email_123' },
                error: null
            });

            const service = new ResendEmailService(mockApiKey, mockFrom, mockTo);
            await service.send(mockContactData);

            expect(mockResendInstance.emails.send).toHaveBeenCalledWith(
                expect.objectContaining({
                    from: mockFrom,
                    to: mockTo,
                    subject: 'Portfolio Contact: John Doe',
                    replyTo: mockContactData.email,
                    html: expect.stringContaining('John Doe')
                })
            );
        });

        it('should generate correct email subject', async () => {
            mockResendInstance.emails.send.mockResolvedValue({
                data: { id: 'email_123' },
                error: null
            });

            const service = new ResendEmailService(mockApiKey, mockFrom, mockTo);
            await service.send(mockContactData);

            const callArgs = mockResendInstance.emails.send.mock.calls[0][0];
            expect(callArgs.subject).toBe('Portfolio Contact: John Doe');
        });

        it('should set reply-to to sender email', async () => {
            mockResendInstance.emails.send.mockResolvedValue({
                data: { id: 'email_123' },
                error: null
            });

            const service = new ResendEmailService(mockApiKey, mockFrom, mockTo);
            await service.send(mockContactData);

            const callArgs = mockResendInstance.emails.send.mock.calls[0][0];
            expect(callArgs.replyTo).toBe(mockContactData.email);
        });

        it('should include HTML email template', async () => {
            mockResendInstance.emails.send.mockResolvedValue({
                data: { id: 'email_123' },
                error: null
            });

            const service = new ResendEmailService(mockApiKey, mockFrom, mockTo);
            await service.send(mockContactData);

            const callArgs = mockResendInstance.emails.send.mock.calls[0][0];
            expect(callArgs.html).toContain('<!DOCTYPE html>');
            expect(callArgs.html).toContain('John Doe');
            expect(callArgs.html).toContain('john@example.com');
            expect(callArgs.html).toContain('Test message');
        });

        it('should handle Resend API error', async () => {
            const errorMessage = 'API key is invalid';
            mockResendInstance.emails.send.mockResolvedValue({
                data: null,
                error: { message: errorMessage }
            });

            const service = new ResendEmailService(mockApiKey, mockFrom, mockTo);

            await expect(service.send(mockContactData)).rejects.toThrow(
                `Email service error: ${errorMessage}`
            );
        });

        it('should handle Resend API rejection', async () => {
            const errorMessage = 'Network error';
            mockResendInstance.emails.send.mockRejectedValue(new Error(errorMessage));

            const service = new ResendEmailService(mockApiKey, mockFrom, mockTo);

            await expect(service.send(mockContactData)).rejects.toThrow(
                `Email service error: ${errorMessage}`
            );
        });

        it('should handle unknown errors', async () => {
            mockResendInstance.emails.send.mockRejectedValue('Unknown error');

            const service = new ResendEmailService(mockApiKey, mockFrom, mockTo);

            await expect(service.send(mockContactData)).rejects.toThrow(
                'Unknown email service error'
            );
        });

        it('should handle missing error message from Resend', async () => {
            mockResendInstance.emails.send.mockResolvedValue({
                data: null,
                error: {}
            });

            const service = new ResendEmailService(mockApiKey, mockFrom, mockTo);

            await expect(service.send(mockContactData)).rejects.toThrow('Failed to send email');
        });

        it('should work with readonly arrays', async () => {
            mockResendInstance.emails.send.mockResolvedValue({
                data: { id: 'email_123' },
                error: null
            });

            const readonlyTo = ['recipient@example.com'] as const;
            const service = new ResendEmailService(mockApiKey, mockFrom, readonlyTo);
            
            const result = await service.send(mockContactData);
            expect(result.success).toBe(true);
        });

        it('should handle multiple recipients', async () => {
            mockResendInstance.emails.send.mockResolvedValue({
                data: { id: 'email_123' },
                error: null
            });

            const multipleRecipients = ['user1@example.com', 'user2@example.com'];
            const service = new ResendEmailService(mockApiKey, mockFrom, multipleRecipients);
            
            await service.send(mockContactData);

            const callArgs = mockResendInstance.emails.send.mock.calls[0][0];
            expect(callArgs.to).toEqual(multipleRecipients);
        });
    });

    describe('constructor', () => {
        it('should create instance with correct configuration', () => {
            const service = new ResendEmailService(mockApiKey, mockFrom, mockTo);
            expect(service).toBeInstanceOf(ResendEmailService);
            expect(Resend).toHaveBeenCalledWith(mockApiKey);
        });
    });
});

describe('EmailServiceFactory', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe('createResendService', () => {
        it('should create ResendEmailService with valid API key', () => {
            const apiKey = 'test_key';
            const from = 'test@example.com';
            const to = ['recipient@example.com'];

            const service = EmailServiceFactory.createResendService(apiKey, from, to);

            expect(service).toBeInstanceOf(ResendEmailService);
        });

        it('should throw error when API key is undefined', () => {
            const from = 'test@example.com';
            const to = ['recipient@example.com'];

            expect(() => 
                EmailServiceFactory.createResendService(undefined, from, to)
            ).toThrow('RESEND_API_KEY is not configured');
        });

        it('should throw error when API key is empty string', () => {
            const from = 'test@example.com';
            const to = ['recipient@example.com'];

            expect(() => 
                EmailServiceFactory.createResendService('', from, to)
            ).toThrow('RESEND_API_KEY is not configured');
        });

        it('should return IEmailService interface', () => {
            const apiKey = 'test_key';
            const from = 'test@example.com';
            const to = ['recipient@example.com'];

            const service = EmailServiceFactory.createResendService(apiKey, from, to);

            // Test that it implements the interface
            expect(service).toHaveProperty('send');
            expect(typeof service.send).toBe('function');
        });

        it('should work with readonly arrays', () => {
            const apiKey = 'test_key';
            const from = 'test@example.com';
            const to = ['recipient@example.com'] as const;

            const service = EmailServiceFactory.createResendService(apiKey, from, to);
            expect(service).toBeInstanceOf(ResendEmailService);
        });
    });
});

describe('IEmailService interface', () => {
    it('should be implemented by ResendEmailService', () => {
        const service: IEmailService = new ResendEmailService(
            'test_key',
            'test@example.com',
            ['recipient@example.com']
        );

        expect(service.send).toBeDefined();
        expect(typeof service.send).toBe('function');
    });
});

describe('Integration tests', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should handle complete email flow', async () => {
        const mockResendInstance = {
            emails: {
                send: jest.fn().mockResolvedValue({
                    data: { id: 'email_123' },
                    error: null
                })
            }
        };

        (Resend as jest.MockedClass<typeof Resend>).mockImplementation(() => 
            mockResendInstance as unknown as Resend
        );

        const service = EmailServiceFactory.createResendService(
            'test_key',
            'Portfolio <test@example.com>',
            ['recipient@example.com']
        );

        const data: ContactFormData = {
            firstName: 'Alice',
            lastName: 'Johnson',
            email: 'alice@example.com',
            message: 'I would like to discuss a project.'
        };

        const result = await service.send(data);

        expect(result.success).toBe(true);
        expect(result.emailId).toBe('email_123');
        expect(mockResendInstance.emails.send).toHaveBeenCalledTimes(1);
    });

    it('should handle error flow', async () => {
        const mockResendInstance = {
            emails: {
                send: jest.fn().mockResolvedValue({
                    data: null,
                    error: { message: 'Rate limit exceeded' }
                })
            }
        };

        (Resend as jest.MockedClass<typeof Resend>).mockImplementation(() => 
            mockResendInstance as unknown as Resend
        );

        const service = EmailServiceFactory.createResendService(
            'test_key',
            'test@example.com',
            ['recipient@example.com']
        );

        await expect(service.send({
            firstName: 'Bob',
            lastName: 'Smith',
            email: 'bob@example.com',
            message: 'Test'
        })).rejects.toThrow('Email service error: Rate limit exceeded');
    });
});
