import Link from 'next/link';
import { NAVIGATION_ITEMS } from '@/lib/constants';

interface NavigationProps {
    activeSection: string;
    onSectionClick: (sectionId: string) => void;
}

export const Navigation = ({ activeSection, onSectionClick }: NavigationProps) => {
    const isResumePage = activeSection === 'resume';
    
    return (
        <nav className="fixed top-0 w-full bg-background/95 backdrop-blur-md border-b z-50 transition-all duration-300 shadow-sm">
            <div className="container mx-auto max-w-6xl px-4 py-4">
                <div className="flex items-center justify-between">
                    <Link href="/" className="font-bold text-lg hover:text-primary transition-colors cursor-pointer">
                        JM
                    </Link>
                    
                    {/* Desktop Navigation */}
                    <div className="hidden md:flex gap-6 text-sm">
                        {isResumePage ? (
                            <Link
                                href="/"
                                className="hover:text-primary transition-all duration-300 text-muted-foreground"
                            >
                                Home
                            </Link>
                        ) : (
                            <>
                                {NAVIGATION_ITEMS.map(({ id, label }) => (
                                    <button
                                        key={id}
                                        onClick={() => onSectionClick(id)}
                                        className={`hover:text-primary transition-all duration-300 relative ${
                                            activeSection === id ? 'text-primary font-medium' : 'text-muted-foreground'
                                        }`}
                                    >
                                        {label}
                                        {activeSection === id && (
                                            <div className="absolute -bottom-1 left-0 w-full h-0.5 bg-primary rounded-full animate-pulse" />
                                        )}
                                    </button>
                                ))}
                            </>
                        )}
                        <Link
                            href="/resume"
                            className={`hover:text-primary transition-all duration-300 ${
                                isResumePage ? 'text-primary font-medium' : 'text-muted-foreground'
                            }`}
                        >
                            Resume
                        </Link>
                    </div>
                    
                    {/* Mobile Navigation */}
                    <div className="md:hidden flex gap-4 text-sm">
                        {isResumePage ? (
                            <Link href="/" className="hover:text-primary transition-colors">
                                Home
                            </Link>
                        ) : (
                            <button onClick={() => onSectionClick('contact')} className="hover:text-primary transition-colors">
                                Contact
                            </button>
                        )}
                        <Link 
                            href="/resume" 
                            className={`hover:text-primary transition-colors ${
                                isResumePage ? 'text-primary font-medium' : ''
                            }`}
                        >
                            Resume
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    );
};
