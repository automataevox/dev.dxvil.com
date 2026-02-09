export const scrollToSection = (sectionId: string): void => {
    const element = document.getElementById(sectionId);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
    }
};

export const handleFormSubmit = (e: React.FormEvent): void => {
    e.preventDefault();
    alert('Thank you for your message! I\'ll get back to you soon.');
};
