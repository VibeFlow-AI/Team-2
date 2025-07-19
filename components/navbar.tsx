import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function Navbar() {
  return (
    <nav className="bg-white border-b border-gray-200 px-4 lg:px-6 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center">
          <div className="w-8 h-8 bg-black rounded flex items-center justify-center">
            <span className="text-white font-bold text-lg">E</span>
          </div>
        </div>

        {/* Navigation Links */}
        <div className="hidden md:flex items-center space-x-8">
          <Link href="/" className="text-gray-700 hover:text-gray-900 font-medium transition-colors">
            Home
          </Link>
          <Link href="/about" className="text-gray-700 hover:text-gray-900 font-medium transition-colors">
            About
          </Link>
        </div>

        {/* Dashboard Button */}
        <Button className="bg-black hover:bg-gray-800 text-white px-6 py-2 rounded-lg font-medium">Dashboard</Button>
      </div>
    </nav>
  )
}
