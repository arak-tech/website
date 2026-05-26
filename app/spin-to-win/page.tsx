import Link from "next/link";
import { Mail, MessageCircle } from "lucide-react";

import { ReelAdvert } from "@/components/reel/reel-advert";
import { Button } from "@/components/ui/button";

export default function SpinToWinPage() {
  return (
    <>
      <header className="sticky top-0 z-50 border-b border-border bg-background/90 text-foreground backdrop-blur-xl">
        <nav className="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-2 text-sm sm:px-5 md:h-12 md:flex-row md:items-center md:justify-between md:py-0">
          <div className="flex min-w-0 items-center justify-between gap-3">
            <Link href="/" className="truncate font-semibold tracking-tight">
              Arak Holdings
            </Link>
            <Button
              size="sm"
              className="min-h-11 rounded-full px-3 md:hidden text-white"
            >
              <MessageCircle className="size-4" aria-hidden />
              WhatsApp
            </Button>
          </div>
          <div className="hidden items-center gap-6 text-muted-foreground md:flex">
            <Link
              href="/#services"
              className="transition-colors hover:text-foreground"
            >
              Services
            </Link>
            <Link
              href="/#contact"
              className="transition-colors hover:text-foreground"
            >
              Contact
            </Link>
            <Link href="/spin-to-win" className="text-primary">
              Spin to Win
            </Link>
          </div>
          <div className="hidden items-center gap-2 md:flex">
            <Button
              asChild
              variant="ghost"
              size="sm"
              className="rounded-full px-3"
            >
              <a href="mailto:info@arakholdings.com">
                <Mail className="size-4" aria-hidden />
                Email
              </a>
            </Button>
            <Button size="sm" className="rounded-full px-3 text-white">
              <MessageCircle className="size-4" aria-hidden />
              WhatsApp
            </Button>
          </div>
          <div className="grid grid-cols-3 gap-1 border-t border-border pt-2 text-center text-[13px] text-muted-foreground md:hidden">
            <Link
              href="/#services"
              className="min-h-11 rounded-full px-2 py-3 transition-colors hover:bg-muted hover:text-foreground"
            >
              Services
            </Link>
            <Link
              href="/#contact"
              className="min-h-11 rounded-full px-2 py-3 transition-colors hover:bg-muted hover:text-foreground"
            >
              Contact
            </Link>
            <Link
              href="/spin-to-win"
              className="min-h-11 rounded-full px-2 py-3 text-primary transition-colors hover:bg-muted"
            >
              Spin
            </Link>
          </div>
        </nav>
      </header>
      <ReelAdvert />
    </>
  );
}
