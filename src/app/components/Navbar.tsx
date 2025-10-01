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
    { name: "Contact", href: "file-request", icon: FileText },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-sm">
      <div className="relative">
        <div className="flex items-center justify-between h-16 px-4 sm:px-6">
          {/* Brand Logo */}
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-br from-blue-500 to-teal-500 rounded-xl group-hover:scale-110 transition-transform duration-300">
              <Cloud className="w-6 h-6 text-white" />
            </div>
            <div className="hidden sm:block">
              <span className="font-bold text-lg text-gray-800 leading-tight">
                NADT,RC Bhopal
              </span>
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
                      ? "bg-gradient-to-r from-blue-500 to-teal-500 text-white shadow-md"
                      : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                  }`}
                >
                  <IconComponent
                    className={`w-4 h-4 transition-transform duration-300 ${
                      isActive ? "scale-110" : "group-hover:scale-110"
                    }`}
                  />
                  {link.name}
                  {isActive && (
                    <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-8 h-0.5 bg-gradient-to-r from-blue-500 to-teal-500 rounded-full"></div>
                  )}
                </Link>
              );
            })}
          </div>

          {/* Right side: Clerk + Mobile Menu */}
          <div className="flex items-center space-x-4">
            <UserButton afterSignOutUrl="/" />

            {/* Mobile Menu Toggle */}
            <button
              className="md:hidden p-2 rounded-xl text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-all duration-300"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden border-t border-gray-200 bg-white/98 backdrop-blur-md shadow-sm">
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
                        ? "bg-gradient-to-r from-blue-500 to-teal-500 text-white shadow-md"
                        : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
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
