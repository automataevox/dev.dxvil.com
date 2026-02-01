import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardContent,
    CardFooter,
} from "@/components/ui/card";
import workData from "@/data/work.json";
import resumeData from "@/data/resume.json";

export default function Page() {
    return (
        <main className="container mx-auto max-w-4xl py-20 px-4">
            <section className="grid gap-8">
                <header className="text-center">
                    <h1 className="text-4xl font-extrabold">Hi, I’m Jaroslav — Fullstack Developer</h1>
                    <p className="mt-3 text-muted-foreground max-w-2xl mx-auto">
                        I build fast, accessible web applications with Next.js, TypeScript and modern UI
                        systems. I focus on clear UX, performance and pragmatic engineering.
                    </p>
                    <div className="mt-6 flex items-center justify-center gap-3">
                        <a href="#work">
                            <Button>View work</Button>
                        </a>
                        <a href="/resume">
                            <Button variant={"secondary"}>Resume</Button>
                        </a>
                        <a href="mailto:dev@dxvil.com">
                            <Button variant="outline">Contact</Button>
                        </a>
                    </div>
                </header>

                <section id="skills">
                    <h2 className="text-lg font-semibold">Skills</h2>
                    <div className="mt-3 flex flex-wrap gap-2">
                        {(resumeData.skills || []).map((s: string) => (
                            <Badge key={s} variant="secondary">
                                {s}
                            </Badge>
                        ))}
                    </div>
                </section>

                <section id="work">
                    <h2 className="text-lg font-semibold">Selected Projects</h2>
                    <div className={`mt-4 grid items-stretch grid-cols-1 gap-4 ${Array.isArray(workData.projects) && workData.projects.length >= 2 ? 'sm:grid-cols-2' : 'sm:grid-cols-1'}`}>
                        {(workData.projects || []).map((p: any) => (
                            <Card key={p.name} className="h-full">
                                <CardHeader>
                                    <CardTitle>{p.name}</CardTitle>
                                    <CardDescription>{p.skills ? p.skills.join(', ') : ''}</CardDescription>
                                </CardHeader>
                                <CardContent className="flex-1">{p.summary}</CardContent>
                                {(p.demo || p.url) && (
                                    <CardFooter>
                                        {p.url && <a href={p.url} target="_blank" rel="noreferrer" className="mr-2">
                                            <Button variant="outline">Source</Button>
                                        </a>}
                                        {p.demo && <a href={p.demo} target="_blank" rel="noreferrer" className="mr-2">
                                            <Button variant="default">Live</Button>
                                        </a>}
                                    </CardFooter>
                                )}
                            </Card>
                        ))}
                    </div>
                </section>

                <section id="contact">
                    <h2 className="text-lg font-semibold">Contact</h2>
                    <p className="mt-2 text-muted-foreground"><span className="text-green-500">Available</span> for contract and full-time roles.</p>
                    <div className="mt-4">
                        <a href="mailto:dev@dxvil.com">
                            <Button>Send an email</Button>
                        </a>
                    </div>
                </section>
            </section>
        </main>
    );
}