"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  FileText,
  Shield,
  Zap,
  Users,
  FolderOpen,
  Download,
  Search,
  Cloud,
} from "lucide-react";

export default function FileVaultLanding() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut" as const,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 60, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.7,
        ease: "easeOut" as const,
      },
    },
    hover: {
      y: -12,
      scale: 1.05,
      transition: {
        duration: 0.3,
        ease: "easeOut" as const,
      },
    },
  };

  const features = [
    {
      icon: Shield,
      title: "Enterprise Security",
      description:
        "Military-grade encryption protects your sensitive documents with advanced security protocols.",
    },
    {
      icon: Zap,
      title: "Lightning Fast",
      description:
        "Instant file access and blazing-fast search across millions of documents in milliseconds.",
    },
    {
      icon: FolderOpen,
      title: "Smart Organization",
      description:
        "AI-powered categorization keeps your files perfectly organized and easily discoverable.",
    },
    {
      icon: Users,
      title: "Team Collaboration",
      description:
        "Seamless sharing with granular permissions and real-time collaborative workflows.",
    },
    {
      icon: Download,
      title: "Bulk Operations",
      description:
        "Download multiple files, create archives, and manage large datasets effortlessly.",
    },
    {
      icon: Search,
      title: "Advanced Search",
      description:
        "Find anything instantly with powerful filters, tags, and content-based search.",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-r from-teal-500/20 to-blue-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-full blur-2xl animate-pulse delay-500"></div>
      </div>

      <main className="relative z-10">
        {/* Hero Section */}
        <motion.section
          className="min-h-screen flex items-center justify-center px-6 py-20"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <div className="max-w-6xl mx-auto text-center">
            <motion.div className="mb-8" variants={itemVariants}>
              <div className="inline-flex items-center gap-3 px-6 py-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-white/90 text-sm font-medium mb-8">
                <Cloud className="w-4 h-4" />
                <span>NADT Training Center File Vault</span>
              </div>
            </motion.div>

            <motion.h1
              className="text-6xl md:text-7xl lg:text-8xl font-black mb-8 bg-gradient-to-r from-white via-blue-100 to-purple-200 bg-clip-text text-transparent leading-tight"
              variants={itemVariants}
            >
              Secure File
              <br />
              <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-teal-400 bg-clip-text text-transparent">
                Vault System
              </span>
            </motion.h1>

            <motion.p
              className="text-xl md:text-2xl text-gray-300 mb-12 max-w-4xl mx-auto leading-relaxed"
              variants={itemVariants}
            >
              Experience next-generation file management with enterprise-grade
              security, intelligent organization, and collaborative workflows
              designed for modern teams.
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row gap-6 justify-center items-center"
              variants={itemVariants}
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full sm:w-auto"
              >
                <Link
                  href="/file-manager"
                  className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold rounded-2xl shadow-2xl shadow-blue-500/25 transition-all duration-300 text-lg w-full sm:w-auto justify-center group"
                >
                  <FolderOpen className="w-6 h-6 group-hover:rotate-12 transition-transform duration-300" />
                  Explore File Vault
                </Link>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full sm:w-auto"
              >
                <button className="inline-flex items-center gap-3 px-8 py-4 bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 text-white font-semibold rounded-2xl transition-all duration-300 text-lg w-full sm:w-auto justify-center group">
                  <FileText className="w-6 h-6 group-hover:scale-110 transition-transform duration-300" />
                  View Documentation
                </button>
              </motion.div>
            </motion.div>

            {/* Stats */}
            <motion.div
              className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-20 max-w-4xl mx-auto"
              variants={containerVariants}
            >
              {[
                { label: "Files Secured", value: "10M+" },
                { label: "Active Users", value: "50K+" },
                { label: "Uptime", value: "99.9%" },
                { label: "Storage", value: "∞" },
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  className="text-center"
                  variants={itemVariants}
                >
                  <div className="text-3xl md:text-4xl font-black bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-2">
                    {stat.value}
                  </div>
                  <div className="text-gray-400 font-medium">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.section>

        {/* Features Section */}
        <motion.section
          className="py-32 px-6 bg-gradient-to-b from-transparent to-black/50"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-200px" }}
          variants={containerVariants}
        >
          <div className="max-w-7xl mx-auto">
            <motion.div className="text-center mb-20" variants={itemVariants}>
              <h2 className="text-5xl md:text-6xl font-black mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                Powerful Features
              </h2>
              <p className="text-xl text-gray-400 max-w-3xl mx-auto">
                Built for security, designed for performance, crafted for teams
                that demand excellence.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  className="group relative"
                  variants={cardVariants}
                  whileHover="hover"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="relative p-8 bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl hover:border-white/20 transition-all duration-500">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl mb-6 group-hover:scale-110 transition-transform duration-300">
                      <feature.icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-blue-300 transition-colors duration-300">
                      {feature.title}
                    </h3>
                    <p className="text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors duration-300">
                      {feature.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* CTA Section */}
        <motion.section
          className="py-32 px-6"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
        >
          <div className="max-w-5xl mx-auto text-center">
            <motion.h2
              className="text-5xl md:text-6xl font-black mb-8 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent"
              variants={itemVariants}
            >
              Ready to Transform
              <br />
              Your File Management?
            </motion.h2>
            <motion.p
              className="text-xl text-gray-400 mb-12 max-w-3xl mx-auto"
              variants={itemVariants}
            >
              Join thousands of organizations that trust our platform for their
              most critical document workflows.
            </motion.p>
            <motion.div variants={itemVariants}>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link
                  href="/file-manager"
                  className="inline-flex items-center gap-3 px-12 py-6 bg-gradient-to-r from-teal-500 to-blue-500 hover:from-teal-600 hover:to-blue-600 text-white font-bold rounded-2xl shadow-2xl shadow-teal-500/25 transition-all duration-300 text-xl group"
                >
                  <FolderOpen className="w-7 h-7 group-hover:rotate-12 transition-transform duration-300" />
                  Start Exploring Now
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </motion.section>
      </main>
    </div>
  );
}
