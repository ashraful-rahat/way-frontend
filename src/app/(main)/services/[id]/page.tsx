/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import axiosInstance from "@/utils/axios";
import { motion } from "framer-motion";
import { 
  CheckCircle, 
  ArrowLeft, 
  Share2, 
  Heart,
  Star,
  Building2,
  Home,
  Hammer,
  Palette,
  Scale
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

interface Service {
  _id: string;
  title: string;
  shortDescription: string;
  description: string;
  icon: string;
  image: string;
  galleryImages?: string[];
  features: string[];
  isActive: boolean;
  order: number;
  metaTitle?: string;
  metaDescription?: string;
  createdAt: string;
  updatedAt: string;
}

const SingleServicePage = () => {
  const { id } = useParams();
  const [service, setService] = useState<Service | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);

  const fetchService = async () => {
    if (!id) return;
    
    try {
      const res = await axiosInstance.get<{ data: Service }>(`/services/${id}`);
      setService(res.data.data);
    } catch (error) {
      console.error("Service fetch error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchService();
  }, [id]);

  // Icon mapping
  const getIconComponent = (iconName: string) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const iconMap: { [key: string]: any } = {
      Building2: Building2,
      Home: Home,
      Hammer: Hammer,
      Palette: Palette,
      Scale: Scale,
    };
    return iconMap[iconName] || Star;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-green-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-[#164C36] mx-auto mb-4"></div>
          <p className="text-gray-600">Loading service details...</p>
        </div>
      </div>
    );
  }

  if (!service) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-green-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-32 h-32 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-6">
            <Star className="w-16 h-16 text-gray-400" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-3">Service Not Found</h3>
          <p className="text-gray-600 mb-6">The service you're looking for doesn't exist.</p>
          <Link href="/services" className="px-6 py-3 bg-[#164C36] text-white rounded-lg font-semibold hover:bg-[#A4CC36] transition-colors duration-300">
            Back to Services
          </Link>
        </div>
      </div>
    );
  }

  const IconComponent = getIconComponent(service.icon);
  const allImages = [service.image, ...(service.galleryImages || [])].filter(Boolean) as string[];

  return (
    <div className="min-h-screen mt-24 bg-gradient-to-br from-gray-50 to-green-50 ">
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-green-100 rounded-full -translate-x-1/2 -translate-y-1/2 opacity-40"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#A4CC36] rounded-full translate-x-1/3 translate-y-1/3 opacity-10"></div>

      <div className="max-w-7xl mx-auto px-4 py-8 relative z-10">
        {/* Navigation */}
        <motion.div
          className="flex items-center justify-between mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Link href="/services" className="flex items-center gap-2 text-gray-600 hover:text-[#164C36] transition-colors duration-300">
            <ArrowLeft size={20} />
            <span className="font-semibold">Back to Services</span>
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
                  alt={service.title}
                  fill
                  className="object-cover"
                  priority
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
                  <div className="text-center">
                    <IconComponent className="w-16 h-16 text-gray-400 mx-auto mb-3" />
                    <p className="text-gray-500 font-medium">Service Image</p>
                  </div>
                </div>
              )}

              {/* Image Navigation */}
              {allImages.length > 1 && (
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                  {allImages.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImage(index)}
                      className={`w-3 h-3 rounded-full transition-all duration-300 ${
                        selectedImage === index ? "bg-white scale-125" : "bg-white/50"
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
                      selectedImage === index ? "border-[#164C36]" : "border-transparent"
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

          {/* Service Details */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-6"
          >
            {/* Header */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-16 h-16 bg-[#164C36] rounded-2xl flex items-center justify-center">
                  <IconComponent className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h1 className="text-3xl md:text-4xl font-black text-gray-900 mb-2 leading-tight">
                    {service.title}
                  </h1>
                  <p className="text-lg text-gray-600">
                    {service.shortDescription}
                  </p>
                </div>
              </div>
            </div>

            {/* Description */}
            {service.description && (
              <div className="prose prose-lg max-w-none">
                <div 
                  className="text-gray-700 leading-relaxed text-lg"
                  dangerouslySetInnerHTML={{ __html: service.description }}
                />
              </div>
            )}

            {/* Key Stats */}
            <div className="grid grid-cols-2 gap-4 py-6">
              <div className="text-center p-4 bg-green-50 rounded-2xl">
                <div className="text-2xl font-black text-[#164C36] mb-1">{service.features.length}+</div>
                <div className="text-gray-600 text-sm">Key Features</div>
              </div>
              <div className="text-center p-4 bg-blue-50 rounded-2xl">
                <div className="text-2xl font-black text-blue-600 mb-1">100%</div>
                <div className="text-gray-600 text-sm">Client Satisfaction</div>
              </div>
            </div>

            {/* Features */}
            {service.features && service.features.length > 0 && (
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Key Features</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {service.features.map((feature, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors duration-300"
                    >
                      <CheckCircle size={20} className="text-[#A4CC36] flex-shrink-0" />
                      <span className="text-gray-700 font-medium">{feature}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {/* CTA Buttons */}
            <div className="flex gap-4 pt-6">
              <motion.button
                className="flex-1 bg-gradient-to-r from-[#164C36] to-[#A4CC36] text-white py-4 rounded-2xl font-bold text-lg hover:shadow-2xl transition-all duration-300"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Get Free Consultation
              </motion.button>
              <motion.button
                className="px-8 py-4 border-2 border-[#164C36] text-[#164C36] rounded-2xl font-bold hover:bg-[#164C36] hover:text-white transition-all duration-300"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                View Portfolio
              </motion.button>
            </div>
          </motion.div>
        </div>

        {/* Additional Gallery Section */}
        {service.galleryImages && service.galleryImages.length > 0 && (
          <motion.section
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mb-16"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Service Gallery</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {service.galleryImages.map((image, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.05 }}
                  className="relative h-48 rounded-2xl overflow-hidden shadow-lg cursor-pointer"
                >
                  <Image
                    src={image}
                    alt={`Gallery ${index + 1}`}
                    fill
                    className="object-cover hover:scale-110 transition-transform duration-700"
                  />
                </motion.div>
              ))}
            </div>
          </motion.section>
        )}

        {/* Related Services CTA */}
        <motion.section
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="bg-gradient-to-r from-[#164C36] to-[#A4CC36] rounded-3xl p-12 text-white text-center"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Interested in This Service?
          </h2>
          <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto">
            Contact our team today to discuss your specific requirements and get a personalized quote for this service.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.button
              className="px-8 py-4 bg-white text-[#164C36] rounded-xl font-bold text-lg hover:shadow-2xl transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Contact Our Team
            </motion.button>
            <Link href="/services">
              <motion.button
                className="px-8 py-4 border-2 border-white text-white rounded-xl font-bold hover:bg-white hover:text-[#164C36] transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Explore Other Services
              </motion.button>
            </Link>
          </div>
        </motion.section>
      </div>
    </div>
  );
};

export default SingleServicePage;