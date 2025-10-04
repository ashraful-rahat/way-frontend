"use client";

import { useState } from "react";

interface QuickSearchProps {
  onSearch: (filters: {
    location?: string;
    type?: string;
    rooms?: number;
    maxPrice?: number;
  }) => void;
}

export const QuickSearch: React.FC<QuickSearchProps> = ({ onSearch }) => {
  const [location, setLocation] = useState("");
  const [type, setType] = useState("");
  const [rooms, setRooms] = useState<number | "">("");
  const [maxPrice, setMaxPrice] = useState<number | "">("");

  const handleSearch = () => {
    onSearch({
      location: location || undefined,
      type: type || undefined,
      rooms: rooms || undefined,
      maxPrice: maxPrice || undefined,
    });
  };

  return (
    <div className="w-full bg-[#f2f2f2] py-10 px-6 rounded-2xl shadow-md max-w-7xl mx-auto mt-10">
      <h2 className="text-3xl font-bold text-gray-800 text-center mb-6">
        Find Your Dream Property
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {/* Location */}
        <div>
          <input
            type="text"
            placeholder="Location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#A4CC40]"
          />
        </div>

        {/* Property Type */}
        <div>
          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#A4CC40]"
          >
            <option value="">Property Type</option>
            <option value="house">House</option>
            <option value="villa">Villa</option>
            <option value="office">Office</option>
            <option value="penthouse">Penthouse</option>
            <option value="apartment">Apartment</option>
          </select>
        </div>

        {/* Rooms */}
        <div>
          <select
            value={rooms}
            onChange={(e) => setRooms(Number(e.target.value))}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#A4CC40]"
          >
            <option value="">Rooms</option>
            <option value={1}>1</option>
            <option value={2}>2</option>
            <option value={3}>3</option>
            <option value={4}>4+</option>
          </select>
        </div>

        {/* Max Price */}
        <div>
          <input
            type="number"
            placeholder="Max Price"
            value={maxPrice}
            onChange={(e) => setMaxPrice(Number(e.target.value))}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#A4CC40]"
          />
        </div>
      </div>

      <div className="mt-6 text-center">
        <button
          onClick={handleSearch}
          className="px-8 py-3 bg-[#A4CC40] text-white font-bold rounded-xl shadow hover:bg-[#94b534] transition-colors"
        >
          Search
        </button>
      </div>
    </div>
  );
};
