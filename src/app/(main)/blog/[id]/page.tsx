"use client";

import { useEffect, useState, useCallback } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import axiosInstance from "@/utils/axios";
import { motion } from "framer-motion";
import { 
  Calendar, 
  Clock, 
  User, 
  ArrowLeft,
  Heart,
  Tag,
  Eye,
  Facebook,
  Twitter,
  Linkedin,
  BookOpen
} from "lucide-react";
import Link from "next/link";
import { Blog, BlogApiResponse } from "@/type/types";


export default function SingleBlogPage() {
  const { id } = useParams();
  const [blog, setBlog] = useState<Blog | null>(null);
  const [loading, setLoading] = useState(true);
  const [isFavorite, setIsFavorite] = useState(false);
  const [relatedBlogs, setRelatedBlogs] = useState<Blog[]>([]);

  const fetchBlog = useCallback(async () => {
    if (!id) return;
    
    try {
      const res = await axiosInstance.get<BlogApiResponse>(`/blogs/${id}`);
      setBlog(res.data?.data as Blog || null);
      
      // Fetch related blogs based on category
      if (res.data?.data) {
        const blogData = res.data.data as Blog;
        const relatedRes = await axiosInstance.get<BlogApiResponse>(`/blogs`);
        const allBlogs = Array.isArray(relatedRes.data?.data) ? relatedRes.data.data : [];
        const related = allBlogs
          .filter((b: Blog) => b._id !== blogData._id && b.category === blogData.category)
          .slice(0, 3);
        setRelatedBlogs(related);
      }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error("Single Blog fetch error:", error.response?.data || error.message);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchBlog();
  }, [fetchBlog]);

  const formatDate = (date: Date | string) => {
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    return dateObj.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const shareOnSocialMedia = (platform: string) => {
    const url = typeof window !== 'undefined' ? window.location.href : '';
    const title = blog?.title || '';
    
    const shareUrls = {
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
      twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`
    };

    const shareUrl = shareUrls[platform as keyof typeof shareUrls];
    if (shareUrl && typeof window !== 'undefined') {
      window.open(shareUrl, '_blank', 'width=600,height=400');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 flex justify-center items-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-[#164C36] mx-auto mb-4"></div>
          <p className="text-gray-600 font-medium">Loading article...</p>
        </div>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 flex justify-center items-center">
        <div className="text-center">
          <div className="w-32 h-32 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-6">
            <BookOpen className="w-16 h-16 text-gray-400" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-3">Article Not Found</h3>
          <p className="text-gray-600 mb-6">The article you&lsquo;re looking for doesn&lsquo;t exist.</p>
          <Link href="/blog" className="px-6 py-3 bg-[#164C36] text-white rounded-xl font-semibold hover:bg-[#A4CC36] transition-colors duration-300">
            Back to Blog
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen mt-24 bg-white">
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-blue-100 rounded-full -translate-x-1/2 -translate-y-1/2 opacity-40"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#A4CC36] rounded-full translate-x-1/3 translate-y-1/3 opacity-10"></div>

      <div className="max-w-4xl mx-auto px-4 py-8 relative z-10">
        {/* Navigation */}
        <motion.div
          className="flex items-center justify-between mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Link href="/blog" className="flex items-center gap-2 text-gray-600 hover:text-[#164C36] transition-colors duration-300">
            <ArrowLeft size={20} />
            <span className="font-semibold">Back to Blog</span>
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
            
            <div className="flex items-center gap-2">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => shareOnSocialMedia('facebook')}
                className="p-3 bg-gray-50 border border-gray-200 rounded-2xl text-gray-600 hover:bg-blue-50 hover:text-blue-600 transition-colors duration-300"
              >
                <Facebook size={20} />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => shareOnSocialMedia('twitter')}
                className="p-3 bg-gray-50 border border-gray-200 rounded-2xl text-gray-600 hover:bg-blue-50 hover:text-blue-400 transition-colors duration-300"
              >
                <Twitter size={20} />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => shareOnSocialMedia('linkedin')}
                className="p-3 bg-gray-50 border border-gray-200 rounded-2xl text-gray-600 hover:bg-blue-50 hover:text-blue-700 transition-colors duration-300"
              >
                <Linkedin size={20} />
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* Article Header */}
        <motion.header
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Category */}
          <span className="inline-block px-4 py-2 bg-[#164C36] text-white rounded-full text-sm font-bold mb-6">
            {blog.category}
          </span>

          {/* Title */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 mb-6 leading-tight">
            {blog.title}
          </h1>

          {/* Meta Information */}
          <div className="flex flex-wrap items-center justify-center gap-6 text-gray-600 mb-8">
            <div className="flex items-center gap-2">
              <User size={20} className="text-[#A4CC36]" />
              <span className="font-medium">{blog.author}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar size={20} className="text-[#A4CC36]" />
              <span className="font-medium">{formatDate(blog.createdAt)}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock size={20} className="text-[#A4CC36]" />
              <span className="font-medium">{blog.readTime || 5} min read</span>
            </div>
            <div className="flex items-center gap-2">
              <Eye size={20} className="text-[#A4CC36]" />
              <span className="font-medium">{blog.views || 0} views</span>
            </div>
          </div>

          {/* Tags */}
   {blog.tags.map((tag: string, index: number) => (
  <span
    key={index}
    className="px-3 py-1.5 bg-gray-100 text-gray-700 rounded-full text-sm font-medium flex items-center gap-1"
  >
    <Tag size={14} />
    {tag}
  </span>
))}
        </motion.header>

        {/* Featured Image */}
        <motion.div
          className="relative h-96 rounded-3xl overflow-hidden shadow-2xl mb-12"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {blog.image ? (
            <Image
              src={blog.image}
              alt={blog.title}
              fill
              className="object-cover"
              priority
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
              <div className="text-center">
                <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-3" />
                <p className="text-gray-500 font-medium">Blog Image</p>
              </div>
            </div>
          )}
        </motion.div>

        {/* Article Content */}
        <motion.article
          className="prose prose-lg max-w-none mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          {/* Short Description */}
          <div className="text-xl text-gray-700 leading-relaxed mb-8 font-medium bg-blue-50 p-6 rounded-2xl border-l-4 border-[#164C36]">
            {blog.shortDescription}
          </div>

          {/* Main Content */}
          <div 
            className="blog-content"
            dangerouslySetInnerHTML={{ __html: blog.content }}
          />
        </motion.article>

        {/* Article Footer */}
        <motion.footer
          className="border-t border-gray-200 pt-8 mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-[#164C36] rounded-full flex items-center justify-center text-white font-bold">
               {blog.author.split(' ').map((n: string) => n[0]).join('')}

              </div>
              <div>
                <p className="font-semibold text-gray-900">{blog.author}</p>
                <p className="text-gray-600 text-sm">Article Author</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <span className="text-gray-600 text-sm">Share this article:</span>
              <div className="flex gap-2">
                {['facebook', 'twitter', 'linkedin'].map((platform) => (
                  <motion.button
                    key={platform}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => shareOnSocialMedia(platform)}
                    className="p-2 bg-gray-100 rounded-xl hover:bg-gray-200 transition-colors duration-300"
                  >
                    {platform === 'facebook' && <Facebook size={18} className="text-blue-600" />}
                    {platform === 'twitter' && <Twitter size={18} className="text-blue-400" />}
                    {platform === 'linkedin' && <Linkedin size={18} className="text-blue-700" />}
                  </motion.button>
                ))}
              </div>
            </div>
          </div>
        </motion.footer>

        {/* Related Articles */}
        {relatedBlogs.length > 0 && (
          <motion.section
            className="mb-16"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Related Articles</h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {relatedBlogs.map((relatedBlog) => (
                <Link key={relatedBlog._id} href={`/blog/${relatedBlog._id}`}>
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100"
                  >
                    <div className="relative h-40">
                      {relatedBlog.image && (
                        <Image
                          src={relatedBlog.image}
                          alt={relatedBlog.title}
                          fill
                          className="object-cover"
                        />
                      )}
                    </div>
                    <div className="p-4">
                      <h3 className="font-bold text-gray-900 mb-2 line-clamp-2">
                        {relatedBlog.title}
                      </h3>
                      <p className="text-gray-600 text-sm line-clamp-2 mb-3">
                        {relatedBlog.shortDescription}
                      </p>
                      <div className="flex items-center justify-between text-xs text-gray-500">
                        <span>{formatDate(relatedBlog.createdAt)}</span>
                        <span>{relatedBlog.readTime || 5} min read</span>
                      </div>
                    </div>
                  </motion.div>
                </Link>
              ))}
            </div>
          </motion.section>
        )}

        {/* Newsletter CTA */}
        <motion.section
          className="bg-gradient-to-r from-[#164C36] to-[#A4CC36] rounded-3xl p-12 text-white text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
        >
          <h2 className="text-3xl font-bold mb-4">
            Enjoyed This Article?
          </h2>
          <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto">
            Subscribe to our newsletter to get more insightful articles about real estate, 
            property investment, and market trends delivered straight to your inbox.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-6 py-4 rounded-2xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-white/20"
            />
            <motion.button
              className="px-8 py-4 bg-white text-[#164C36] rounded-2xl font-bold hover:shadow-2xl transition-all duration-300 whitespace-nowrap"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Subscribe Now
            </motion.button>
          </div>
        </motion.section>
      </div>

      {/* Custom Styles for Blog Content */}
      <style jsx global>{`
        .blog-content {
          line-height: 1.8;
          color: #374151;
        }
        
        .blog-content h2 {
          font-size: 2rem;
          font-weight: bold;
          color: #111827;
          margin: 2rem 0 1rem;
          line-height: 1.3;
        }
        
        .blog-content h3 {
          font-size: 1.5rem;
          font-weight: bold;
          color: #111827;
          margin: 1.5rem 0 1rem;
        }
        
        .blog-content p {
          margin-bottom: 1.5rem;
        }
        
        .blog-content ul, .blog-content ol {
          margin-bottom: 1.5rem;
          padding-left: 1.5rem;
        }
        
        .blog-content li {
          margin-bottom: 0.5rem;
        }
        
        .blog-content blockquote {
          border-left: 4px solid #164C36;
          padding-left: 1.5rem;
          margin: 2rem 0;
          font-style: italic;
          color: #6B7280;
        }
        
        .blog-content img {
          border-radius: 1rem;
          margin: 2rem 0;
        }
        
        .blog-content a {
          color: #164C36;
          text-decoration: underline;
          font-weight: 500;
        }
        
        .blog-content a:hover {
          color: #A4CC36;
        }
      `}</style>
    </div>
  );
}