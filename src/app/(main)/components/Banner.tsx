"use client";

import { useEffect, useState } from "react";

type Slide = {
  id: string;
  title: string;
  subtitle: string;
  ctaText: string;
  ctaHref: string;
  image: string;
};

const defaultSlides: Slide[] = [
  {
    id: "1",
    title: "Modern Luxury Living",
    subtitle: "Exceptional homes crafted for inspired living.",
    ctaText: "Explore Projects",
    ctaHref: "#projects",
    image: "/images/banner1.jpg", // 👈 লোকাল ইমেজ
  },
  {
    id: "2",
    title: "Design that Inspires",
    subtitle: "Architecture & interiors that speak quality.",
    ctaText: "View Residences",
    ctaHref: "#residences",
    image: "/images/banner2.jpg", // 👈 লোকাল ইমেজ
  },
  {
    id: "3",
    title: "Investment Opportunities",
    subtitle: "Smart investments in prime locations.",
    ctaText: "Get in Touch",
    ctaHref: "#contact",
    image: "/images/banner3.jpg", // 👈 লোকাল ইমেজ
  },
];

export default function BannerCarousel() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % defaultSlides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const slide = defaultSlides[index];

  return (
    <div className="relative w-full h-[960px] overflow-hidden">
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center transition-all duration-700"
        style={{ backgroundImage: `url(${slide.image})` }}
      />
      <div className="absolute inset-0 bg-black/50" />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white px-4">
        <h1 className="text-4xl sm:text-5xl font-extrabold mb-4">
          {slide.title}
        </h1>
        <p className="text-lg sm:text-xl font-light mb-6">{slide.subtitle}</p>
        <a
          href={slide.ctaHref}
          className="px-6 py-3 bg-white text-gray-900 rounded-full font-semibold shadow hover:bg-gray-200"
        >
          {slide.ctaText}
        </a>
      </div>

      {/* Dots indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-10">
        {defaultSlides.map((s, i) => (
          <button
            key={s.id}
            onClick={() => setIndex(i)}
            className={`w-3 h-3 rounded-full ${
              i === index ? "bg-white" : "bg-white/50"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
