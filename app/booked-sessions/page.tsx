"use client";

import React from "react";

export default function BookedSessions() {
  // This would usually come from an API or local storage
  const bookedSessions = [
    {
      id: "1",
      mentorName: "Rahul Lavan",
      mentorInitials: "RL",
      date: "July 15, 2025",
      time: "10:00 AM",
      duration: "2 hours",
      subject: "Physics",
    },
    // Add more booked sessions as needed
  ];

  return (
    <div>
      <header className="mb-6">
        <h1 className="text-2xl font-bold">Booked Sessions</h1>
        <p className="text-gray-600">Your upcoming mentoring sessions</p>
      </header>

      {bookedSessions.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500">
            You don't have any booked sessions yet.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {bookedSessions.map((session) => (
            <div
              key={session.id}
              className="bg-white p-6 rounded-lg shadow-sm border flex items-start">
              <div className="w-12 h-12 rounded-full bg-blue-500 text-white flex items-center justify-center font-bold">
                {session.mentorInitials}
              </div>
              <div className="ml-4 flex-1">
                <h3 className="font-semibold text-lg">{session.mentorName}</h3>
                <p className="text-sm text-gray-600">{session.subject}</p>
                <div className="mt-2 flex gap-4">
                  <div>
                    <span className="text-xs text-gray-500 block">Date</span>
                    <span className="text-sm">{session.date}</span>
                  </div>
                  <div>
                    <span className="text-xs text-gray-500 block">Time</span>
                    <span className="text-sm">{session.time}</span>
                  </div>
                  <div>
                    <span className="text-xs text-gray-500 block">
                      Duration
                    </span>
                    <span className="text-sm">{session.duration}</span>
                  </div>
                </div>
              </div>
              <button className="bg-red-500 text-white text-sm px-4 py-1 rounded">
                Cancel
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
