"use client";

import axiosInstance from "@/utils/axios";
import { Heart } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { toast } from "react-hot-toast";

// Frontend-only City type
type City = {
  _id: string;
  name: string;
  image?: string;
  description?: string;
};

export const FindTheProperty = () => {
  const [cities, setCities] = useState<City[]>([]);
  const [loading, setLoading] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const marqueeRef = useRef<HTMLDivElement>(null);

  // Fetch cities
  const fetchCities = async () => {
    setLoading(true);
    try {
      const res = await axiosInstance.get<{ data: City[] }>("/cities");
      setCities(res.data.data);
    } catch (err) {
      console.error(err);
      toast.error("Cities load failed");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCities();
  }, []);

  // Marquee Animation
  useEffect(() => {
    const container = marqueeRef.current;
    if (!container || cities.length === 0) return;

    let scrollPos = 0;
    const speed = 0.5;

    const animate = () => {
      if (!isPaused) {
        scrollPos -= speed;
        const containerWidth = container.scrollWidth / 2;
        if (Math.abs(scrollPos) >= containerWidth) scrollPos = 0;
        container.style.transform = `translateX(${scrollPos}px)`;
      }
      requestAnimationFrame(animate);
    };

    animate();
  }, [isPaused, cities]);

  // Duplicate cities for marquee
  const duplicatedCities = [...cities, ...cities];

  return (
    <section className="w-full py-16 bg-gray-50">
      {/* Heading & Paragraph */}
      <div className="text-center px-4 md:px-8 lg:px-16 mb-12">
        <h2 className="text-4xl font-bold mb-4 text-gray-800 bg-clip-text ">
          Explore Properties By City
        </h2>
        <p className="text-gray-700 text-lg max-w-3xl mx-auto">
          Discover amazing properties in the most popular cities and find your
          perfect match.
        </p>
      </div>

      {/* Marquee */}
      {loading ? (
        <div className="flex justify-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#A4CC36]" />
        </div>
      ) : (
        <div
          className="relative overflow-hidden"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div
            ref={marqueeRef}
            className="flex space-x-4 py-4 will-change-transform"
          >
            {duplicatedCities.map((city, idx) => (
              <CityCard key={`${city._id}-${idx}`} city={city} />
            ))}
          </div>
        </div>
      )}
    </section>
  );
};

// Card Component
const CityCard = ({ city }: { city: City }) => {
  return (
    <div className="group relative flex-shrink-0 w-56 h-80 rounded-2xl overflow-hidden cursor-pointer shadow-lg">
      {/* Image */}
      <div
        className="w-full h-full bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
        style={{
          backgroundImage: `url(${city.image || "/images/placeholder.jpg"})`,
        }}
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/30 group-hover:bg-black/50 transition-colors duration-500"></div>

      {/* Content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center px-4 text-center pointer-events-none">
        {/* City Name always visible, bold white */}
        <h3 className="text-white text-2xl font-bold z-10">{city.name}</h3>

        {/* Hover content */}
        <div className="absolute bottom-4 flex flex-col items-center opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500 z-10 pointer-events-auto">
          {city.description && (
            <p className="text-white text-sm mb-2">{city.description}</p>
          )}
          <button className="px-4 py-1 bg-[#A4CC36] text-white text-xs font-semibold rounded-xl hover:bg-[#94b534] transition-colors mb-2">
            View Properties
          </button>
          <button className="p-2 bg-white/20 rounded-full hover:bg-white/30 transition-colors">
            <Heart className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
