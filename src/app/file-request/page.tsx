"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, FileText, Phone, MessageSquare, Send } from "lucide-react";

export default function ContactPage() {
  const [fileName, setFileName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [subject, setSubject] = useState("");
  const [desc, setDesc] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const res = await fetch("/api/file-request", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ fileName, userEmail: email, phone, subject, description: desc }),
    });

    if (res.ok) {
      alert("✅ Contact request sent successfully!");
      setFileName("");
      setEmail("");
      setPhone("");
      setSubject("");
      setDesc("");
    } else {
      alert("❌ Error sending contact request");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-gray-50 to-gray-100 flex items-center justify-center px-6 py-20">
      <motion.div
        className="max-w-lg w-full bg-white border border-gray-200 rounded-2xl p-8 shadow-sm"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <div className="h-12 w-12 bg-blue-500 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/20">
            <MessageSquare className="h-6 w-6 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Contact Us</h2>
            <p className="text-gray-600 text-sm">Request a file or get in touch with our team.</p>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="relative">
            <FileText className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="File Name"
              value={fileName}
              onChange={(e) => setFileName(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500/50 transition-all duration-200 text-gray-900 placeholder-gray-400"
              required
            />
          </div>
          <div className="relative">
            <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <input
              type="email"
              placeholder="Your Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500/50 transition-all duration-200 text-gray-900 placeholder-gray-400"
              required
            />
          </div>
          <div className="relative">
            <Phone className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <input
              type="tel"
              placeholder="Your Phone Number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500/50 transition-all duration-200 text-gray-900 placeholder-gray-400"
              pattern="[0-9]{10,15}"
              title="Phone number should be 10-15 digits"
            />
          </div>
          <div className="relative">
            <MessageSquare className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Subject"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500/50 transition-all duration-200 text-gray-900 placeholder-gray-400"
            />
          </div>
          <div className="relative">
            <textarea
              placeholder="Description (optional)"
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500/50 transition-all duration-200 text-gray-900 placeholder-gray-400"
              rows={4}
            />
          </div>
          <motion.button
            type="submit"
            disabled={loading}
            whileHover={{ scale: loading ? 1 : 1.05 }}
            whileTap={{ scale: loading ? 1 : 0.95 }}
            className={`w-full flex items-center justify-center gap-2 py-3 rounded-xl text-white font-semibold transition-all duration-300 shadow-sm ${
              loading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600 shadow-blue-500/20"
            }`}
          >
            {loading ? (
              <>
                <div className="h-5 w-5 rounded-full border-2 border-white/50 border-t-white animate-spin" />
                Sending...
              </>
            ) : (
              <>
                <Send className="h-5 w-5" />
                Submit Contact Request
              </>
            )}
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
}