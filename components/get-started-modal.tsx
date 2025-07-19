"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { DialogHeader, DialogTitle } from "@/components/ui/dialog"
import SignInModal from "./sign-in-modal"
import StudentOnboarding from "./student-onboarding"
import MentorOnboarding from "./mentor-onboarding"

interface GetStartedModalProps {
  onClose: () => void
}

export default function GetStartedModal({ onClose }: GetStartedModalProps) {
  const [currentStep, setCurrentStep] = useState<"choice" | "signin" | "onboarding" | "mentor-onboarding">("choice")
  const [userType, setUserType] = useState<"student" | "mentor" | null>(null)

  const handleUserTypeSelect = (type: "student" | "mentor") => {
    setUserType(type)
    setCurrentStep("signin")
  }

  const handleSignInComplete = () => {
    if (userType === "student") {
      setCurrentStep("onboarding")
    } else if (userType === "mentor") {
      setCurrentStep("mentor-onboarding")
    }
  }

  const handleOnboardingComplete = () => {
    onClose()
    // Redirect to mentor discovery dashboard
    window.location.href = "/dashboard"
  }

  const handleMentorOnboardingComplete = () => {
    onClose()
    // Redirect to mentor dashboard (to be created)
    window.location.href = "/mentor-dashboard"
  }

  if (currentStep === "onboarding") {
    return <StudentOnboarding onComplete={handleOnboardingComplete} />
  }

  if (currentStep === "mentor-onboarding") {
    return <MentorOnboarding onComplete={handleMentorOnboardingComplete} />
  }

  if (currentStep === "signin") {
    return (
      <SignInModal userType={userType!} onComplete={handleSignInComplete} onBack={() => setCurrentStep("choice")} />
    )
  }

  return (
    <div className="p-6">
      <DialogHeader className="text-center mb-8">
        <DialogTitle className="text-2xl font-semibold">Get Started</DialogTitle>
      </DialogHeader>

      <div className="space-y-6">
        <div className="text-center">
          <h3 className="text-lg font-medium mb-2">Sign Up as a Mentor</h3>
          <Button
            onClick={() => handleUserTypeSelect("mentor")}
            className="w-full bg-black hover:bg-gray-800 text-white"
          >
            Continue as a Mentor
          </Button>
        </div>

        <div className="text-center">
          <h3 className="text-lg font-medium mb-2">Sign Up as a Student</h3>
          <Button
            onClick={() => handleUserTypeSelect("student")}
            className="w-full bg-black hover:bg-gray-800 text-white"
          >
            Continue as a Student
          </Button>
        </div>
      </div>
    </div>
  )
}
