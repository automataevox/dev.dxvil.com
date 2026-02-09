import type { ContactFormData } from '../types/contact';

interface FormSubmitResult {
    success: boolean;
    message: string;
}

export const scrollToSection = (sectionId: string): void => {
    const element = document.getElementById(sectionId);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
    }
};

export const handleFormSubmit = async (e: React.FormEvent): Promise<FormSubmitResult> => {
    e.preventDefault();
    
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    
    const data: ContactFormData = {
        firstName: formData.get('firstName') as string,
        lastName: formData.get('lastName') as string,
        email: formData.get('email') as string,
        message: formData.get('message') as string,
    };

    try {
        const response = await fetch('/api/contact', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        const result = await response.json();

        if (!response.ok) {
            throw new Error(result.error || 'Failed to send message');
        }

        return {
            success: true,
            message: result.message
        };
    } catch (error) {
        console.error('Form submission error:', error);
        return {
            success: false,
            message: error instanceof Error ? error.message : 'Failed to send message'
        };
    }
};
