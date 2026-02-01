import Resume from "@/components/resume";
import Link from "next/link";
import { HugeiconsIcon } from "@hugeicons/react";
import { ArrowTurnBackwardIcon } from "@hugeicons/core-free-icons";

export default function Page() {
    return (
        <main className="container mx-auto max-w-4xl py-20 px-4 relative">
            <Link href="/" aria-label="Back to home" className="absolute left-4 top-4 inline-flex items-center rounded-md p-2 hover:bg-muted/10">
                <HugeiconsIcon icon={ArrowTurnBackwardIcon} />
            </Link>

            <section className="grid gap-8">
                <Resume />
            </section>
        </main>
    );
}