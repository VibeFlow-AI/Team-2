import { Button } from "@/components/ui/button"
import { Bookmark } from "lucide-react"

interface Mentor {
  id: number
  name: string
  city: string
  initials: string
  avatarColor: string
  subjects: string[]
  bio: string
  duration: string
  language: string
}

interface MentorCardProps {
  mentor: Mentor
}

export default function MentorCard({ mentor }: MentorCardProps) {
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
      {/* Header with Avatar and Info */}
      <div className="flex items-start gap-4 mb-4">
        <div className={`w-12 h-12 ${mentor.avatarColor} rounded-full flex items-center justify-center flex-shrink-0`}>
          <span className="text-white font-semibold text-lg">{mentor.initials}</span>
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-gray-900 text-lg">{mentor.name}</h3>
          <p className="text-gray-600 text-sm">{mentor.city}</p>
        </div>
      </div>

      {/* Subject Tags */}
      <div className="flex flex-wrap gap-2 mb-4">
        {mentor.subjects.map((subject, index) => (
          <span key={index} className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full">
            {subject}
          </span>
        ))}
      </div>

      {/* Bio */}
      <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-4">{mentor.bio}</p>

      {/* Duration and Language */}
      <div className="space-y-2 mb-6">
        <div className="flex items-center gap-2">
          <span className="font-medium text-gray-900 text-sm">Duration:</span>
          <span className="text-gray-600 text-sm">{mentor.duration}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="font-medium text-gray-900 text-sm">Preferred Language:</span>
          <span className="text-gray-600 text-sm">{mentor.language}</span>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center gap-3">
        <Button className="flex-1 bg-black hover:bg-gray-800 text-white rounded-lg py-2">Book a session</Button>
        <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
          <Bookmark className="w-5 h-5 text-gray-600" />
        </button>
      </div>
    </div>
  )
}
