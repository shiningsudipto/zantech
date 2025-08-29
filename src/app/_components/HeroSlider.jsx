"use client";
import img1 from "@/asstes/hero/3d-printer.webp";
import img2 from "@/asstes/hero/custom-project.webp";
import img3 from "@/asstes/hero/delivery.webp";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";
import Autoplay from "embla-carousel-autoplay";
import { useRef } from "react";

const heroImages = [
  {
    src: img1,
    alt: "3D Printer, Zantech",
  },
  {
    src: img2,
    alt: "Custom Project, Zantech",
  },
  {
    src: img3,
    alt: "Delivery Service, Zantech",
  },
];

const HeroSlider = () => {
  const plugin = useRef(Autoplay({ delay: 3000, stopOnInteraction: true }));
  return (
    <div>
      <Carousel
        className="w-full"
        opts={{
          align: "center",
          loop: true,
        }}
        plugins={[plugin.current]}
        // onMouseEnter={plugin.current.stop}
        // onMouseLeave={plugin.current.reset}
      >
        <CarouselContent>
          {heroImages.map((item, index) => (
            <CarouselItem
              key={index}
              className="flex items-center justify-center"
            >
              <Image
                src={item.src}
                alt={item.alt}
                height={600}
                width={800}
                className="h-[550px] object-cover"
              />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
};

export default HeroSlider;
