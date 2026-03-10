import { ContactFormData, ContactFormValidationError } from '../types/contact';

// Improved email regex that properly validates email format
// - Must start with alphanumeric
// - Allows dots, dashes, underscores, and plus signs in local part
// - Must have @ symbol
// - Must have domain with at least one dot  
// - Must end with 2+ letter TLD
const EMAIL_REGEX = /^[a-zA-Z0-9]([a-zA-Z0-9._+-]*[a-zA-Z0-9])?@[a-zA-Z0-9]([a-zA-Z0-9.-]*[a-zA-Z0-9])?\.[a-zA-Z]{2,}$/;

export class ContactFormValidator {
    private errors: ContactFormValidationError[] = [];

    validate(data: Partial<ContactFormData>): boolean {
        this.errors = [];

        this.validateRequiredFields(data);
        if (data.email) {
            this.validateEmail(data.email);
        }

        return this.errors.length === 0;
    }

    getErrors(): ContactFormValidationError[] {
        return this.errors;
    }

    getFirstError(): string | null {
        return this.errors.length > 0 ? this.errors[0].message : null;
    }

    private validateRequiredFields(data: Partial<ContactFormData>): void {
        const requiredFields: Array<keyof ContactFormData> = [
            'firstName',
            'lastName',
            'email',
            'message'
        ];

        for (const field of requiredFields) {
            if (!data[field] || data[field]?.trim() === '') {
                this.errors.push({
                    field,
                    message: `${this.formatFieldName(field)} is required`
                });
            }
        }
    }

    private validateEmail(email: string): void {
        // Check for consecutive dots
        if (email.includes('..')) {
            this.errors.push({
                field: 'email',
                message: 'Invalid email format'
            });
            return;
        }

        // Check overall email format
        if (!EMAIL_REGEX.test(email)) {
            this.errors.push({
                field: 'email',
                message: 'Invalid email format'
            });
        }
    }

    private formatFieldName(field: keyof ContactFormData): string {
        const names: Record<keyof ContactFormData, string> = {
            firstName: 'First name',
            lastName: 'Last name',
            email: 'Email',
            message: 'Message'
        };
        return names[field];
    }
}

export const validateContactForm = (data: Partial<ContactFormData>): {
    isValid: boolean;
    error?: string;
} => {
    const validator = new ContactFormValidator();
    const isValid = validator.validate(data);

    return {
        isValid,
        error: validator.getFirstError() || undefined
    };
};
