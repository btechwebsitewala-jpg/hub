import * as React from "react"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel"

import banner1 from "@/assets/banner-blood-collection.png"
import banner2 from "@/assets/banner-home-collection.png"
import banner3 from "@/assets/banner-full-body.png"
import banner4 from "@/assets/banner-urine-test.png"

const banners = [banner1, banner2, banner3, banner4]

export function BannerCarousel() {
  return (
    <Carousel
      className="w-full mb-8"
    >
      <CarouselContent>
        {banners.map((src, index) => (
          <CarouselItem key={index}>
            <div className="overflow-hidden rounded-2xl border shadow-sm">
              <img 
                src={src} 
                alt={`Banner ${index + 1}`} 
                className="w-full h-auto object-cover aspect-[21/9] sm:aspect-[3/1]"
              />
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  )
}
