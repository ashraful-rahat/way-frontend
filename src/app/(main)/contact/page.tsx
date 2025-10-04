"use client";

import { motion } from "framer-motion";
import {
  ArrowRight,
  Building,
  Mail,
  MapPin,
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
    // Handle form submission here
    console.log("Form submitted:", formData);
  };

  const contactInfo = [
    {
      icon: Phone,
      title: "Phone Number",
      details: ["+8801407100300"],
      bgColor: "bg-green-500",
    },
    {
      icon: Mail,
      title: "Email Address",
      details: ["info@wayhousing.com"],
      bgColor: "bg-blue-500",
    },
    {
      icon: Building,
      title: "Corporate Office",
      details: [
        "Khan ABC Tradeplex, Road# 02, Level-02",
        "Dhanmondi, Dhaka-1209",
      ],
      bgColor: "bg-purple-500",
    },
    {
      icon: Building,
      title: "Head Office",
      details: [
        "849, East Shewrapara, Prime Bank, 6th Floor",
        "Begum Rokeya Ave, Dhaka, Bangladesh",
      ],
      bgColor: "bg-orange-500",
    },
  ];

  const usefulLinks = [
    { name: "Home", href: "/" },
    { name: "Project", href: "/projects" },
    { name: "Blog", href: "/blog" },
    { name: "About Us", href: "/about" },
    { name: "Support", href: "/support" },
    { name: "Help", href: "/help" },
    { name: "Contact Us", href: "/contact" },
    { name: "Career", href: "/career" },
    { name: "Terms and Condition", href: "/terms" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-green-50">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        {/* Background Elements */}
        <div className="absolute top-0 left-0 w-72 h-72 bg-green-100 rounded-full -translate-x-1/2 -translate-y-1/2 opacity-40"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#A4CC36] rounded-full translate-x-1/3 translate-y-1/3 opacity-10"></div>

        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-block px-4 py-2 bg-[#A4CC36] text-white rounded-full text-sm font-medium mb-4">
              Get In Touch
            </span>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 text-gray-900">
              Contact <span className="text-[#164C36]">Way Housing</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Way Housing Pvt. Ltd. is improving and contributing to the culture
              of real estate companies in Bangladesh with world-class best
              practices.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Information & Form Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Information */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold mb-8 text-gray-900">
                Contact Information
              </h2>
              <p className="text-gray-600 mb-8 leading-relaxed">
                Focusing on apartment sales in your own town with our own
                standards in line with world-class best practices in the real
                estate industry.
              </p>

              {/* Contact Info Cards */}
              <div className="space-y-6 mb-12">
                {contactInfo.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="flex items-start space-x-4 p-6 bg-gray-50 rounded-2xl hover:shadow-lg transition-all duration-300 group cursor-pointer"
                  >
                    <div
                      className={`p-3 rounded-xl text-white ${item.bgColor} group-hover:scale-110 transition-transform duration-300`}
                    >
                      <item.icon size={24} />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2">
                        {item.title}
                      </h3>
                      {item.details.map((detail, idx) => (
                        <p key={idx} className="text-gray-600">
                          {detail}
                        </p>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Useful Links */}
              <div>
                <h3 className="text-xl font-bold mb-6 text-gray-900">
                  Useful Links
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  {usefulLinks.map((link, index) => (
                    <motion.a
                      key={index}
                      href={link.href}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.05 }}
                      viewport={{ once: true }}
                      className="flex items-center space-x-2 text-gray-600 hover:text-[#164C36] transition-colors duration-300 group"
                    >
                      <ArrowRight
                        size={16}
                        className="group-hover:translate-x-1 transition-transform duration-300"
                      />
                      <span>{link.name}</span>
                    </motion.a>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-gray-50 to-green-50 rounded-3xl p-8 shadow-lg border border-gray-100"
            >
              <div className="flex items-center mb-6">
                <div className="p-3 bg-[#164C36] rounded-xl text-white mr-4">
                  <Send size={24} />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">
                  Send us a Message
                </h2>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#A4CC36] focus:border-transparent transition-all duration-300"
                      placeholder="Enter your full name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#A4CC36] focus:border-transparent transition-all duration-300"
                      placeholder="Enter your email"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#A4CC36] focus:border-transparent transition-all duration-300"
                      placeholder="Enter your phone number"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Subject *
                    </label>
                    <input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#A4CC36] focus:border-transparent transition-all duration-300"
                      placeholder="Enter subject"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Message *
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#A4CC36] focus:border-transparent transition-all duration-300 resize-none"
                    placeholder="Tell us about your requirements..."
                  />
                </div>

                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-gradient-to-r from-[#164C36] to-[#A4CC36] text-white py-4 rounded-xl font-semibold text-lg hover:shadow-lg transition-all duration-300 flex items-center justify-center space-x-2"
                >
                  <span>Send Message</span>
                  <Send size={20} />
                </motion.button>
              </form>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Location & Map Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-green-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Location Details */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold mb-8 text-gray-900">
                Our Locations
              </h2>

              {/* Corporate Office */}
              <div className="mb-8">
                <h3 className="text-xl font-bold mb-4 text-gray-900">
                  Corporate Office
                </h3>
                <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                  <div className="flex items-start space-x-4">
                    <Building
                      className="text-[#164C36] mt-1 flex-shrink-0"
                      size={24}
                    />
                    <div>
                      <p className="text-gray-700 font-medium mb-2">
                        Khan ABC Tradeplex, Road# 02, Level-02
                      </p>
                      <p className="text-gray-600">Dhanmondi, Dhaka-1209</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Head Office */}
              <div className="mb-8">
                <h3 className="text-xl font-bold mb-4 text-gray-900">
                  Head Office
                </h3>
                <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                  <div className="flex items-start space-x-4">
                    <Building
                      className="text-[#164C36] mt-1 flex-shrink-0"
                      size={24}
                    />
                    <div>
                      <p className="text-gray-700 font-medium mb-2">
                        849, East Shewrapara, Prime Bank, 6th Floor
                      </p>
                      <p className="text-gray-600">
                        Begum Rokeya Ave, Dhaka, Bangladesh
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Additional Location */}
              <div>
                <h3 className="text-xl font-bold mb-4 text-gray-900">
                  Khan ABC Tradeplex
                </h3>
                <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                  <div className="flex items-start space-x-4">
                    <MapPin
                      className="text-[#164C36] mt-1 flex-shrink-0"
                      size={24}
                    />
                    <div>
                      <p className="text-gray-700 font-medium mb-2">
                        Khan ABC Tradeplex, House#37 Road#02
                      </p>
                      <p className="text-gray-600 mb-4">Dhaka 1205</p>

                      {/* Reviews */}
                      <div className="flex items-center space-x-2 bg-green-50 px-3 py-2 rounded-lg">
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
                        <span className="text-sm font-medium text-gray-700">
                          4.3
                        </span>
                        <span className="text-sm text-gray-500">
                          (321 reviews)
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Map Section */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <div className="bg-white rounded-3xl p-8 shadow-lg border border-gray-100 h-96 flex flex-col">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-2xl font-bold text-gray-900">
                    Find Us Here
                  </h3>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center space-x-2 px-4 py-2 bg-[#164C36] text-white rounded-xl font-semibold hover:bg-[#A4CC36] transition-colors duration-300"
                  >
                    <Navigation size={18} />
                    <span>Get Directions</span>
                  </motion.button>
                </div>

                {/* Map Placeholder */}
                <div className="flex-1 bg-gradient-to-br from-gray-100 to-green-100 rounded-2xl flex items-center justify-center">
                  <div className="text-center">
                    <MapPin size={48} className="text-[#A4CC36] mx-auto mb-4" />
                    <p className="text-gray-600 font-medium">Interactive Map</p>
                    <p className="text-gray-500 text-sm mt-2">
                      Google Maps Integration
                    </p>
                  </div>
                </div>

                <div className="mt-4 text-center">
                  <p className="text-gray-600 text-sm">
                    View larger map for detailed directions
                  </p>
                </div>
              </div>

              {/* Quick Contact */}
              <div className="bg-gradient-to-r from-[#164C36] to-[#A4CC36] rounded-2xl p-6 text-white">
                <h4 className="font-bold text-lg mb-3">
                  Need Immediate Assistance?
                </h4>
                <p className="text-white/90 mb-4">
                  Call us directly for quick support
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Phone size={20} />
                    <span className="font-semibold">+8801407100300</span>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-4 py-2 bg-white text-[#164C36] rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-300"
                  >
                    Call Now
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold mb-6 text-gray-900">
              Ready to Find Your Dream Home?
            </h2>
            <p className="text-gray-600 text-xl mb-8 max-w-2xl mx-auto">
              Way Housing Pvt. Ltd. - Setting new standards in Bangladesh real
              estate with world-class practices and focus on apartment sales in
              your own town.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-gradient-to-r from-[#164C36] to-[#A4CC36] text-white rounded-xl font-semibold hover:shadow-lg transition-all duration-300"
              >
                Call: +8801407100300
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 border-2 border-[#164C36] text-[#164C36] rounded-xl font-semibold hover:bg-[#164C36] hover:text-white transition-all duration-300"
              >
                Email: info@wayhousing.com
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default ContactUs;
