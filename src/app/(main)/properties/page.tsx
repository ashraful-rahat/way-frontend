// app/properties/page.tsx
"use client";

import axiosInstance from "@/utils/axios";
import { motion, Variants } from "framer-motion";
import {
  ArrowRight,
  Bed,
  DollarSign,
  Home,
  MapPin,
  Search,
  Square,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

interface Property {
  _id: string;
  projectId: string;
  name: string;
  type: "house" | "villa" | "office" | "penthouse";
  area?: number;
  rooms?: number;
  price: number;
  floor?: number;
  images?: string[];
  available: boolean;
  description?: string;
  createdAt: string;
  updatedAt: string;
  location?: string;
}

interface PropertiesApiResponse {
  status: string;
  data: Property[];
  results?: number;
}

export default function PropertiesPage() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [typeFilter, setTypeFilter] = useState<string>("all");
  const [priceFilter, setPriceFilter] = useState<string>("all");

  const fetchProperties = async () => {
    try {
      const res = await axiosInstance.get<PropertiesApiResponse>("/properties");

      if (res.data.status === "success") {
        setProperties(res.data.data || []);
      } else {
        setProperties([]);
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error(
        "Properties fetch error:",
        error.response?.data || error.message
      );
      setProperties([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProperties();
  }, []);

  // Filter properties based on search and filters
  const filteredProperties = properties.filter((property) => {
    const matchesSearch =
      property.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      property.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      property.location?.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesType = typeFilter === "all" || property.type === typeFilter;

    const matchesPrice =
      priceFilter === "all" ||
      (priceFilter === "under-100" && property.price < 100000) ||
      (priceFilter === "100-500" &&
        property.price >= 100000 &&
        property.price <= 500000) ||
      (priceFilter === "over-500" && property.price > 500000);

    return matchesSearch && matchesType && matchesPrice;
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

  // Property type icons
  const propertyIcons = {
    house: "🏠",
    villa: "🏡",
    office: "🏢",
    penthouse: "🏙️",
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-green-50 flex justify-center items-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-[#164C36] mx-auto mb-4"></div>
          <p className="text-gray-600 font-medium">
            Loading amazing properties...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen mt-24 bg-gradient-to-br from-gray-50 to-green-50">
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-green-100 rounded-full -translate-x-1/2 -translate-y-1/2 opacity-40"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#A4CC36] rounded-full translate-x-1/3 translate-y-1/3 opacity-10"></div>

      <div className="max-w-7xl mx-auto px-4 py-16 relative z-10">
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
            🏘️ Premium Properties
          </motion.span>
          <h1 className="text-5xl md:text-6xl font-bold mb-6 text-gray-900">
            Featured <span className="text-[#164C36]">Properties</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Discover our exclusive collection of premium properties including
            houses, villas, offices, and penthouses designed for luxurious
            living and working.
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
              placeholder="Search properties by name, location, or description..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-4 bg-white rounded-2xl border border-gray-200 focus:border-[#A4CC36] focus:ring-2 focus:ring-[#A4CC36]/20 transition-all duration-300 shadow-lg"
            />
          </div>

          {/* Filters */}
          <div className="flex gap-2 flex-wrap">
            {/* Type Filter */}
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="px-6 py-4 bg-white rounded-2xl border border-gray-200 focus:border-[#A4CC36] focus:ring-2 focus:ring-[#A4CC36]/20 transition-all duration-300 font-semibold"
            >
              <option value="all">All Types</option>
              <option value="house">House</option>
              <option value="villa">Villa</option>
              <option value="office">Office</option>
              <option value="penthouse">Penthouse</option>
            </select>

            {/* Price Filter */}
            <select
              value={priceFilter}
              onChange={(e) => setPriceFilter(e.target.value)}
              className="px-6 py-4 bg-white rounded-2xl border border-gray-200 focus:border-[#A4CC36] focus:ring-2 focus:ring-[#A4CC36]/20 transition-all duration-300 font-semibold"
            >
              <option value="all">Any Price</option>
              <option value="under-100">Under $100K</option>
              <option value="100-500">$100K - $500K</option>
              <option value="over-500">Over $500K</option>
            </select>
          </div>
        </motion.div>

        {/* Properties Grid */}
        {!filteredProperties.length ? (
          <motion.div
            className="text-center py-20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <div className="w-32 h-32 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-6">
              <Home className="w-16 h-16 text-gray-400" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-3">
              No Properties Found
            </h3>
            <p className="text-gray-600 max-w-md mx-auto">
              Try adjusting your search criteria or filters to find your perfect
              property.
            </p>
          </motion.div>
        ) : (
          <motion.div
            className="grid gap-8 md:grid-cols-2 lg:grid-cols-3"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {filteredProperties.map((property) => (
              <motion.div
                key={property._id}
                variants={itemVariants}
                className="group"
              >
                <Link href={`/properties/${property._id}`}>
                  <div className="bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100 group-hover:scale-105">
                    {/* Image Section */}
                    <div className="relative h-64 overflow-hidden">
                      {property.images && property.images.length > 0 ? (
                        <Image
                          src={property.images[0]}
                          alt={property.name}
                          fill
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          className="object-cover group-hover:scale-110 transition-transform duration-700"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
                          <div className="text-center">
                            <div className="w-16 h-16 bg-gray-400 rounded-full flex items-center justify-center mx-auto mb-3">
                              <span className="text-white text-2xl">
                                {propertyIcons[property.type]}
                              </span>
                            </div>
                            <p className="text-gray-500 font-medium">
                              Property Image
                            </p>
                          </div>
                        </div>
                      )}

                      {/* Availability Badge */}
                      <div className="absolute top-4 left-4">
                        <span
                          className={`px-3 py-1.5 rounded-full text-white text-xs font-bold shadow-lg ${
                            property.available ? "bg-green-500" : "bg-red-500"
                          }`}
                        >
                          {property.available ? "Available" : "Sold Out"}
                        </span>
                      </div>

                      {/* Type Badge */}
                      <div className="absolute top-4 right-4">
                        <span className="px-3 py-1.5 bg-[#A4CC36] rounded-full text-white text-xs font-bold shadow-lg capitalize">
                          {property.type}
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
                        {property.name}
                      </h3>

                      {property.location && (
                        <div className="flex items-center gap-2 text-gray-600 mb-3">
                          <MapPin size={16} className="text-[#A4CC36]" />
                          <span className="text-sm">{property.location}</span>
                        </div>
                      )}

                      {property.description && (
                        <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-2">
                          {property.description}
                        </p>
                      )}

                      {/* Property Specifications */}
                      <div className="grid grid-cols-3 gap-4 mb-4">
                        {property.area && (
                          <div className="text-center">
                            <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center mx-auto mb-2">
                              <Square size={18} className="text-[#164C36]" />
                            </div>
                            <p className="text-xs text-gray-600">Area</p>
                            <p className="font-semibold text-gray-900">
                              {property.area} sq.ft
                            </p>
                          </div>
                        )}

                        {property.rooms && (
                          <div className="text-center">
                            <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-2">
                              <Bed size={18} className="text-[#164C36]" />
                            </div>
                            <p className="text-xs text-gray-600">Rooms</p>
                            <p className="font-semibold text-gray-900">
                              {property.rooms}
                            </p>
                          </div>
                        )}

                        <div className="text-center">
                          <div className="w-10 h-10 bg-yellow-100 rounded-xl flex items-center justify-center mx-auto mb-2">
                            <DollarSign size={18} className="text-[#164C36]" />
                          </div>
                          <p className="text-xs text-gray-600">Price</p>
                          <p className="font-semibold text-gray-900">
                            ${property.price.toLocaleString()}
                          </p>
                        </div>
                      </div>

                      {/* Additional Info */}
                      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                          <span className="capitalize">{property.type}</span>
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
              Can&apos;t Find Your Perfect Property?
            </h2>
            <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto">
              Contact our expert team to get personalized recommendations and
              schedule property visits.
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
