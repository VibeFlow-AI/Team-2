import type React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar";
import Sidebar from "@/components/sidebar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "EduVibe - Mentorship Platform",
  description:
    "Connect with mentors, book sessions, and advance your learning journey",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="min-h-screen flex flex-col">
          {/* Fixed top navbar */}
          <Navbar />

          {/* Main content area with sidebar */}
          <div className="flex flex-1">
            {/* Sidebar */}
            <Sidebar />

            {/* Page content with proper margin to account for sidebar */}
            <main className="flex-1 ml-16 lg:ml-20 pt-16 bg-global-3">
              {children}
            </main>
          </div>
        </div>
      </body>
    </html>
  );
}
