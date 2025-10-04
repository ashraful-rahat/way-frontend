import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-r from-green-900 to-green-950 text-white border-t border-green-700">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-10">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10">
          {/* Logo and Company Info */}
          <div className="lg:col-span-1 space-y-4">
            <div className="mb-3">
              <Image
                src="/images/logo.png"
                alt="Way Housing Logo"
                width={140}
                height={45}
                className="h-9 w-auto brightness-0 invert"
              />
            </div>
            <p className="text-gray-200 hover:text-white text-base leading-relaxed">
              Your trusted partner in real estate and housing solutions.
            </p>
            {/* Social Media Icons - Compact */}
            <div className="flex space-x-3 pt-3">
              <a
                href="#"
                className="text-gray-300 hover:text-white transition-colors duration-200 p-2 hover:bg-green-800 rounded-lg"
              >
                <span className="sr-only">Facebook</span>
                <svg
                  className="h-5 w-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>
              <a
                href="#"
                className="text-gray-300 hover:text-white transition-colors duration-200 p-2 hover:bg-green-800 rounded-lg"
              >
                <span className="sr-only">Twitter</span>
                <svg
                  className="h-5 w-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                </svg>
              </a>
              <a
                href="#"
                className="text-gray-300 hover:text-white transition-colors duration-200 p-2 hover:bg-green-800 rounded-lg"
              >
                <span className="sr-only">LinkedIn</span>
                <svg
                  className="h-5 w-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links - Compact */}
          <div className="lg:col-span-1">
            <h3 className="text-lg font-semibold text-white mb-4 pb-2 border-b border-green-600 inline-block">
              Quick Links
            </h3>
            <ul className="space-y-2 mt-3">
              {[
                { href: "/help", label: "Help" },
                { href: "/contact", label: "Contact Us" },
                { href: "/career", label: "Career" },
                { href: "/terms", label: "Terms & Conditions" },
              ].map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-gray-200 hover:text-white text-sm transition-colors duration-200 hover:font-medium block py-1"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info - Compact */}
          <div className="lg:col-span-2">
            <h3 className="text-lg font-semibold text-white mb-4 pb-2 border-b border-green-600 inline-block">
              Contact Info
            </h3>
            <div className="space-y-3 mt-3">
              {/* Phone */}
              <div className="flex items-center space-x-3">
                <div className="bg-green-700 p-2 rounded-lg shrink-0">
                  <svg
                    className="h-4 w-4 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </svg>
                </div>
                <div>
                  <p className="text-white text-sm font-semibold">
                    +8801407100300
                  </p>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-center space-x-3">
                <div className="bg-green-700 p-2 rounded-lg shrink-0">
                  <svg
                    className="h-4 w-4 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <div>
                  <p className="text-white text-sm font-semibold">
                    info@wayhousing.com
                  </p>
                </div>
              </div>

              {/* Offices - Side by side on larger screens */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
                {/* Corporate Office */}
                <div className="flex items-start space-x-3">
                  <div className="bg-green-700 p-2 rounded-lg shrink-0 mt-0.5">
                    <svg
                      className="h-4 w-4 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                  </div>
                  <div>
                    <p className="text-green-200 text-xs font-medium mb-1">
                      Corporate Office
                    </p>
                    <p className="text-white text-xs">
                      Khan ABC Tradeplex, Road# 02, Level-02, Dhanmondi,
                      Dhaka-1209
                    </p>
                  </div>
                </div>

                {/* Head Office */}
                <div className="flex items-start space-x-3">
                  <div className="bg-green-700 p-2 rounded-lg shrink-0 mt-0.5">
                    <svg
                      className="h-4 w-4 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                      />
                    </svg>
                  </div>
                  <div>
                    <p className="text-green-200 text-xs font-medium mb-1">
                      Head Office
                    </p>
                    <p className="text-white text-xs">
                      849, East Shewrapara, Prime Bank, 6th Floor, Begum Rokeya
                      Ave, Dhaka
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar - More Compact */}
        <div className="border-t border-green-800 mt-8 pt-6 flex flex-col lg:flex-row justify-between items-center space-y-4 lg:space-y-0">
          <p className="text-gray-200 hover:text-white text-sm text-center lg:text-left">
            © {currentYear} Way Housing. All rights reserved.
          </p>
          <div className="flex space-x-6">
            <Link
              href="/privacy"
              className="text-gray-200 hover:text-white text-sm transition-colors duration-200"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="text-gray-200 hover:text-white text-sm transition-colors duration-200"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
