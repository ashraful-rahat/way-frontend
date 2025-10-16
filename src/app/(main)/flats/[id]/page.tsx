"use client";

import axiosInstance from "@/utils/axios";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Bath,
  Bed,
  CheckCircle,
  Heart,
  Home,
  MapPin,
  Phone,
  Share2,
  Square,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

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
  amenities?: string[];
}

interface FlatApiResponse {
  success: boolean;
  data: Flat;
}

interface FlatsApiResponse {
  success: boolean;
  data: Flat[];
}

export default function FlatDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [flat, setFlat] = useState<Flat | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);
  const [similarFlats, setSimilarFlats] = useState<Flat[]>([]);

  const fetchFlat = useCallback(async () => {
    try {
      const res = await axiosInstance.get<FlatApiResponse>(
        `/flats/${params.id}`
      );

      if (res.data.success) {
        setFlat(res.data.data);

        if (res.data.data.projectId) {
          const similarRes = await axiosInstance.get<FlatsApiResponse>(
            `/flats?projectId=${res.data.data.projectId}&limit=3`
          );
          if (similarRes.data.success) {
            setSimilarFlats(similarRes.data.data || []);
          }
        }
      } else {
        throw new Error("Failed to fetch flat");
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error("Flat fetch error:", error.response?.data || error.message);
      router.push("/flats");
    } finally {
      setLoading(false);
    }
  }, [params.id, router]);

  useEffect(() => {
    if (params.id) {
      fetchFlat();
    }
  }, [params.id, fetchFlat]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-green-50 flex justify-center items-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-[#164C36] mx-auto mb-4"></div>
          <p className="text-gray-600 font-medium">Loading flat details...</p>
        </div>
      </div>
    );
  }

  if (!flat) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-green-50 flex justify-center items-center">
        <div className="text-center">
          <div className="w-32 h-32 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <span className="text-4xl">❌</span>
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-3">
            Flat Not Found
          </h3>
          <p className="text-gray-600 mb-6">
            The flat you&apos;re looking for doesn&apos;t exist.
          </p>
          <button
            onClick={() => router.push("/flats")}
            className="px-6 py-3 bg-[#164C36] text-white rounded-xl font-semibold hover:bg-[#133928] transition-colors"
          >
            Back to Flats
          </button>
        </div>
      </div>
    );
  }

  const allImages = flat.images || [];

  return (
    <div className="min-h-screen bg-white mt-24">
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-green-100 rounded-full -translate-x-1/2 -translate-y-1/2 opacity-40"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#A4CC36] rounded-full translate-x-1/3 translate-y-1/3 opacity-10"></div>

      <div className="max-w-7xl mx-auto px-4 py-8 relative z-10">
        {/* Navigation - Project page style */}
        <motion.div
          className="flex items-center justify-between mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Link
            href="/flats"
            className="flex items-center gap-2 text-gray-600 hover:text-[#164C36] transition-colors duration-300"
          >
            <ArrowLeft size={20} />
            <span className="font-semibold">Back to Flats</span>
          </Link>

          <div className="flex items-center gap-3">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsFavorite(!isFavorite)}
              className={`p-3 rounded-2xl border transition-all duration-300 ${
                isFavorite
                  ? "bg-red-50 border-red-200 text-red-500"
                  : "bg-gray-50 border-gray-200 text-gray-600 hover:bg-gray-100"
              }`}
            >
              <Heart size={20} className={isFavorite ? "fill-current" : ""} />
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="p-3 bg-gray-50 border border-gray-200 rounded-2xl text-gray-600 hover:bg-gray-100 transition-colors duration-300"
            >
              <Share2 size={20} />
            </motion.button>
          </div>
        </motion.div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          {/* Image Gallery */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Main Image */}
            <div className="relative h-96 rounded-3xl overflow-hidden shadow-2xl mb-4">
              {allImages[selectedImage] ? (
                <Image
                  src={allImages[selectedImage]}
                  alt={flat.name}
                  fill
                  className="object-cover"
                  priority
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
                  <div className="text-center">
                    <Home className="w-16 h-16 text-gray-400 mx-auto mb-3" />
                    <p className="text-gray-500 font-medium">Flat Image</p>
                  </div>
                </div>
              )}

              {/* Badges */}
              <div className="absolute top-4 left-4 flex gap-2">
                <span
                  className={`px-3 py-1.5 rounded-full text-white text-xs font-bold shadow-lg ${
                    flat.available ? "bg-green-500" : "bg-red-500"
                  }`}
                >
                  {flat.available ? "Available" : "Sold Out"}
                </span>
                <span className="px-3 py-1.5 bg-[#A4CC36] rounded-full text-white text-xs font-bold shadow-lg capitalize">
                  {flat.type}
                </span>
              </div>

              {/* Image Navigation */}
              {allImages.length > 1 && (
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                  {allImages.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImage(index)}
                      className={`w-3 h-3 rounded-full transition-all duration-300 ${
                        selectedImage === index
                          ? "bg-white scale-125"
                          : "bg-white/50"
                      }`}
                    />
                  ))}
                </div>
              )}
            </div>

            {/* Thumbnail Gallery */}
            {allImages.length > 1 && (
              <div className="grid grid-cols-4 gap-3">
                {allImages.map((image, index) => (
                  <motion.button
                    key={index}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setSelectedImage(index)}
                    className={`relative h-20 rounded-2xl overflow-hidden border-2 transition-all duration-300 ${
                      selectedImage === index
                        ? "border-[#164C36]"
                        : "border-transparent"
                    }`}
                  >
                    <Image
                      src={image}
                      alt={`Thumbnail ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                    {selectedImage === index && (
                      <div className="absolute inset-0 bg-[#164C36]/20"></div>
                    )}
                  </motion.button>
                ))}
              </div>
            )}
          </motion.div>

          {/* Flat Details */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-6"
          >
            {/* Header */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <span
                  className={`px-3 py-1 rounded-full text-white text-sm font-bold ${
                    flat.available ? "bg-green-500" : "bg-red-500"
                  }`}
                >
                  {flat.available ? "Available" : "Sold Out"}
                </span>
                <span className="px-3 py-1 bg-[#A4CC36] rounded-full text-white text-sm font-bold capitalize">
                  {flat.type}
                </span>
              </div>

              <h1 className="text-4xl md:text-5xl font-black text-gray-900 mb-4 leading-tight">
                {flat.name}
              </h1>

              {flat.location && (
                <div className="flex items-center gap-2 text-gray-600 mb-6">
                  <MapPin size={20} className="text-[#A4CC36]" />
                  <span className="text-lg font-medium">{flat.location}</span>
                </div>
              )}

              <p className="text-4xl font-black text-[#164C36] mb-6">
                ${flat.price.toLocaleString()}
              </p>
            </div>

            {/* Description */}
            {flat.description && (
              <div className="prose prose-lg max-w-none">
                <p className="text-gray-700 leading-relaxed text-lg">
                  {flat.description}
                </p>
              </div>
            )}

            {/* Specifications */}
            <div className="grid grid-cols-2 gap-4 py-6">
              <div className="text-center p-4 bg-green-50 rounded-2xl">
                <Square className="w-8 h-8 text-[#164C36] mx-auto mb-2" />
                <div className="text-2xl font-black text-[#164C36] mb-1">
                  {flat.area} sq.ft
                </div>
                <div className="text-gray-600 text-sm">Total Area</div>
              </div>
              <div className="text-center p-4 bg-blue-50 rounded-2xl">
                <Bed className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                <div className="text-2xl font-black text-blue-600 mb-1">
                  {flat.rooms}
                </div>
                <div className="text-gray-600 text-sm">Bedrooms</div>
              </div>
              <div className="text-center p-4 bg-yellow-50 rounded-2xl">
                <Bath className="w-8 h-8 text-yellow-600 mx-auto mb-2" />
                <div className="text-2xl font-black text-yellow-600 mb-1">
                  {flat.rooms}
                </div>
                <div className="text-gray-600 text-sm">Bathrooms</div>
              </div>
              <div className="text-center p-4 bg-purple-50 rounded-2xl">
                <Home className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                <div className="text-2xl font-black text-purple-600 mb-1">
                  {flat.floor || "N/A"}
                </div>
                <div className="text-gray-600 text-sm">Floor</div>
              </div>
            </div>

            {/* Amenities */}
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Amenities & Features
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {[
                  "Swimming Pool",
                  "Gym",
                  "Parking",
                  "Security",
                  "Garden",
                  "Elevator",
                  "AC",
                  "WiFi",
                  "Balcony",
                  "Laundry",
                  "Maintenance",
                  "CCTV",
                ]
                  .slice(0, 8)
                  .map((amenity, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors duration-300"
                    >
                      <CheckCircle
                        size={20}
                        className="text-[#A4CC36] flex-shrink-0"
                      />
                      <span className="text-gray-700 font-medium">
                        {amenity}
                      </span>
                    </motion.div>
                  ))}
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex gap-4 pt-6">
              <motion.button
                className={`flex-1 py-4 rounded-2xl font-bold text-lg transition-all ${
                  flat.available
                    ? "bg-gradient-to-r from-[#164C36] to-[#A4CC36] text-white hover:shadow-2xl"
                    : "bg-gray-300 text-gray-500 cursor-not-allowed"
                }`}
                whileHover={flat.available ? { scale: 1.02 } : {}}
                whileTap={flat.available ? { scale: 0.98 } : {}}
                disabled={!flat.available}
              >
                {flat.available ? "Schedule Viewing" : "Not Available"}
              </motion.button>
              <motion.button
                className="px-8 py-4 border-2 border-[#164C36] text-[#164C36] rounded-2xl font-bold hover:bg-[#164C36] hover:text-white transition-all duration-300 flex items-center gap-2"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Phone size={20} />
                Contact Agent
              </motion.button>
            </div>
          </motion.div>
        </div>

        {/* Similar Flats Section */}
        {similarFlats.length > 0 && (
          <motion.section
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mb-16"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              Similar Flats
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {similarFlats.map((similarFlat) => (
                <Link key={similarFlat._id} href={`/flats/${similarFlat._id}`}>
                  <motion.div
                    className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 border border-gray-100"
                    whileHover={{ y: -5 }}
                  >
                    <div className="relative h-48">
                      {similarFlat.images && similarFlat.images.length > 0 ? (
                        <Image
                          src={similarFlat.images[0]}
                          alt={similarFlat.name}
                          fill
                          className="object-cover"
                        />
                      ) : (
                        <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                          <Home className="w-12 h-12 text-gray-400" />
                        </div>
                      )}
                      <div className="absolute top-3 left-3">
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-bold text-white ${
                            similarFlat.available
                              ? "bg-green-500"
                              : "bg-red-500"
                          }`}
                        >
                          {similarFlat.available ? "Available" : "Sold"}
                        </span>
                      </div>
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold text-gray-900 mb-2">
                        {similarFlat.name}
                      </h3>
                      <p className="text-[#164C36] font-bold text-lg mb-2">
                        ${similarFlat.price.toLocaleString()}
                      </p>
                      <div className="flex justify-between text-sm text-gray-600">
                        <span>{similarFlat.area} sq.ft</span>
                        <span>{similarFlat.rooms} rooms</span>
                        <span>Floor {similarFlat.floor}</span>
                      </div>
                    </div>
                  </motion.div>
                </Link>
              ))}
            </div>
          </motion.section>
        )}

        {/* CTA Section */}
        <motion.section
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="bg-gradient-to-r from-[#164C36] to-[#A4CC36] rounded-3xl p-12 text-white text-center"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Interested in This Flat?
          </h2>
          <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto">
            Contact our sales team today to get detailed information, schedule a
            site visit, and make this flat your new home.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.button
              className="px-8 py-4 bg-white text-[#164C36] rounded-xl font-bold text-lg hover:shadow-2xl transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Contact Sales Team
            </motion.button>
            <motion.button
              className="px-8 py-4 border-2 border-white text-white rounded-xl font-bold hover:bg-white hover:text-[#164C36] transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              View Similar Flats
            </motion.button>
          </div>
        </motion.section>
      </div>
    </div>
  );
}
