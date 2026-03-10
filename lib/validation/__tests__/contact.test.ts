import { ContactFormValidator, validateContactForm } from '../contact';
import { ContactFormData } from '../../types/contact';

describe('ContactFormValidator', () => {
    let validator: ContactFormValidator;

    beforeEach(() => {
        validator = new ContactFormValidator();
    });

    describe('validate', () => {
        const validData: ContactFormData = {
            firstName: 'John',
            lastName: 'Doe',
            email: 'john@example.com',
            message: 'Hello, this is a test message'
        };

        it('should return true for valid data', () => {
            expect(validator.validate(validData)).toBe(true);
            expect(validator.getErrors()).toHaveLength(0);
        });

        it('should fail when firstName is missing', () => {
            const data = { ...validData, firstName: '' };
            expect(validator.validate(data)).toBe(false);
            expect(validator.getErrors()).toHaveLength(1);
            expect(validator.getErrors()[0]).toEqual({
                field: 'firstName',
                message: 'First name is required'
            });
        });

        it('should fail when lastName is missing', () => {
            const data = { ...validData, lastName: '' };
            expect(validator.validate(data)).toBe(false);
            expect(validator.getFirstError()).toBe('Last name is required');
        });

        it('should fail when email is missing', () => {
            const data = { ...validData, email: '' };
            expect(validator.validate(data)).toBe(false);
            expect(validator.getFirstError()).toBe('Email is required');
        });

        it('should fail when message is missing', () => {
            const data = { ...validData, message: '' };
            expect(validator.validate(data)).toBe(false);
            expect(validator.getFirstError()).toBe('Message is required');
        });

        it('should fail when email format is invalid', () => {
            const invalidEmails = [
                'notanemail',
                '@example.com',
                'user@',
                'user @example.com',
                'user@example',
                'user..name@example.com'
            ];

            invalidEmails.forEach(email => {
                const data = { ...validData, email };
                expect(validator.validate(data)).toBe(false);
                expect(validator.getFirstError()).toBe('Invalid email format');
            });
        });

        it('should pass with valid email formats', () => {
            const validEmails = [
                'user@example.com',
                'user.name@example.com',
                'user+tag@example.co.uk',
                'firstname.lastname@example.com',
                'email@subdomain.example.com'
            ];

            validEmails.forEach(email => {
                const data = { ...validData, email };
                expect(validator.validate(data)).toBe(true);
            });
        });

        it('should collect multiple errors', () => {
            const data: Partial<ContactFormData> = {
                firstName: '',
                lastName: '',
                email: 'invalid',
                message: ''
            };

            expect(validator.validate(data)).toBe(false);
            const errors = validator.getErrors();
            expect(errors.length).toBeGreaterThan(1);
        });

        it('should trim whitespace for required field validation', () => {
            const data = {
                firstName: '   ',
                lastName: '  ',
                email: 'test@example.com',
                message: '  '
            };

            expect(validator.validate(data)).toBe(false);
            expect(validator.getErrors()).toHaveLength(3);
        });

        it('should clear previous errors on new validation', () => {
            const invalidData = { ...validData, email: 'invalid' };
            validator.validate(invalidData);
            expect(validator.getErrors()).toHaveLength(1);

            validator.validate(validData);
            expect(validator.getErrors()).toHaveLength(0);
        });
    });

    describe('validateContactForm helper', () => {
        it('should return valid result for correct data', () => {
            const data: ContactFormData = {
                firstName: 'Jane',
                lastName: 'Smith',
                email: 'jane@example.com',
                message: 'Test message'
            };

            const result = validateContactForm(data);
            expect(result.isValid).toBe(true);
            expect(result.error).toBeUndefined();
        });

        it('should return invalid result with error message', () => {
            const data: Partial<ContactFormData> = {
                firstName: 'Jane',
                lastName: '',
                email: 'jane@example.com',
                message: 'Test'
            };

            const result = validateContactForm(data);
            expect(result.isValid).toBe(false);
            expect(result.error).toBe('Last name is required');
        });

        it('should handle empty object', () => {
            const result = validateContactForm({});
            expect(result.isValid).toBe(false);
            expect(result.error).toBeTruthy();
        });
    });

    describe('edge cases', () => {
        it('should handle undefined values', () => {
            const data = {
                firstName: undefined,
                lastName: undefined,
                email: undefined,
                message: undefined
            } as unknown as ContactFormData;

            expect(validator.validate(data)).toBe(false);
            expect(validator.getErrors().length).toBeGreaterThan(0);
        });

        it('should handle very long inputs', () => {
            const longString = 'a'.repeat(10000);
            const data: ContactFormData = {
                firstName: longString,
                lastName: longString,
                email: 'test@example.com',
                message: longString
            };

            expect(validator.validate(data)).toBe(true);
        });

        it('should handle special characters in name', () => {
            const data: ContactFormData = {
                firstName: "O'Brien",
                lastName: 'Smith-Jones',
                email: 'test@example.com',
                message: 'Hello'
            };

            expect(validator.validate(data)).toBe(true);
        });
    });
});
