"use client";

import { UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState } from "react";

// Icons
import {
  Home,
  Folder, // 👈 using Folder for File Manager
  Image as Gallery,
  FileText,
  Menu,
  X,
} from "lucide-react";

const Navbar: React.FC = () => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: "Home", href: "/", icon: <Home className="h-4 w-4" /> },
    {
      name: "File Manager",
      href: "/file-manager",
      icon: <Folder className="h-4 w-4" />,
    },
    { name: "Request", href: "/file-request", icon: <FileText className="h-4 w-4" /> },
  ];

  return (
    <nav className="w-full bg-white shadow fixed top-0 left-0 z-50">
      {/* Top Bar */}
      <div className="flex items-center justify-between h-16 px-4 sm:px-6">
        {/* Left: Brand */}
        <Link href="/" className="flex items-center space-x-3 h-full">
          <span className="text-[#038071] font-bold text-xl">
            NADT,RC BHOPAL
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`flex items-center gap-1 text-sm font-medium transition ${
                pathname === link.href
                  ? "text-[#00C9B3] border-b-2 border-[#00C9B3] pb-1"
                  : "text-gray-700 hover:text-[#00C9B3]"
              }`}
            >
              {link.icon}
              {link.name}
            </Link>
          ))}
        </div>

        {/* Right: User + Hamburger */}
        <div className="flex items-center space-x-4">
          <div className="hidden md:block">
          </div>
          <button
            className="md:hidden p-2 rounded-md text-gray-600 hover:text-[#00C9B3]"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden px-4 pb-4 flex flex-col gap-3 bg-white/90 shadow-inner">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className={`flex items-center gap-2 text-sm font-medium transition ${
                pathname === link.href
                  ? "text-[#00C9B3] border-b-2 border-[#00C9B3] pb-1"
                  : "text-gray-700 hover:text-[#00C9B3]"
              }`}
            >
              {link.icon}
              {link.name}
            </Link>
          ))}
          <div className="pt-3 border-t border-gray-200">
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
