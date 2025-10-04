"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const partners = [
  { name: "Holcim", logo: "/images/client-1.png" },
  { name: "Kai Aluminum", logo: "/images/client-2.png" },
  { name: "Partex Cables", logo: "/images/client-3.png" },
  { name: "Rak Ceramics", logo: "/images/client-4.png" },
  { name: "Supercreate Cement", logo: "/images/client-5.png" },
  { name: "Seven Rings Cement", logo: "/images/client-6.png" },
  { name: "BSRM", logo: "/images/client-7.png" },
];

const Partners = () => {
  return (
    <section className="py-20 bg-gradient-to-r from-gray-50 to-green-50 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-green-100 rounded-full -translate-x-1/2 -translate-y-1/2 opacity-40"></div>
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-[#A4CC36] rounded-full translate-x-1/3 translate-y-1/3 opacity-10"></div>

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        {/* Header Section */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <span className="inline-block px-4 py-2 bg-[#A4CC36] text-white rounded-full text-sm font-medium mb-4">
            Trusted By Industry Leaders
          </span>
          <h2 className="text-4xl font-bold mb-6 text-gray-900">
            Our <span className="text-[#164C36]">Partners</span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            Collaborating with renowned brands to deliver exceptional quality
            and service in every project.
          </p>
        </motion.div>

        {/* Marquee Container */}
        <div className="relative">
          {/* Gradient Overlays */}
          <div className="absolute left-0 top-0 w-24 h-full bg-gradient-to-r from-gray-50 to-transparent z-10"></div>
          <div className="absolute right-0 top-0 w-24 h-full bg-gradient-to-l from-gray-50 to-transparent z-10"></div>

          {/* Marquee Section */}
          <div className="overflow-hidden">
            <motion.div
              className="flex space-x-12 py-8"
              animate={{
                x: [0, -1800],
              }}
              transition={{
                x: {
                  repeat: Infinity,
                  repeatType: "loop",
                  duration: 40,
                  ease: "linear",
                },
              }}
            >
              {/* First Set */}
              {partners.map((partner, index) => (
                <div
                  key={`first-${index}`}
                  className="flex-shrink-0 w-48 h-24 bg-white rounded-2xl shadow-lg border border-gray-100 flex items-center justify-center p-6 hover:shadow-xl hover:border-[#A4CC36] transition-all duration-300 group"
                >
                  <div className="relative w-full h-full flex items-center justify-center">
                    <Image
                      src={partner.logo}
                      alt={partner.name}
                      width={120}
                      height={48}
                      className="object-contain opacity-70 group-hover:opacity-100 transition-opacity duration-300 grayscale group-hover:grayscale-0"
                    />
                  </div>
                </div>
              ))}

              {/* Duplicate Set for Seamless Loop */}
              {partners.map((partner, index) => (
                <div
                  key={`second-${index}`}
                  className="flex-shrink-0 w-48 h-24 bg-white rounded-2xl shadow-lg border border-gray-100 flex items-center justify-center p-6 hover:shadow-xl hover:border-[#A4CC36] transition-all duration-300 group"
                >
                  <div className="relative w-full h-full flex items-center justify-center">
                    <Image
                      src={partner.logo}
                      alt={partner.name}
                      width={120}
                      height={48}
                      className="object-contain opacity-70 group-hover:opacity-100 transition-opacity duration-300 grayscale group-hover:grayscale-0"
                    />
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Static Grid for Mobile */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:hidden">
            {partners.map((partner, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl shadow-lg border border-gray-100 flex items-center justify-center p-6 hover:shadow-xl hover:border-[#A4CC36] transition-all duration-300 group h-24"
              >
                <div className="relative w-full h-full flex items-center justify-center">
                  <Image
                    src={partner.logo}
                    alt={partner.name}
                    width={100}
                    height={40}
                    className="object-contain opacity-70 group-hover:opacity-100 transition-opacity duration-300 grayscale group-hover:grayscale-0"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Stats */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <div className="text-center bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
            <div className="text-3xl font-bold text-[#164C36] mb-2">50+</div>
            <div className="text-gray-600">Successful Collaborations</div>
          </div>
          <div className="text-center bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
            <div className="text-3xl font-bold text-[#164C36] mb-2">7+</div>
            <div className="text-gray-600">Industry Leaders</div>
          </div>
          <div className="text-center bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
            <div className="text-3xl font-bold text-[#164C36] mb-2">100%</div>
            <div className="text-gray-600">Client Satisfaction</div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Partners;
