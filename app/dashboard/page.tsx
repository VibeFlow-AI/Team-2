"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import MentorCard from "../../components/mentor/MentorCard";
import ScheduleModal from "../../components/modal/ScheduleModal";
import BankSlipModal from "../../components/modal/BankSlipModal";
import { mentors, Mentor } from "../../data/mentors";

export default function Dashboard() {
  const router = useRouter();
  const [selectedMentor, setSelectedMentor] = useState<Mentor | null>(null);
  const [isScheduleModalOpen, setIsScheduleModalOpen] = useState(false);
  const [isBankSlipModalOpen, setIsBankSlipModalOpen] = useState(false);
  const [scheduledDate, setScheduledDate] = useState<Date | null>(null);
  const [scheduledTime, setScheduledTime] = useState<string | null>(null);

  const handleBookSession = (mentor: Mentor) => {
    setSelectedMentor(mentor);
    setIsScheduleModalOpen(true);
  };

  const handleSchedule = (date: Date, time: string) => {
    setScheduledDate(date);
    setScheduledTime(time);
    setIsScheduleModalOpen(false);
    setIsBankSlipModalOpen(true);
  };

  const handleConfirmBooking = (file: File) => {
    // Here you would normally upload the file to your server
    console.log("Booking confirmed with file:", file.name);
    setIsBankSlipModalOpen(false);

    // Redirect to booked sessions page
    router.push("/booked-sessions");
  };

  return (
    <div>
      <header className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Discover</h1>
        <div className="flex gap-4">
          <div className="relative">
            <select className="border px-4 py-2 pr-10 rounded-md appearance-none bg-white">
              <option>Select by Session Duration</option>
              <option>30 mins - 1 hour</option>
              <option>1 hour</option>
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
              <svg
                className="w-5 h-5 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 9l-7 7-7-7"></path>
              </svg>
            </div>
          </div>
          <button className="bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800">
            Clear Filters
          </button>
        </div>
      </header>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mentors.map((mentor) => (
          <MentorCard
            key={mentor.id}
            mentor={mentor}
            onBookSession={handleBookSession}
          />
        ))}
      </div>

      {/* Scheduling Modal */}
      <ScheduleModal
        mentor={selectedMentor}
        isOpen={isScheduleModalOpen}
        onClose={() => setIsScheduleModalOpen(false)}
        onSchedule={handleSchedule}
      />

      {/* Bank Slip Modal */}
      <BankSlipModal
        mentor={selectedMentor}
        isOpen={isBankSlipModalOpen}
        onClose={() => setIsBankSlipModalOpen(false)}
        onConfirm={handleConfirmBooking}
        scheduledDate={scheduledDate}
        scheduledTime={scheduledTime}
      />
    </div>
  );
}
