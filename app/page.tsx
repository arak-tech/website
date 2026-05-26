"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Mail,
  MapPin,
  MessageCircle,
  PackageCheck,
} from "lucide-react";

import { LandingInquiryForm } from "@/components/landing-inquiry-form";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";

const contactDetails = {
  email: "info@arakholdings.com",
  address: "60 Argyle Road, Avondale, Harare",
};

const services = [
  {
    title: "Vending machines",
    description:
      "Clean, branded vending placements for offices, retail spaces, gyms, schools, and events.",
    image: "/vmc.jpeg",
    imageClassName: "max-h-[360px] object-contain sm:max-h-[520px]",
    accent: "bg-[#e31b23]",
  },
  {
    title: "LED delivery boxes",
    description:
      "Mobile media boxes for restaurants, fleets, and campaigns that need street-level visibility.",
    image: "/led-food-box.png",
    imageClassName: "max-h-[360px] object-contain sm:max-h-[520px]",
    accent: "bg-[#149447]",
  },
];

const highlights = [
  "Placement planning",
  "Setup and ongoing support",
  "Spin to Win campaign capture",
];

export default function Page() {
  const [carouselApi, setCarouselApi] = useState<CarouselApi>();

  useEffect(() => {
    if (!carouselApi) return;

    const interval = window.setInterval(() => {
      if (carouselApi.canScrollNext()) {
        carouselApi.scrollNext();
        return;
      }

      carouselApi.scrollTo(0);
    }, 3500);

    return () => window.clearInterval(interval);
  }, [carouselApi]);

  return (
    <div className="min-h-screen bg-white font-sans text-[#243042] selection:bg-[#0066cc]/10 selection:text-[#0066cc]">
      <header className="sticky top-0 z-50 border-b border-[#dfe7f3] bg-white/95 backdrop-blur-xl">
        <nav className="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-2 text-sm sm:px-5 md:h-14 md:flex-row md:items-center md:justify-between md:py-0">
          <div className="flex min-w-0 items-center justify-between gap-3">
            <Link
              href="/"
              className="flex min-w-0 items-center gap-2 font-semibold tracking-tight text-[#243042]"
            >
              <Image
                src="/logo.png"
                alt="Arak Holdings logo"
                width={28}
                height={28}
                className="size-7 shrink-0 object-contain"
              />
              <span className="truncate">Arak Holdings</span>
            </Link>

            <Button
              asChild
              size="sm"
              className="min-h-11 rounded-full px-4 md:hidden"
            >
              <a href="#contact">Contact</a>
            </Button>
          </div>

          <div className="hidden items-center gap-6 text-[#5d6a7c] md:flex">
            <a
              href="#services"
              className="transition-colors hover:text-[#0066cc]"
            >
              Services
            </a>
            <a
              href="#contact"
              className="transition-colors hover:text-[#0066cc]"
            >
              Contact
            </a>
            <Link
              href="/spin-to-win"
              className="transition-colors hover:text-[#0066cc]"
            >
              Spin to Win
            </Link>
          </div>

          <Button
            size="sm"
            className="hidden rounded-full px-4 md:inline-flex text-white"
          >
            Talk to us
          </Button>

          <div className="grid grid-cols-3 gap-1 border-t border-[#edf2f8] pt-2 text-center text-[13px] text-[#5d6a7c] md:hidden">
            <a
              href="#services"
              className="min-h-11 rounded-full px-2 py-3 transition-colors hover:bg-[#eef6ff] hover:text-[#0066cc]"
            >
              Services
            </a>
            <a
              href="#contact"
              className="min-h-11 rounded-full px-2 py-3 transition-colors hover:bg-[#eef6ff] hover:text-[#0066cc]"
            >
              Contact
            </a>
            <Link
              href="/spin-to-win"
              className="min-h-11 rounded-full px-2 py-3 transition-colors hover:bg-[#eef6ff] hover:text-[#0066cc]"
            >
              Spin
            </Link>
          </div>
        </nav>
      </header>

      <main>
        <section className="mx-auto grid max-w-6xl gap-8 px-4 py-10 sm:px-5 sm:py-14 md:grid-cols-[0.92fr_1.08fr] md:items-center md:py-20">
          <div>
            <h1 className="max-w-3xl text-[2.35rem] font-semibold leading-[1.04] tracking-tight text-[#223047] sm:text-5xl lg:text-6xl">
              Smart vending and mobile media for brands on the move.
            </h1>
            <p className="mt-5 max-w-xl text-base leading-7 text-[#5d6a7c] sm:mt-6 sm:text-lg sm:leading-8">
              Arak Holdings provides vending machines, LED delivery box
              advertising, and simple campaign activations for high-traffic
              locations.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button
                size="lg"
                className="w-full rounded-full px-6 sm:w-auto text-white"
              >
                Email us
                <Mail className="size-4" aria-hidden />
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="w-full rounded-full border-[#b8c7dc] bg-white px-6 text-[#0066cc hover:bg-[#eef6ff] hover:text-[#0054aa] sm:w-auto"
              >
                <a href="#contact">
                  WhatsApp
                  <MessageCircle className="size-4" aria-hidden />
                </a>
              </Button>
            </div>
          </div>

          <Carousel
            setApi={setCarouselApi}
            opts={{ align: "start", loop: true }}
            className="min-w-0"
            aria-label="Arak Holdings product images"
          >
            <CarouselContent>
              {services.map((service) => (
                <CarouselItem key={service.title}>
                  <div className="flex min-h-[320px] items-center justify-center overflow-hidden rounded-2xl border border-[#edf2f8] bg-white p-4 sm:min-h-[520px] sm:p-5">
                    <Image
                      src={service.image}
                      alt={`${service.title} product image`}
                      width={900}
                      height={900}
                      priority
                      className={`mx-auto h-auto w-full rounded-xl ${service.imageClassName}`}
                    />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="left-3 border-[#dfe7f3] bg-white text-[#0066cc] hover:bg-[#eef6ff] disabled:opacity-0" />
            <CarouselNext className="right-3 border-[#dfe7f3] bg-white text-[#0066cc] hover:bg-[#eef6ff] disabled:opacity-0" />
          </Carousel>
        </section>

        <section
          id="services"
          className="border-y border-[#edf2f8] bg-white py-12 sm:py-16 md:py-20"
        >
          <div className="mx-auto max-w-6xl px-4 sm:px-5">
            <div className="max-w-2xl">
              <h2 className="text-3xl font-semibold tracking-tight text-[#223047] sm:text-4xl">
                Two ways to reach customers.
              </h2>
              <p className="mt-4 leading-7 text-[#5d6a7c]">
                Rent the hardware, choose the location, and let the product
                carry the brand.
              </p>
            </div>

            <div className="mt-10 grid gap-8 md:grid-cols-2">
              {services.map((service) => (
                <article
                  key={service.title}
                  className="border-t border-[#edf2f8] pt-6"
                >
                  <div
                    className={`mb-4 h-1.5 w-12 rounded-full ${service.accent}`}
                  />
                  <h3 className="text-2xl font-semibold tracking-tight text-[#223047]">
                    {service.title}
                  </h3>
                  <p className="mt-3 max-w-md leading-7 text-[#5d6a7c]">
                    {service.description}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto grid max-w-6xl gap-8 px-4 py-12 sm:px-5 sm:py-16 md:grid-cols-[0.9fr_1.1fr] md:items-start md:py-20">
          <div>
            <h2 className="text-3xl font-semibold tracking-tight text-[#223047] sm:text-4xl">
              Simple setup. Clear follow-up.
            </h2>
            <p className="mt-4 leading-7 text-[#5d6a7c]">
              We keep the process short so you can move from interest to
              placement quickly.
            </p>
          </div>
          <div className="grid gap-4">
            {highlights.map((item) => (
              <div
                key={item}
                className="flex gap-4 border-b border-[#edf2f8] pb-4 last:border-b-0"
              >
                <PackageCheck
                  className="mt-1 size-5 shrink-0 text-[#149447]"
                  aria-hidden
                />
                <p className="leading-7 text-[#5d6a7c]">{item}</p>
              </div>
            ))}
            <Button
              asChild
              variant="link"
              className="mt-2 h-auto w-fit justify-start px-0 text-[#0066cc] hover:text-[#0054aa]"
            >
              <Link href="/spin-to-win">
                View Spin to Win
                <ArrowRight className="size-4" aria-hidden />
              </Link>
            </Button>
          </div>
        </section>

        <section
          id="contact"
          className="border-t border-[#edf2f8] bg-white py-12 sm:py-16 md:py-20"
        >
          <div className="mx-auto grid max-w-6xl gap-8 px-4 sm:px-5 lg:grid-cols-[0.85fr_1.15fr]">
            <div>
              <h2 className="text-3xl font-semibold tracking-tight text-[#223047] sm:text-4xl">
                Tell us what you want to place.
              </h2>
              <div className="mt-8 grid gap-5 text-sm text-[#5d6a7c]">
                <a
                  href={`mailto:${contactDetails.email}`}
                  className="flex items-center gap-3 break-all transition-colors hover:text-[#0066cc]"
                >
                  <Mail className="size-5 text-[#0066cc]" aria-hidden />
                  {contactDetails.email}
                </a>
                <p className="flex items-start gap-3">
                  <MapPin
                    className="mt-0.5 size-5 shrink-0 text-[#e31b23]"
                    aria-hidden
                  />
                  {contactDetails.address}
                </p>
              </div>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Button
                  variant="default"
                  className="w-full rounded-full text-white sm:w-auto"
                >
                  WhatsApp
                </Button>
                <Button
                  variant="outline"
                  className="w-full rounded-full  sm:w-auto"
                >
                  <a href={`mailto:${contactDetails.email}`}>Email</a>
                </Button>
              </div>
            </div>

            <div className="rounded-2xl border border-[#edf2f8] bg-white p-4 sm:p-8">
              <div className="mb-6">
                <h3 className="text-2xl font-semibold tracking-tight text-[#223047]">
                  Send an inquiry
                </h3>
                <p className="mt-2 text-sm text-[#5d6a7c]">
                  We will use these details to follow up with you.
                </p>
              </div>
              <LandingInquiryForm />
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-[#edf2f8] bg-white py-10">
        <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 text-sm text-[#5d6a7c] sm:px-5 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="font-semibold text-[#223047]">Arak Holdings</p>
            <p className="mt-1">{contactDetails.address}</p>
          </div>
          <div className="flex flex-wrap gap-x-5 gap-y-2">
            <a
              href={`mailto:${contactDetails.email}`}
              className="transition-colors hover:text-[#0066cc]"
            >
              {contactDetails.email}
            </a>
            <p>© 2026 Arak Holdings</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
