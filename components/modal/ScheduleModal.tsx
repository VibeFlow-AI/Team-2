"use client";

import React, { useState } from "react";
import { Mentor } from "../../data/mentors";

interface ScheduleModalProps {
  mentor: Mentor | null;
  isOpen: boolean;
  onClose: () => void;
  onSchedule: (date: Date, time: string) => void;
}

const ScheduleModal: React.FC<ScheduleModalProps> = ({
  mentor,
  isOpen,
  onClose,
  onSchedule,
}) => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [selectedTime, setSelectedTime] = useState<string>("10:00");

  if (!isOpen || !mentor) return null;

  const handlePrevMonth = () => {
    const newDate = new Date(selectedDate);
    newDate.setMonth(newDate.getMonth() - 1);
    setSelectedDate(newDate);
  };

  const handleNextMonth = () => {
    const newDate = new Date(selectedDate);
    newDate.setMonth(newDate.getMonth() + 1);
    setSelectedDate(newDate);
  };

  const handleDateSelect = (day: number) => {
    const newDate = new Date(selectedDate);
    newDate.setDate(day);
    setSelectedDate(newDate);
  };

  const handleSchedule = () => {
    onSchedule(selectedDate, selectedTime);
  };

  // Generate calendar days
  const daysInMonth = new Date(
    selectedDate.getFullYear(),
    selectedDate.getMonth() + 1,
    0
  ).getDate();

  const firstDayOfMonth = new Date(
    selectedDate.getFullYear(),
    selectedDate.getMonth(),
    1
  ).getDay();

  const days = [];
  for (let i = 0; i < firstDayOfMonth; i++) {
    days.push(<div key={`empty-${i}`} className="text-center p-2"></div>);
  }

  for (let day = 1; day <= daysInMonth; day++) {
    const isSelected = day === selectedDate.getDate();
    days.push(
      <div
        key={day}
        onClick={() => handleDateSelect(day)}
        className={`cursor-pointer text-center p-2 hover:bg-gray-200 rounded-full w-8 h-8 flex items-center justify-center mx-auto ${
          isSelected ? "bg-black text-white" : ""
        }`}>
        {day}
      </div>
    );
  }

  const timeSlots = [
    "09:00",
    "10:00",
    "11:00",
    "12:00",
    "13:00",
    "14:00",
    "15:00",
    "16:00",
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Schedule this session</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700">
            <span className="text-xl">×</span>
          </button>
        </div>

        <div className="mb-6">
          <h3 className="font-medium mb-2">Choose a date</h3>
          <div className="flex items-center justify-between mb-2">
            <button
              onClick={handlePrevMonth}
              className="text-gray-600 hover:text-black">
              &lt;
            </button>
            <div>
              {selectedDate.toLocaleString("default", { month: "long" })}{" "}
              {selectedDate.getFullYear()}
            </div>
            <button
              onClick={handleNextMonth}
              className="text-gray-600 hover:text-black">
              &gt;
            </button>
          </div>

          <div className="grid grid-cols-7 gap-1 mb-4">
            {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((day) => (
              <div key={day} className="text-center font-medium text-xs p-1">
                {day}
              </div>
            ))}
            {days}
          </div>
        </div>

        <div className="mb-6">
          <h3 className="font-medium mb-2">Choose a time</h3>
          <div className="grid grid-cols-4 gap-2">
            {timeSlots.map((time) => (
              <button
                key={time}
                onClick={() => setSelectedTime(time)}
                className={`p-2 text-center rounded ${
                  selectedTime === time
                    ? "bg-black text-white"
                    : "bg-gray-100 hover:bg-gray-200"
                }`}>
                {time}
              </button>
            ))}
          </div>
        </div>

        <div className="flex justify-end space-x-2">
          <button
            onClick={onClose}
            className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-100">
            Cancel
          </button>
          <button
            onClick={handleSchedule}
            className="px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800">
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default ScheduleModal;
