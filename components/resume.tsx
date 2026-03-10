"use client";

import resumeData from "@/data/resume.json";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowUpRight01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

interface ResumeData {
    basics: {
        name: string;
        label: string;
        email: string;
        location: string;
        summary: string;
        github?: string;
        linkedin?: string;
    };
    competencies: string[];
    experience: Array<{
        company: string;
        position: string;
        startDate: string;
        endDate?: string;
        summary: string;
        highlights?: string[];
    }>;
    featuredProject: {
        name: string;
        summary: string;
        highlights: string[];
        technologies: string[];
    };
    additionalProjects?: Array<{
        name: string;
        url?: string;
        summary: string;
    }>;
    techStack: Record<string, string[]>;
    education: Array<{
        institution: string;
        area: string;
        period: string;
    }>;
    languages: Array<{
        language: string;
        fluency: string;
    }>;
}

export default function Resume() {
    const data = resumeData as ResumeData;

    return (
        <article className="max-w-none space-y-6 sm:space-y-8">
            {/* Header */}
            <Card className="border-0 bg-card/50 backdrop-blur-sm">
                <CardContent className="pt-4 sm:pt-6">
                    <div className="flex flex-col sm:flex-row items-start justify-between gap-4 sm:gap-6">
                        <div className="flex-1">
                            <h1 className="text-3xl sm:text-4xl font-bold mb-2 bg-linear-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">{data.basics.name}</h1>
                            <div className="text-base sm:text-lg text-muted-foreground mb-3 sm:mb-4 font-medium">{data.basics.label}</div>
                            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed max-w-2xl">{data.basics.summary}</p>
                        </div>
                        <div className="flex flex-col items-start sm:items-end gap-2 sm:gap-3 text-xs sm:text-sm w-full sm:w-auto">
                            <div className="text-muted-foreground font-medium">{data.basics.location}</div>
                            <a href={`mailto:${data.basics.email}`} className="hover:text-primary transition-colors font-medium break-all">{data.basics.email}</a>
                            <div className="flex gap-4 mt-1 sm:mt-2">
                                {data.basics.github && (
                                    <a href={data.basics.github} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-1 min-h-[44px] sm:min-h-0 -my-2 sm:my-0">
                                        <HugeiconsIcon icon={ArrowUpRight01Icon} size={18} />
                                        <span className="text-xs sm:text-sm">GitHub</span>
                                    </a>
                                )}
                                {data.basics.linkedin && (
                                    <a href={data.basics.linkedin} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-1 min-h-[44px] sm:min-h-0 -my-2 sm:my-0">
                                        <HugeiconsIcon icon={ArrowUpRight01Icon} size={18} />
                                        <span className="text-xs sm:text-sm">LinkedIn</span>
                                    </a>
                                )}
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Key Competencies */}
            <Card className="border-0 bg-card/50 backdrop-blur-sm">
                <CardHeader>
                    <CardTitle className="text-xl sm:text-2xl">Key Competencies</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                        {data.competencies.map((comp: string, idx: number) => (
                            <div key={idx} className="flex items-start gap-2.5 sm:gap-3 p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors">
                                <div className="w-2 h-2 bg-primary rounded-full mt-1.5 sm:mt-2 shrink-0"></div>
                                <span className="text-xs sm:text-sm leading-relaxed">{comp}</span>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>

            {/* Experience */}
            <Card className="border-0 bg-card/50 backdrop-blur-sm">
                <CardHeader>
                    <CardTitle className="text-xl sm:text-2xl">Experience</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4 sm:space-y-6">
                        {data.experience.map((exp, idx: number) => (
                            <div key={idx} className="border-l-2 border-primary/20 pl-4 sm:pl-6 pb-4 sm:pb-6 last:pb-0">
                                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline mb-2 gap-1 sm:gap-2">
                                    <div className="font-semibold text-base sm:text-lg">{exp.position} — {exp.company}</div>
                                    <div className="text-xs sm:text-sm text-muted-foreground font-medium whitespace-nowrap">{exp.startDate} — {exp.endDate || 'Present'}</div>
                                </div>
                                <div className="text-sm sm:text-base text-muted-foreground mb-2 sm:mb-3 leading-relaxed">{exp.summary}</div>
                                {exp.highlights && exp.highlights.length > 0 && (
                                    <ul className="space-y-1.5 sm:space-y-2">
                                        {exp.highlights.map((h, i: number) => (
                                            <li key={i} className="flex items-start gap-2 sm:gap-3 text-xs sm:text-sm">
                                                <div className="w-1.5 h-1.5 bg-primary rounded-full mt-1.5 sm:mt-2 shrink-0"></div>
                                                <span className="leading-relaxed">{h}</span>
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>

            {/* Featured Project */}
            <Card className="border-0 bg-card/50 backdrop-blur-sm">
                <CardHeader>
                    <CardTitle className="text-xl sm:text-2xl">Featured Project</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-3 sm:space-y-4">
                        <div>
                            <h3 className="font-semibold text-lg sm:text-xl mb-2">{data.featuredProject.name}</h3>
                            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">{data.featuredProject.summary}</p>
                        </div>
                        <ul className="space-y-1.5 sm:space-y-2">
                            {data.featuredProject.highlights.map((h: string, i: number) => (
                                <li key={i} className="flex items-start gap-2 sm:gap-3 text-xs sm:text-sm">
                                    <div className="w-1.5 h-1.5 bg-primary rounded-full mt-1.5 sm:mt-2 shrink-0"></div>
                                    <span className="leading-relaxed">{h}</span>
                                </li>
                            ))}
                        </ul>
                        <div className="flex flex-wrap gap-1.5 sm:gap-2 pt-2">
                            {data.featuredProject.technologies.map((tech: string) => (
                                <Badge key={tech} variant="secondary" className="text-[10px] sm:text-xs">
                                    {tech}
                                </Badge>
                            ))}
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Additional Projects */}
            {data.additionalProjects && data.additionalProjects.length > 0 && (
                <Card className="border-0 bg-card/50 backdrop-blur-sm">
                    <CardHeader>
                        <CardTitle className="text-xl sm:text-2xl">Additional Projects</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                            {data.additionalProjects.map((p, i: number) => (
                                <div key={i} className="p-3 sm:p-4 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors">
                                    {p.url ? (
                                        <a href={p.url} target="_blank" rel="noreferrer" className="font-semibold hover:text-primary transition-colors inline-flex items-center gap-1.5 sm:gap-2 mb-1.5 sm:mb-2 text-sm sm:text-base">
                                            {p.name}
                                            <HugeiconsIcon icon={ArrowUpRight01Icon} size={14} className="sm:w-4 sm:h-4" />
                                        </a>
                                    ) : (
                                        <div className="font-semibold mb-1.5 sm:mb-2 text-sm sm:text-base">{p.name}</div>
                                    )}
                                    <div className="text-xs sm:text-sm text-muted-foreground leading-relaxed">{p.summary}</div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            )}

            <Separator />

            {/* Tech Stack */}
            <Card className="border-0 bg-card/50 backdrop-blur-sm">
                <CardHeader>
                    <CardTitle className="text-xl sm:text-2xl">Tech Stack</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                        {Object.entries(data.techStack).map(([category, items]: [string, string[]]) => (
                            <div key={category} className="space-y-2">
                                <h4 className="font-semibold capitalize text-xs sm:text-sm text-muted-foreground">{category}</h4>
                                <div className="flex flex-wrap gap-1.5 sm:gap-2">
                                    {items.map((item: string) => (
                                        <Badge key={item} variant="outline" className="text-[10px] sm:text-xs">
                                            {item}
                                        </Badge>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>

            {/* Education & Languages */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                <Card className="border-0 bg-card/50 backdrop-blur-sm">
                    <CardHeader>
                        <CardTitle className="text-xl sm:text-2xl">Education</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-3 sm:space-y-4">
                            {data.education.map((ed, idx: number) => (
                                <div key={idx} className="pb-3 sm:pb-4 last:pb-0">
                                    <div className="font-semibold text-sm sm:text-base">{ed.institution}</div>
                                    <div className="text-sm sm:text-base text-muted-foreground">{ed.area}</div>
                                    <div className="text-xs sm:text-sm text-muted-foreground font-medium">{ed.period}</div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                <Card className="border-0 bg-card/50 backdrop-blur-sm">
                    <CardHeader>
                        <CardTitle className="text-xl sm:text-2xl">Languages</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-2 sm:space-y-3">
                            {data.languages.map((l, i: number) => (
                                <div key={i} className="flex justify-between items-center py-1.5 sm:py-2">
                                    <span className="font-medium text-sm sm:text-base">{l.language}</span>
                                    <Badge variant="secondary" className="text-[10px] sm:text-xs">
                                        {l.fluency}
                                    </Badge>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </article>
    );
}
