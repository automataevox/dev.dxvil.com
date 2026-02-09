export interface ContactFormData {
    firstName: string;
    lastName: string;
    email: string;
    message: string;
}

export interface ContactFormValidationError {
    field: keyof ContactFormData;
    message: string;
}

export interface EmailResponse {
    success: boolean;
    message: string;
    emailId?: string;
}

export interface EmailServiceConfig {
    from: string;
    to: string[];
    replyTo?: string;
}
