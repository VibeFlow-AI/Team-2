"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Badge } from "@/components/ui/badge"
import { X, ChevronLeft, ChevronRight } from "lucide-react"
import { format, addMonths, subMonths } from "date-fns"

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
}

interface MentorBookingModalProps {
  mentor: Mentor
  isOpen: boolean
  onClose: () => void
  onScheduleConfirm: (date: Date, time: string) => void
}

const TIME_SLOTS = ["09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00"]

export default function MentorBookingModal({ mentor, isOpen, onClose, onScheduleConfirm }: MentorBookingModalProps) {
  const [selectedDate, setSelectedDate] = useState<Date>()
  const [selectedTime, setSelectedTime] = useState<string>("")
  const [currentMonth, setCurrentMonth] = useState(new Date())

  const handleSave = () => {
    if (selectedDate && selectedTime) {
      onScheduleConfirm(selectedDate, selectedTime)
    }
  }

  const isDateDisabled = (date: Date) => {
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    return date < today
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader className="flex flex-row items-center justify-between">
          <DialogTitle className="text-xl font-semibold">Schedule this session</DialogTitle>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="w-4 h-4" />
          </Button>
        </DialogHeader>

        {/* Mentor Summary */}
        <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg mb-6">
          <div className={`w-12 h-12 ${mentor.avatarColor} rounded-full flex items-center justify-center`}>
            <span className="text-white font-semibold text-lg">{mentor.initials}</span>
          </div>
          <div>
            <h3 className="font-semibold text-lg">{mentor.name}</h3>
            <p className="text-gray-600">
              {mentor.city}, {mentor.country}
            </p>
            <div className="flex gap-2 mt-1">
              {mentor.subjects.slice(0, 3).map((subject) => (
                <Badge key={subject} variant="secondary" className="text-xs">
                  {subject}
                </Badge>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Calendar Section */}
          <div>
            <h3 className="text-lg font-medium mb-4">Choose a date</h3>

            {/* Custom Calendar Header */}
            <div className="flex items-center justify-between mb-4">
              <Button variant="ghost" size="sm" onClick={() => setCurrentMonth(subMonths(currentMonth, 1))}>
                <ChevronLeft className="w-4 h-4" />
              </Button>
              <h4 className="font-medium">{format(currentMonth, "MMMM yyyy")}</h4>
              <Button variant="ghost" size="sm" onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}>
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>

            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={setSelectedDate}
              disabled={isDateDisabled}
              month={currentMonth}
              onMonthChange={setCurrentMonth}
              className="rounded-md border"
            />
          </div>

          {/* Time Slots Section */}
          <div>
            <h3 className="text-lg font-medium mb-4">Choose a time</h3>
            <div className="grid grid-cols-2 gap-3">
              {TIME_SLOTS.map((time) => (
                <Button
                  key={time}
                  variant={selectedTime === time ? "default" : "outline"}
                  className={`h-12 ${selectedTime === time ? "bg-black text-white" : ""}`}
                  onClick={() => setSelectedTime(time)}
                >
                  {time}
                </Button>
              ))}
            </div>

            {/* Session Info */}
            <div className="mt-6 p-4 bg-blue-50 rounded-lg">
              <h4 className="font-medium text-blue-900 mb-2">Session Details</h4>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>• Duration: 2 hours</li>
                <li>• Platform: Google Meet/Zoom</li>
                <li>• Language: {mentor.languages.join(", ")}</li>
                <li>• Time zone: Your local time</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end gap-3 mt-6">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button
            onClick={handleSave}
            disabled={!selectedDate || !selectedTime}
            className="bg-black hover:bg-gray-800 text-white"
          >
            Save
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
