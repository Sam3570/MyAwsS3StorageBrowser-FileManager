"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function FileVaultLanding() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    },
    hover: {
      y: -8,
      transition: {
        duration: 0.2,
        ease: "easeOut"
      }
    }
  };

  return (
    <main className="pt-20">
      {/* Hero Section */}
      <motion.section 
        className="bg-gradient-to-r from-teal-600 to-teal-400 py-16 px-6 text-center text-white"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <motion.h1 
          className="text-4xl font-bold mb-4"
          variants={itemVariants}
        >
          Explore and Access Securely
        </motion.h1>
        <motion.p 
          className="text-lg mb-6"
          variants={itemVariants}
        >
          Welcome to the <span className="font-semibold">NADT, RC File Vault</span> —
          your trusted space for documents and resources.
        </motion.p>
        <motion.div 
          className="flex justify-center"
          variants={itemVariants}
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link
              href="/file-manager"
              className="px-6 py-3 bg-white text-teal-700 font-semibold rounded-xl shadow hover:bg-gray-100 transition"
            >
              Browse Files
            </Link>
          </motion.div>
        </motion.div>
      </motion.section>

      {/* Features Section */}
      <motion.section 
        className="py-16 px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 bg-gray-50"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={containerVariants}
      >
        <motion.div 
          className="p-6 bg-white rounded-2xl shadow hover:shadow-lg transition"
          variants={cardVariants}
          whileHover="hover"
        >
          <h3 className="font-semibold text-lg mb-2 text-teal-700">🔒 Secure Storage</h3>
          <p className="text-gray-600">Your files are protected with end-to-end security.</p>
        </motion.div>
        
        <motion.div 
          className="p-6 bg-white rounded-2xl shadow hover:shadow-lg transition"
          variants={cardVariants}
          whileHover="hover"
        >
          <h3 className="font-semibold text-lg mb-2 text-teal-700">⚡ Quick Access</h3>
          <p className="text-gray-600">Find and retrieve what you need instantly.</p>
        </motion.div>
        
        <motion.div 
          className="p-6 bg-white rounded-2xl shadow hover:shadow-lg transition"
          variants={cardVariants}
          whileHover="hover"
        >
          <h3 className="font-semibold text-lg mb-2 text-teal-700">🗂️ Organized Vault</h3>
          <p className="text-gray-600">All your files neatly categorized for easy navigation.</p>
        </motion.div>
        
        <motion.div 
          className="p-6 bg-white rounded-2xl shadow hover:shadow-lg transition"
          variants={cardVariants}
          whileHover="hover"
        >
          <h3 className="font-semibold text-lg mb-2 text-teal-700">👥 Role-Based Access</h3>
          <p className="text-gray-600">Only authorized users can view and access files.</p>
        </motion.div>
      </motion.section>
    </main>
  );
}