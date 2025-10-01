"use client";

import Link from "next/link";

const Footer = () => {
  return (
    <footer className="relative bg-white/95 backdrop-blur-md border-t border-gray-200 shadow-sm">
      <div className="relative">
        <div className="container mx-auto px-6 py-6">
          <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
            
            {/* Left: Copyright */}
            <div className="text-center sm:text-left">
              <p className="text-gray-600 text-sm">
                © {new Date().getFullYear()}{" "}
                <span className="font-bold text-gray-800">
                  NADT, RC Bhopal
                </span>
                . All Rights Reserved.
              </p>
              <p className="text-xs text-gray-400 mt-1">File Vault System</p>
            </div>

            {/* Right: Links */}
            <div className="flex space-x-6">
              <Link
                href="/"
                className="group relative text-gray-600 hover:text-gray-900 text-sm font-medium transition-all duration-300"
              >
                Home
                <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-500 to-teal-500 group-hover:w-full transition-all duration-300"></div>
              </Link>
              <Link
                href="/file-manager"
                className="group relative text-gray-600 hover:text-gray-900 text-sm font-medium transition-all duration-300"
              >
                File Manager
                <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-500 to-teal-500 group-hover:w-full transition-all duration-300"></div>
              </Link>
              <Link
                href="/docs"
                className="group relative text-gray-600 hover:text-gray-900 text-sm font-medium transition-all duration-300"
              >
                Documentation
                <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-500 to-teal-500 group-hover:w-full transition-all duration-300"></div>
              </Link>
            </div>
          </div>

          {/* Decorative divider */}
          <div className="mt-6 pt-6 border-t border-gray-200">
            <div className="flex justify-center">
              <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-50"></div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
