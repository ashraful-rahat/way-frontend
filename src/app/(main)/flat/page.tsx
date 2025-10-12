"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import axiosInstance from "@/utils/axios";
import { motion, Variants } from "framer-motion";
import { 
  MapPin, 
  BedDouble,
  Bath,
  Square,
  Star, 
  ArrowRight,
  Search,
  Home
} from "lucide-react";

interface Flat {
  _id: string;
  projectId: string;
  title: string;
  description?: string;
  location?: string;
  price: number;
  bedrooms: number;
  bathrooms: number;
  area: number;
  isFeatured: boolean;
  status: "available" | "sold" | "reserved";
  mainImage?: string;
  galleryImages?: string[];
  amenities?: string[];
  createdAt: string;
  updatedAt: string;
}

interface FlatsApiResponse {
  success: boolean;
  data: Flat[];
}

export default function FlatsPage() {
  const [flats, setFlats] = useState<Flat[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [bedroomFilter, setBedroomFilter] = useState<string>("all");

  const fetchFlats = async () => {
    try {
      const res = await axiosInstance.get<FlatsApiResponse>("/flats");
      setFlats(res.data?.data || []);
    } catch (error: any) {
      console.error("Flat fetch error:", error.response?.data || error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFlats();
  }, []);

  // Filter flats based on search and status
  const filteredFlats = flats.filter(flat => {
   const matchesSearch =
  flat.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
  flat.location?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || flat.status === statusFilter;
    const matchesBedroom = bedroomFilter === "all" || flat.bedrooms.toString() === bedroomFilter;
    
    return matchesSearch && matchesStatus && matchesBedroom;
  });

  const containerVariants :Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants :Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 flex justify-center items-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-[#4F46E5] mx-auto mb-4"></div>
          <p className="text-gray-600 font-medium">Loading amazing flats...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen mt-24 bg-gradient-to-br from-blue-50 to-indigo-50">
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-blue-100 rounded-full -translate-x-1/2 -translate-y-1/2 opacity-40"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#4F46E5] rounded-full translate-x-1/3 translate-y-1/3 opacity-10"></div>

      <div className="max-w-7xl mx-auto px-4 py-16 relative z-10">
        {/* Header Section */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.span
            className="inline-block px-4 py-2 bg-[#4F46E5] text-white rounded-full text-sm font-medium mb-4"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            🏠 Premium Flats
          </motion.span>
          <h1 className="text-5xl md:text-6xl font-bold mb-6 text-gray-900">
            Find Your <span className="text-[#4F46E5]">Dream Home</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Discover our premium collection of flats with modern amenities, 
            strategic locations, and exceptional value across Bangladesh.
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
              placeholder="Search flats by title or location..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-4 bg-white rounded-2xl border border-gray-200 focus:border-[#4F46E5] focus:ring-2 focus:ring-[#4F46E5]/20 transition-all duration-300 shadow-lg"
            />
          </div>

          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-2">
            {/* Status Filter */}
            <div className="flex gap-2">
              {["all", "available", "sold", "reserved"].map((status) => (
                <button
                  key={status}
                  onClick={() => setStatusFilter(status)}
                  className={`px-4 py-3 rounded-2xl font-semibold transition-all duration-300 capitalize text-sm ${
                    statusFilter === status
                      ? "bg-[#4F46E5] text-white shadow-lg"
                      : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-200"
                  }`}
                >
                  {status}
                </button>
              ))}
            </div>

            {/* Bedroom Filter */}
            <div className="flex gap-2">
              {["all", "1", "2", "3", "4+"].map((bedroom) => (
                <button
                  key={bedroom}
                  onClick={() => setBedroomFilter(bedroom)}
                  className={`px-4 py-3 rounded-2xl font-semibold transition-all duration-300 text-sm ${
                    bedroomFilter === bedroom
                      ? "bg-[#4F46E5] text-white shadow-lg"
                      : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-200"
                  }`}
                >
                  {bedroom === "all" ? "All Beds" : `${bedroom} Bed`}
                </button>
              ))}
            </div>
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
              <Search className="w-16 h-16 text-gray-400" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-3">No Flats Found</h3>
            <p className="text-gray-600 max-w-md mx-auto">
              Try adjusting your search criteria or filter to find what you're looking for.
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
                      {flat.mainImage ? (
                        <Image
                          src={flat.mainImage}
                          alt={flat.title}
                          fill
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          className="object-cover group-hover:scale-110 transition-transform duration-700"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
                          <div className="text-center">
                            <div className="w-16 h-16 bg-gray-400 rounded-full flex items-center justify-center mx-auto mb-3">
                              <Home className="w-8 h-8 text-white" />
                            </div>
                            <p className="text-gray-500 font-medium">Flat Image</p>
                          </div>
                        </div>
                      )}

                      {/* Status Badge */}
                      <div className="absolute top-4 left-4">
                        <span className={`px-3 py-1.5 rounded-full text-white text-xs font-bold shadow-lg ${
                          flat.status === "sold" ? "bg-red-500" :
                          flat.status === "reserved" ? "bg-yellow-500" : "bg-green-500"
                        }`}>
                          {flat.status}
                        </span>
                      </div>

                      {/* Price Badge */}
                      <div className="absolute top-4 right-4">
                        <span className="px-3 py-1.5 bg-white/90 backdrop-blur-sm rounded-full text-[#4F46E5] text-sm font-bold shadow-lg">
                          ৳{flat.price.toLocaleString()}
                        </span>
                      </div>

                      {/* Featured Badge */}
                      {flat.isFeatured && (
                        <div className="absolute top-12 right-4">
                          <span className="px-3 py-1.5 bg-[#4F46E5] rounded-full text-white text-xs font-bold shadow-lg flex items-center gap-1">
                            <Star size={12} className="fill-current" />
                            Featured
                          </span>
                        </div>
                      )}

                      {/* Overlay Gradient */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                      {/* View Details Button */}
                      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500">
                        <button className="px-6 py-2 bg-white text-[#4F46E5] rounded-xl font-semibold flex items-center gap-2 hover:bg-gray-50 transition-colors duration-300">
                          View Details
                          <ArrowRight size={16} />
                        </button>
                      </div>
                    </div>

                    {/* Content Section */}
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-[#4F46E5] transition-colors duration-300 line-clamp-1">
                        {flat.title}
                      </h3>

                      {flat.location && (
                        <div className="flex items-center gap-2 text-gray-600 mb-4">
                          <MapPin size={16} className="text-[#4F46E5]" />
                          <span className="text-sm">{flat.location}</span>
                        </div>
                      )}

                      {/* Flat Specifications */}
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-4 text-sm text-gray-600">
                          <div className="flex items-center gap-1">
                            <BedDouble size={16} className="text-[#4F46E5]" />
                            <span>{flat.bedrooms} Bed</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Bath size={16} className="text-[#4F46E5]" />
                            <span>{flat.bathrooms} Bath</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Square size={16} className="text-[#4F46E5]" />
                            <span>{flat.area} sqft</span>
                          </div>
                        </div>
                      </div>

                      {flat.description && (
                        <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-2">
                          {flat.description}
                        </p>
                      )}

                      {/* Amenities Preview */}
                      {flat.amenities && flat.amenities.length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-4">
                          {flat.amenities.slice(0, 2).map((amenity, index) => (
                            <span
                              key={index}
                              className="px-2 py-1 bg-blue-50 text-[#4F46E5] text-xs rounded-full font-medium"
                            >
                              {amenity}
                            </span>
                          ))}
                          {flat.amenities.length > 2 && (
                            <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full font-medium">
                              +{flat.amenities.length - 2} more
                            </span>
                          )}
                        </div>
                      )}

                      {/* CTA Button */}
                      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                        <div className={`text-sm font-semibold ${
                          flat.status === "available" ? "text-green-600" : 
                          flat.status === "sold" ? "text-red-600" : "text-yellow-600"
                        }`}>
                          {flat.status.charAt(0).toUpperCase() + flat.status.slice(1)}
                        </div>
                        <div className="text-[#4F46E5] font-semibold text-sm flex items-center gap-1">
                          Explore <ArrowRight size={14} />
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
          <div className="bg-gradient-to-r from-[#4F46E5] to-[#7C73E6] rounded-3xl p-12 text-white shadow-2xl">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Can't Find Your Perfect Flat?
            </h2>
            <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto">
              Let us help you find the perfect home that matches your requirements and preferences.
            </p>
            <motion.button
              className="px-8 py-4 bg-white text-[#4F46E5] rounded-xl font-bold text-lg hover:shadow-2xl transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Get Personal Assistance
            </motion.button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}