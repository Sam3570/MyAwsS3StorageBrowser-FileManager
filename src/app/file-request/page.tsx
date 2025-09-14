"use client";
import { useState } from "react";

export default function FileRequestPage() {
  const [fileName, setFileName] = useState("");
  const [email, setEmail] = useState("");
  const [desc, setDesc] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const res = await fetch("/api/file-request", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ fileName, userEmail: email, description: desc }),
    });

    if (res.ok) {
      alert("✅ Request sent successfully!");
      setFileName("");
      setEmail("");
      setDesc("");
    } else {
      alert("❌ Error sending request");
    }
    setLoading(false);
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-lg rounded-xl mt-10">
      <h2 className="text-xl font-bold text-teal-700 mb-4">Request a File</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="File Name"
          value={fileName}
          onChange={(e) => setFileName(e.target.value)}
          className="w-full border px-3 py-2 rounded-lg"
          required
        />
        <input
          type="email"
          placeholder="Your Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border px-3 py-2 rounded-lg"
          required
        />
        <textarea
          placeholder="Description (optional)"
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
          className="w-full border px-3 py-2 rounded-lg"
        />
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-teal-600 text-white py-2 rounded-lg hover:bg-teal-700"
        >
          {loading ? "Sending..." : "Submit Request"}
        </button>
      </form>
    </div>
  );
}
