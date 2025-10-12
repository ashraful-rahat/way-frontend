"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import axiosInstance from "@/utils/axios";
import { motion, Variants } from "framer-motion";
import { 
  Calendar, 
  Clock, 
  User, 
  ArrowRight,
  Search,
  Tag,
  Eye
} from "lucide-react";
import { Blog, BlogApiResponse } from "@/type/types";

export default function BlogPage() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [categories, setCategories] = useState<string[]>([]);

  const fetchBlogs = async () => {
    try {
      const res = await axiosInstance.get<BlogApiResponse>("/blogs");
      const blogsData = Array.isArray(res.data?.data) ? res.data.data : [];
      setBlogs(blogsData);
      
      // Extract unique categories
      const uniqueCategories = [...new Set(blogsData.map(blog => blog.category))] as string[];
      setCategories(uniqueCategories);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error("Blog fetch error:", error.response?.data || error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  // Filter blogs based on search and category
  const filteredBlogs = blogs.filter(blog => {
    const matchesSearch = blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         blog.shortDescription.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         blog.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = categoryFilter === "all" || blog.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const containerVariants :Variants= {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants :Variants = {
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

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 flex justify-center items-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-[#164C36] mx-auto mb-4"></div>
          <p className="text-gray-600 font-medium">Loading amazing articles...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen mt-24 bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-blue-100 rounded-full -translate-x-1/2 -translate-y-1/2 opacity-40"></div>
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
            📚 Our Blog
          </motion.span>
          <h1 className="text-5xl md:text-6xl font-bold mb-6 text-gray-900">
            Latest <span className="text-[#164C36]">Insights</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Discover valuable articles, tips, and industry insights about real estate, 
            property investment, and modern living trends.
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
              placeholder="Search articles by title, content, or tags..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-4 bg-white rounded-2xl border border-gray-200 focus:border-[#A4CC36] focus:ring-2 focus:ring-[#A4CC36]/20 transition-all duration-300 shadow-lg"
            />
          </div>

          {/* Category Filter */}
          <div className="flex gap-2 overflow-x-auto pb-2">
            <button
              onClick={() => setCategoryFilter("all")}
              className={`px-6 py-4 rounded-2xl font-semibold transition-all duration-300 whitespace-nowrap ${
                categoryFilter === "all"
                  ? "bg-[#164C36] text-white shadow-lg"
                  : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-200"
              }`}
            >
              All Categories
            </button>
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setCategoryFilter(category)}
                className={`px-6 py-4 rounded-2xl font-semibold transition-all duration-300 whitespace-nowrap ${
                  categoryFilter === category
                    ? "bg-[#164C36] text-white shadow-lg"
                    : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-200"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Blogs Grid */}
        {!filteredBlogs.length ? (
          <motion.div
            className="text-center py-20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <div className="w-32 h-32 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-6">
              <Search className="w-16 h-16 text-gray-400" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-3">No Articles Found</h3>
            <p className="text-gray-600 max-w-md mx-auto">
              Try adjusting your search criteria or filter to find what you&apos;re looking for.
            </p>
          </motion.div>
        ) : (
          <motion.div
            className="grid gap-8 md:grid-cols-2 lg:grid-cols-3"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {filteredBlogs.map((blog) => (
              <motion.div
                key={blog._id}
                variants={itemVariants}
                className="group"
              >
                <Link href={`/blog/${blog._id}`}>
                  <div className="bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100 group-hover:scale-105 h-full flex flex-col">
                    {/* Image Section */}
                    <div className="relative h-48 overflow-hidden">
                      {blog.image ? (
                        <Image
                          src={blog.image}
                          alt={blog.title}
                          fill
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          className="object-cover group-hover:scale-110 transition-transform duration-700"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
                          <div className="text-center">
                            <div className="w-16 h-16 bg-gray-400 rounded-full flex items-center justify-center mx-auto mb-3">
                              <span className="text-white text-2xl">📝</span>
                            </div>
                            <p className="text-gray-500 font-medium">Blog Image</p>
                          </div>
                        </div>
                      )}

                      {/* Category Badge */}
                      <div className="absolute top-4 left-4">
                        <span className="px-3 py-1.5 bg-[#164C36] rounded-full text-white text-xs font-bold shadow-lg">
                          {blog.category}
                        </span>
                      </div>

                      {/* Overlay Gradient */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                      {/* View Details Button */}
                      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500">
                        <button className="px-6 py-2 bg-white text-[#164C36] rounded-xl font-semibold flex items-center gap-2 hover:bg-gray-50 transition-colors duration-300">
                          Read More
                          <ArrowRight size={16} />
                        </button>
                      </div>
                    </div>

                    {/* Content Section */}
                    <div className="p-6 flex-1 flex flex-col">
                      <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-[#164C36] transition-colors duration-300 line-clamp-2">
                        {blog.title}
                      </h3>

                      <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-3 flex-1">
                        {blog.shortDescription}
                      </p>

                      {/* Tags */}
                      {blog.tags && blog.tags.length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-4">
                          {blog.tags.slice(0, 3).map((tag, index) => (
                            <span
                              key={index}
                              className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full font-medium flex items-center gap-1"
                            >
                              <Tag size={12} />
                              {tag}
                            </span>
                          ))}
                          {blog.tags.length > 3 && (
                            <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full font-medium">
                              +{blog.tags.length - 3} more
                            </span>
                          )}
                        </div>
                      )}

                      {/* Blog Meta */}
                      <div className="flex items-center justify-between pt-4 border-t border-gray-100 mt-auto">
                        <div className="flex items-center gap-4 text-sm text-gray-500">
                          <div className="flex items-center gap-1">
                            <User size={14} />
                            <span>{blog.author}</span>
                          </div>
                      <div className="flex items-center gap-1">
  <Calendar size={14} />
  <span>{formatDate(blog.createdAt.toString())}</span>
</div>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                          <Clock size={14} />
                          <span>{blog.readTime || 5} min read</span>
                        </div>
                      </div>

                      {/* Views Count */}
                      <div className="flex items-center gap-1 text-xs text-gray-400 mt-2">
                        <Eye size={12} />
                        <span>{blog.views || 0} views</span>
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
              Stay Updated with Our Insights
            </h2>
            <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto">
              Subscribe to our newsletter and never miss the latest real estate trends, 
              investment tips, and property market updates.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-6 py-4 rounded-2xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-white/10"
              />
              <motion.button
                className="px-8 py-4 bg-white text-[#164C36] rounded-2xl font-bold hover:shadow-2xl transition-all duration-300 whitespace-nowrap"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Subscribe Now
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}