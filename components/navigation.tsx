'use client';

import Link from 'next/link';
import { NAVIGATION_ITEMS } from '@/lib/constants';
import { useState } from 'react';
import { Menu01Icon, Cancel01Icon } from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';

interface NavigationProps {
    activeSection: string;
    onSectionClick: (sectionId: string) => void;
}

export const Navigation = ({ activeSection, onSectionClick }: NavigationProps) => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const isResumePage = activeSection === 'resume';
    
    const handleMobileNavClick = (sectionId: string) => {
        onSectionClick(sectionId);
        setMobileMenuOpen(false);
    };
    
    return (
        <nav className="fixed top-0 w-full bg-background/95 backdrop-blur-md border-b z-50 transition-all duration-300 shadow-sm">
            <div className="container mx-auto max-w-6xl px-4 sm:px-6 py-3 sm:py-4">
                <div className="flex items-center justify-between">
                    <Link href="/" className="font-bold text-lg sm:text-xl hover:text-primary transition-colors cursor-pointer" onClick={() => setMobileMenuOpen(false)}>
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
                    
                    {/* Mobile Hamburger Button */}
                    <button
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        className="md:hidden p-2 -mr-2 hover:text-primary transition-colors"
                        aria-label="Toggle menu"
                    >
                        <HugeiconsIcon icon={mobileMenuOpen ? Cancel01Icon : Menu01Icon} size={24} />
                    </button>
                </div>
                
                {/* Mobile Menu */}
                {mobileMenuOpen && (
                    <div className="md:hidden absolute top-full left-0 right-0 bg-background/98 backdrop-blur-md border-b shadow-lg animate-fade-in-down">
                        <div className="container mx-auto px-4 py-4">
                            <div className="flex flex-col gap-3">
                                {isResumePage ? (
                                    <Link 
                                        href="/" 
                                        className="py-2.5 px-4 rounded-lg hover:bg-accent hover:text-primary transition-all duration-200 text-sm font-medium"
                                        onClick={() => setMobileMenuOpen(false)}
                                    >
                                        Home
                                    </Link>
                                ) : (
                                    <>
                                        {NAVIGATION_ITEMS.map(({ id, label }) => (
                                            <button
                                                key={id}
                                                onClick={() => handleMobileNavClick(id)}
                                                className={`py-2.5 px-4 rounded-lg hover:bg-accent hover:text-primary transition-all duration-200 text-left text-sm font-medium ${
                                                    activeSection === id ? 'bg-primary/10 text-primary' : 'text-muted-foreground'
                                                }`}
                                            >
                                                {label}
                                            </button>
                                        ))}
                                    </>
                                )}
                                <Link
                                    href="/resume"
                                    className={`py-2.5 px-4 rounded-lg hover:bg-accent hover:text-primary transition-all duration-200 text-sm font-medium ${
                                        isResumePage ? 'bg-primary/10 text-primary' : 'text-muted-foreground'
                                    }`}
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    Resume
                                </Link>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </nav>
    );
};
