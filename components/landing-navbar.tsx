import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function LandingNavbar() {
  return (
    <nav className="bg-white/80 backdrop-blur-md border-b border-gray-200 px-4 lg:px-6 py-4 fixed top-0 left-0 right-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center">
          <div className="w-8 h-8 bg-black rounded flex items-center justify-center mr-3">
            <span className="text-white font-bold text-lg">E</span>
          </div>
          <span className="text-xl font-semibold text-gray-900">EduVibe</span>
        </div>

        {/* Navigation Links */}
        <div className="hidden md:flex items-center space-x-8">
          <Link href="/" className="text-gray-700 hover:text-gray-900 font-medium transition-colors">
            Home
          </Link>
          <Link href="/about" className="text-gray-700 hover:text-gray-900 font-medium transition-colors">
            About
          </Link>
          <Link href="/how-it-works" className="text-gray-700 hover:text-gray-900 font-medium transition-colors">
            How it Works
          </Link>
        </div>

        {/* Sign In Button */}
        <div className="flex items-center space-x-4">
          <Button variant="ghost" className="text-gray-700 hover:text-gray-900">
            Sign In
          </Button>
        </div>
      </div>
    </nav>
  )
}
