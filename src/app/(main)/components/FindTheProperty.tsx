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
    <section className="w-full py-20 bg-gradient-to-br from-gray-50 to-green-50 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-green-100 rounded-full translate-x-1/2 -translate-y-1/2 opacity-40"></div>
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#A4CC36] rounded-full -translate-x-1/3 translate-y-1/3 opacity-10"></div>

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        {/* Heading & Paragraph */}
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-2 bg-[#A4CC36] text-white rounded-full text-sm font-medium mb-4">
            Explore By Location
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
            Find Properties By <span className="text-[#164C36]">City</span>
          </h2>
          <p className="text-gray-600 text-lg max-w-3xl mx-auto leading-relaxed">
            Discover amazing properties in the most popular cities and find your
            perfect match with our curated selection.
          </p>
        </div>

        {/* Marquee Container */}
        {loading ? (
          <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#A4CC36]" />
          </div>
        ) : (
          <div className="relative">
            <div
              className="relative overflow-hidden py-4"
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => setIsPaused(false)}
            >
              <div
                ref={marqueeRef}
                className="flex gap-6 will-change-transform"
                style={{ width: "max-content" }}
              >
                {duplicatedCities.map((city, idx) => (
                  <CityCard key={`${city._id}-${idx}`} city={city} />
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Bottom CTA */}
        <div className="text-center mt-12">
          <button className="px-8 py-4 bg-gradient-to-r from-[#164C36] to-[#A4CC36] text-white rounded-xl font-semibold hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300 shadow-md">
            View All Cities
          </button>
        </div>
      </div>
    </section>
  );
};

// Card Component
const CityCard = ({ city }: { city: City }) => {
  return (
    <div className="group relative flex-shrink-0 w-64 h-96 rounded-2xl overflow-hidden cursor-pointer shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-gray-100">
      {/* Image */}
      <div
        className="w-full h-full bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
        style={{
          backgroundImage: `url(${city.image || "/images/placeholder.jpg"})`,
        }}
      />

      {/* Dark Overlay for better text readability */}
      <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors duration-500"></div>

      {/* Content */}
      <div className="absolute inset-0 flex flex-col justify-end p-6 text-center">
        {/* City Name - Always Visible */}
        <h3 className="text-white text-2xl font-bold mb-3">{city.name}</h3>

        {/* Hover Content */}
        <div className="transform translate-y-8 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500">
          {city.description && (
            <p className="text-white/90 text-sm mb-4 leading-relaxed">
              {city.description}
            </p>
          )}

          <div className="flex items-center justify-center space-x-3">
            <button className="px-6 py-2 bg-[#A4CC36] text-white text-sm font-semibold rounded-xl hover:bg-[#94b534] transition-colors shadow-lg">
              View Properties
            </button>
            <button className="p-2 bg-white/20 rounded-xl hover:bg-white/30 transition-colors shadow-lg">
              <Heart className="w-5 h-5 text-white" />
            </button>
          </div>
        </div>

        {/* Property Count Badge */}
        <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm text-white text-xs font-medium px-3 py-1 rounded-full">
          12 Properties
        </div>
      </div>

      {/* Border Glow Effect on Hover */}
      <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-[#A4CC36]/30 transition-all duration-500"></div>
    </div>
  );
};
