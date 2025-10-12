"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import axiosInstance from "@/utils/axios";
import { motion } from "framer-motion";
import { 
  MapPin, 
  Clock, 
  Star, 
  ArrowRight,
  Search,

} from "lucide-react";

interface Project {
  _id: string;
  cityId: string;
  name: string;
  description?: string;
  location?: string;
  isFeatured: boolean;
  status: "ongoing" | "upcoming" | "completed";
  mainImage?: string;
  galleryImages?: string[];
  amenities?: string[];
  createdAt: string;
  updatedAt: string;
}

interface ProjectsApiResponse {
  success: boolean;
  data: Project[];
}

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  const fetchProjects = async () => {
    try {
      const res = await axiosInstance.get<ProjectsApiResponse>("/projects");
      setProjects(res.data?.data || []);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error("Project fetch error:", error.response?.data || error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  // Filter projects based on search and status
  const filteredProjects = projects.filter(project => {
    const matchesSearch = project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.location?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || project.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
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
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-green-50 flex justify-center items-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-[#164C36] mx-auto mb-4"></div>
          <p className="text-gray-600 font-medium">Loading amazing projects...</p>
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
            🏗️ Our Portfolio
          </motion.span>
          <h1 className="text-5xl md:text-6xl font-bold mb-6 text-gray-900">
            Featured <span className="text-[#164C36]">Projects</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Discover our exceptional real estate developments that redefine modern living 
            and commercial spaces across Bangladesh.
          </p>
        </motion.div>

        {/* Search and Filter Section */}
        <motion.div
          className="flex flex-col md:flex-row gap-4 mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          {/* Search Input */}
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search projects by name or location..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-4 bg-white rounded-2xl border border-gray-200 focus:border-[#A4CC36] focus:ring-2 focus:ring-[#A4CC36]/20 transition-all duration-300 shadow-lg"
            />
          </div>

          {/* Status Filter */}
          <div className="flex gap-2">
            {["all", "ongoing", "upcoming", "completed"].map((status) => (
              <button
                key={status}
                onClick={() => setStatusFilter(status)}
                className={`px-6 py-4 rounded-2xl font-semibold transition-all duration-300 capitalize ${
                  statusFilter === status
                    ? "bg-[#164C36] text-white shadow-lg"
                    : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-200"
                }`}
              >
                {status}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Projects Grid */}
        {!filteredProjects.length ? (
          <motion.div
            className="text-center py-20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <div className="w-32 h-32 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-6">
              <Search className="w-16 h-16 text-gray-400" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-3">No Projects Found</h3>
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
            {filteredProjects.map((project) => (
              <motion.div
                key={project._id}
                variants={itemVariants}
                className="group"
              >
                <Link href={`/projects/${project._id}`}>
                  <div className="bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100 group-hover:scale-105">
                    {/* Image Section */}
                    <div className="relative h-64 overflow-hidden">
                      {project.mainImage ? (
                        <Image
                          src={project.mainImage}
                          alt={project.name}
                          fill
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          className="object-cover group-hover:scale-110 transition-transform duration-700"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
                          <div className="text-center">
                            <div className="w-16 h-16 bg-gray-400 rounded-full flex items-center justify-center mx-auto mb-3">
                              <span className="text-white text-2xl">🏢</span>
                            </div>
                            <p className="text-gray-500 font-medium">Project Image</p>
                          </div>
                        </div>
                      )}

                      {/* Status Badge */}
                      <div className="absolute top-4 left-4">
                        <span className={`px-3 py-1.5 rounded-full text-white text-xs font-bold shadow-lg ${
                          project.status === "completed" ? "bg-green-500" :
                          project.status === "ongoing" ? "bg-blue-500" : "bg-yellow-500"
                        }`}>
                          {project.status}
                        </span>
                      </div>

                      {/* Featured Badge */}
                      {project.isFeatured && (
                        <div className="absolute top-4 right-4">
                          <span className="px-3 py-1.5 bg-[#A4CC36] rounded-full text-white text-xs font-bold shadow-lg flex items-center gap-1">
                            <Star size={12} className="fill-current" />
                            Featured
                          </span>
                        </div>
                      )}

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
                        {project.name}
                      </h3>

                      {project.location && (
                        <div className="flex items-center gap-2 text-gray-600 mb-3">
                          <MapPin size={16} className="text-[#A4CC36]" />
                          <span className="text-sm">{project.location}</span>
                        </div>
                      )}

                      {project.description && (
                        <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-2">
                          {project.description}
                        </p>
                      )}

                      {/* Amenities Preview */}
                      {project.amenities && project.amenities.length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-4">
                          {project.amenities.slice(0, 3).map((amenity, index) => (
                            <span
                              key={index}
                              className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full font-medium"
                            >
                              {amenity}
                            </span>
                          ))}
                          {project.amenities.length > 3 && (
                            <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full font-medium">
                              +{project.amenities.length - 3} more
                            </span>
                          )}
                        </div>
                      )}

                      {/* Project Meta */}
                      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                          <Clock size={14} />
                          <span className="capitalize">{project.status}</span>
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
              Ready to Start Your Project?
            </h2>
            <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto">
              Let's collaborate to bring your vision to life with our expertise in real estate development.
            </p>
            <motion.button
              className="px-8 py-4 bg-white text-[#164C36] rounded-xl font-bold text-lg hover:shadow-2xl transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Start a Conversation
            </motion.button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}