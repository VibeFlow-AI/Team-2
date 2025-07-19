"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { ArrowLeft } from "lucide-react"

interface SignInModalProps {
  userType: "student" | "mentor"
  onComplete: () => void
  onBack: () => void
}

export default function SignInModal({ userType, onComplete, onBack }: SignInModalProps) {
  const [email, setEmail] = useState("")

  const handleContinue = () => {
    // Here you would typically handle authentication
    onComplete()
  }

  return (
    <div className="p-6">
      <div className="flex items-center mb-6">
        <Button variant="ghost" size="sm" onClick={onBack} className="p-0 h-auto">
          <ArrowLeft className="w-4 h-4" />
        </Button>
      </div>

      <DialogHeader className="text-center mb-8">
        <DialogTitle className="text-2xl font-semibold">Sign in to EduVibe</DialogTitle>
        <p className="text-gray-600 mt-2">Welcome back! please sign in to continue</p>
      </DialogHeader>

      <div className="space-y-6">
        {/* Social Login Buttons */}
        <div className="flex gap-3">
          <Button variant="outline" className="flex-1 bg-black text-white hover:bg-gray-800">
            G
          </Button>
          <Button variant="outline" className="flex-1 bg-black text-white hover:bg-gray-800">
            f
          </Button>
          <Button variant="outline" className="flex-1 bg-black text-white hover:bg-gray-800">
            GitHub
          </Button>
        </div>

        <div className="text-center text-gray-500">--- or ---</div>

        {/* Email Input */}
        <div className="space-y-2">
          <Label htmlFor="email">Email address</Label>
          <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full" />
        </div>

        <Button onClick={handleContinue} className="w-full bg-black hover:bg-gray-800 text-white">
          Continue
        </Button>
      </div>
    </div>
  )
}
