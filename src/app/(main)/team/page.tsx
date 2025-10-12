"use client";

import axiosInstance from "@/utils/axios";
import { motion, Variants } from "framer-motion";
import {
  Award,
  Linkedin,
  Mail,
  Phone,
  Star,
  Target,
  Twitter,
  Users,
} from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

interface Employee {
  _id: string;
  serialNumber: number;
  name: string;
  role: string;
  description?: string;
  image?: string;
  createdAt: string;
  updatedAt: string;
}

interface EmployeeApiResponse {
  success: boolean;
  data: Employee[];
}

const TeamPage = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchEmployees = async () => {
    try {
      const res = await axiosInstance.get<EmployeeApiResponse>("/employees");
      console.log("✅ [DEBUG] Employee fetch:", res.data);
      setEmployees(res.data.data || []);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error(
        "❌ [DEBUG] Employee fetch error:",
        error.response?.data || error.message
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  const containerVariants :Variants= {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };

  const itemVariants:Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  return (
    <div className="min-h-screen mt-16 bg-gradient-to-br from-gray-50 to-green-50 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-green-100 rounded-full -translate-x-1/2 -translate-y-1/2 opacity-40"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#A4CC36] rounded-full translate-x-1/3 translate-y-1/3 opacity-10"></div>

      <div className="max-w-7xl mx-auto px-4 py-16 relative z-10">
        {/* Header */}
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
            👥 Meet Our Team
          </motion.span>
          <h1 className="text-5xl md:text-6xl font-bold mb-6 text-gray-900">
            The Minds Behind <span className="text-[#164C36]">Way Housing</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Meet the passionate professionals dedicated to transforming
            Bangladesh&lsquo;s real estate landscape with innovation, expertise, and
            commitment to excellence.
          </p>
        </motion.div>

        {/* Stats */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          {[
            { icon: Users, number: "50+", label: "Team Members" },
            { icon: Award, number: "100+", label: "Projects Done" },
            { icon: Star, number: "10+", label: "Years Experience" },
            { icon: Target, number: "100%", label: "Client Satisfaction" },
          ].map((stat, index) => (
            <motion.div
              key={index}
              className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 text-center shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300"
              whileHover={{ y: -5, scale: 1.02 }}
            >
              <stat.icon className="w-8 h-8 text-[#164C36] mx-auto mb-3" />
              <div className="text-2xl font-bold text-gray-900 mb-1">
                {stat.number}
              </div>
              <div className="text-gray-600 text-sm">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Team Cards */}
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-[#164C36] mx-auto"></div>
          </div>
        ) : employees.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-500 text-xl">No team members found.</p>
          </div>
        ) : (
          <motion.div
            className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {employees
              .sort((a, b) => a.serialNumber - b.serialNumber)
              .map((emp, index) => (
                <motion.div
                  key={emp._id}
                  variants={itemVariants}
                  className="group relative bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100"
                  whileHover={{ y: -8 }}
                >
                  {/* Image */}
                  <div className="relative h-72 overflow-hidden">
                    {emp.image ? (
                      <Image
                        src={emp.image}
                        alt={emp.name}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                        className="object-cover group-hover:scale-110 transition-transform duration-700"
                        priority={index < 4}
                      />
                    ) : (
                      <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                        <Users className="w-16 h-16 text-gray-400" />
                      </div>
                    )}

                    {/* Overlay Gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                    {/* Social Icons */}
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-3 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500">
                      {[Mail, Phone, Linkedin, Twitter].map((Icon, idx) => (
                        <motion.button
                          key={idx}
                          className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors duration-300"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <Icon size={18} />
                        </motion.button>
                      ))}
                    </div>
                  </div>

                  {/* Info */}
                  <div className="relative p-6 z-10 text-center">
                    <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-[#164C36] transition-colors duration-300">
                      {emp.name}
                    </h3>
                    <p className="text-[#A4CC36] font-semibold mb-3 bg-green-50 px-3 py-1 rounded-full text-sm inline-block">
                      {emp.role}
                    </p>
                    {emp.description && (
                      <p className="text-gray-600 text-sm leading-relaxed line-clamp-3">
                        {emp.description}
                      </p>
                    )}

                    {/* Expertise Tags */}
                    <div className="flex flex-wrap gap-2 mt-4 justify-center">
                      {emp.role
                        .split(" ")
                        .slice(0, 2)
                        .map((word, idx) => (
                          <span
                            key={idx}
                            className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full font-medium"
                          >
                            {word}
                          </span>
                        ))}
                    </div>
                  </div>

                  {/* Hover Border */}
                  <div className="absolute inset-0 rounded-3xl border-2 border-transparent group-hover:border-[#A4CC36]/30 transition-all duration-500"></div>
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
              Join Our Growing Team
            </h2>
            <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto">
              Passionate about real estate and innovation? Come build the future
              with us at Way Housing.
            </p>
            <motion.button
              className="px-8 py-4 bg-white text-[#164C36] rounded-xl font-bold text-lg hover:shadow-2xl transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              View Career Opportunities
            </motion.button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default TeamPage;
