"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import axiosInstance from "@/utils/axios";
import { motion, Variants } from "framer-motion";
import { 
  MapPin, 
  Star, 
  ArrowRight
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

const FeaturedProjects = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchProjects = async () => {
    try {
      const res = await axiosInstance.get<ProjectsApiResponse>("/projects");
      const featuredProjects = res.data?.data
        ?.filter(project => project.isFeatured)
        .slice(0, 4) || [];
      setProjects(featuredProjects);
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

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const itemVariants: Variants = {
  hidden: { 
    opacity: 0, 
    y: 20 
  },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.25, 0.1, 0.25, 1], // cubic-bezier for easeOut
    },
  },
};

  if (loading) {
    return (
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">Featured Projects</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(4)].map((_, index) => (
              <div key={index} className="bg-white rounded-xl shadow-sm p-4 animate-pulse">
                <div className="w-full h-48 bg-gray-300 rounded-lg mb-4"></div>
                <div className="h-4 bg-gray-300 rounded mb-2"></div>
                <div className="h-4 bg-gray-300 rounded w-3/4"></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (!projects.length) {
    return null;
  }

  return (
    <section className="py-16 bg-gradient-to-br from-gray-50 to-green-50">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Featured Projects
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover our premium real estate developments designed for modern living
          </p>
        </motion.div>

        {/* Projects Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {projects.map((project) => (
            <motion.div
              key={project._id}
              variants={itemVariants}
              className="group"
            >
              <Link href={`/projects/${project._id}`}>
                <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden border border-gray-100 group-hover:scale-105 h-full flex flex-col">
                  
                  {/* Image Section */}
                  <div className="relative h-48 overflow-hidden">
                    {project.mainImage ? (
                      <Image
                        src={project.mainImage}
                        alt={project.name}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    ) : (
                      <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                        <div className="text-center text-gray-500">
                          <div className="text-2xl mb-1">🏢</div>
                          <p className="text-sm">No Image</p>
                        </div>
                      </div>
                    )}

                    {/* Status Badge */}
                    <div className="absolute top-2 left-2">
                      <span className={`px-2 py-1 rounded-full text-white text-xs font-medium ${
                        project.status === "completed" ? "bg-green-500" :
                        project.status === "ongoing" ? "bg-blue-500" : "bg-yellow-500"
                      }`}>
                        {project.status}
                      </span>
                    </div>

                    {/* Featured Badge */}
                    {project.isFeatured && (
                      <div className="absolute top-2 right-2">
                        <span className="px-2 py-1 bg-[#164C36] rounded-full text-white text-xs font-medium flex items-center gap-1">
                          <Star size={10} className="fill-current" />
                          Featured
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Content Section */}
                  <div className="p-4 flex-1 flex flex-col">
                    <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-[#164C36] transition-colors duration-300 line-clamp-2">
                      {project.name}
                    </h3>

                    {project.location && (
                      <div className="flex items-center gap-1 text-gray-600 mb-2">
                        <MapPin size={14} className="text-[#164C36] flex-shrink-0" />
                        <span className="text-sm line-clamp-1">{project.location}</span>
                      </div>
                    )}

                    {project.description && (
                      <p className="text-gray-600 text-sm leading-relaxed mb-3 line-clamp-2 flex-1">
                        {project.description}
                      </p>
                    )}

                    {/* Bottom Section */}
                    <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                      <div className="text-[#164C36] text-sm font-medium">
                        View Details
                      </div>
                      <ArrowRight size={16} className="text-[#164C36] group-hover:translate-x-1 transition-transform duration-300" />
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {/* View All Button */}
        <motion.div
          className="text-center mt-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <Link href="/projects">
            <button className="px-6 py-2 bg-[#164C36] text-white rounded-lg font-medium hover:bg-[#A4CC36] transition-colors duration-300">
              View All Projects
            </button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturedProjects;