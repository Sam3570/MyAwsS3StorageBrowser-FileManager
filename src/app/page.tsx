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
      y: -8,
      scale: 1.03,
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
    <div className="min-h-screen bg-gradient-to-br from-white via-gray-50 to-gray-100">
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
              <div className="inline-flex items-center gap-3 px-6 py-3 bg-white shadow-sm border border-gray-200 rounded-full text-gray-700 text-sm font-medium mb-8">
                <Cloud className="w-4 h-4 text-blue-500" />
                <span>NADT Training Center File Vault</span>
              </div>
            </motion.div>

            <motion.h1
              className="text-5xl md:text-7xl font-extrabold mb-8 text-gray-900 leading-tight"
              variants={itemVariants}
            >
              Secure File
              <br />
              <span className="bg-gradient-to-r from-blue-500 to-teal-500 bg-clip-text text-transparent">
                Vault System
              </span>
            </motion.h1>

            <motion.p
              className="text-lg md:text-xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed"
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
              <Link
                href="/file-manager"
                className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-500 to-teal-500 hover:from-blue-600 hover:to-teal-600 text-white font-semibold rounded-xl shadow-lg transition-all duration-300 text-lg group"
              >
                <FolderOpen className="w-6 h-6 group-hover:rotate-12 transition-transform duration-300" />
                Explore File Vault
              </Link>

              <Link href="/file-request" className="inline-flex items-center gap-3 px-8 py-4 bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 font-semibold rounded-xl shadow-sm transition-all duration-300 text-lg group">
                <FileText className="w-6 h-6 text-gray-600 group-hover:scale-110 transition-transform duration-300" />
                Contact
              </Link>
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
                  <div className="text-3xl md:text-4xl font-bold text-blue-600 mb-2">
                    {stat.value}
                  </div>
                  <div className="text-gray-500 font-medium">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.section>

        {/* Features Section */}
        <motion.section
          className="py-24 px-6 bg-white"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-200px" }}
          variants={containerVariants}
        >
          <div className="max-w-7xl mx-auto">
            <motion.div className="text-center mb-20" variants={itemVariants}>
              <h2 className="text-4xl md:text-5xl font-extrabold mb-6 text-gray-900">
                Powerful Features
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Built for security, designed for performance, crafted for teams
                that demand excellence.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  className="group relative"
                  variants={cardVariants}
                  whileHover="hover"
                >
                  <div className="relative p-8 bg-white border border-gray-200 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300">
                    <div className="inline-flex items-center justify-center w-14 h-14 bg-gradient-to-r from-blue-500 to-teal-500 rounded-xl mb-6 group-hover:scale-110 transition-transform duration-300">
                      <feature.icon className="w-7 h-7 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
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
          className="py-24 px-6 bg-gradient-to-r from-blue-50 to-teal-50"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
        >
          <div className="max-w-5xl mx-auto text-center">
            <motion.h2
              className="text-4xl md:text-5xl font-extrabold mb-8 text-gray-900"
              variants={itemVariants}
            >
              Ready to Transform
              <br />
              Your File Management?
            </motion.h2>
            <motion.p
              className="text-lg text-gray-600 mb-12 max-w-3xl mx-auto"
              variants={itemVariants}
            >
              Join thousands of organizations that trust our platform for their
              most critical document workflows.
            </motion.p>
            <motion.div variants={itemVariants}>
              <Link
                href="/file-manager"
                className="inline-flex items-center gap-3 px-12 py-5 bg-gradient-to-r from-blue-500 to-teal-500 hover:from-blue-600 hover:to-teal-600 text-white font-semibold rounded-xl shadow-lg transition-all duration-300 text-lg group"
              >
                <FolderOpen className="w-7 h-7 group-hover:rotate-12 transition-transform duration-300" />
                Start Exploring Now
              </Link>
            </motion.div>
          </div>
        </motion.section>
      </main>
    </div>
  );
}
