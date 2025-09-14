"use client";

import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { useEffect } from "react";

export default function HomePage() {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, align: "start" },
    [Autoplay({ delay: 4000 })] // autoplay every 4s
  );

  useEffect(() => {
    if (emblaApi) {
      console.log("Embla loaded", emblaApi);
    }
  }, [emblaApi]);

  return (
    <div
      className="overflow-hidden w-full h-[400px] sm:h-[500px] rounded-2xl shadow-xl relative"
      ref={emblaRef}
    >
      <div className="flex transition-transform">
        {/* Slide 1 */}
        <div className="flex-[0_0_100%] relative">
          <img
            src="https://cdn.pixabay.com/photo/2018/01/14/23/12/nature-3082832_1280.jpg"
            alt="Nature"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
            <h2 className="text-3xl sm:text-5xl font-bold text-white drop-shadow-lg">
              Beautiful Nature
            </h2>
          </div>
        </div>

        {/* Slide 2 */}
        <div className="flex-[0_0_100%] relative">
          <img
            src="https://cdn.pixabay.com/photo/2012/12/09/00/16/abstract-69124_1280.jpg"
            alt="Technology"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
            <h2 className="text-3xl sm:text-5xl font-bold text-white drop-shadow-lg">
              Futuristic Tech
            </h2>
          </div>
        </div>

        {/* Slide 3 */}
        <div className="flex-[0_0_100%] relative">
          <img
            src="https://cdn.pixabay.com/photo/2023/09/12/17/59/stones-8249322_1280.jpg"
            alt="City"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
            <h2 className="text-3xl sm:text-5xl font-bold text-white drop-shadow-lg">
              Stunning Cities
            </h2>
          </div>
        </div>
      </div>
    </div>
  );
}
