"use client";

import React, { useState } from "react";
import { Mentor } from "../../data/mentors";

interface BankSlipModalProps {
  mentor: Mentor | null;
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (file: File) => void;
  scheduledDate: Date | null;
  scheduledTime: string | null;
}

const BankSlipModal: React.FC<BankSlipModalProps> = ({
  mentor,
  isOpen,
  onClose,
  onConfirm,
  scheduledDate,
  scheduledTime,
}) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  if (!isOpen || !mentor || !scheduledDate || !scheduledTime) return null;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      setSelectedFile(e.dataTransfer.files[0]);
    }
  };

  const handleConfirm = () => {
    if (selectedFile) {
      onConfirm(selectedFile);
    }
  };

  const formattedDate = scheduledDate.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Confirm Your Booking</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700">
            <span className="text-xl">×</span>
          </button>
        </div>

        <div className="mb-6">
          <p className="mb-2">
            <span className="font-medium">Mentor:</span> {mentor.name}
          </p>
          <p className="mb-2">
            <span className="font-medium">Date:</span> {formattedDate}
          </p>
          <p className="mb-2">
            <span className="font-medium">Time:</span> {scheduledTime}
          </p>
          <p className="mb-2">
            <span className="font-medium">Duration:</span> 2 hours
          </p>
          <p className="mt-4 mb-2 font-medium">
            Please upload your bank slip to confirm:
          </p>
        </div>

        <div
          className={`border-2 border-dashed rounded-lg p-6 mb-4 text-center ${
            isDragging ? "border-black bg-gray-50" : "border-gray-300"
          }`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}>
          {selectedFile ? (
            <div>
              <p className="text-green-600 mb-2">File selected:</p>
              <p>{selectedFile.name}</p>
              <button
                onClick={() => setSelectedFile(null)}
                className="mt-2 text-sm text-red-600 hover:text-red-800">
                Remove
              </button>
            </div>
          ) : (
            <div>
              <p className="text-gray-500 mb-2">
                Drag and drop your file here or
              </p>
              <label className="bg-gray-200 px-4 py-2 rounded cursor-pointer hover:bg-gray-300">
                Browse Files
                <input
                  type="file"
                  accept="image/*,.pdf"
                  onChange={handleFileChange}
                  className="hidden"
                />
              </label>
            </div>
          )}
        </div>

        <div className="flex justify-end space-x-2">
          <button
            onClick={onClose}
            className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-100">
            Cancel
          </button>
          <button
            onClick={handleConfirm}
            disabled={!selectedFile}
            className={`px-4 py-2 rounded-md ${
              selectedFile
                ? "bg-black text-white hover:bg-gray-800"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}>
            Confirm Booking
          </button>
        </div>
      </div>
    </div>
  );
};

export default BankSlipModal;
