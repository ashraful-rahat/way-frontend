"use client";

import { motion } from "framer-motion";

const AboutUs = () => {
  return (
    <div className="min-h-screen    mt-10 bg-gradient-to-br from-gray-50 to-green-50">
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
              About Way Housing
            </span>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 text-gray-900">
              Building for a{" "}
              <span className="text-[#164C36]">Better Future</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Since 2013, we&apos;ve been committed to creating sustainable
              communities with modern architecture at affordable prices.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Message From Chairman Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Chairman Image & Info */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="bg-gradient-to-br from-[#164C36] to-[#A4CC36] rounded-3xl p-8 text-white">
                <div className="w-32 h-32 mx-auto mb-6 rounded-full bg-white/20 flex items-center justify-center">
                  <span className="text-4xl">👨‍💼</span>
                </div>
                <h3 className="text-2xl font-bold text-center mb-2">
                  Md. Mosharof Hossain
                </h3>
                <p className="text-center text-white/80 mb-6">Chairman</p>

                {/* Signature */}
                <div className="text-center mt-8">
                  <div className="w-48 h-1 bg-white/30 mx-auto mb-2"></div>
                  <p className="text-sm text-white/70">Signature</p>
                </div>
              </div>
            </motion.div>

            {/* Chairman Message */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: true }}
            >
              <span className="inline-block px-4 py-2 bg-[#164C36] text-white rounded-full text-sm font-medium mb-4">
                Message From Chairman
              </span>
              <h2 className="text-3xl font-bold mb-6 text-gray-900">
                Building Dreams, Shaping Futures
              </h2>
              <div className="space-y-4 text-gray-700 leading-relaxed">
                <p>
                  Way Housing Pvt. Ltd (WHPL) is not only a company to build
                  properties and sale but it also facilitate the urban and rural
                  people to enjoy the modern architectures by ensuring the
                  affordable price.
                </p>
                <p>
                  We are also trying to decentralize the urban area by preparing
                  the commercial space and modern residential building in
                  semi-urban areas. It is mention worthy that the we are
                  different in marketing and sales policies.
                </p>
                <p>
                  Excellent goodwill in the market, corporate practice, well
                  trained & motivated personnel and commitment are the capital
                  of <strong>&ldquo;WHPL&ldquo;</strong>.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Who We Are Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-green-50">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="inline-block px-4 py-2 bg-[#A4CC36] text-white rounded-full text-sm font-medium mb-4">
              Our Story
            </span>
            <h2 className="text-4xl font-bold mb-6 text-gray-900">
              Who We Are
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Main Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: true }}
              className="space-y-6 text-gray-700 leading-relaxed text-lg"
            >
              <p>
                <strong>&quot;Way Housing Pvt. Ltd&quot;</strong>, is started
                its journey in 2013 having the motto of
                <strong>&ldquo;Build for better future&quot;</strong>. We are
                very much passionate in order to establish our theme. We believe
                in sustainable development which can ensure a better future.
              </p>
              <p>
                Our most important business focus on regional development. We
                are developing quality living services within optimum budget.
                Our two major services are residential apartment and shop space
                for the commercial purpose. Both products are designed
                considering the ability and expectations of mass peoples.
              </p>
              <p>
                Within this short period of time, we have received so many
                positive responses from the customer side. Due to the good
                responses from clients, we are expanding our service area very
                quickly.
              </p>
            </motion.div>

            {/* Stats & Expansion Info */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              {/* Stats Grid */}
              <div className="grid grid-cols-2 gap-6">
                <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 text-center">
                  <div className="text-3xl font-bold text-[#164C36] mb-2">
                    10+
                  </div>
                  <div className="text-gray-600">Years Experience</div>
                </div>
                <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 text-center">
                  <div className="text-3xl font-bold text-[#164C36] mb-2">
                    50+
                  </div>
                  <div className="text-gray-600">Projects Completed</div>
                </div>
                <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 text-center">
                  <div className="text-3xl font-bold text-[#164C36] mb-2">
                    1000+
                  </div>
                  <div className="text-gray-600">Happy Customers</div>
                </div>
                <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 text-center">
                  <div className="text-3xl font-bold text-[#164C36] mb-2">
                    5+
                  </div>
                  <div className="text-gray-600">Cities Covered</div>
                </div>
              </div>

              {/* Expansion Info */}
              <div className="bg-gradient-to-r from-[#164C36] to-[#A4CC36] rounded-2xl p-6 text-white">
                <h3 className="text-xl font-bold mb-3">Expanding Our Reach</h3>
                <p className="text-white/90">
                  Now we are working to take and develop some new projects in
                  greater Noakhali and some other prospective places including
                  Dhaka City and others. That&lsquo;s why we are encouraging
                  everyone to join with us, to support us to make something new.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Mission Vision Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Mission Card with Left to Right Hover Effect */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: true }}
              className="group relative bg-white rounded-3xl p-8 shadow-lg border border-gray-100 cursor-pointer overflow-hidden"
            >
              {/* Solid green overlay sliding left → right */}
              <div className="absolute inset-0 bg-gradient-to-r from-[#164C36] to-[#A4CC36] -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-in-out"></div>

              {/* Card content */}
              <div className="relative z-10">
                <div className="w-16 h-16 bg-[#164C36] rounded-2xl flex items-center justify-center mb-6 group-hover:bg-white transition-colors duration-500">
                  <span className="text-2xl text-white group-hover:text-[#164C36] transition-colors duration-500">
                    🎯
                  </span>
                </div>
                <h3 className="text-2xl font-bold mb-4 text-gray-900 group-hover:text-white transition-colors duration-500">
                  Our Mission
                </h3>
                <p className="text-gray-700 leading-relaxed group-hover:text-white/90 transition-colors duration-500">
                  To provide affordable, quality housing solutions with modern
                  architecture that bridges the gap between urban and rural
                  communities, ensuring sustainable development and customer
                  satisfaction.
                </p>
              </div>
            </motion.div>

            {/* Vision Card with Left to Right Hover Effect */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              viewport={{ once: true }}
              className="group relative bg-white rounded-3xl p-8 shadow-lg border border-gray-100 cursor-pointer overflow-hidden"
            >
              {/* Solid green overlay sliding left → right */}
              <div className="absolute inset-0 bg-gradient-to-r from-[#164C36] to-[#A4CC36] -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-in-out"></div>

              {/* Card content */}
              <div className="relative z-10">
                <div className="w-16 h-16 bg-[#164C36] rounded-2xl flex items-center justify-center mb-6 group-hover:bg-white transition-colors duration-500">
                  <span className="text-2xl text-white group-hover:text-[#164C36] transition-colors duration-500">
                    🌟
                  </span>
                </div>
                <h3 className="text-2xl font-bold mb-4 text-gray-900 group-hover:text-white transition-colors duration-500">
                  Our Vision
                </h3>
                <p className="text-gray-700 leading-relaxed group-hover:text-white/90 transition-colors duration-500">
                  To be the leading real estate developer in Bangladesh, known
                  for innovative designs, affordable pricing, and commitment to
                  regional development while building for a better future.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      {/* <section className="py-20 bg-gradient-to-r from-[#164C36] to-[#A4CC36]">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold mb-6 text-white">
              Ready to Build Your Dream?
            </h2>
            <p className="text-white/90 text-xl mb-8 max-w-2xl mx-auto">
              Join thousands of satisfied customers who have found their perfect
              home with Way Housing.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-white text-[#164C36] rounded-xl font-semibold hover:shadow-lg transition-all duration-300"
              >
                View Our Projects
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 border-2 border-white text-white rounded-xl font-semibold hover:bg-white/10 transition-all duration-300"
              >
                Contact Us
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section> */}
    </div>
  );
};

export default AboutUs;
