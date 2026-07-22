"use client";

import {
  Carousel, 
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/src/components/ui/carousel";

import { Card, CardContent } from "@/src/components/ui/card";
import messages from "@/src/messgaes.json";
import Autoplay from "embla-carousel-autoplay";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <section className="mb-8 text-center md:mb-12">
        <h1 className="mb-4 text-3xl font-bold">
          Dive Into the World of Anonymous Messaging: Connect, Share, and
          Discover with MysteryGuest!
        </h1>

        <p>
          Explore Mystery Message — where your identity remains a secret.
        </p>
      </section>

      <Carousel
        className="w-full max-w-4xl"
        plugins={[Autoplay({ delay: 3000 })]}
      >
        <CarouselContent>
          {messages.map((item, index) => (
            <CarouselItem key={index}>
              <Card>
                <CardContent className="flex min-h-[200px] items-center justify-center p-6">
                  <p className="text-center text-md">{item.message}</p>
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>

        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </main>
  );
}