import type { Metadata } from "next";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";

import AuthWrapper from "./components/AuthWrapper";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

export const metadata: Metadata = {
  title: "BatchVault",
  description: "BatchVault File Manager",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body cz-shortcut-listen="true">
          <AuthWrapper>
            <Navbar />
            <main className="pt-16 min-h-screen bg-gray-50">{children}</main>
            <Footer />
          </AuthWrapper>
        </body>
      </html>
    </ClerkProvider>
  );
}
