"use client"

import { Search, Users } from "lucide-react"
import { Button } from "@/components/ui/button"

interface EmptyStateProps {
  type: "no-mentors" | "no-sessions"
  onAction?: () => void
}

export function EmptyState({ type, onAction }: EmptyStateProps) {
  if (type === "no-mentors") {
    return (
      <div className="text-center py-12">
        <Search className="w-16 h-16 text-gray-300 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">No mentors matched your criteria</h3>
        <p className="text-gray-600 mb-6 max-w-md mx-auto">
          Try adjusting your filters or search for different subjects. You can also contact our support team for help
          finding the right mentor.
        </p>
        <div className="space-y-3">
          <Button onClick={onAction} variant="outline">
            Clear All Filters
          </Button>
          <div>
            <Button variant="link" className="text-blue-600">
              Contact Support
            </Button>
          </div>
        </div>
      </div>
    )
  }

  if (type === "no-sessions") {
    return (
      <div className="text-center py-12">
        <Users className="w-16 h-16 text-gray-300 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">No sessions booked yet</h3>
        <p className="text-gray-600 mb-6">Start your learning journey by booking your first session with a mentor.</p>
        <Button onClick={onAction} className="bg-black hover:bg-gray-800 text-white">
          Discover Mentors
        </Button>
      </div>
    )
  }

  return null
}

export default EmptyState
