"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import workData from "@/data/work.json";
import { useState, useEffect, useRef } from "react";
import { ArrowUpRight01Icon, Github01Icon, Linkedin01Icon, Mail01Icon } from "@hugeicons/core-free-icons";
import { WorkflowSquare01Icon, Settings01Icon, Shield01Icon, Calendar01Icon, PuzzleIcon, SaleTag01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import Link from "next/link";
import { useTypingAnimation } from "@/lib/hooks/useTypingAnimation";
import { useMouseTracking } from "@/lib/hooks/useMouseTracking";
import { useScrollTracking } from "@/lib/hooks/useScrollTracking";
import { CustomCursor } from "@/components/custom-cursor";
import { Navigation } from "@/components/navigation";
import { BackgroundEffects } from "@/components/background-effects";
import { scrollToSection, handleFormSubmit } from "@/lib/utils/navigation";
import { SECTION_IDS, ANIMATION_CONFIG } from "@/lib/constants";

export default function Page() {
    const [isVisible, setIsVisible] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState<{ type: 'success' | 'error' | null; message: string }>({ type: null, message: '' });
    const heroRef = useRef<HTMLDivElement>(null);
    const formRef = useRef<HTMLFormElement>(null);
    
    const { typedText, isComplete: isTypingComplete } = useTypingAnimation({
        text: "Hi, I'm Jaroslav — Software Engineer",
        speed: ANIMATION_CONFIG.typingSpeed
    });
    
    const { mousePosition } = useMouseTracking({
        velocityDamping: ANIMATION_CONFIG.velocityDamping,
        stopTimeout: ANIMATION_CONFIG.mouseMoveTimeout
    });
    
    const activeSection = useScrollTracking(SECTION_IDS, ANIMATION_CONFIG.scrollOffset);

    // Set visibility after mount
    useEffect(() => {
        // Initial animation state - suppress warning as this is the intended behavior
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setIsVisible(true);
    }, []);

    return (
        <main className="min-h-screen bg-linear-to-br from-background to-muted/20 relative overflow-hidden">
            <CustomCursor mousePosition={mousePosition} />
            <Navigation activeSection={activeSection} onSectionClick={scrollToSection} />
            
            <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-20 sm:pt-24 pb-12 sm:pb-20 relative">
                <BackgroundEffects mousePosition={mousePosition} />
                
                <section id="hero" ref={heroRef} className={`grid gap-6 sm:gap-8 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                    <header className="text-center relative">
                        <div className="mb-4 sm:mb-6">
                            <div 
                                className="w-20 h-20 sm:w-24 sm:h-24 bg-primary/10 rounded-full mx-auto mb-3 sm:mb-4 flex items-center justify-center transition-all duration-300 hover:scale-110 hover:rotate-12 hover:shadow-2xl hover:shadow-primary/50 cursor-pointer group"

                            >
                                <span className="text-xl sm:text-2xl font-bold text-primary group-hover:scale-125 transition-transform">JM</span>
                            </div>
                        </div>
                        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold bg-linear-to-r from-foreground to-muted-foreground bg-clip-text text-transparent min-h-12 sm:min-h-14 md:min-h-16 px-2 sm:px-0">
                            {typedText}
                            {!isTypingComplete && <span className="animate-pulse">|</span>}
                        </h1>
                        <p className={`mt-4 sm:mt-6 text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed px-2 sm:px-0 transition-all duration-1000 delay-500 ${isTypingComplete ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                            I design and build production systems with long-term stability in mind.
                            End-to-end ownership from architecture through implementation to operations.
                            Focus on maintainability, trade-off decisions, and systems others can trust.
                        </p>
                        <div className={`mt-3 sm:mt-4 text-center px-2 sm:px-0 transition-all duration-1000 delay-600 ${isTypingComplete ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-green-500/10 text-green-600 text-xs sm:text-sm font-medium">
                                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                                <span className="whitespace-nowrap">Contract and full-time opportunities</span>
                            </div>
                        </div>
                        <div className={`mt-4 sm:mt-6 flex justify-center px-4 sm:px-0 transition-all duration-1000 delay-700 ${isTypingComplete ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                            <blockquote className="text-sm sm:text-base text-foreground/80 italic border-l-4 border-primary/50 pl-3 sm:pl-4 py-2 bg-primary/5 rounded-r-lg pr-3 sm:pr-4 max-w-md">
                                &ldquo;Code with purpose. Build for scale. Ship with confidence.&rdquo;
                            </blockquote>
                        </div>
                        <div className={`mt-6 sm:mt-8 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 px-4 sm:px-0 transition-all duration-1000 delay-700 ${isTypingComplete ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                            <Button 
                                onClick={() => scrollToSection('work')} 
                                className="group hover:shadow-xl hover:shadow-primary/50 hover:scale-105 transition-all duration-300 cursor-pointer w-full sm:w-auto min-h-[44px]"
                            >
                                View work
                                <HugeiconsIcon icon={ArrowUpRight01Icon} className="ml-2 w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                            </Button>
                            <Link href="/resume" className="w-full sm:w-auto">
                                <Button 
                                    variant="outline" 
                                    className="group hover:shadow-xl hover:scale-105 transition-all duration-300 cursor-pointer w-full min-h-[44px]"
                                >
                                    View resume
                                    <HugeiconsIcon icon={ArrowUpRight01Icon} className="ml-2 w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                                </Button>
                            </Link>
                            <Button 
                                variant="secondary" 
                                onClick={() => scrollToSection('contact')}
                                className="hover:shadow-xl hover:scale-105 transition-all duration-300 cursor-pointer w-full sm:w-auto min-h-[44px]"
                            >
                                Get in touch
                            </Button>
                        </div>
                        <div className={`mt-6 sm:mt-8 flex items-center justify-center gap-8 transition-all duration-1000 delay-1000 ${isTypingComplete ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                            <a href="https://github.com/automataevox" target="_blank" rel="noopener noreferrer"
                               className="text-muted-foreground hover:text-primary transition-all duration-300 hover:scale-125 hover:rotate-12 cursor-pointer p-2 -m-2">
                                <HugeiconsIcon icon={Github01Icon} size={28} />
                            </a>
                            <a href="https://www.linkedin.com/in/jaroslavmasa" target="_blank" rel="noopener noreferrer"
                               className="text-muted-foreground hover:text-primary transition-all duration-300 hover:scale-125 hover:rotate-12 cursor-pointer p-2 -m-2">
                                <HugeiconsIcon icon={Linkedin01Icon} size={28} />
                            </a>
                            <a href="mailto:dev@dxvil.com"
                               className="text-muted-foreground hover:text-primary transition-all duration-300 hover:scale-125 hover:rotate-12 cursor-pointer p-2 -m-2">
                                <HugeiconsIcon icon={Mail01Icon} size={28} />
                            </a>
                        </div>
                    </header>

                    <section id="skills" className="mt-12 sm:mt-16 md:mt-20">
                        <h2 className="text-2xl sm:text-3xl font-bold text-center mb-8 sm:mb-12 px-4 sm:px-0 opacity-0 animate-fade-in-up" style={{ animationDelay: '0.5s', animationFillMode: 'forwards' }}>Core Strengths</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 max-w-3xl mx-auto px-4 sm:px-0">
                            {[
                                { text: "End-to-end ownership (architecture → production)", icon: WorkflowSquare01Icon },
                                { text: "Production-first mindset", icon: Settings01Icon },
                                { text: "Incident-aware system design", icon: Shield01Icon },
                                { text: "Long-term maintainability focus", icon: Calendar01Icon },
                                { text: "Modular architecture with feature toggles", icon: PuzzleIcon },
                                { text: "Trade-off based decision-making", icon: SaleTag01Icon }
                            ].map((strength, index) => (
                                <div
                                    key={index}
                                    className="group p-4 sm:p-5 rounded-xl border bg-card/50 backdrop-blur-sm hover:bg-accent/50 hover:shadow-md hover:scale-[1.02] transition-all duration-300 opacity-0 animate-fade-in-up"
                                    style={{
                                        animationDelay: `${0.7 + index * 0.1}s`,
                                        animationFillMode: 'forwards'
                                    }}
                                >
                                    <div className="flex items-start gap-3 sm:gap-4">
                                        <div className="shrink-0 w-9 h-9 sm:w-10 sm:h-10 bg-primary/10 rounded-xl flex items-center justify-center group-hover:bg-primary/20 group-hover:scale-110 transition-all duration-300">
                                            <HugeiconsIcon icon={strength.icon} size={18} className="text-primary sm:w-5 sm:h-5" />
                                        </div>
                                        <span className="text-xs sm:text-sm leading-relaxed text-muted-foreground group-hover:text-foreground transition-colors">
                                            {strength.text}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>

                    <section id="work" className="mt-12 sm:mt-16 md:mt-20">
                        <h2 className="text-2xl sm:text-3xl font-bold text-center mb-8 sm:mb-12 px-4 sm:px-0 opacity-0 animate-fade-in-up" style={{ animationDelay: '0.3s', animationFillMode: 'forwards' }}>Selected Projects</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 px-4 sm:px-0">
                            {(workData.projects || []).map((p: { name: string; summary: string; url?: string; demo?: string; skills: string[] }, index: number) => (
                                <Card
                                    key={p.name}
                                    className="group hover:shadow-lg transition-all duration-300 border-0 bg-card/50 backdrop-blur-sm opacity-0 animate-fade-in-up"
                                    style={{
                                        animationDelay: `${0.5 + index * 0.2}s`,
                                        animationFillMode: 'forwards'
                                    }}
                                >
                                    <CardHeader>
                                        <CardTitle className="group-hover:text-primary transition-colors text-lg sm:text-xl">{p.name}</CardTitle>
                                        <div className="flex flex-wrap gap-1.5 sm:gap-2 mt-2">
                                            {p.skills?.map((skill: string) => (
                                                <Badge key={skill} variant="secondary" className="text-[10px] sm:text-xs">
                                                    {skill}
                                                </Badge>
                                            ))}
                                        </div>
                                    </CardHeader>
                                    <CardContent className="flex-1">
                                        <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed group-hover:text-foreground transition-colors duration-300">{p.summary}</p>
                                    </CardContent>
                                    {(p.demo || p.url) && (
                                        <CardFooter className="gap-2 flex-col sm:flex-row">
                                            {p.url && (
                                                <a href={p.url} target="_blank" rel="noreferrer" className="w-full sm:w-auto">
                                                    <Button variant="outline" size="sm" className="group/btn w-full min-h-[44px] sm:min-h-0">
                                                        Source
                                                        <HugeiconsIcon icon={ArrowUpRight01Icon} className="ml-1 w-3 h-3 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                                                    </Button>
                                                </a>
                                            )}
                                            {p.demo && (
                                                <a href={p.demo} target="_blank" rel="noreferrer" className="w-full sm:w-auto">
                                                    <Button size="sm" className="group/btn w-full min-h-[44px] sm:min-h-0">
                                                        Live Demo
                                                        <HugeiconsIcon icon={ArrowUpRight01Icon} className="ml-1 w-3 h-3 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                                                    </Button>
                                                </a>
                                            )}
                                        </CardFooter>
                                    )}
                                </Card>
                            ))}
                        </div>
                    </section>

                    <section id="case-study" className="mt-12 sm:mt-16 md:mt-20 px-4 sm:px-0">
                        <h2 className="text-2xl sm:text-3xl font-bold text-center mb-8 sm:mb-12 opacity-0 animate-fade-in-up" style={{ animationDelay: '0.3s', animationFillMode: 'forwards' }}>Case Study: Music Distribution Platform</h2>
                        <div className="max-w-4xl mx-auto">
                            <Card className="border-0 bg-card/50 backdrop-blur-sm opacity-0 animate-fade-in-up" style={{ animationDelay: '0.5s', animationFillMode: 'forwards' }}>
                                <CardHeader>
                                    <CardTitle className="text-lg sm:text-xl">The Challenge</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                                        A music label needed a platform to manage their catalog distribution across multiple streaming services.
                                        The existing system was unstable, difficult to maintain, and couldn&apos;t scale with their growing needs.
                                    </p>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mt-4 sm:mt-6">
                                        <div className="p-3 sm:p-4 bg-muted/30 rounded-lg">
                                            <h4 className="font-semibold text-xs sm:text-sm mb-2 text-red-600">Problems Faced</h4>
                                            <ul className="text-xs sm:text-sm text-muted-foreground space-y-1">
                                                <li>• 40% of releases delayed due to system instability</li>
                                                <li>• Manual processes requiring 20+ hours/week</li>
                                                <li>• No visibility into distribution performance</li>
                                                <li>• High risk of data loss during updates</li>
                                            </ul>
                                        </div>
                                        <div className="p-3 sm:p-4 bg-muted/30 rounded-lg">
                                            <h4 className="font-semibold text-xs sm:text-sm mb-2 text-green-600">Business Impact</h4>
                                            <ul className="text-xs sm:text-sm text-muted-foreground space-y-1">
                                                <li>• Platform stability critical for operations</li>
                                                <li>• Artist relationships strained by delays</li>
                                                <li>• Competitive disadvantage in market</li>
                                                <li>• Team burnout from manual processes</li>
                                            </ul>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            <Card className="border-0 bg-card/50 backdrop-blur-sm mt-4 sm:mt-6 opacity-0 animate-fade-in-up" style={{ animationDelay: '0.7s', animationFillMode: 'forwards' }}>
                                <CardHeader>
                                    <CardTitle className="text-lg sm:text-xl">The Solution</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                                        Designed and built an end-to-end platform prioritizing long-term stability over rapid feature development.
                                        Implemented modular architecture with feature toggles to enable safe iteration. Platform in active development since November 2025.
                                    </p>
                                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
                                        <div className="text-center p-3 sm:p-4">
                                            <div className="text-xl sm:text-2xl font-bold text-primary mb-1">Active Dev</div>
                                            <div className="text-xs sm:text-sm text-muted-foreground">Since Nov 2025</div>
                                        </div>
                                        <div className="text-center p-3 sm:p-4">
                                            <div className="text-xl sm:text-2xl font-bold text-primary mb-1">3min</div>
                                            <div className="text-xs sm:text-sm text-muted-foreground">Release Deployment</div>
                                        </div>
                                        <div className="text-center p-3 sm:p-4">
                                            <div className="text-xl sm:text-2xl font-bold text-primary mb-1">85%</div>
                                            <div className="text-xs sm:text-sm text-muted-foreground">Time Saved on Operations</div>
                                        </div>
                                    </div>
                                    <div className="mt-4 sm:mt-6">
                                        <h4 className="font-semibold mb-3 text-sm sm:text-base">Key Technical Decisions</h4>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
                                            <div className="flex items-start gap-2 sm:gap-3 p-2.5 sm:p-3 bg-muted/30 rounded-lg">
                                                <div className="w-2 h-2 bg-primary rounded-full mt-1.5 sm:mt-2 shrink-0"></div>
                                                <div>
                                                    <div className="font-medium text-xs sm:text-sm">Feature Toggle Architecture</div>
                                                    <div className="text-[10px] sm:text-xs text-muted-foreground">Safe rollbacks, A/B testing, gradual feature rollout</div>
                                                </div>
                                            </div>
                                            <div className="flex items-start gap-2 sm:gap-3 p-2.5 sm:p-3 bg-muted/30 rounded-lg">
                                                <div className="w-2 h-2 bg-primary rounded-full mt-1.5 sm:mt-2 shrink-0"></div>
                                                <div>
                                                    <div className="font-medium text-xs sm:text-sm">Modular Design</div>
                                                    <div className="text-[10px] sm:text-xs text-muted-foreground">Independent services, clear boundaries, maintainable codebase</div>
                                                </div>
                                            </div>
                                            <div className="flex items-start gap-2 sm:gap-3 p-2.5 sm:p-3 bg-muted/30 rounded-lg">
                                                <div className="w-2 h-2 bg-primary rounded-full mt-1.5 sm:mt-2 shrink-0"></div>
                                                <div>
                                                    <div className="font-medium text-xs sm:text-sm">Production-First Monitoring</div>
                                                    <div className="text-[10px] sm:text-xs text-muted-foreground">Real-time metrics, automated alerts, incident prevention</div>
                                                </div>
                                            </div>
                                            <div className="flex items-start gap-2 sm:gap-3 p-2.5 sm:p-3 bg-muted/30 rounded-lg">
                                                <div className="w-2 h-2 bg-primary rounded-full mt-1.5 sm:mt-2 shrink-0"></div>
                                                <div>
                                                    <div className="font-medium text-xs sm:text-sm">Trade-off Based Development</div>
                                                    <div className="text-[10px] sm:text-xs text-muted-foreground">Stability over speed, maintainability over features</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </section>

                    <section id="tech-stack" className="mt-12 sm:mt-16 md:mt-20 px-4 sm:px-0">
                        <h2 className="text-2xl sm:text-3xl font-bold text-center mb-8 sm:mb-12 opacity-0 animate-fade-in-up" style={{ animationDelay: '0.3s', animationFillMode: 'forwards' }}>Technology Stack</h2>
                        <div className="max-w-5xl mx-auto">
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 opacity-0 animate-fade-in-up" style={{ animationDelay: '0.5s', animationFillMode: 'forwards' }}>
                                <Card className="border-0 bg-linear-to-br from-blue-500/10 to-blue-600/5 backdrop-blur-sm hover:shadow-2xl hover:shadow-blue-500/20 hover:scale-105 hover:-translate-y-2 transition-all duration-500 group cursor-pointer">
                                    <CardHeader>
                                        <CardTitle className="text-sm sm:text-base flex items-center gap-2">
                                            <div className="w-2 h-2 bg-blue-500 rounded-full group-hover:animate-ping"></div>
                                            Frontend
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="flex flex-wrap gap-1.5 sm:gap-2">
                                            {['React', 'Next.js', 'TypeScript', 'Tailwind'].map(tech => (
                                                <Badge key={tech} variant="secondary" className="text-[10px] sm:text-xs bg-blue-500/10 hover:bg-blue-500/20 hover:scale-110 transition-all duration-300 cursor-pointer">
                                                    {tech}
                                                </Badge>
                                            ))}
                                        </div>
                                    </CardContent>
                                </Card>

                                <Card className="border-0 bg-linear-to-br from-green-500/10 to-green-600/5 backdrop-blur-sm hover:shadow-2xl hover:shadow-green-500/20 hover:scale-105 hover:-translate-y-2 transition-all duration-500 group cursor-pointer">
                                    <CardHeader>
                                        <CardTitle className="text-sm sm:text-base flex items-center gap-2">
                                            <div className="w-2 h-2 bg-green-500 rounded-full group-hover:animate-ping"></div>
                                            Backend
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="flex flex-wrap gap-1.5 sm:gap-2">
                                            {['Node.js', 'Java', 'Spring Boot', 'REST APIs'].map(tech => (
                                                <Badge key={tech} variant="secondary" className="text-[10px] sm:text-xs bg-green-500/10 hover:bg-green-500/20 hover:scale-110 transition-all duration-300 cursor-pointer">
                                                    {tech}
                                                </Badge>
                                            ))}
                                        </div>
                                    </CardContent>
                                </Card>

                                <Card className="border-0 bg-linear-to-br from-purple-500/10 to-purple-600/5 backdrop-blur-sm hover:shadow-2xl hover:shadow-purple-500/20 hover:scale-105 hover:-translate-y-2 transition-all duration-500 group cursor-pointer">
                                    <CardHeader>
                                        <CardTitle className="text-sm sm:text-base flex items-center gap-2">
                                            <div className="w-2 h-2 bg-purple-500 rounded-full group-hover:animate-ping"></div>
                                            Database
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="flex flex-wrap gap-1.5 sm:gap-2">
                                            {['PostgreSQL', 'MySQL', 'Prisma', 'Redis'].map(tech => (
                                                <Badge key={tech} variant="secondary" className="text-[10px] sm:text-xs bg-purple-500/10 hover:bg-purple-500/20 hover:scale-110 transition-all duration-300 cursor-pointer">
                                                    {tech}
                                                </Badge>
                                            ))}
                                        </div>
                                    </CardContent>
                                </Card>

                                <Card className="border-0 bg-linear-to-br from-orange-500/10 to-orange-600/5 backdrop-blur-sm hover:shadow-2xl hover:shadow-orange-500/20 hover:scale-105 hover:-translate-y-2 transition-all duration-500 group cursor-pointer">
                                    <CardHeader>
                                        <CardTitle className="text-sm sm:text-base flex items-center gap-2">
                                            <div className="w-2 h-2 bg-orange-500 rounded-full group-hover:animate-ping"></div>
                                            DevOps
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="flex flex-wrap gap-1.5 sm:gap-2">
                                            {['Docker', 'Linux', 'Git', 'CI/CD'].map(tech => (
                                                <Badge key={tech} variant="secondary" className="text-[10px] sm:text-xs bg-orange-500/10 hover:bg-orange-500/20 hover:scale-110 transition-all duration-300 cursor-pointer">
                                                    {tech}
                                                </Badge>
                                            ))}
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>
                        </div>
                    </section>

                    <section id="approach" className="mt-12 sm:mt-16 md:mt-20 px-4 sm:px-0">
                        <h2 className="text-2xl sm:text-3xl font-bold text-center mb-8 sm:mb-12 opacity-0 animate-fade-in-up" style={{ animationDelay: '0.3s', animationFillMode: 'forwards' }}>Professional Approach</h2>
                        <div className="max-w-4xl mx-auto">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                                <Card className="border-0 bg-linear-to-br from-card/50 to-card/30 backdrop-blur-sm opacity-0 animate-fade-in-up hover:shadow-lg transition-all duration-300" style={{ animationDelay: '0.5s', animationFillMode: 'forwards' }}>
                                    <CardHeader>
                                        <CardTitle className="text-base sm:text-lg flex items-center gap-3">
                                            <div className="w-2 h-2 bg-primary rounded-full"></div>
                                            What You Get
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent className="space-y-2.5 sm:space-y-3">
                                        <div className="flex items-start gap-2.5 sm:gap-3">
                                            <div className="w-1.5 h-1.5 bg-primary rounded-full mt-1.5 sm:mt-2 shrink-0"></div>
                                            <span className="text-xs sm:text-sm">Fast onboarding and quick understanding of existing codebases</span>
                                        </div>
                                        <div className="flex items-start gap-2.5 sm:gap-3">
                                            <div className="w-1.5 h-1.5 bg-primary rounded-full mt-1.5 sm:mt-2 shrink-0"></div>
                                            <span className="text-xs sm:text-sm">Clean, well-structured commits with meaningful messages</span>
                                        </div>
                                        <div className="flex items-start gap-2.5 sm:gap-3">
                                            <div className="w-1.5 h-1.5 bg-primary rounded-full mt-1.5 sm:mt-2 shrink-0"></div>
                                            <span className="text-xs sm:text-sm">Production-ready code with error handling and security considerations</span>
                                        </div>
                                        <div className="flex items-start gap-2.5 sm:gap-3">
                                            <div className="w-1.5 h-1.5 bg-primary rounded-full mt-1.5 sm:mt-2 shrink-0"></div>
                                            <span className="text-xs sm:text-sm">Thorough documentation and clear communication</span>
                                        </div>
                                    </CardContent>
                                </Card>

                                <Card className="border-0 bg-linear-to-br from-card/50 to-card/30 backdrop-blur-sm opacity-0 animate-fade-in-up hover:shadow-lg transition-all duration-300" style={{ animationDelay: '0.7s', animationFillMode: 'forwards' }}>
                                    <CardHeader>
                                        <CardTitle className="text-base sm:text-lg flex items-center gap-3">
                                            <div className="w-2 h-2 bg-primary rounded-full"></div>
                                            What Sets Me Apart
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent className="space-y-2.5 sm:space-y-3">
                                        <div className="flex items-start gap-2.5 sm:gap-3">
                                            <div className="w-1.5 h-1.5 bg-primary rounded-full mt-1.5 sm:mt-2 shrink-0"></div>
                                            <span className="text-xs sm:text-sm">Product mindset with business requirement translation</span>
                                        </div>
                                        <div className="flex items-start gap-2.5 sm:gap-3">
                                            <div className="w-1.5 h-1.5 bg-primary rounded-full mt-1.5 sm:mt-2 shrink-0"></div>
                                            <span className="text-xs sm:text-sm">Creative background as a music producer brings unique problem-solving perspective</span>
                                        </div>
                                        <div className="flex items-start gap-2.5 sm:gap-3">
                                            <div className="w-1.5 h-1.5 bg-primary rounded-full mt-1.5 sm:mt-2 shrink-0"></div>
                                            <span className="text-xs sm:text-sm">Continuous learning and adoption of latest best practices</span>
                                        </div>
                                        <div className="flex items-start gap-2.5 sm:gap-3">
                                            <div className="w-1.5 h-1.5 bg-primary rounded-full mt-1.5 sm:mt-2 shrink-0"></div>
                                            <span className="text-xs sm:text-sm">End-to-end ownership from development to production deployment</span>
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>
                        </div>
                    </section>

                    <section id="contact" className="mt-12 sm:mt-16 md:mt-20 px-4 sm:px-0">
                        <h2 className="text-2xl sm:text-3xl font-bold text-center mb-8 sm:mb-12 opacity-0 animate-fade-in-up" style={{ animationDelay: '0.3s', animationFillMode: 'forwards' }}>Get In Touch</h2>
                        <div className="max-w-md mx-auto">
                            <div className="text-center mb-4 sm:mb-6 opacity-0 animate-fade-in-up" style={{ animationDelay: '0.5s', animationFillMode: 'forwards' }}>
                                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-green-500/10 text-green-600 text-xs sm:text-sm font-medium hover:bg-green-500/20 transition-colors duration-300">
                                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                                    <span className="whitespace-nowrap">Available for contract and full-time roles</span>
                                </div>
                            </div>
                            <Card className="border-0 bg-card/50 backdrop-blur-sm hover:shadow-lg transition-all duration-500 opacity-0 animate-fade-in-up" style={{ animationDelay: '0.7s', animationFillMode: 'forwards' }}>
                                <CardContent className="pt-4 sm:pt-6">
                                    <form ref={formRef} onSubmit={async (e) => {
                                        setIsSubmitting(true);
                                        setSubmitStatus({ type: null, message: '' });
                                        
                                        const result = await handleFormSubmit(e);
                                        
                                        if (result.success) {
                                            setSubmitStatus({ type: 'success', message: result.message });
                                            formRef.current?.reset();
                                        } else {
                                            setSubmitStatus({ type: 'error', message: result.message });
                                        }
                                        
                                        setIsSubmitting(false);
                                    }} className="space-y-3 sm:space-y-4">
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                                            <div>
                                                <Label htmlFor="firstName" className="text-xs sm:text-sm">First Name</Label>
                                                <Input id="firstName" name="firstName" placeholder="John" required className="hover:border-primary/50 focus:border-primary transition-colors duration-300 min-h-[44px]" disabled={isSubmitting} />
                                            </div>
                                            <div>
                                                <Label htmlFor="lastName" className="text-xs sm:text-sm">Last Name</Label>
                                                <Input id="lastName" name="lastName" placeholder="Doe" required className="hover:border-primary/50 focus:border-primary transition-colors duration-300 min-h-[44px]" disabled={isSubmitting} />
                                            </div>
                                        </div>
                                        <div>
                                            <Label htmlFor="email" className="text-xs sm:text-sm">Email</Label>
                                            <Input id="email" name="email" type="email" placeholder="john@example.com" required className="hover:border-primary/50 focus:border-primary transition-colors duration-300 min-h-[44px]" disabled={isSubmitting} />
                                        </div>
                                        <div>
                                            <Label htmlFor="message" className="text-xs sm:text-sm">Message</Label>
                                            <Textarea
                                                id="message"
                                                name="message"
                                                placeholder="Tell me about your project..."
                                                rows={4}
                                                required
                                                className="hover:border-primary/50 focus:border-primary transition-colors duration-300 resize-none min-h-[120px]"
                                                disabled={isSubmitting}
                                            />
                                        </div>
                                        
                                        {submitStatus.type && (
                                            <div className={`p-3 sm:p-4 rounded-lg text-xs sm:text-sm ${submitStatus.type === 'success' ? 'bg-green-500/10 text-green-600 border border-green-500/20' : 'bg-red-500/10 text-red-600 border border-red-500/20'} animate-fade-in-up`}>
                                                <div className="flex items-start gap-2 sm:gap-3">
                                                    <span className="text-base sm:text-lg">{submitStatus.type === 'success' ? '✓' : '✕'}</span>
                                                    <div>
                                                        <p className="font-medium">{submitStatus.message}</p>
                                                        {submitStatus.type === 'success' && (
                                                            <p className="text-[10px] sm:text-xs mt-1 opacity-80">Your message was automatically delivered via email.</p>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                        
                                        <Button type="submit" className="w-full group hover:scale-105 transition-all duration-300 min-h-[44px]" disabled={isSubmitting}>
                                            {isSubmitting ? 'Sending...' : 'Send Message'}
                                            <HugeiconsIcon icon={Mail01Icon} className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                                        </Button>
                                    </form>
                                </CardContent>
                            </Card>
                        </div>
                    </section>
                </section>
            </div>
        </main>
    );
}