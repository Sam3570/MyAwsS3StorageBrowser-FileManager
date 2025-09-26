"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Folder, FileText, Menu, X, Cloud } from "lucide-react";
import { UserButton } from "@clerk/nextjs";

const Navbar = () => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: "Home", href: "/", icon: Home },
    { name: "File Manager", href: "/file-manager", icon: Folder },
    { name: "Documentation", href: "/docs", icon: FileText },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-slate-900/95 backdrop-blur-sm border-b border-white/10">
      {/* Animated background gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-teal-600/20 opacity-50"></div>

      <div className="relative">
        <div className="flex items-center justify-between h-16 px-4 sm:px-6">
          {/* Brand Logo */}
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl group-hover:scale-110 transition-transform duration-300">
              <Cloud className="w-6 h-6 text-white" />
            </div>
            <div className="hidden sm:block">
              <span className="text-white font-bold text-xl bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                NADT Research Center
              </span>
              <div className="text-xs text-gray-400 -mt-1">File Vault System</div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navLinks.map((link) => {
              const IconComponent = link.icon;
              const isActive = pathname === link.href;

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`group relative flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${
                    isActive
                      ? "bg-white/20 text-white shadow-lg"
                      : "text-gray-300 hover:text-white hover:bg-white/10"
                  }`}
                >
                  <IconComponent
                    className={`w-4 h-4 transition-transform duration-300 ${
                      isActive ? "scale-110" : "group-hover:scale-110"
                    }`}
                  />
                  {link.name}
                  {isActive && (
                    <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-8 h-0.5 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full"></div>
                  )}
                </Link>
              );
            })}
          </div>

          {/* Right side: Clerk + Mobile Menu */}
          <div className="flex items-center space-x-4">
            {/* Clerk User Button */}
            <UserButton afterSignOutUrl="/" />

            {/* Mobile Menu Toggle */}
            <button
              className="md:hidden p-2 rounded-xl text-gray-300 hover:text-white hover:bg-white/10 transition-all duration-300"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden border-t border-white/10 bg-slate-900/98 backdrop-blur-sm">
            <div className="px-4 py-4 space-y-2">
              {navLinks.map((link) => {
                const IconComponent = link.icon;
                const isActive = pathname === link.href;

                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300 ${
                      isActive
                        ? "bg-white/20 text-white shadow-lg"
                        : "text-gray-300 hover:text-white hover:bg-white/10"
                    }`}
                  >
                    <IconComponent className="w-5 h-5" />
                    {link.name}
                  </Link>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
