// components/SearchProperty.tsx
"use client";

export const SearchProperty = () => {
  return (
    <div className="w-full max-w-7xl mx-auto p-6 bg-white rounded-2xl shadow-md mt-10">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
        Find Your Dream Property
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {/* Location */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">
            Location
          </label>
          <input
            type="text"
            placeholder="City, Area, Zip"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#A4CC40] focus:border-transparent"
          />
        </div>

        {/* Property Type */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">
            Property Type
          </label>
          <select className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#A4CC40] focus:border-transparent">
            <option>Apartment</option>
            <option>House</option>
            <option>Villa</option>
            <option>Office</option>
          </select>
        </div>

        {/* Price Range */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">
            Price Range
          </label>
          <input
            type="text"
            placeholder="$1000 - $5000"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#A4CC40] focus:border-transparent"
          />
        </div>

        {/* Bedrooms */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">
            Bedrooms
          </label>
          <select className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#A4CC40] focus:border-transparent">
            <option>1</option>
            <option>2</option>
            <option>3</option>
            <option>4+</option>
          </select>
        </div>
      </div>

      {/* Search Button */}
      <div className="mt-6 text-center">
        <button className="px-8 py-3 bg-[#A4CC40] text-white font-bold rounded-xl shadow hover:bg-[#94b534] transition-colors">
          Search
        </button>
      </div>
    </div>
  );
};
