"use client"

import type React from "react"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Upload } from "lucide-react"
import { format } from "date-fns"

interface BankSlipUploadModalProps {
  isOpen: boolean
  onClose: () => void
  onConfirmPayment: (file: File) => void
  sessionDetails: {
    mentorName: string
    date: Date
    time: string
  }
}

export default function BankSlipUploadModal({
  isOpen,
  onClose,
  onConfirmPayment,
  sessionDetails,
}: BankSlipUploadModalProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null)

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setSelectedFile(file)
    }
  }

  const handleConfirm = () => {
    if (selectedFile) {
      onConfirmPayment(selectedFile)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-center">Upload Bank Transfer Slip</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Session Summary */}
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="font-medium">Session with:</span>
              <span>{sessionDetails.mentorName}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium">Session Date:</span>
              <span>{format(sessionDetails.date, "dd/MM/yyyy")}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium">Time:</span>
              <span>{sessionDetails.time}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium">Duration:</span>
              <span>2 hours</span>
            </div>
          </div>

          {/* File Upload */}
          <div className="space-y-2">
            <Label htmlFor="bankSlip" className="font-medium">
              Bank Transfer Slip
            </Label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
              <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
              <Input id="bankSlip" type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
              <Label htmlFor="bankSlip" className="cursor-pointer">
                <span className="text-blue-600 hover:text-blue-800">Choose file</span>
                <span className="text-gray-600 ml-1">{selectedFile ? selectedFile.name : "No file chosen"}</span>
              </Label>
            </div>
          </div>

          {/* Instructions */}
          <p className="text-sm text-gray-600">
            Please upload a clear image of your bank transfer slip to confirm your payment.
          </p>

          {/* Action Button */}
          <Button
            onClick={handleConfirm}
            disabled={!selectedFile}
            className="w-full bg-black hover:bg-gray-800 text-white disabled:bg-gray-400"
          >
            Confirm Payment
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
