"use client";

import { motion } from "framer-motion";
import {
  ArrowRight,
  Building,
  Clock,
  Mail,
  Map,
  MapPin,
  MessageCircle,
  Navigation,
  Phone,
  Send,
  Star,
} from "lucide-react";
import { useState } from "react";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
  };

  // Map integration with Google Maps
  const MapSection = () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const headOfficeCoords = "23.763732,90.364804"; // Dhaka coordinates
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const corporateOfficeCoords = "23.746466,90.376015"; // Dhanmondi coordinates

    return (
      <div className="w-full h-full rounded-2xl overflow-hidden bg-gray-100">
        <iframe
          src={`https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3650.598346026865!2d90.3622299759961!3d23.793479478630445!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755c734a3e3df6d%3A0x5b0b1667c3516e7!2sDhanmondi%2C%20Dhaka!5e0!3m2!1sen!2sbd!4v1698765432107!5m2!1sen!2sbd`}
          width="100%"
          height="100%"
          style={{ border: 0, filter: "grayscale(0.2) contrast(1.1)" }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="rounded-2xl"
        />
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-white relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-20 left-10 w-72 h-72 bg-green-100 rounded-full opacity-20 blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.3, 0.2],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-20 right-10 w-96 h-96 bg-[#A4CC36] rounded-full opacity-10 blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      {/* Hero Section */}
      <section className="relative py-28 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <motion.span
              className="inline-block px-6 py-3 bg-white/80 backdrop-blur-sm border border-white/20 text-[#164C36] rounded-2xl text-sm font-semibold mb-6 shadow-2xl"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              🏢 Get In Touch With Way Housing
            </motion.span>
            <motion.h1
              className="text-6xl md:text-7xl font-black mb-8 text-gray-900 leading-tight"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              Let&lsquo;s Build Your
              <span className="block bg-gradient-to-r from-[#164C36] to-[#A4CC36] bg-clip-text text-transparent">
                Dream Together
              </span>
            </motion.h1>
            <motion.p
              className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Transforming Bangladesh&lsquo;s real estate landscape with world-class
              standards and innovative apartment solutions tailored for your
              community.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="relative py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
            {/* Contact Information Sidebar */}
            <div className="xl:col-span-1 space-y-8">
              {/* Quick Contact Card */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="bg-gradient-to-br from-[#164C36] to-[#2D5B47] rounded-3xl p-8 text-white shadow-2xl"
              >
                <h3 className="text-2xl font-bold mb-6">
                  Get Instant Response
                </h3>
                <div className="space-y-4">
                  <motion.a
                    href="tel:+8801407100300"
                    className="flex items-center justify-between p-4 bg-white/10 rounded-2xl hover:bg-white/20 transition-all duration-300 group"
                    whileHover={{ scale: 1.02 }}
                  >
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-white/20 rounded-xl">
                        <Phone size={20} />
                      </div>
                      <div>
                        <p className="font-semibold">+8801407100300</p>
                        <p className="text-white/70 text-sm">Call Now</p>
                      </div>
                    </div>
                    <ArrowRight
                      size={20}
                      className="opacity-0 group-hover:opacity-100 transform group-hover:translate-x-1 transition-all duration-300"
                    />
                  </motion.a>

                  <motion.a
                    href="mailto:info@wayhousing.com"
                    className="flex items-center justify-between p-4 bg-white/10 rounded-2xl hover:bg-white/20 transition-all duration-300 group"
                    whileHover={{ scale: 1.02 }}
                  >
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-white/20 rounded-xl">
                        <Mail size={20} />
                      </div>
                      <div>
                        <p className="font-semibold">info@wayhousing.com</p>
                        <p className="text-white/70 text-sm">Send Email</p>
                      </div>
                    </div>
                    <ArrowRight
                      size={20}
                      className="opacity-0 group-hover:opacity-100 transform group-hover:translate-x-1 transition-all duration-300"
                    />
                  </motion.a>
                </div>
              </motion.div>

              {/* Office Locations */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
                className="bg-white rounded-3xl p-8 shadow-2xl border border-gray-100"
              >
                <h3 className="text-2xl font-bold mb-6 text-gray-900">
                  Our Offices
                </h3>
                <div className="space-y-6">
                  {/* Corporate Office */}
                  <motion.div
                    className="group cursor-pointer p-4 rounded-2xl hover:bg-gray-50 transition-all duration-300"
                    whileHover={{ x: 5 }}
                  >
                    <div className="flex items-start space-x-3">
                      <div className="p-2 bg-[#164C36] rounded-xl text-white mt-1 group-hover:scale-110 transition-transform duration-300">
                        <Building size={18} />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-1">
                          Corporate Office
                        </h4>
                        <p className="text-gray-600 text-sm leading-relaxed">
                          Khan ABC Tradeplex, Road# 02, Level-02
                          <br />
                          Dhanmondi, Dhaka-1209
                        </p>
                      </div>
                    </div>
                  </motion.div>

                  {/* Head Office */}
                  <motion.div
                    className="group cursor-pointer p-4 rounded-2xl hover:bg-gray-50 transition-all duration-300"
                    whileHover={{ x: 5 }}
                  >
                    <div className="flex items-start space-x-3">
                      <div className="p-2 bg-[#A4CC36] rounded-xl text-white mt-1 group-hover:scale-110 transition-transform duration-300">
                        <MapPin size={18} />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-1">
                          Head Office
                        </h4>
                        <p className="text-gray-600 text-sm leading-relaxed">
                          849, East Shewrapara, Prime Bank, 6th Floor
                          <br />
                          Begum Rokeya Ave, Dhaka, Bangladesh
                        </p>
                      </div>
                    </div>
                  </motion.div>

                  {/* Rating */}
                  <div className="bg-green-50 rounded-2xl p-4 border border-green-100">
                    <div className="flex items-center space-x-2 mb-2">
                      <div className="flex items-center space-x-1">
                        {[1, 2, 3, 4].map((star) => (
                          <Star
                            key={star}
                            size={16}
                            className="text-yellow-400 fill-current"
                          />
                        ))}
                        <Star size={16} className="text-yellow-400" />
                      </div>
                      <span className="font-bold text-gray-900">4.3</span>
                      <span className="text-gray-600 text-sm">
                        (321 reviews)
                      </span>
                    </div>
                    <p className="text-gray-600 text-sm">
                      Excellent service rating
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Business Hours */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                viewport={{ once: true }}
                className="bg-white rounded-3xl p-8 shadow-2xl border border-gray-100"
              >
                <div className="flex items-center mb-6">
                  <div className="p-2 bg-[#164C36] rounded-xl text-white mr-4">
                    <Clock size={20} />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">
                    Business Hours
                  </h3>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between items-center py-3 border-b border-gray-100">
                    <span className="text-gray-600">Saturday - Thursday</span>
                    <span className="font-semibold text-gray-900">
                      9:00 AM - 6:00 PM
                    </span>
                  </div>
                  <div className="flex justify-between items-center py-3">
                    <span className="text-gray-600">Friday</span>
                    <span className="font-semibold text-gray-900">Closed</span>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Main Content - Form & Map */}
            <div className="xl:col-span-2 space-y-8">
              {/* Contact Form */}
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="bg-white rounded-3xl p-8 shadow-2xl border border-gray-100 relative overflow-hidden"
              >
                {/* Decorative Elements */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[#164C36] to-[#A4CC36] rounded-full -translate-y-16 translate-x-16 opacity-5"></div>

                <div className="relative z-10">
                  <div className="flex items-center mb-8">
                    <div className="p-3 bg-gradient-to-r from-[#164C36] to-[#A4CC36] rounded-2xl text-white mr-4 shadow-lg">
                      <MessageCircle size={28} />
                    </div>
                    <div>
                      <h2 className="text-3xl font-bold text-gray-900">
                        Send Message
                      </h2>
                      <p className="text-gray-600">
                        We&#39;ll get back to you within 24 hours
                      </p>
                    </div>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <motion.div
                        whileHover={{ scale: 1.02 }}
                        transition={{ duration: 0.2 }}
                      >
                        <label className="block text-sm font-semibold text-gray-700 mb-3">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-4 border-2 border-gray-200 rounded-2xl focus:border-[#A4CC36] focus:ring-2 focus:ring-[#A4CC36]/20 transition-all duration-300 bg-gray-50/50"
                          placeholder="Your full name"
                        />
                      </motion.div>
                      <motion.div
                        whileHover={{ scale: 1.02 }}
                        transition={{ duration: 0.2 }}
                      >
                        <label className="block text-sm font-semibold text-gray-700 mb-3">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-4 border-2 border-gray-200 rounded-2xl focus:border-[#A4CC36] focus:ring-2 focus:ring-[#A4CC36]/20 transition-all duration-300 bg-gray-50/50"
                          placeholder="your.email@example.com"
                        />
                      </motion.div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <motion.div
                        whileHover={{ scale: 1.02 }}
                        transition={{ duration: 0.2 }}
                      >
                        <label className="block text-sm font-semibold text-gray-700 mb-3">
                          Phone Number
                        </label>
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          className="w-full px-4 py-4 border-2 border-gray-200 rounded-2xl focus:border-[#A4CC36] focus:ring-2 focus:ring-[#A4CC36]/20 transition-all duration-300 bg-gray-50/50"
                          placeholder="+880 1234 567890"
                        />
                      </motion.div>
                      <motion.div
                        whileHover={{ scale: 1.02 }}
                        transition={{ duration: 0.2 }}
                      >
                        <label className="block text-sm font-semibold text-gray-700 mb-3">
                          Subject *
                        </label>
                        <input
                          type="text"
                          name="subject"
                          value={formData.subject}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-4 border-2 border-gray-200 rounded-2xl focus:border-[#A4CC36] focus:ring-2 focus:ring-[#A4CC36]/20 transition-all duration-300 bg-gray-50/50"
                          placeholder="What's this about?"
                        />
                      </motion.div>
                    </div>

                    <motion.div
                      whileHover={{ scale: 1.01 }}
                      transition={{ duration: 0.2 }}
                    >
                      <label className="block text-sm font-semibold text-gray-700 mb-3">
                        Your Message *
                      </label>
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        rows={6}
                        className="w-full px-4 py-4 border-2 border-gray-200 rounded-2xl focus:border-[#A4CC36] focus:ring-2 focus:ring-[#A4CC36]/20 transition-all duration-300 bg-gray-50/50 resize-none"
                        placeholder="Tell us about your dream project..."
                      />
                    </motion.div>

                    <motion.button
                      type="submit"
                      whileHover={{
                        scale: 1.02,
                        boxShadow: "0 20px 40px rgba(164, 204, 54, 0.3)",
                      }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full bg-gradient-to-r from-[#164C36] to-[#A4CC36] text-white py-5 rounded-2xl font-bold text-lg transition-all duration-300 flex items-center justify-center space-x-3 shadow-lg"
                    >
                      <span>Send Your Message</span>
                      <Send size={20} />
                    </motion.button>
                  </form>
                </div>
              </motion.div>

              {/* Real Map Integration */}
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                viewport={{ once: true }}
                className="bg-white rounded-3xl p-8 shadow-2xl border border-gray-100"
              >
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center">
                    <div className="p-3 bg-[#164C36] rounded-2xl text-white mr-4">
                      <Map size={24} />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900">
                        Find Our Offices
                      </h3>
                      <p className="text-gray-600">
                        Located in prime areas of Dhaka
                      </p>
                    </div>
                  </div>
                  <motion.a
                    href="https://maps.google.com/?q=Dhaka,Bangladesh"
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center space-x-2 px-6 py-3 bg-[#164C36] text-white rounded-xl font-semibold hover:bg-[#A4CC36] transition-colors duration-300"
                  >
                    <Navigation size={18} />
                    <span>Open Maps</span>
                  </motion.a>
                </div>

                {/* Actual Google Maps Integration */}
                <div className="h-96 rounded-2xl overflow-hidden border-2 border-gray-200">
                  <MapSection />
                </div>

                {/* Map Legend */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                  <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-xl">
                    <div className="w-3 h-3 bg-[#164C36] rounded-full"></div>
                    <span className="text-sm font-medium text-gray-700">
                      Corporate Office - Dhanmondi
                    </span>
                  </div>
                  <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-xl">
                    <div className="w-3 h-3 bg-[#A4CC36] rounded-full"></div>
                    <span className="text-sm font-medium text-gray-700">
                      Head Office - Shewrapara
                    </span>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactUs;
