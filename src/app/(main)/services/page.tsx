"use client";

import axiosInstance from "@/utils/axios";
import { motion, Variants } from "framer-motion";
import { 
  CheckCircle, 
  ArrowRight, 
  Star,
  Building2,
  Home,
  Hammer,
  Palette,
  Scale
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
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
  createdAt: string;
  updatedAt: string;
}

const ServicesPage = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchServices = async () => {
    try {
      const res = await axiosInstance.get<{ data: Service[] }>("/services");
      setServices(res.data.data);
    } catch (error) {
      console.error("Services fetch error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

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

  const containerVariants:Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const itemVariants:Variants = {
    hidden: { 
      opacity: 0, 
      y: 30 
    },
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
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-green-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-[#164C36] mx-auto mb-4"></div>
          <p className="text-gray-600">Loading services...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen  mt-24 bg-gradient-to-br from-gray-50 to-green-50">
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
          <motion.div
            className="inline-block px-4 py-2 bg-[#A4CC36] text-white rounded-full text-sm font-medium mb-4"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            🛠️ Our Services
          </motion.div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
            Comprehensive <span className="text-[#164C36]">Real Estate</span> Solutions
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Discover our complete range of professional real estate services designed 
            to meet all your property needs with excellence and expertise.
          </p>
        </motion.div>

        {/* Services Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {services.map((service) => {
            const IconComponent = getIconComponent(service.icon);
            return (
              <motion.div
                key={service._id}
                variants={itemVariants}
                className="group"
              >
                <Link href={`/services/${service._id}`}>
                  <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-500 overflow-hidden border border-gray-100 group-hover:scale-105 h-full flex flex-col">
                    
                    {/* Image Section */}
                    <div className="relative h-48 overflow-hidden">
                      {service.image ? (
                        <Image
                          src={service.image}
                          alt={service.title}
                          fill
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          className="object-cover group-hover:scale-110 transition-transform duration-700"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
                          <div className="text-center">
                            <IconComponent className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                            <p className="text-gray-500 text-sm">Service Image</p>
                          </div>
                        </div>
                      )}

                      {/* Overlay Gradient */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                      {/* View Details Button */}
                      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500">
                        <button className="px-4 py-2 bg-white text-[#164C36] rounded-lg font-semibold flex items-center gap-2 hover:bg-gray-50 transition-colors duration-300 text-sm">
                          View Details
                          <ArrowRight size={16} />
                        </button>
                      </div>
                    </div>

                    {/* Content Section */}
                    <div className="p-6 flex-1 flex flex-col">
                      {/* Icon and Title */}
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-12 h-12 bg-[#164C36] rounded-xl flex items-center justify-center">
                          <IconComponent className="w-6 h-6 text-white" />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 group-hover:text-[#164C36] transition-colors duration-300">
                          {service.title}
                        </h3>
                      </div>

                      <p className="text-gray-600 leading-relaxed mb-4 flex-1">
                        {service.shortDescription}
                      </p>

                      {/* Features List */}
                      <div className="space-y-2 mb-4">
                        {service.features.slice(0, 3).map((feature, index) => (
                          <div key={index} className="flex items-center gap-2">
                            <CheckCircle size={16} className="text-[#A4CC36] flex-shrink-0" />
                            <span className="text-sm text-gray-700">{feature}</span>
                          </div>
                        ))}
                        {service.features.length > 3 && (
                          <div className="text-sm text-gray-500">
                            +{service.features.length - 3} more features
                          </div>
                        )}
                      </div>

                      {/* Bottom CTA */}
                      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                        <div className="text-[#164C36] font-semibold text-sm">
                          Learn More
                        </div>
                        <ArrowRight size={16} className="text-[#164C36] group-hover:translate-x-1 transition-transform duration-300" />
                      </div>
                    </div>

                    {/* Hover Glow Effect */}
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-[#164C36] to-[#A4CC36] opacity-0 group-hover:opacity-5 transition-opacity duration-500 -z-10"></div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </motion.div>

        {/* CTA Section */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <div className="bg-gradient-to-r from-[#164C36] to-[#A4CC36] rounded-2xl p-8 text-white">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Need Custom Solutions?
            </h2>
            <p className="text-white/90 mb-6 max-w-2xl mx-auto">
              Contact us to discuss your specific requirements and get personalized service recommendations.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact">
                <motion.button
                  className="px-6 py-3 bg-white text-[#164C36] rounded-lg font-semibold hover:shadow-lg transition-all duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Contact Us
                </motion.button>
              </Link>
              <Link href="/projects">
                <motion.button
                  className="px-6 py-3 border-2 border-white text-white rounded-lg font-semibold hover:bg-white/10 transition-all duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  View Projects
                </motion.button>
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ServicesPage;