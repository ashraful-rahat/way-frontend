// components/Sidebar.tsx
"use client";

import {
  Building,
  ChevronRight,
  Home,
  Layers,
  MapPin,
  Newspaper,
  Users,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Sidebar = () => {
  const pathname = usePathname();

  const links = [
    { href: "/dashboard", label: "Home", icon: Home },
    { href: "/dashboard/cities", label: "City", icon: MapPin },
    { href: "/dashboard/projects", label: "Projects", icon: Building },
    { href: "/dashboard/flats", label: "Flats", icon: Layers },
    { href: "/dashboard/team", label: "Team", icon: Users },
        { href: "/dashboard/service", label: "Service", icon: Users },
    { href: "/dashboard/property", label: "Property", icon: Layers },
       { href: "/dashboard/blog", label: "Blog", icon: Newspaper },
  ];

  return (
    <aside className="w-72 min-h-screen bg-gradient-to-b from-[#164C36] to-[#0F3B2A] text-white fixed shadow-2xl flex flex-col border-r border-white/10">
      {/* Logo / Brand with white background */}
      <Link
        href="/"
        className="p-6 pb-4 flex items-center justify-center border-b border-white/10 bg-white"
      >
        <div className="relative group">
          <Image
            src="/images/logo.png"
            alt="Way Agro Home Logo"
            width={160}
            height={60}
            className="object-contain transition-transform duration-300 group-hover:scale-105"
          />
        </div>
      </Link>

      {/* Navigation with enhanced styling */}
      <nav className="mt-8 flex flex-col gap-2 px-4">
        {links.map(({ href, label, icon: Icon }) => {
          const isActive = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              className={`group relative flex items-center gap-4 px-5 py-3.5 rounded-xl transition-all duration-300 ${
                isActive
                  ? "bg-gradient-to-r from-white to-emerald-50 text-[#164C36] font-bold shadow-lg shadow-green-900/30 transform scale-[1.02]"
                  : "hover:bg-white/10 hover:translate-x-1 font-medium text-white/90"
              }`}
            >
              {/* Active indicator bar */}
              {isActive && (
                <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-1.5 h-10 bg-white rounded-r-full shadow-sm" />
              )}

              <div
                className={`p-2 rounded-lg transition-colors ${
                  isActive
                    ? "bg-[#164C36]/10"
                    : "bg-white/5 group-hover:bg-white/10"
                }`}
              >
                <Icon
                  size={20}
                  className={isActive ? "text-[#164C36]" : "text-white/80"}
                />
              </div>

              <span className="flex-1 text-[15px] tracking-wide">{label}</span>

              <ChevronRight
                size={16}
                className={`transition-all duration-300 ${
                  isActive
                    ? "text-[#164C36] opacity-100"
                    : "text-white/50 opacity-0 group-hover:opacity-100 group-hover:translate-x-1"
                }`}
              />

              {/* Hover glow effect */}
              <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </Link>
          );
        })}
      </nav>

      {/* Enhanced Footer */}
      <div className="mt-auto p-6 pt-4 text-center border-t border-white/10 bg-white/5 backdrop-blur-sm">
        <div className="mb-2">
          <div className="w-12 h-12 mx-auto mb-3 bg-gradient-to-br from-emerald-400 to-green-500 rounded-full flex items-center justify-center shadow-lg shadow-green-900/30">
            <span className="text-white font-bold text-sm">WA</span>
          </div>
          <p className="text-white/80 text-sm font-medium">Way Agro Home</p>
        </div>
        <p className="text-white/50 text-xs mt-3">
          © {new Date().getFullYear()} All rights reserved
        </p>
      </div>
    </aside>
  );
};

export default Sidebar;
