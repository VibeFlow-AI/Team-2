import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function Navbar() {
  return (
    <nav className="bg-white border-b border-gray-200 px-4 lg:px-6 py-4">
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
          <Link href="/dashboard" className="text-gray-700 hover:text-gray-900 font-medium transition-colors">
            Discover
          </Link>
          <Link href="/student-dashboard" className="text-gray-700 hover:text-gray-900 font-medium transition-colors">
            My Dashboard
          </Link>
          <Link href="/sessions" className="text-gray-700 hover:text-gray-900 font-medium transition-colors">
            Sessions
          </Link>
        </div>

        {/* User Menu */}
        <div className="flex items-center space-x-4">
          <Button variant="ghost" className="text-gray-700 hover:text-gray-900">
            Profile
          </Button>
          <Button variant="outline" className="text-gray-700 hover:text-gray-900 bg-transparent">
            Sign Out
          </Button>
        </div>
      </div>
    </nav>
  )
}
