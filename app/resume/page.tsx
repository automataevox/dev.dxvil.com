"use client";

import Resume from "@/components/resume";
import { CustomCursor } from "@/components/custom-cursor";
import { Navigation } from "@/components/navigation";
import { BackgroundEffects } from "@/components/background-effects";
import { useMouseTracking } from "@/lib/hooks/useMouseTracking";
import { scrollToSection } from "@/lib/utils/navigation";
import { ANIMATION_CONFIG } from "@/lib/constants";
import { useState, useEffect } from "react";

export default function Page() {
    const [isVisible, setIsVisible] = useState(false);
    
    const { mousePosition } = useMouseTracking({
        velocityDamping: ANIMATION_CONFIG.velocityDamping,
        stopTimeout: ANIMATION_CONFIG.mouseMoveTimeout
    });

    useEffect(() => {
        // Initial animation state - suppress warning as this is the intended behavior
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setIsVisible(true);
    }, []);

    return (
        <main className="min-h-screen bg-linear-to-br from-background to-muted/20 relative overflow-hidden">
            <CustomCursor mousePosition={mousePosition} />
            <Navigation activeSection="resume" onSectionClick={scrollToSection} />

            <div className="container mx-auto max-w-4xl px-4 pt-24 pb-20 relative">
                <BackgroundEffects mousePosition={mousePosition} />
                
                <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                    <Resume />
                </div>
            </div>
        </main>
    );
}