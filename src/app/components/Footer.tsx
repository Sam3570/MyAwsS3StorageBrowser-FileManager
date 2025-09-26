"use client";

import Link from "next/link";

const Footer = () => {
  return (
    <footer className="relative bg-slate-900/95 backdrop-blur-sm border-t border-white/10">
      {/* Animated background gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-teal-600/20 opacity-50"></div>

      <div className="relative">
        <div className="container mx-auto px-6 py-8">
          <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
            {/* Left: Copyright */}
            <div className="text-center sm:text-left">
              <p className="text-gray-300 text-sm">
                © {new Date().getFullYear()}{" "}
                <span className="font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  NADT Research Center
                </span>
                . All Rights Reserved.
              </p>
              <p className="text-xs text-gray-500 mt-1">File Vault System</p>
            </div>

            {/* Right: Links */}
            <div className="flex space-x-6">
              <Link
                href="/"
                className="group relative text-gray-300 hover:text-white text-sm font-medium transition-all duration-300"
              >
                Home
                <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-400 to-purple-400 group-hover:w-full transition-all duration-300"></div>
              </Link>
              <Link
                href="/file-manager"
                className="group relative text-gray-300 hover:text-white text-sm font-medium transition-all duration-300"
              >
                File Manager
                <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-400 to-purple-400 group-hover:w-full transition-all duration-300"></div>
              </Link>
              <Link
                href="/docs"
                className="group relative text-gray-300 hover:text-white text-sm font-medium transition-all duration-300"
              >
                Documentation
                <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-400 to-purple-400 group-hover:w-full transition-all duration-300"></div>
              </Link>
            </div>
          </div>

          {/* Decorative divider */}
          <div className="mt-6 pt-6 border-t border-white/10">
            <div className="flex justify-center">
              <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-blue-400 to-transparent opacity-50"></div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
