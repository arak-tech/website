import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Mail } from "lucide-react";

import { Button } from "@/components/ui/button";

const navItems = [
  { href: "/#services", label: "Services" },
  { href: "/#process", label: "Process" },
  { href: "/spin-to-win", label: "Spin to Win" },
];

export function SiteNavbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background text-foreground shadow-[0_1px_1px_rgb(0_0_0_/_0.03)]">
      <nav className="mx-auto flex max-w-7xl flex-col gap-2 px-4 py-2 text-sm sm:px-6 lg:px-8 md:h-16 md:flex-row md:items-center md:justify-between md:py-0">
        <div className="flex min-w-0 items-center justify-between gap-3">
          <Link
            href="/"
            className="flex min-w-0 items-center gap-2 font-medium tracking-tight"
            aria-label="Arak Holdings home"
          >
            <Image
              src="/logo.png"
              alt="Arak Holdings logo"
              width={32}
              height={32}
              className="size-8 shrink-0 object-contain"
              priority
            />
            <span className="truncate">Arak Holdings</span>
          </Link>

          <Button asChild size="sm" className="min-h-11 px-4 md:hidden">
            <Link href="/#contact">Start an inquiry</Link>
          </Button>
        </div>

        <div className="hidden items-center gap-7 text-muted-foreground md:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="transition-colors hover:text-foreground"
            >
              {item.label}
            </Link>
          ))}
        </div>

        <div className="hidden items-center gap-2 md:flex">
          <Button asChild variant="ghost" size="sm" className="px-3">
            <a href="mailto:info@arakholdings.com">
              <Mail data-icon="inline-start" aria-hidden />
              Email
            </a>
          </Button>
          <Button asChild size="sm" className="px-4">
            <Link href="/#contact">
              Book a placement
              <ArrowRight data-icon="inline-end" aria-hidden />
            </Link>
          </Button>
        </div>

        <div className="grid grid-cols-3 gap-1 border-t border-border pt-2 text-center text-[13px] text-muted-foreground md:hidden">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="min-h-11 rounded-full px-2 py-3 transition-colors hover:bg-accent hover:text-foreground"
            >
              {item.label === "Spin to Win" ? "Spin" : item.label}
            </Link>
          ))}
        </div>
      </nav>
    </header>
  );
}
