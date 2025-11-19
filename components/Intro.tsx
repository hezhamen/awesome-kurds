import Link from "next/link";

import { Button } from "@/components/ui/button";
import { KurdsWithTopics } from "@/lib/kurds";

export default function Intro({ kurds }: { kurds: KurdsWithTopics }) {
  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center gap-10 px-6 text-center">
      <div className="space-y-4">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-primary">
          Community Spotlight
        </p>
        <h1 className="text-4xl font-bold leading-tight tracking-tight md:text-6xl">
          Awesome Kurds
        </h1>
        <p className="text-lg text-muted-foreground md:text-xl">
          Meet {kurds.length}+ Kurdish builders, maintainers, designers, and
          leaders from around the world.
        </p>
      </div>
      <div className="flex flex-col gap-4 sm:flex-row">
        <Button asChild size="lg">
          <Link href="https://github.com/DevelopersTree/awesome-kurds">
            Add yourself
          </Link>
        </Button>
        <Button asChild variant="outline" size="lg">
          <Link href="https://github.com/hezhamen/awesome-kurds">
            Contribute on GitHub
          </Link>
        </Button>
      </div>
      <div className="absolute bottom-12 flex flex-col items-center gap-2 text-sm text-muted-foreground">
        <div className="h-10 w-6 flex items-start justify-center rounded-full border border-dashed border-muted-foreground/60 p-1 pt-2">
          <div className="h-2 w-2 rounded-full bg-muted-foreground/80 animate-bounce" />
        </div>
        <span>Scroll to explore</span>
      </div>
    </section>
  );
}
