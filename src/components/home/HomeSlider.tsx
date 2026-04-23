import React, { useEffect, useState } from "react";
import { Carousel, CarouselContent, CarouselItem, type CarouselApi } from "@/components/ui/carousel";
import img1 from "@/assets/1.jpeg";
import img2 from "@/assets/2.jpeg";
import img3 from "@/assets/3.jpeg";
import img4 from "@/assets/4.jpeg";
import img5 from "@/assets/5.jpeg";
import img6 from "@/assets/6.png";

const images = [img1, img2, img3, img4, img5, img6];

const HomeSlider = () => {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!api) return;

    setCurrent(api.selectedScrollSnap());

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });

    const intervalId = setInterval(() => {
      api.scrollNext();
    }, 4000);

    return () => clearInterval(intervalId);
  }, [api]);

  return (
    <section className="relative w-full pb-4 animate-fade-in overflow-hidden bg-[#F4F9FF]">
      <div className="w-full lg:max-w-[1500px] lg:mx-auto lg:px-4">
        <Carousel 
          setApi={setApi}
          opts={{ 
            loop: true,
            align: "start",
            duration: 40,
          }}
          className="w-full relative group"
        >
          <CarouselContent className="-ml-0 lg:-ml-4">
            {images.map((img, index) => (
              <CarouselItem key={index} className="pl-0 lg:pl-4">
                <div className="relative w-full overflow-hidden shadow-sm lg:rounded-[2.5rem] lg:shadow-2xl lg:border-[6px] lg:border-white bg-[#F4F9FF] group/banner">
                  <img 
                    src={img} 
                    alt={`Banner ${index + 1}`} 
                    className="w-full h-auto lg:max-h-[680px] object-contain block mx-auto transition-all duration-1000 ease-in-out group-hover/banner:scale-[1.02]"
                    loading={index === 0 ? "eager" : "lazy"}
                  />
                  
                  {/* Subtle Glass Overlay on Hover */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-[#003B73]/10 to-transparent opacity-0 group-hover/banner:opacity-100 transition-opacity duration-700 pointer-events-none" />
                  
                  {/* Premium Inner Glow */}
                  <div className="absolute inset-0 shadow-[inset_0_0_80px_rgba(255,255,255,0.2)] pointer-events-none" />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          
          {/* Enhanced Navigation Dots - Floating Glass Style */}
          <div className="absolute bottom-6 lg:bottom-10 left-0 right-0 flex justify-center gap-3 z-20">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => api?.scrollTo(index)}
                className={`h-2.5 rounded-full backdrop-blur-md transition-all duration-500 ${
                  current === index 
                    ? "bg-[#003B73] w-14 shadow-lg shadow-[#003B73]/20" 
                    : "bg-[#003B73]/20 lg:bg-white/60 w-2.5 hover:bg-white hover:scale-125"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </Carousel>
      </div>
    </section>
  );
};

export default HomeSlider;
