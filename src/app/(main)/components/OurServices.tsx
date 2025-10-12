"use client";

import { motion, Variants } from "framer-motion";
import Image from "next/image";
import { 
  ArrowRight,
  CheckCircle,
  Sparkles
} from "lucide-react";
import { useEffect, useState } from "react";
import axiosInstance from "@/utils/axios";
import Link from "next/link";

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
  createdAt: string;
  updatedAt: string;
}

const ServicesShowcase = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchServices = async () => {
    try {
      const res = await axiosInstance.get<{ data: Service[] }>("/services");
      // Take only active services and limit to 4 for showcase
      const activeServices = res.data.data
        .filter(service => service.isActive)
        .slice(0, 4);
      setServices(activeServices);
    } catch (error) {
      console.error("Services fetch error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants: Variants = {
    hidden: { 
      opacity: 0, 
      y: 30,
      scale: 0.9
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  // Color gradients for different services
  const getGradient = (index: number) => {
    const gradients = [
      "from-green-500 to-emerald-600",
      "from-blue-500 to-cyan-600",
      "from-orange-500 to-red-600",
      "from-purple-500 to-pink-600"
    ];
    return gradients[index % gradients.length];
  };

  if (loading) {
    return (
      <section className="py-20 bg-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(4)].map((_, index) => (
              <div key={index} className="bg-white rounded-2xl shadow-xl p-5 animate-pulse">
                <div className="w-full h-48 bg-gray-300 rounded-lg mb-4"></div>
                <div className="h-4 bg-gray-300 rounded mb-2"></div>
                <div className="h-4 bg-gray-300 rounded w-3/4 mb-4"></div>
                <div className="space-y-2 mb-4">
                  {[...Array(4)].map((_, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <div className="w-4 h-4 bg-gray-300 rounded"></div>
                      <div className="h-3 bg-gray-300 rounded w-20"></div>
                    </div>
                  ))}
                </div>
                <div className="h-10 bg-gray-300 rounded-lg"></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (services.length === 0) {
    return null; // Don't show section if no services
  }

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-green-50 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-10 left-10 w-80 h-80 bg-green-50 rounded-full opacity-60 blur-3xl"></div>
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-[#A4CC36] rounded-full opacity-10 blur-3xl"></div>

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        {/* Header Section */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <motion.div
            className="inline-flex items-center space-x-2 px-6 py-3 bg-white/80 backdrop-blur-sm border border-gray-200 text-[#164C36] rounded-2xl text-sm font-semibold mb-6 shadow-lg"
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <Sparkles size={16} className="text-[#A4CC36]" />
            <span>Our Premium Services</span>
          </motion.div>
          <h2 className="text-5xl md:text-6xl font-black mb-6 text-gray-900 leading-tight">
            Comprehensive <span className="bg-gradient-to-r from-[#164C36] to-[#A4CC36] bg-clip-text text-transparent">Solutions</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            End-to-end real estate services designed to meet all your property needs with excellence and innovation.
          </p>
        </motion.div>

        {/* Services Grid - 4 Columns */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {services.map((service, index) => (
            <motion.div
              key={service._id}
              variants={itemVariants}
              className="group"
            >
              <Link href={`/services/${service._id}`}>
                <div className="bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100 group-hover:scale-105 h-full flex flex-col relative">
                  
                  {/* Image Section */}
                  <div className="relative h-48 overflow-hidden">
                    {service.image ? (
                      <Image
                        src={service.image}
                        alt={service.title}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                        className="object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
                        <div className="text-center text-gray-500">
                          <div className="text-2xl mb-1">🏢</div>
                          <p className="text-sm">Service Image</p>
                        </div>
                      </div>
                    )}
                    
                    {/* Gradient Overlay */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${getGradient(index)} opacity-0 group-hover:opacity-20 transition-opacity duration-500`}></div>
                    
                    {/* Title Overlay */}
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                      <h3 className="text-white font-bold text-lg text-center">
                        {service.title}
                      </h3>
                    </div>
                  </div>

                  {/* Content Section */}
                  <div className="p-5 flex-1 flex flex-col">
                    <p className="text-gray-600 text-sm leading-relaxed mb-4 flex-1">
                      {service.shortDescription}
                    </p>

                    {/* Features List */}
                    <div className="space-y-2 mb-4">
                      {service.features.slice(0, 4).map((feature, featureIndex) => (
                        <div key={featureIndex} className="flex items-center gap-2">
                          <CheckCircle size={14} className="text-[#A4CC36] flex-shrink-0" />
                          <span className="text-xs text-gray-700 font-medium line-clamp-1">
                            {feature}
                          </span>
                        </div>
                      ))}
                      {service.features.length > 4 && (
                        <div className="text-xs text-gray-500 text-center">
                          +{service.features.length - 4} more features
                        </div>
                      )}
                    </div>

                    {/* CTA Button */}
                    <motion.div
                      className="w-full py-2.5 bg-gray-50 text-gray-700 rounded-lg font-semibold hover:bg-[#164C36] hover:text-white transition-all duration-300 flex items-center justify-center gap-2 group/btn text-sm"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <span>Explore Service</span>
                      <ArrowRight size={14} className="group-hover/btn:translate-x-1 transition-transform duration-300" />
                    </motion.div>
                  </div>

                  {/* Corner Accent */}
                  <div className={`absolute top-0 right-0 w-3 h-3 bg-gradient-to-br ${getGradient(index)} rounded-bl-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <Link href="/services">
            <motion.button
              className="px-8 py-4 bg-gradient-to-r from-[#164C36] to-[#A4CC36] text-white rounded-2xl font-bold text-lg hover:shadow-2xl transition-all duration-300"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              View All Services
              <ArrowRight size={20} className="inline ml-2" />
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default ServicesShowcase;