"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Bookmark, Star, MapPin, Clock, Users } from "lucide-react"
import { useState } from "react"

interface Mentor {
  id: number
  name: string
  city: string
  country: string
  initials: string
  avatarColor: string
  subjects: string[]
  bio: string
  languages: string[]
  experience: string
  gradeLevels: string[]
  rating: number
  totalSessions: number
  isBookmarked?: boolean
}

interface EnhancedMentorCardProps {
  mentor: Mentor
  onBookSession: (mentor: Mentor) => void
  onBookmark: (mentorId: number) => void
}

export default function EnhancedMentorCard({ mentor, onBookSession, onBookmark }: EnhancedMentorCardProps) {
  const [isBookmarked, setIsBookmarked] = useState(mentor.isBookmarked || false)

  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked)
    onBookmark(mentor.id)
  }

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
      {/* Header with Avatar and Info */}
      <div className="flex items-start gap-4 mb-4">
        <div className={`w-14 h-14 ${mentor.avatarColor} rounded-full flex items-center justify-center flex-shrink-0`}>
          <span className="text-white font-semibold text-xl">{mentor.initials}</span>
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-gray-900 text-lg">{mentor.name}</h3>
          <div className="flex items-center gap-1 text-gray-600 text-sm mb-1">
            <MapPin className="w-3 h-3" />
            <span>
              {mentor.city}, {mentor.country}
            </span>
          </div>
          <div className="flex items-center gap-3 text-sm text-gray-600">
            <div className="flex items-center gap-1">
              <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
              <span>{mentor.rating}</span>
            </div>
            <div className="flex items-center gap-1">
              <Users className="w-3 h-3" />
              <span>{mentor.totalSessions} sessions</span>
            </div>
          </div>
        </div>
      </div>

      {/* Subject Tags */}
      <div className="flex flex-wrap gap-2 mb-4">
        {mentor.subjects.map((subject, index) => (
          <Badge key={index} variant="secondary" className="text-xs">
            {subject}
          </Badge>
        ))}
      </div>

      {/* Bio */}
      <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-3">{mentor.bio}</p>

      {/* Details */}
      <div className="space-y-2 mb-4 text-sm">
        <div className="flex items-center gap-2">
          <span className="font-medium text-gray-900">Languages:</span>
          <span className="text-gray-600">{mentor.languages.join(", ")}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="font-medium text-gray-900">Experience:</span>
          <span className="text-gray-600">{mentor.experience}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="font-medium text-gray-900">Grade Levels:</span>
          <span className="text-gray-600">{mentor.gradeLevels.join(", ")}</span>
        </div>
        <div className="flex items-center gap-2">
          <Clock className="w-4 h-4 text-gray-500" />
          <span className="text-gray-600">2 hour sessions</span>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center gap-3">
        <Button
          onClick={() => onBookSession(mentor)}
          className="flex-1 bg-black hover:bg-gray-800 text-white rounded-lg py-2"
        >
          Book a session
        </Button>
        <button onClick={handleBookmark} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
          <Bookmark className={`w-5 h-5 ${isBookmarked ? "fill-blue-600 text-blue-600" : "text-gray-600"}`} />
        </button>
      </div>
    </div>
  )
}
