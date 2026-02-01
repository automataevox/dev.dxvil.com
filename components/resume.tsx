"use client";

import resumeData from "@/data/resume.json";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ArrowUpRight01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

export default function Resume() {
    const data: any = resumeData;
    const projectsIsGrid = Array.isArray(data.projects) && data.projects.length >= 3;
    const sortedProjects = Array.isArray(data.projects)
        ? [...data.projects].sort((a: any, b: any) => (b.summary?.length || 0) - (a.summary?.length || 0))
        : [];

    return (
        <article className="prose max-w-none flex flex-col gap-8">
            <div className="flex flex-col sm:flex-row items-start justify-between">
                <div>
                    <h2 className="text-2xl font-bold">{data.basics.name}</h2>
                    <div className="text-sm text-muted-foreground">{data.basics.label} • {data.basics.location}</div>
                    <div className="mt-2 text-sm text-muted-foreground">{data.basics.summary}</div>
                </div>
                <div className="flex flex-col items-start sm:items-end gap-2 sm:mt-0 mt-4">
                    <a href={`mailto:${data.basics.email}`} className="text-sm underline text-muted-foreground">{data.basics.email}</a>
                    <a href={data.basics.website} target="_blank" rel="noopener noreferrer" className="text-sm underline text-muted-foreground">{data.basics.website}</a>
                    {data.basics.github && (<a href={data.basics.github} target="_blank" rel="noopener noreferrer" className="text-sm underline text-muted-foreground">GitHub</a>)}
                    {data.basics.linkedin && (<a href={data.basics.linkedin} target="_blank" rel="noopener noreferrer" className="text-sm underline text-muted-foreground">LinkedIn</a>)}
                </div>
            </div>

            <section>
                <h3 className="text-lg font-semibold">Experience</h3>
                <div className="mt-3 space-y-4">
                    {data.experience.map((exp: any, idx: number) => (
                        <div key={idx}>
                            <div className="flex flex-col sm:flex-row sm:justify-between font-medium">
                                <div>{exp.position} — {exp.company}</div>
                                <div className="text-sm text-muted-foreground mt-1 sm:mt-0">{exp.startDate} — {exp.endDate || 'Present'}</div>
                            </div>
                            <div className="text-sm text-muted-foreground mt-1">{exp.summary}</div>
                            {exp.highlights?.length > 0 && (
                                <ul className="mt-2 list-disc pl-5 text-sm">
                                    {exp.highlights.map((h: string, i: number) => <li key={i}>{h}</li>)}
                                </ul>
                            )}
                        </div>
                    ))}
                </div>
            </section>

            <Separator />

            <section>
                <h3 className="text-lg font-semibold">Projects</h3>
                <div className={projectsIsGrid ? "mt-3 grid grid-cols-1 sm:grid-cols-2 gap-4" : "mt-3 space-y-4"}>
                    {sortedProjects.map((p: any, i: number) => (
                        <div key={i}>
                            {p.url ? (
                                <a href={p.url} target="_blank" rel="noreferrer" className={"underline"}>
                                    <div className="font-medium flex flex-row gap-1">
                                        {p.name}
                                        <HugeiconsIcon
                                            icon={ArrowUpRight01Icon}
                                            size={20}
                                            color="currentColor"
                                            strokeWidth={1.5}
                                        />
                                    </div>
                                </a>
                            ) : (
                                <div className="font-medium">{p.name}</div>
                            )}
                            <div className="text-sm text-muted-foreground">{p.summary}</div>
                            <div className="mt-3 flex flex-wrap gap-2">
                                {p.skills.map((s: string) => (
                                    <span key={s} className="inline-flex items-center rounded-none bg-muted px-2 py-1 text-xs">{s}</span>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            <Separator />

            <section>
                <h3 className="text-lg font-semibold">Education</h3>
                <div className="mt-3 space-y-2">
                    {data.education.map((ed: any, idx: number) => (
                        <div key={idx}>
                            <div className="font-medium">{ed.institution} — {ed.area}</div>
                            <div className="text-sm text-muted-foreground">{ed.startDate} — {ed.endDate} {ed.gpa ? `• GPA ${ed.gpa}` : ''}</div>
                        </div>
                    ))}
                </div>
            </section>

            <Separator />

            <section>
                <h3 className="text-lg font-semibold">Skills</h3>
                <div className="mt-3 flex flex-wrap gap-2">
                    {data.skills.map((s: string) => (
                        <span key={s} className="inline-flex items-center rounded-none bg-muted px-2 py-1 text-xs">{s}</span>
                    ))}
                </div>
            </section>

            <Separator />

            <section className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                    <h3 className="text-lg font-semibold">Certifications</h3>
                    <div className="mt-2 text-sm text-muted-foreground">
                        {data.certifications.map((c: any, i: number) => <div key={i}>{c.name}{c.date ? ` • ${c.date}` : ''}</div>)}
                    </div>
                </div>
                <div>
                    <h3 className="text-lg font-semibold">Languages</h3>
                    <div className="mt-2 text-sm text-muted-foreground">
                        {data.languages.map((l: any, i: number) => <div key={i}>{l.language} — {l.fluency}</div>)}
                    </div>
                </div>
            </section>
        </article>
    );
}
