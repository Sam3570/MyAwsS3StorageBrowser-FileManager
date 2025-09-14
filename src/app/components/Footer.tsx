import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-white/70 backdrop-blur-md text-gray-800 py-6 mt-12 shadow-md">
      <div className="container mx-auto px-6 flex flex-col sm:flex-row justify-between items-center">
        {/* Left: Copyright */}
        <p className="text-sm font-semibold">
          © {new Date().getFullYear()} NADT, RC Bhopal. All Rights Reserved.
        </p>

        {/* Right: Links */}
        <div className="flex space-x-6 mt-4 sm:mt-0">
          <Link href="/" className="font-semibold hover:text-teal-700 transition">
            Home
          </Link>
          <Link href="/file-manager" className="font-semibold hover:text-teal-700 transition">
            File Manager
          </Link>
          <Link href="/request" className="font-semibold hover:text-teal-700 transition">
            Request
          </Link>
        </div>
      </div>
    </footer>
  );
}
