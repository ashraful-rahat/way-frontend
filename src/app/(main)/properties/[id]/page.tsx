// app/properties/[id]/page.tsx
"use client";

import axiosInstance from "@/utils/axios";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Bath,
  Bed,
  Heart,
  Home,
  MapPin,
  Phone,
  Share2,
  Square,
  Star,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

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

interface PropertyApiResponse {
  status: string;
  data: Property;
  message?: string;
}

interface PropertiesApiResponse {
  status: string;
  data: Property[];
}

export default function PropertyDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [property, setProperty] = useState<Property | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);
  const [similarProperties, setSimilarProperties] = useState<Property[]>([]);

  const fetchProperty = useCallback(async () => {
    try {
      console.log("🔄 Fetching property with ID:", params.id);

      const res = await axiosInstance.get(`/properties/${params.id}`);
      const responseData = res.data as PropertyApiResponse;

      console.log("📦 Full API Response:", responseData);

      if (responseData.status === "success" && responseData.data) {
        console.log("✅ Property data found:", responseData.data);
        setProperty(responseData.data);

        // Fetch similar properties
        if (responseData.data.type) {
          const similarRes = await axiosInstance.get(
            `/properties?type=${responseData.data.type}&limit=3`
          );
          const similarData = similarRes.data as PropertiesApiResponse;
          if (similarData.status === "success") {
            setSimilarProperties(similarData.data || []);
          }
        }
      } else {
        console.error("❌ Property not found in response");
        throw new Error("Property not found");
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error("❌ Property fetch error:", {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status,
      });
      router.push("/properties");
    } finally {
      setLoading(false);
    }
  }, [params.id, router]);

  useEffect(() => {
    if (params.id) {
      fetchProperty();
    }
  }, [params.id, fetchProperty]);

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
            Loading property details...
          </p>
          <p className="text-gray-400 text-sm mt-2">ID: {params.id}</p>
        </div>
      </div>
    );
  }

  if (!property) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-green-50 flex justify-center items-center">
        <div className="text-center">
          <div className="w-32 h-32 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <span className="text-4xl">❌</span>
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-3">
            Property Not Found
          </h3>
          <p className="text-gray-600 mb-4">ID: {params.id}</p>
          <p className="text-gray-600 mb-6">
            The property you&apos;re looking for doesn&apos;t exist or there was
            an error loading it.
          </p>
          <button
            onClick={() => router.push("/properties")}
            className="px-6 py-3 bg-[#164C36] text-white rounded-xl font-semibold hover:bg-[#133928] transition-colors"
          >
            Back to Properties
          </button>
        </div>
      </div>
    );
  }

  const allImages = property.images || [];

  return (
    <div className="min-h-screen bg-white">
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-green-100 rounded-full -translate-x-1/2 -translate-y-1/2 opacity-40"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#A4CC36] rounded-full translate-x-1/3 translate-y-1/3 opacity-10"></div>

      <div className="max-w-7xl mx-auto mt-24 px-4 py-8 relative z-10">
        {/* Navigation */}
        <motion.div
          className="flex items-center justify-between mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Link
            href="/properties"
            className="flex items-center gap-2 text-gray-600 hover:text-[#164C36] transition-colors duration-300"
          >
            <ArrowLeft size={20} />
            <span className="font-semibold">Back to Properties</span>
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
                  alt={property.name}
                  fill
                  className="object-cover"
                  priority
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-20 h-20 bg-gray-400 rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-white text-3xl">
                        {propertyIcons[property.type]}
                      </span>
                    </div>
                    <p className="text-gray-500 font-medium">Property Image</p>
                  </div>
                </div>
              )}

              {/* Badges */}
              <div className="absolute top-4 left-4 flex gap-2">
                <span
                  className={`px-3 py-1.5 rounded-full text-white text-xs font-bold shadow-lg ${
                    property.available ? "bg-green-500" : "bg-red-500"
                  }`}
                >
                  {property.available ? "Available" : "Sold Out"}
                </span>
                <span className="px-3 py-1.5 bg-[#A4CC36] rounded-full text-white text-xs font-bold shadow-lg capitalize">
                  {property.type}
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

          {/* Property Details */}
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
                    property.available ? "bg-green-500" : "bg-red-500"
                  }`}
                >
                  {property.available ? "Available" : "Sold Out"}
                </span>
                <span className="px-3 py-1 bg-[#A4CC36] rounded-full text-white text-sm font-bold capitalize">
                  {property.type}
                </span>
              </div>

              <h1 className="text-4xl md:text-5xl font-black text-gray-900 mb-4 leading-tight">
                {property.name}
              </h1>

              {property.location && (
                <div className="flex items-center gap-2 text-gray-600 mb-6">
                  <MapPin size={20} className="text-[#A4CC36]" />
                  <span className="text-lg font-medium">
                    {property.location}
                  </span>
                </div>
              )}

              <p className="text-4xl font-black text-[#164C36] mb-6">
                ${property.price.toLocaleString()}
              </p>
            </div>

            {/* Description */}
            {property.description && (
              <div className="prose prose-lg max-w-none">
                <p className="text-gray-700 leading-relaxed text-lg">
                  {property.description}
                </p>
              </div>
            )}

            {/* Specifications */}
            <div className="grid grid-cols-2 gap-4 py-6">
              {[
                {
                  icon: Square,
                  label: "Total Area",
                  value: property.area ? `${property.area} sq.ft` : "N/A",
                  bg: "bg-green-100",
                },
                {
                  icon: Bed,
                  label: "Bedrooms",
                  value: property.rooms || "N/A",
                  bg: "bg-blue-100",
                },
                {
                  icon: Bath,
                  label: "Bathrooms",
                  value: property.rooms || "N/A",
                  bg: "bg-yellow-100",
                },
                {
                  icon: Home,
                  label: "Floor",
                  value: property.floor || "N/A",
                  bg: "bg-purple-100",
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className="bg-white rounded-2xl p-4 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-12 h-12 ${item.bg} rounded-xl flex items-center justify-center`}
                    >
                      <item.icon size={24} className="text-[#164C36]" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">{item.label}</p>
                      <p className="font-semibold text-gray-900">
                        {item.value}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Amenities */}
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Property Features
              </h2>
              <div className="grid grid-cols-2 gap-3">
                {[
                  "Swimming Pool",
                  "Garden",
                  "Parking",
                  "Security",
                  "AC",
                  "WiFi",
                  "Balcony",
                  "Laundry",
                ].map((amenity, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                      <Star size={16} className="text-[#164C36]" />
                    </div>
                    <span className="text-gray-700">{amenity}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex gap-4 pt-6">
              <motion.button
                className={`flex-1 py-4 rounded-2xl font-bold text-lg transition-all ${
                  property.available
                    ? "bg-gradient-to-r from-[#164C36] to-[#A4CC36] text-white hover:shadow-2xl"
                    : "bg-gray-300 text-gray-500 cursor-not-allowed"
                }`}
                whileHover={property.available ? { scale: 1.02 } : {}}
                whileTap={property.available ? { scale: 0.98 } : {}}
                disabled={!property.available}
              >
                {property.available ? "Schedule Viewing" : "Not Available"}
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

        {/* Similar Properties Section */}
        {similarProperties.length > 0 && (
          <motion.section
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-8">
              Similar Properties
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {similarProperties.map((similarProperty) => (
                <Link
                  key={similarProperty._id}
                  href={`/properties/${similarProperty._id}`}
                >
                  <motion.div
                    className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 border border-gray-100"
                    whileHover={{ y: -5 }}
                  >
                    <div className="relative h-48">
                      {similarProperty.images &&
                      similarProperty.images.length > 0 ? (
                        <Image
                          src={similarProperty.images[0]}
                          alt={similarProperty.name}
                          fill
                          className="object-cover"
                        />
                      ) : (
                        <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                          <span className="text-gray-400 text-2xl">
                            {propertyIcons[similarProperty.type]}
                          </span>
                        </div>
                      )}
                      <div className="absolute top-3 left-3">
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-bold text-white ${
                            similarProperty.available
                              ? "bg-green-500"
                              : "bg-red-500"
                          }`}
                        >
                          {similarProperty.available ? "Available" : "Sold"}
                        </span>
                      </div>
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold text-gray-900 mb-2">
                        {similarProperty.name}
                      </h3>
                      <p className="text-[#164C36] font-bold text-lg mb-2">
                        ${similarProperty.price.toLocaleString()}
                      </p>
                      <div className="flex justify-between text-sm text-gray-600">
                        <span>{similarProperty.area} sq.ft</span>
                        <span>{similarProperty.rooms} rooms</span>
                        <span className="capitalize">
                          {similarProperty.type}
                        </span>
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
          className="bg-gradient-to-r from-[#164C36] to-[#A4CC36] rounded-3xl p-12 text-white text-center mt-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Interested in This Property?
          </h2>
          <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto">
            Contact our sales team today to get detailed information, schedule a
            site visit, and make this property yours.
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
              View Similar Properties
            </motion.button>
          </div>
        </motion.section>
      </div>
    </div>
  );
}
