"use client";

import resumeData from "@/data/resume.json";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowUpRight01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

export default function Resume() {
    const data: any = resumeData;

    return (
        <article className="max-w-none space-y-8">
            {/* Header */}
            <Card className="border-0 bg-card/50 backdrop-blur-sm">
                <CardContent className="pt-6">
                    <div className="flex flex-col sm:flex-row items-start justify-between gap-6">
                        <div className="flex-1">
                            <h1 className="text-4xl font-bold mb-2 bg-linear-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">{data.basics.name}</h1>
                            <div className="text-lg text-muted-foreground mb-4 font-medium">{data.basics.label}</div>
                            <p className="text-muted-foreground leading-relaxed max-w-2xl">{data.basics.summary}</p>
                        </div>
                        <div className="flex flex-col items-start sm:items-end gap-3 text-sm">
                            <div className="text-muted-foreground font-medium">{data.basics.location}</div>
                            <a href={`mailto:${data.basics.email}`} className="hover:text-primary transition-colors font-medium">{data.basics.email}</a>
                            <div className="flex gap-4 mt-2">
                                {data.basics.github && (
                                    <a href={data.basics.github} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                                        <HugeiconsIcon icon={ArrowUpRight01Icon} size={20} />
                                        GitHub
                                    </a>
                                )}
                                {data.basics.linkedin && (
                                    <a href={data.basics.linkedin} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                                        <HugeiconsIcon icon={ArrowUpRight01Icon} size={20} />
                                        LinkedIn
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
                    <CardTitle className="text-2xl">Key Competencies</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {data.competencies.map((comp: string, idx: number) => (
                            <div key={idx} className="flex items-start gap-3 p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors">
                                <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                                <span className="text-sm leading-relaxed">{comp}</span>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>

            {/* Experience */}
            <Card className="border-0 bg-card/50 backdrop-blur-sm">
                <CardHeader>
                    <CardTitle className="text-2xl">Experience</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-6">
                        {data.experience.map((exp: any, idx: number) => (
                            <div key={idx} className="border-l-2 border-primary/20 pl-6 pb-6 last:pb-0">
                                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline mb-2">
                                    <div className="font-semibold text-lg">{exp.position} — {exp.company}</div>
                                    <div className="text-sm text-muted-foreground font-medium">{exp.startDate} — {exp.endDate || 'Present'}</div>
                                </div>
                                <div className="text-muted-foreground mb-3 leading-relaxed">{exp.summary}</div>
                                {exp.highlights?.length > 0 && (
                                    <ul className="space-y-2">
                                        {exp.highlights.map((h: string, i: number) => (
                                            <li key={i} className="flex items-start gap-3 text-sm">
                                                <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"></div>
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
                    <CardTitle className="text-2xl">Featured Project</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        <div>
                            <h3 className="font-semibold text-xl mb-2">{data.featuredProject.name}</h3>
                            <p className="text-muted-foreground leading-relaxed">{data.featuredProject.summary}</p>
                        </div>
                        <ul className="space-y-2">
                            {data.featuredProject.highlights.map((h: string, i: number) => (
                                <li key={i} className="flex items-start gap-3 text-sm">
                                    <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                                    <span className="leading-relaxed">{h}</span>
                                </li>
                            ))}
                        </ul>
                        <div className="flex flex-wrap gap-2 pt-2">
                            {data.featuredProject.technologies.map((tech: string) => (
                                <Badge key={tech} variant="secondary" className="text-xs">
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
                        <CardTitle className="text-2xl">Additional Projects</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {data.additionalProjects.map((p: any, i: number) => (
                                <div key={i} className="p-4 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors">
                                    {p.url ? (
                                        <a href={p.url} target="_blank" rel="noreferrer" className="font-semibold hover:text-primary transition-colors inline-flex items-center gap-2 mb-2">
                                            {p.name}
                                            <HugeiconsIcon icon={ArrowUpRight01Icon} size={16} />
                                        </a>
                                    ) : (
                                        <div className="font-semibold mb-2">{p.name}</div>
                                    )}
                                    <div className="text-sm text-muted-foreground leading-relaxed">{p.summary}</div>
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
                    <CardTitle className="text-2xl">Tech Stack</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {Object.entries(data.techStack).map(([category, items]: [string, any]) => (
                            <div key={category} className="space-y-2">
                                <h4 className="font-semibold capitalize text-sm text-muted-foreground">{category}</h4>
                                <div className="flex flex-wrap gap-2">
                                    {items.map((item: string) => (
                                        <Badge key={item} variant="outline" className="text-xs">
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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="border-0 bg-card/50 backdrop-blur-sm">
                    <CardHeader>
                        <CardTitle className="text-2xl">Education</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {data.education.map((ed: any, idx: number) => (
                                <div key={idx} className="pb-4 last:pb-0">
                                    <div className="font-semibold">{ed.institution}</div>
                                    <div className="text-muted-foreground">{ed.area}</div>
                                    <div className="text-sm text-muted-foreground font-medium">{ed.period}</div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                <Card className="border-0 bg-card/50 backdrop-blur-sm">
                    <CardHeader>
                        <CardTitle className="text-2xl">Languages</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-3">
                            {data.languages.map((l: any, i: number) => (
                                <div key={i} className="flex justify-between items-center py-2">
                                    <span className="font-medium">{l.language}</span>
                                    <Badge variant="secondary" className="text-xs">
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
