import Link from "next/link";

export default function Footer() {
  return (
    <footer className="w-full border-t bg-muted/30">
      <div className="container mx-auto flex flex-col items-center gap-3 px-6 py-10 text-center text-sm text-muted-foreground md:flex-row md:justify-between">
        <p>Powered by the devs.krd community.</p>
        <Link
          href="https://devs.krd"
          className="font-medium text-primary hover:underline"
        >
          devs.krd
        </Link>
      </div>
    </footer>
  );
}
