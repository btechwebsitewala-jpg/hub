import * as React from "react"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel"

import banner1 from "@/assets/banner-blood-collection.png"
import banner2 from "@/assets/banner-home-collection.png"
import banner3 from "@/assets/banner-full-body.png"
import banner4 from "@/assets/banner-urine-test.png"

const banners = [banner1, banner2, banner3, banner4]

export function BannerCarousel() {
  const [api, setApi] = React.useState<CarouselApi>()

  React.useEffect(() => {
    if (!api) return

    const interval = setInterval(() => {
      api.scrollNext()
    }, 4000)

    return () => clearInterval(interval)
  }, [api])

  return (
    <Carousel
      setApi={setApi}
      className="w-full mb-8"
      opts={{
        loop: true,
      }}
    >
      <CarouselContent>
        {banners.map((src, index) => (
          <CarouselItem key={index} className="pl-0">
            <div className="relative overflow-hidden bg-slate-100 rounded-xl md:rounded-2xl shadow-sm border border-slate-200/50">
              <img 
                src={src} 
                alt={`Banner ${index + 1}`} 
                className="w-full h-full object-cover aspect-[16/9] sm:aspect-[21/9] lg:aspect-[4/1] transition-all hover:scale-[1.02] duration-700"
                loading="eager"
              />
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  )
}
