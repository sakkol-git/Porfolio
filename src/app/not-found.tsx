import Link from "next/link";
import { PageShell } from "@/components/layout";

export default function NotFound() {
  return (
    <PageShell className="flex items-center justify-center pt-0 pb-0">
      <div className="max-w-md text-center">
        <h1 className="text-display text-7xl font-bold text-primary">404</h1>
        <h2 className="mt-4 text-headline-md text-primary">Page not found</h2>
        <p className="mt-2 text-body-md text-on-surface-variant">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <div className="mt-8">
          <Link
            href="/"
            className="inline-flex items-center justify-center rounded-md bg-primary-fixed px-6 py-3 text-body-md font-semibold text-[#1b1b1b] transition-colors hover:bg-primary-fixed-dim"
          >
            Go home
          </Link>
        </div>
      </div>
    </PageShell>
  );
}
