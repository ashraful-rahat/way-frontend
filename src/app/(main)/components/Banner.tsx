"use client";

import axios from "@/utils/axios";
import Image from "next/image";
import { useEffect, useState } from "react";

interface City {
  _id: string;
  name: string;
}

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
    image: "/images/banner1.jpg",
  },
  {
    id: "2",
    title: "Design that Inspires",
    subtitle: "Architecture & interiors that speak quality.",
    ctaText: "View Residences",
    ctaHref: "#residences",
    image: "/images/banner2.jpg",
  },
  {
    id: "3",
    title: "Investment Opportunities",
    subtitle: "Smart investments in prime locations.",
    ctaText: "Get in Touch",
    ctaHref: "#contact",
    image: "/images/banner3.jpg",
  },
];

export default function BannerWithSearch() {
  const [index, setIndex] = useState(0);
  const [cities, setCities] = useState<City[]>([]);
  const [location, setLocation] = useState("");
  const [type, setType] = useState("");
  const [rooms, setRooms] = useState<number | "">("");
  const [maxPrice, setMaxPrice] = useState<number | "">("");

  // Slide rotation
  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % defaultSlides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  // Fetch cities dynamically
  useEffect(() => {
    const fetchCities = async () => {
      try {
        const res = await axios.get("/cities");
        setCities((res.data as { data: City[] }).data || []);
      } catch (err) {
        console.error("Failed to fetch cities:", err);
      }
    };
    fetchCities();
  }, []);

  const handleSearch = () => {
    const filters = {
      location: location || undefined,
      type: type || undefined,
      rooms: rooms || undefined,
      maxPrice: maxPrice || undefined,
    };
    console.log("Search filters:", filters);
    // API call or navigation
  };

  const slide = defaultSlides[index];

  return (
    <div className="relative w-full h-[900px] overflow-hidden">
      {/* Banner image */}
      <div className="absolute inset-0">
        <Image
          src={slide.image}
          alt={slide.title}
          fill
          className="object-cover"
          priority
        />
      </div>
      <div className="absolute inset-0 bg-black/50" />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white px-4">
        <h1 className="text-4xl sm:text-5xl font-extrabold mb-4 drop-shadow-lg">
          {slide.title}
        </h1>
        <p className="text-lg sm:text-xl font-light mb-8 drop-shadow-lg">
          {slide.subtitle}
        </p>

        {/* Enhanced Glass Search Form */}
        <div className="w-full max-w-6xl p-8 bg-white/10 backdrop-blur-xl rounded-3xl shadow-xl border border-white/20 hover:shadow-2xl transition-all duration-300">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Location */}
            <select
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-white text-gray-900 placeholder-gray-400 shadow-inner focus:outline-none focus:ring-2 focus:ring-[#A4CC40] transition"
            >
              <option value="">Select Location</option>
              {cities.map((city) => (
                <option key={city._id} value={city.name}>
                  {city.name}
                </option>
              ))}
            </select>

            {/* Property Type */}
            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-white text-gray-900 shadow-inner focus:outline-none focus:ring-2 focus:ring-[#A4CC40] transition"
            >
              <option value="">Property Type</option>
              <option value="house">House</option>
              <option value="villa">Villa</option>
              <option value="office">Office</option>
              <option value="penthouse">Penthouse</option>
              <option value="apartment">Apartment</option>
            </select>

            {/* Rooms */}
            <select
              value={rooms}
              onChange={(e) => setRooms(Number(e.target.value))}
              className="w-full px-4 py-3 rounded-xl bg-white text-gray-900 shadow-inner focus:outline-none focus:ring-2 focus:ring-[#A4CC40] transition"
            >
              <option value="">Rooms</option>
              <option value={1}>1 Room</option>
              <option value={2}>2 Rooms</option>
              <option value={3}>3 Rooms</option>
              <option value={4}>4+ Rooms</option>
            </select>

            {/* Max Price */}
            <input
              type="number"
              placeholder="Max Price"
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="w-full px-4 py-3 rounded-xl bg-white text-gray-900 placeholder-gray-400 shadow-inner focus:outline-none focus:ring-2 focus:ring-[#A4CC40] transition"
            />
          </div>

          <div className="mt-6 text-center">
            <button
              onClick={handleSearch}
              className="px-10 py-4 bg-gradient-to-r from-[#A4CC40] to-[#7AB800] text-white font-bold rounded-2xl shadow-lg hover:scale-105 transition-transform duration-300"
            >
              Search Properties
            </button>
          </div>
        </div>

        {/* CTA button */}
        <a
          href={slide.ctaHref}
          className="mt-8 px-8 py-4 bg-white text-gray-900 rounded-full font-semibold shadow hover:shadow-lg hover:scale-105 transition-transform duration-300"
        >
          {slide.ctaText}
        </a>
      </div>

      {/* Dots */}
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
