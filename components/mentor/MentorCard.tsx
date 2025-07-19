"use client";

import React from "react";
import { Mentor } from "../../data/mentors";

interface MentorCardProps {
  mentor: Mentor;
  onBookSession: (mentor: Mentor) => void;
}

const getAvatarColor = (initials: string): string => {
  const colors = ["#4A90E2", "#E2844A", "#9C4AE2", "#4AE27D", "#E24A6F"];
  // Simple hash function to consistently assign a color based on initials
  const hash =
    initials.charCodeAt(0) + (initials.length > 1 ? initials.charCodeAt(1) : 0);
  return colors[hash % colors.length];
};

const MentorCard: React.FC<MentorCardProps> = ({ mentor, onBookSession }) => {
  const avatarColor = getAvatarColor(mentor.initials);

  return (
    <div className="bg-white border rounded-lg shadow-sm p-6 flex flex-col">
      <div className="flex items-start mb-4">
        <div
          className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold"
          style={{ backgroundColor: avatarColor }}>
          {mentor.initials}
        </div>
        <div className="ml-4">
          <h2 className="text-lg font-semibold">{mentor.name}</h2>
          <p className="text-sm text-gray-600">{mentor.location}</p>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mb-3">
        {mentor.subjects.map((subject, index) => (
          <span
            key={index}
            className="bg-gray-100 text-gray-800 px-2 py-1 rounded-full text-xs">
            {subject}
          </span>
        ))}
      </div>

      <p className="text-sm text-gray-700 leading-relaxed mb-4 overflow-hidden text-ellipsis display-webkit-box [-webkit-line-clamp:3] [-webkit-box-orient:vertical]">
        {mentor.description}
      </p>

      <div className="mt-auto">
        <div className="mb-4">
          <p className="text-xs text-gray-600 mb-1">
            <strong>Duration:</strong> {mentor.duration}
          </p>
          <p className="text-xs text-gray-600">
            <strong>Preferred Language:</strong> {mentor.preferredLanguage}
          </p>
        </div>

        <div className="flex justify-between items-center">
          <button
            className="bg-black text-white px-4 py-2 rounded-md text-sm hover:bg-gray-800 transition"
            onClick={() => onBookSession(mentor)}>
            Book a session
          </button>
          <button className="text-gray-400 hover:text-gray-600 p-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default MentorCard;
