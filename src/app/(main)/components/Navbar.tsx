"use client";
import { gsap } from "gsap";
import { Menu, Phone, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

interface MenuItem {
  label: string;
  ariaLabel?: string;
  link: string;
}

const menuItems: MenuItem[] = [
  { label: "Home", ariaLabel: "Go to home page", link: "/" },
  { label: "About Us", ariaLabel: "Learn about us", link: "/about" },
  {
    label: "Way Housing",
    ariaLabel: "Way Housing project",
    link: "/way-housing",
  },
  { label: "Project", ariaLabel: "Our projects", link: "/project" },
  { label: "Contact Us", ariaLabel: "Get in touch", link: "/contact" },
  { label: "Blog", ariaLabel: "Read our blog", link: "/blog" },
  { label: "Login", ariaLabel: "Login to account", link: "/login" },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navbarRef = useRef<HTMLElement>(null);
  const drawerRef = useRef<HTMLDivElement>(null);
  const menuItemsRef = useRef<HTMLAnchorElement[]>([]);
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (navbarRef.current) {
      gsap.fromTo(
        navbarRef.current,
        { y: -100, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" }
      );
    }
  }, []);

  useEffect(() => {
    if (isOpen && drawerRef.current && overlayRef.current) {
      const tl = gsap.timeline();

      tl.fromTo(
        overlayRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.3, ease: "power2.out" }
      )
        .fromTo(
          drawerRef.current,
          { x: "100%", opacity: 0 },
          { x: "0%", opacity: 1, duration: 0.6, ease: "power3.out" },
          "-=0.2"
        )
        .fromTo(
          menuItemsRef.current,
          { y: 20, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.5,
            stagger: 0.08,
            ease: "power3.out",
          },
          "-=0.2"
        );
    }
  }, [isOpen]);

  const toggleDrawer = () => {
    if (isOpen && drawerRef.current && overlayRef.current) {
      const tl = gsap.timeline({
        onComplete: () => setIsOpen(false),
      });

      tl.to(menuItemsRef.current, {
        y: 20, // পরিবর্তিত: x এর পরিবর্তে y ব্যবহার করা হয়েছে
        opacity: 0,
        duration: 0.3,
        stagger: 0.05,
        ease: "power2.in",
      })
        .to(drawerRef.current, {
          x: "100%",
          opacity: 0,
          duration: 0.4,
          ease: "power3.in",
        })
        .to(
          overlayRef.current,
          {
            opacity: 0,
            duration: 0.3,
          },
          "-=0.3"
        );
    } else {
      setIsOpen(true);
    }
  };

  return (
    <>
      <header
        ref={navbarRef}
        className="fixed top-0 left-0 w-full bg-white/80 backdrop-blur-md border-b border-gray-200/20 z-50 shadow-sm"
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
          <Link href="/" className="flex items-center">
            <Image
              src="/images/logo.png"
              alt="Company Logo"
              width={110}
              height={40}
              className="object-contain"
            />
          </Link>

          <div className="hidden md:flex items-center gap-6">
            <div className="flex items-center gap-2 text-gray-700">
              <Phone size={23} className="text-primary" />
              <span className="font-medium text-md">+88 01407-100300</span>
            </div>
            <button
              onClick={toggleDrawer}
              className="p-2 rounded-lg hover:bg-gray-100/50 transition-colors duration-200"
              aria-label={isOpen ? "Close menu" : "Open menu"}
            >
              <Menu size={25} className="text-gray-700" />
            </button>
          </div>

          <button
            onClick={toggleDrawer}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100/50 transition-colors duration-200"
            aria-label={isOpen ? "Close menu" : "Open menu"}
          >
            <Menu size={24} className="text-gray-700" />
          </button>
        </div>
      </header>

      {isOpen && (
        <div
          ref={overlayRef}
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
          onClick={toggleDrawer}
        />
      )}

      {isOpen && (
        <div
          ref={drawerRef}
          className="fixed top-0 right-0 h-full md:w-85 w-70 xl:w-150  bg-white/95 backdrop-blur-xl shadow-2xl z-50 border-l border-gray-200/30"
        >
          <div className="flex flex-col h-full">
            <div className="flex items-center justify-between p-6 border-b border-gray-200/30">
              <h2 className="text-3xl font-semibold text-gray-800">Menu</h2>
              <button
                onClick={toggleDrawer}
                className="p-2 rounded-lg hover:bg-gray-100/50 transition-colors duration-200"
                aria-label="Close menu"
              >
                <X size={34} className="text-gray-700" />
              </button>
            </div>

            <nav className="flex-1 p-6">
              <div className="space-y-2">
                {menuItems.map((item, idx) => (
                  <a
                    key={idx}
                    ref={(el) => {
                      if (el) menuItemsRef.current[idx] = el;
                    }}
                    href={item.link}
                    className="block px-4 py-3 text-gray-800  font-bold md:text-2xl rounded-lg hover:text-[#A4CC36] hover:bg-gray-100/50 transition-all duration-300 transform hover:translate-x-1"
                    aria-label={item.ariaLabel}
                    onClick={toggleDrawer}
                  >
                    {item.label}
                  </a>
                ))}
              </div>
            </nav>

            <div className="p-6 border-t border-gray-200/30">
              <div className="flex items-center gap-3 text-gray-600">
                <Phone size={18} className="text-primary" />
                <div>
                  <p className="text-sm font-medium">Call us</p>
                  <p className="text-sm">+8801407100300</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
