"use client";

import axiosInstance from "@/utils/axios";
import { motion } from "framer-motion";
import { Award, Calendar, Quote, Star } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

export interface Review {
  _id: string;
  name: string;
  email: string;
  rating: number;
  comment: string;
  image?: string;
  createdAt: string;
  updatedAt: string;
  designation?: string;
  company?: string;
  location?: string;
}

const HomePageReviews = () => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      const res = await axiosInstance.get<{ data: Review[] }>("/reviews");
      setReviews(res.data.data.slice(0, 6));
    } catch (err) {
      console.error(err);
      toast.error("Failed to load reviews");
    } finally {
      setLoading(false);
    }
  };

  // Function to strip HTML tags from comment
  const stripHTML = (html: string) => {
    return html.replace(/<[^>]+>/g, "");
  };

  // Format date
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
    });
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  if (loading) {
    return (
      <section className="bg-gradient-to-br from-gray-50 via-white to-green-50/30 py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#164C36] mx-auto mb-4"></div>
            <p className="text-gray-600">Loading reviews...</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-gradient-to-br from-gray-50 via-white to-green-50/30 py-20 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-10 left-10 w-32 h-32 bg-green-200 rounded-full opacity-20 animate-pulse"></div>
      <div className="absolute top-40 right-20 w-24 h-24 bg-[#A4CC36] rounded-full opacity-15 animate-pulse delay-1000"></div>
      <div className="absolute bottom-20 left-1/4 w-20 h-20 bg-[#164C36] rounded-full opacity-10 animate-pulse delay-500"></div>

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
            className="inline-flex items-center gap-2 px-6 py-3 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-green-100 mb-6"
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <Award className="text-[#164C36]" size={20} />
            <span className="text-sm font-semibold text-gray-700">
              Trusted by 500+ Clients
            </span>
          </motion.div>

          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Loved by <span className="text-[#164C36]">Our Clients</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Don't just take our word for it. Here's what our satisfied clients
            have to say about their experience working with us.
          </p>
        </motion.div>

        {/* Reviews Grid */}
        <motion.div
          className="grid gap-8 md:grid-cols-2 lg:grid-cols-3"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {reviews.map((review, index) => (
            <motion.div
              key={review._id}
              variants={itemVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -8 }}
              className="group h-full"
            >
              <div className="relative h-full bg-gradient-to-br from-white to-gray-50/80 backdrop-blur-sm rounded-3xl border border-gray-200/50 overflow-hidden transition-all duration-500 hover:shadow-2xl flex flex-col">
                {/* Decorative gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#164C36]/5 via-transparent to-[#A4CC36]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                {/* Top accent line */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#164C36] via-[#A4CC36] to-[#164C36]" />

                <div className="relative p-8 flex-1 flex flex-col">
                  {/* Header with Quote Icon */}
                  <div className="flex items-start justify-between mb-6">
                    <div className="relative">
                      <div className="absolute -inset-2 bg-gradient-to-r from-[#164C36] to-[#A4CC36] rounded-2xl opacity-20 blur-xl group-hover:opacity-30 transition-opacity" />
                      <div className="relative w-14 h-14 bg-gradient-to-br from-[#164C36] to-[#164C36]/80 rounded-2xl flex items-center justify-center shadow-lg">
                        <Quote className="text-white" size={24} />
                      </div>
                    </div>

                    {/* Rating Stars */}
                    <div className="flex items-center gap-1 bg-gray-100/50 px-3 py-1.5 rounded-full">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          size={16}
                          className={`transition-all duration-300 ${
                            star <= review.rating
                              ? "text-[#A4CC36] fill-[#A4CC36] drop-shadow-[0_0_8px_rgb(164,204,54)]"
                              : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Review Comment */}
                  <p className="text-gray-700 leading-relaxed mb-6 flex-1 line-clamp-4 text-base">
                    "{stripHTML(review.comment)}"
                  </p>

                  {/* Client Info Section */}
                  <div className="pt-6 border-t border-gray-200/50">
                    <div className="flex items-center gap-4">
                      {/* Profile Image with decorative ring */}
                      <div className="relative flex-shrink-0">
                        <div className="absolute -inset-1 bg-gradient-to-r from-[#164C36] to-[#A4CC36] rounded-full opacity-50 blur-md group-hover:opacity-75 transition-opacity" />
                        {review.image ? (
                          <Image
                            src={review.image}
                            alt={review.name}
                            width={64}
                            height={64}
                            className="relative w-16 h-16 rounded-full object-cover border-2 border-white shadow-lg"
                          />
                        ) : (
                          <div className="relative w-16 h-16 rounded-full bg-gradient-to-br from-[#164C36] to-[#A4CC36] flex items-center justify-center text-white font-bold text-xl shadow-lg border-2 border-white">
                            {review.name.charAt(0)}
                          </div>
                        )}
                        {/* Online indicator */}
                        <div className="absolute -bottom-0.5 -right-0.5 w-5 h-5 bg-[#A4CC36] rounded-full border-2 border-white shadow-lg" />
                      </div>

                      {/* Client Details */}
                      <div className="flex-1 min-w-0">
                        <h3 className="font-bold text-gray-900 text-lg truncate mb-0.5">
                          {review.name}
                        </h3>
                        {(review.designation || review.company) && (
                          <p className="text-sm text-gray-600 truncate mb-1">
                            {review.designation}
                            {review.designation && review.company && " • "}
                            {review.company}
                          </p>
                        )}
                        <div className="flex items-center gap-1.5 text-xs text-gray-500">
                          <Calendar size={14} className="text-[#A4CC36]" />
                          <span>{formatDate(review.createdAt)}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Empty State */}
        {reviews.length === 0 && (
          <motion.div
            className="text-center py-20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <div className="w-40 h-40 bg-gradient-to-br from-gray-100 to-gray-200 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-lg">
              <Quote className="w-16 h-16 text-gray-400" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              No Reviews Yet
            </h3>
            <p className="text-gray-600 max-w-md mx-auto text-lg mb-8">
              Be the first to share your wonderful experience with us.
            </p>
            <motion.button
              className="px-8 py-4 bg-gradient-to-r from-[#164C36] to-[#A4CC36] text-white rounded-2xl font-bold text-lg hover:shadow-2xl transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Share Your Story
            </motion.button>
          </motion.div>
        )}

        {/* CTA Section */}
        <motion.div
          className="text-center mt-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <div className="bg-gradient-to-r from-[#164C36] to-[#A4CC36] rounded-3xl p-12 text-white shadow-2xl relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full translate-y-12 -translate-x-12"></div>

            <div className="relative z-10">
              <h3 className="text-2xl md:text-3xl font-bold mb-4">
                Share Your Experience
              </h3>
              <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto">
                Your feedback inspires us to deliver exceptional service. Join
                our community of happy clients.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <motion.button
                  className="px-8 py-4 bg-white text-[#164C36] rounded-xl font-bold text-lg hover:shadow-2xl transition-all duration-300 flex items-center justify-center gap-2"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  ✨ Write a Review
                </motion.button>
                <motion.button
                  className="px-8 py-4 border-2 border-white text-white rounded-xl font-bold hover:bg-white hover:text-[#164C36] transition-all duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Read All Stories
                </motion.button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Custom CSS */}
      <style jsx>{`
        .line-clamp-4 {
          display: -webkit-box;
          -webkit-line-clamp: 4;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </section>
  );
};

export default HomePageReviews;
