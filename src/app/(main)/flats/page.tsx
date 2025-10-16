// app/flats/page.tsx
"use client";

import axiosInstance from "@/utils/axios";
import { motion, Variants } from "framer-motion";
import {
  ArrowRight,
  Bed,
  Clock,
  DollarSign,
  Home,
  MapPin,
  Search,
  Square,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

interface Flat {
  _id: string;
  projectId: string;
  name: string;
  type: "apartment";
  area: number;
  rooms: number;
  price: number;
  floor?: number;
  images?: string[];
  available: boolean;
  createdAt: string;
  updatedAt: string;
  description?: string;
  location?: string;
}

interface FlatsApiResponse {
  success: boolean;
  data: Flat[];
}

export default function FlatsPage() {
  const [flats, setFlats] = useState<Flat[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [roomsFilter, setRoomsFilter] = useState<string>("all");
  const [priceFilter, setPriceFilter] = useState<string>("all");

  const fetchFlats = async () => {
    try {
      const res = await axiosInstance.get<FlatsApiResponse>("/flats");
      setFlats(res.data?.data || []);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error(
        "Flats fetch error:",
        error.response?.data || error.message
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFlats();
  }, []);

  // Filter flats based on search and filters
  const filteredFlats = flats.filter((flat) => {
    const matchesSearch =
      flat.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      flat.location?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      flat.description?.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesRooms =
      roomsFilter === "all" ||
      (roomsFilter === "1" && flat.rooms === 1) ||
      (roomsFilter === "2" && flat.rooms === 2) ||
      (roomsFilter === "3+" && flat.rooms >= 3);

    const matchesPrice =
      priceFilter === "all" ||
      (priceFilter === "under-150" && flat.price < 150000) ||
      (priceFilter === "150-200" &&
        flat.price >= 150000 &&
        flat.price <= 200000) ||
      (priceFilter === "over-200" && flat.price > 200000);

    return matchesSearch && matchesRooms && matchesPrice;
  });

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-green-50 flex justify-center items-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-[#164C36] mx-auto mb-4"></div>
          <p className="text-gray-600 font-medium">Loading amazing flats...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen mt-24 bg-gradient-to-br from-gray-50 to-green-50">
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-green-100 rounded-full -translate-x-1/2 -translate-y-1/2 opacity-40"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#A4CC36] rounded-full translate-x-1/3 translate-y-1/3 opacity-10"></div>

      <div className="max-w-7xl mx-auto px-4 mt-24 py-16 relative z-10">
        {/* Header Section */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.span
            className="inline-block px-4 py-2 bg-[#A4CC36] text-white rounded-full text-sm font-medium mb-4"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            🏠 Premium Living
          </motion.span>
          <h1 className="text-5xl md:text-6xl font-bold mb-6 text-gray-900">
            Featured <span className="text-[#164C36]">Flats</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Discover our premium collection of apartments and flats designed for
            modern living with exceptional amenities and prime locations across
            Bangladesh.
          </p>
        </motion.div>

        {/* Search and Filter Section */}
        <motion.div
          className="flex flex-col lg:flex-row gap-4 mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          {/* Search Input */}
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search flats by name, location, or description..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-4 bg-white rounded-2xl border border-gray-200 focus:border-[#A4CC36] focus:ring-2 focus:ring-[#A4CC36]/20 transition-all duration-300 shadow-lg"
            />
          </div>

          {/* Rooms Filter */}
          <div className="flex gap-2 flex-wrap">
            <select
              value={roomsFilter}
              onChange={(e) => setRoomsFilter(e.target.value)}
              className="px-6 py-4 bg-white rounded-2xl border border-gray-200 focus:border-[#A4CC36] focus:ring-2 focus:ring-[#A4CC36]/20 transition-all duration-300 font-semibold"
            >
              <option value="all">All Rooms</option>
              <option value="1">1 Room</option>
              <option value="2">2 Rooms</option>
              <option value="3+">3+ Rooms</option>
            </select>

            {/* Price Filter */}
            <select
              value={priceFilter}
              onChange={(e) => setPriceFilter(e.target.value)}
              className="px-6 py-4 bg-white rounded-2xl border border-gray-200 focus:border-[#A4CC36] focus:ring-2 focus:ring-[#A4CC36]/20 transition-all duration-300 font-semibold"
            >
              <option value="all">Any Price</option>
              <option value="under-150">Under $150K</option>
              <option value="150-200">$150K - $200K</option>
              <option value="over-200">Over $200K</option>
            </select>
          </div>
        </motion.div>

        {/* Flats Grid */}
        {!filteredFlats.length ? (
          <motion.div
            className="text-center py-20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <div className="w-32 h-32 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-6">
              <Home className="w-16 h-16 text-gray-400" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-3">
              No Flats Found
            </h3>
            <p className="text-gray-600 max-w-md mx-auto">
              Try adjusting your search criteria or filters to find your perfect
              home.
            </p>
          </motion.div>
        ) : (
          <motion.div
            className="grid gap-8 md:grid-cols-2 lg:grid-cols-3"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {filteredFlats.map((flat) => (
              <motion.div
                key={flat._id}
                variants={itemVariants}
                className="group"
              >
                <Link href={`/flats/${flat._id}`}>
                  <div className="bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100 group-hover:scale-105">
                    {/* Image Section */}
                    <div className="relative h-64 overflow-hidden">
                      {flat.images && flat.images.length > 0 ? (
                        <Image
                          src={flat.images[0]}
                          alt={flat.name}
                          fill
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          className="object-cover group-hover:scale-110 transition-transform duration-700"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
                          <div className="text-center">
                            <div className="w-16 h-16 bg-gray-400 rounded-full flex items-center justify-center mx-auto mb-3">
                              <span className="text-white text-2xl">🏢</span>
                            </div>
                            <p className="text-gray-500 font-medium">
                              Flat Image
                            </p>
                          </div>
                        </div>
                      )}

                      {/* Availability Badge */}
                      <div className="absolute top-4 left-4">
                        <span
                          className={`px-3 py-1.5 rounded-full text-white text-xs font-bold shadow-lg ${
                            flat.available ? "bg-green-500" : "bg-red-500"
                          }`}
                        >
                          {flat.available ? "Available" : "Sold Out"}
                        </span>
                      </div>

                      {/* Type Badge */}
                      <div className="absolute top-4 right-4">
                        <span className="px-3 py-1.5 bg-[#A4CC36] rounded-full text-white text-xs font-bold shadow-lg capitalize">
                          {flat.type}
                        </span>
                      </div>

                      {/* Overlay Gradient */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                      {/* View Details Button */}
                      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500">
                        <button className="px-6 py-2 bg-white text-[#164C36] rounded-xl font-semibold flex items-center gap-2 hover:bg-gray-50 transition-colors duration-300">
                          View Details
                          <ArrowRight size={16} />
                        </button>
                      </div>
                    </div>

                    {/* Content Section */}
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-[#164C36] transition-colors duration-300 line-clamp-1">
                        {flat.name}
                      </h3>

                      {flat.location && (
                        <div className="flex items-center gap-2 text-gray-600 mb-3">
                          <MapPin size={16} className="text-[#A4CC36]" />
                          <span className="text-sm">{flat.location}</span>
                        </div>
                      )}

                      {flat.description && (
                        <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-2">
                          {flat.description}
                        </p>
                      )}

                      {/* Flat Specifications */}
                      <div className="grid grid-cols-3 gap-4 mb-4">
                        <div className="text-center">
                          <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center mx-auto mb-2">
                            <Square size={18} className="text-[#164C36]" />
                          </div>
                          <p className="text-xs text-gray-600">Area</p>
                          <p className="font-semibold text-gray-900">
                            {flat.area} sq.ft
                          </p>
                        </div>

                        <div className="text-center">
                          <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-2">
                            <Bed size={18} className="text-[#164C36]" />
                          </div>
                          <p className="text-xs text-gray-600">Rooms</p>
                          <p className="font-semibold text-gray-900">
                            {flat.rooms}
                          </p>
                        </div>

                        <div className="text-center">
                          <div className="w-10 h-10 bg-yellow-100 rounded-xl flex items-center justify-center mx-auto mb-2">
                            <DollarSign size={18} className="text-[#164C36]" />
                          </div>
                          <p className="text-xs text-gray-600">Price</p>
                          <p className="font-semibold text-gray-900">
                            ${flat.price.toLocaleString()}
                          </p>
                        </div>
                      </div>

                      {/* Additional Info */}
                      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                          <Clock size={14} />
                          <span>Floor {flat.floor || "N/A"}</span>
                        </div>
                        <div className="text-[#164C36] font-semibold text-sm">
                          Explore →
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* CTA Section */}
        <motion.div
          className="text-center mt-20"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <div className="bg-gradient-to-r from-[#164C36] to-[#A4CC36] rounded-3xl p-12 text-white shadow-2xl">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Can&apos;t Find Your Perfect Flat?
            </h2>
            <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto">
              Contact our expert team to get personalized recommendations and
              schedule site visits.
            </p>
            <motion.button
              className="px-8 py-4 bg-white text-[#164C36] rounded-xl font-bold text-lg hover:shadow-2xl transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Contact Our Agent
            </motion.button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
