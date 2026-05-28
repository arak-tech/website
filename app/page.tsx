"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  BarChart3,
  Building2,
  Check,
  Mail,
  MapPin,
  Route,
  Sparkles,
  Store,
} from "lucide-react";

import { LandingInquiryForm } from "@/components/landing-inquiry-form";
import { SiteNavbar } from "@/components/site-navbar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import { Separator } from "@/components/ui/separator";

const contactDetails = {
  email: "info@arakholdings.com",
  address: "60 Argyle Road, Avondale, Harare",
};

const services = [
  {
    eyebrow: "Vending",
    title: "Vending machines",
    description:
      "Clean, branded placements for offices, retail spaces, gyms, schools, events, and high-traffic sites.",
    image: "/vmc.jpeg",
    imageClassName: "max-h-[360px] object-contain sm:max-h-[540px]",
    color: "bg-[linear-gradient(135deg,#ff4d4d,#f9cb28)]",
    icon: Store,
    points: ["Site matching", "Stocking support", "Brand placement"],
  },
  {
    eyebrow: "Mobile media",
    title: "LED delivery boxes",
    description:
      "Mobile advertising boxes for restaurants, fleets, launches, promotions, and street-level campaigns.",
    image: "/led-food-box.png",
    imageClassName: "max-h-[360px] object-contain sm:max-h-[540px]",
    color: "bg-[linear-gradient(135deg,#007cf0,#00dfd8)]",
    icon: Route,
    points: ["Moving reach", "LED visibility", "Campaign capture"],
  },
];

const processSteps = [
  {
    title: "Choose the format",
    description:
      "Pick vending, LED delivery box advertising, or a combined activation.",
  },
  {
    title: "Match the location",
    description:
      "We align the hardware with foot traffic, route visibility, and your campaign goal.",
  },
  {
    title: "Launch and follow up",
    description:
      "Setup, support, and lead capture keep the activation moving after launch.",
  },
];

const audiences = [
  "Restaurants",
  "Retail brands",
  "Offices",
  "Event teams",
  "Schools",
  "Gyms",
  "Fleets",
  "Promoters",
];

const proofPoints = [
  {
    label: "Placement types",
    value: "Office · Retail · Event",
  },
  {
    label: "Campaign modes",
    value: "Vend · Display · Capture",
  },
  {
    label: "Support model",
    value: "Setup · Route · Follow-up",
  },
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
    }, 4200);

    return () => window.clearInterval(interval);
  }, [carouselApi]);

  return (
    <div className="min-h-screen bg-background font-sans text-foreground">
      <SiteNavbar />

      <main>
        <section className="relative overflow-hidden border-b border-border">
          <div className="absolute inset-x-0 top-0 h-[38rem] bg-[radial-gradient(circle_at_18%_12%,#50e3c2_0,transparent_26%),radial-gradient(circle_at_58%_6%,#7928ca_0,transparent_24%),radial-gradient(circle_at_88%_18%,#ff0080_0,transparent_25%),radial-gradient(circle_at_72%_58%,#f9cb28_0,transparent_22%)] opacity-20 blur-3xl" />
          <div className="relative mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 sm:py-16 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:px-8 lg:py-24">
            <div className="flex flex-col items-start">
              <Badge variant="secondary" className="font-mono uppercase">
                Smart vending · Mobile LED media
              </Badge>
              <h1 className="mt-6 max-w-4xl text-[2.6rem] font-semibold leading-[0.98] tracking-tight sm:text-6xl lg:text-7xl">
                Put your brand where people already move.
              </h1>
              <p className="mt-6 max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg sm:leading-8">
                Arak Holdings rents vending machines and LED delivery box media
                for brands that need clean placement, street visibility, and
                direct customer response.
              </p>

              <div className="mt-8 flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
                <Button
                  asChild
                  size="lg"
                  className="min-h-12 px-6 !text-primary-foreground [&_*]:!text-primary-foreground"
                >
                  <a href="#contact">
                    Start an inquiry
                    <ArrowRight data-icon="inline-end" aria-hidden />
                  </a>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="min-h-12 bg-background px-6"
                >
                  <a href={`mailto:${contactDetails.email}`}>
                    Email Arak
                    <Mail data-icon="inline-end" aria-hidden />
                  </a>
                </Button>
              </div>

              <div className="mt-10 grid w-full gap-3 sm:grid-cols-3">
                {proofPoints.map((item) => (
                  <div key={item.label} className="border-t border-border pt-3">
                    <p className="font-mono text-xs uppercase text-muted-foreground">
                      {item.label}
                    </p>
                    <p className="mt-1 text-sm font-medium">
                      {item.value}
                    </p>
                  </div>
                ))}
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
                    <div className="relative flex min-h-[350px] items-center justify-center overflow-hidden rounded-xl border border-border bg-card p-5 shadow-[0_1px_1px_rgb(0_0_0_/_0.03),0_8px_28px_rgb(0_0_0_/_0.06)] sm:min-h-[560px] sm:p-8">
                      <Image
                        src={service.image}
                        alt={`${service.title} product image`}
                        width={900}
                        height={900}
                        priority
                        className={`mx-auto h-auto w-full ${service.imageClassName}`}
                      />
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="left-3 bg-background" />
              <CarouselNext className="right-3 bg-background" />
            </Carousel>
          </div>
        </section>

        <section id="services" className="py-14 sm:py-20 lg:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid gap-8 lg:grid-cols-[0.72fr_1.28fr] lg:items-end">
              <div>
                <p className="font-mono text-xs uppercase text-muted-foreground">
                  What you can rent
                </p>
                <h2 className="mt-3 max-w-xl text-3xl font-semibold leading-tight tracking-tight sm:text-5xl">
                  Two high-visibility channels. One simple request.
                </h2>
              </div>
              <p className="max-w-2xl text-base leading-7 text-muted-foreground lg:justify-self-end">
                Use vending machines for fixed demand, LED delivery boxes for
                moving reach, or combine both for a campaign that can sell,
                display, and capture leads.
              </p>
            </div>

            <div className="mt-10 grid gap-5 lg:grid-cols-2">
              {services.map((service) => {
                const Icon = service.icon;

                return (
                  <Card key={service.title} className="rounded-xl">
                    <CardHeader>
                      <div className="flex items-center justify-between gap-4">
                        <Badge variant="outline" className="font-mono uppercase">
                          {service.eyebrow}
                        </Badge>
                        <div className={`h-1.5 w-20 rounded-full ${service.color}`} />
                      </div>
                      <CardTitle className="mt-4 flex items-center gap-3 text-2xl font-semibold tracking-tight">
                        <Icon aria-hidden />
                        {service.title}
                      </CardTitle>
                      <CardDescription className="leading-6">
                        {service.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="grid gap-3 sm:grid-cols-3">
                        {service.points.map((point) => (
                          <div
                            key={point}
                            className="rounded-lg border border-border bg-muted/50 p-3"
                          >
                            <Check className="mb-2 text-primary" aria-hidden />
                            <p className="text-sm font-medium">{point}</p>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button asChild variant="link" className="h-auto px-0">
                        <a href="#contact">
                          Ask about {service.title}
                          <ArrowRight data-icon="inline-end" aria-hidden />
                        </a>
                      </Button>
                    </CardFooter>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        <section className="border-y border-border bg-muted/45 py-14 sm:py-20">
          <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-[0.85fr_1.15fr] lg:px-8">
            <div>
              <p className="font-mono text-xs uppercase text-muted-foreground">
                Built for
              </p>
              <h2 className="mt-3 text-3xl font-semibold leading-tight tracking-tight sm:text-5xl">
                Brands that need attention in the real world.
              </h2>
            </div>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {audiences.map((audience) => (
                <div
                  key={audience}
                  className="flex min-h-20 items-center rounded-lg border border-border bg-background px-4 text-sm font-medium"
                >
                  {audience}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="process" className="py-14 sm:py-20 lg:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl">
              <p className="font-mono text-xs uppercase text-muted-foreground">
                How it works
              </p>
              <h2 className="mt-3 text-3xl font-semibold leading-tight tracking-tight sm:text-5xl">
                Clear setup. Clear campaign handoff. Clear next step.
              </h2>
            </div>

            <div className="mt-10 grid gap-5 lg:grid-cols-3">
              {processSteps.map((step, index) => (
                <Card key={step.title} className="rounded-xl">
                  <CardHeader>
                    <Badge variant="secondary" className="w-fit font-mono uppercase">
                      Step {index + 1}
                    </Badge>
                    <CardTitle className="text-xl font-semibold tracking-tight">
                      {step.title}
                    </CardTitle>
                    <CardDescription className="leading-6">
                      {step.description}
                    </CardDescription>
                  </CardHeader>
                </Card>
              ))}
            </div>

            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <Button
                asChild
                size="lg"
                className="min-h-12 px-6 !text-primary-foreground [&_*]:!text-primary-foreground"
              >
                <a href="#contact">
                  Book a placement
                  <ArrowRight data-icon="inline-end" aria-hidden />
                </a>
              </Button>
              <Button asChild variant="outline" size="lg" className="min-h-12 px-6">
                <Link href="/spin-to-win">
                  View Spin to Win
                  <Sparkles data-icon="inline-end" aria-hidden />
                </Link>
              </Button>
            </div>
          </div>
        </section>

        <section
          id="contact"
          className="border-t border-border bg-[linear-gradient(180deg,var(--background),var(--muted))] py-14 sm:py-20 lg:py-24"
        >
          <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-[0.88fr_1.12fr] lg:px-8">
            <div>
              <Badge variant="outline" className="font-mono uppercase">
                Start here
              </Badge>
              <h2 className="mt-4 text-3xl font-semibold leading-tight tracking-tight sm:text-5xl">
                Tell us what you want to place.
              </h2>
              <p className="mt-4 max-w-xl leading-7 text-muted-foreground">
                Send the form or email us directly. We will follow up with the
                right format, location fit, and next step.
              </p>

              <div className="mt-8 grid gap-4 text-sm text-muted-foreground">
                <a
                  href={`mailto:${contactDetails.email}`}
                  className="flex items-center gap-3 break-all transition-colors hover:text-primary"
                >
                  <Mail className="text-primary" aria-hidden />
                  {contactDetails.email}
                </a>
                <p className="flex items-start gap-3">
                  <MapPin className="mt-0.5 shrink-0 text-primary" aria-hidden />
                  {contactDetails.address}
                </p>
              </div>

              <Separator className="my-8" />

              <div className="grid gap-4">
                {[
                  { icon: Building2, text: "For offices and fixed sites" },
                  { icon: BarChart3, text: "For campaign visibility" },
                  { icon: BadgeCheck, text: "For activations and lead capture" },
                ].map((item) => {
                  const Icon = item.icon;

                  return (
                    <div key={item.text} className="flex items-center gap-3">
                      <Icon className="text-primary" aria-hidden />
                      <p className="text-sm font-medium">{item.text}</p>
                    </div>
                  );
                })}
              </div>
            </div>

            <Card className="rounded-xl bg-background">
              <CardHeader>
                <CardTitle className="text-2xl font-semibold tracking-tight">
                  Send an inquiry
                </CardTitle>
                <CardDescription>
                  Complete the details below and Arak Holdings will contact you.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <LandingInquiryForm />
              </CardContent>
            </Card>
          </div>
        </section>
      </main>

      <footer className="border-t border-border bg-background py-10">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 text-sm text-muted-foreground sm:px-6 md:flex-row md:items-center md:justify-between lg:px-8">
          <div>
            <p className="font-medium text-foreground">Arak Holdings</p>
            <p className="mt-1">{contactDetails.address}</p>
          </div>
          <div className="flex flex-wrap gap-x-5 gap-y-2">
            <a
              href={`mailto:${contactDetails.email}`}
              className="transition-colors hover:text-primary"
            >
              {contactDetails.email}
            </a>
            <a
              href="#contact"
              className="transition-colors hover:text-primary"
            >
              Start an inquiry
            </a>
            <p>© 2026 Arak Holdings</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
