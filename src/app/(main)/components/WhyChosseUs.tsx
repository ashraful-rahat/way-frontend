"use client";

import { motion, Variants } from "framer-motion";
import { Building, Headphones, Layout, MapPin } from "lucide-react";

interface Feature {
  title: string;
  description: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  stats: string;
}

const features: Feature[] = [
  {
    title: "Trusted Developer",
    description: "We have delivered over 100+ projects with trust and quality.",
    icon: Building,
    stats: "100+ Projects",
  },
  {
    title: "Prime Locations",
    description:
      "Our properties are located in the most strategic and prime areas of Dhaka.",
    icon: MapPin,
    stats: "15+ Locations",
  },
  {
    title: "Modern Design",
    description:
      "Innovative architecture and luxurious interiors in every project.",
    icon: Layout,
    stats: "50+ Designs",
  },
  {
    title: "Customer Support",
    description:
      "24/7 dedicated support to help our clients make the right decision.",
    icon: Headphones,
    stats: "24/7 Support",
  },
];

// Framer Motion Variants
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

export default function WhyChooseUs() {
  return (
    <section className="py-24 bg-gradient-to-br from-gray-50 to-green-50 relative overflow-hidden">
      {/* Decorative Background */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-green-100 rounded-full -translate-x-1/2 -translate-y-1/2 opacity-50"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#A4CC36] rounded-full translate-x-1/3 translate-y-1/3 opacity-10"></div>

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <span className="inline-block px-4 py-2 bg-[#164C36] text-white rounded-full text-sm font-medium mb-4">
            Why We&#39;re Different
          </span>
          <h2 className="text-5xl font-bold mb-6 text-gray-900">
            Why Choose <span className="text-[#164C36]">Way Housing Ltd</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Delivering exceptional quality homes in premium locations across
            Dhaka, backed by unparalleled customer service and innovative
            designs.
          </p>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={index}
                variants={itemVariants}
                className="group relative"
              >
                <div className="relative bg-white rounded-2xl shadow-lg p-8 cursor-pointer h-full border border-gray-100 overflow-hidden transition-shadow duration-500 hover:shadow-xl">
                  {/* Green overlay sliding left → right */}
                  <div className="absolute inset-0 bg-gradient-to-r from-[#164C36] to-[#A4CC36] -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-in-out"></div>

                  {/* Content */}
                  <div className="relative z-10 flex flex-col h-full">
                    {/* Icon */}
                    <div className="mb-6 relative">
                      <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center group-hover:bg-white/20 transition-all duration-500">
                        <Icon
                          className="text-[#164C36] group-hover:text-white transition-colors duration-500"
                          size={28}
                        />
                      </div>
                      <div className="absolute -top-2 -right-2 bg-white text-[#164C36] text-xs font-bold px-3 py-1 rounded-full shadow-lg border group-hover:bg-white group-hover:text-[#164C36] transition-colors duration-500">
                        {feature.stats}
                      </div>
                    </div>

                    {/* Text */}
                    <h3 className="text-2xl font-bold mb-4 text-gray-900 group-hover:text-white transition-colors duration-500">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 group-hover:text-white/90 leading-relaxed flex-grow transition-colors duration-500">
                      {feature.description}
                    </p>

                    {/* Hover arrow */}
                    <div className="mt-6 opacity-0 group-hover:opacity-100 transform translate-x-0 group-hover:translate-x-2 transition-all duration-500">
                      <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                        <svg
                          className="w-4 h-4 text-white"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={3}
                            d="M13 7l5 5m0 0l-5 5m5-5H6"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
//

//  <motion.div
//           className="text-center mt-16"
//           initial={{ opacity: 0, y: 20 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.6, delay: 0.4 }}
//           viewport={{ once: true }}
//         >
//           <div className="bg-white rounded-2xl shadow-lg p-8 max-w-4xl mx-auto border border-gray-100">
//             <h3 className="text-3xl font-bold text-gray-900 mb-4">
//               Ready to Find Your Dream Home?
//             </h3>
//             <p className="text-gray-600 text-lg mb-6 max-w-2xl mx-auto">
//               Join hundreds of satisfied homeowners who trusted Way Housing Ltd for their perfect living space.
//             </p>
//             <div className="flex flex-col sm:flex-row gap-4 justify-center">
//               <button className="px-8 py-4 bg-gradient-to-r from-[#164C36] to-[#A4CC36] text-white rounded-xl font-semibold hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300">
//                 View Our Projects
//               </button>
//               <button className="px-8 py-4 border-2 border-[#164C36] text-[#164C36] rounded-xl font-semibold hover:bg-[#164C36] hover:text-white transition-all duration-300">
//                 Contact Us Today
//               </button>
//             </div>
//           </div>
//         </motion.div>
