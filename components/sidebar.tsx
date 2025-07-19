import { Search, Calendar } from "lucide-react"
import Image from "next/image"

export default function Sidebar() {
  return (
    <div className="fixed left-0 top-16 h-[calc(100vh-4rem)] w-16 lg:w-20 bg-white border-r border-gray-200 flex flex-col items-center py-6">
      {/* Navigation Icons */}
      <div className="flex flex-col space-y-6">
        <button className="p-3 rounded-lg hover:bg-gray-100 transition-colors">
          <Search className="w-6 h-6 text-gray-600" />
        </button>
        <button className="p-3 rounded-lg hover:bg-gray-100 transition-colors">
          <Calendar className="w-6 h-6 text-gray-600" />
        </button>
      </div>

      {/* User Profile - Bottom */}
      <div className="mt-auto">
        <div className="w-10 h-10 rounded-full overflow-hidden">
          <Image
            src="/placeholder.svg?height=40&width=40"
            alt="User Profile"
            width={40}
            height={40}
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </div>
  )
}
