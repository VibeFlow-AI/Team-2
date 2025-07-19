"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { Textarea } from "@/components/ui/textarea"
import { DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Progress } from "@/components/ui/progress"

interface StudentOnboardingProps {
  onComplete: () => void
}

interface FormData {
  // Part 1
  fullName: string
  age: string
  email: string
  contactNumber: string
  password: string

  // Part 2
  educationLevel: string
  school: string

  // Part 3
  subjectsOfInterest: string
  currentYear: string
  skillLevels: Record<string, string>
  learningStyle: string[]
  hasLearningDisabilities: boolean
  learningDisabilitiesDescription: string
}

export default function StudentOnboarding({ onComplete }: StudentOnboardingProps) {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    age: "",
    email: "",
    contactNumber: "",
    password: "",
    educationLevel: "",
    school: "",
    subjectsOfInterest: "",
    currentYear: "",
    skillLevels: {},
    learningStyle: [],
    hasLearningDisabilities: false,
    learningDisabilitiesDescription: "",
  })

  const subjects = formData.subjectsOfInterest
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean)
  const progress = (currentStep / 3) * 100

  const handleNext = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1)
    } else {
      onComplete()
    }
  }

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const updateFormData = (field: keyof FormData, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const updateSkillLevel = (subject: string, level: string) => {
    setFormData((prev) => ({
      ...prev,
      skillLevels: { ...prev.skillLevels, [subject]: level },
    }))
  }

  const toggleLearningStyle = (style: string) => {
    setFormData((prev) => ({
      ...prev,
      learningStyle: prev.learningStyle.includes(style)
        ? prev.learningStyle.filter((s) => s !== style)
        : [...prev.learningStyle, style],
    }))
  }

  return (
    <div className="p-6 max-w-2xl mx-auto max-h-[80vh] overflow-y-auto">
      <DialogHeader className="text-center mb-6">
        <DialogTitle className="text-2xl font-semibold">Student Onboarding</DialogTitle>
        <Progress value={progress} className="mt-4" />
      </DialogHeader>

      {/* Part 1: Who Are You? */}
      {currentStep === 1 && (
        <div className="space-y-6">
          <h3 className="text-lg font-semibold">Part 1: Who Are You?</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="fullName">Full Name</Label>
              <Input
                id="fullName"
                value={formData.fullName}
                onChange={(e) => updateFormData("fullName", e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="age">Age</Label>
              <Input
                id="age"
                type="number"
                value={formData.age}
                onChange={(e) => updateFormData("age", e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email Address</Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => updateFormData("email", e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              value={formData.password}
              onChange={(e) => updateFormData("password", e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="contactNumber">Contact Number</Label>
            <Input
              id="contactNumber"
              type="tel"
              value={formData.contactNumber}
              onChange={(e) => updateFormData("contactNumber", e.target.value)}
            />
          </div>
        </div>
      )}

      {/* Part 2: Academic Background */}
      {currentStep === 2 && (
        <div className="space-y-6">
          <h3 className="text-lg font-semibold">Part 2: Academic Background</h3>

          <div className="space-y-2">
            <Label htmlFor="educationLevel">Current Education Level</Label>
            <Select value={formData.educationLevel} onValueChange={(value) => updateFormData("educationLevel", value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select education level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="grade9">Grade 9</SelectItem>
                <SelectItem value="ordinary">Ordinary Level</SelectItem>
                <SelectItem value="advanced">Advanced Level</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="school">School</Label>
            <Input id="school" value={formData.school} onChange={(e) => updateFormData("school", e.target.value)} />
          </div>
        </div>
      )}

      {/* Part 3: Subject & Skill Assessment */}
      {currentStep === 3 && (
        <div className="space-y-6">
          <h3 className="text-lg font-semibold">Part 3: Subject & Skill Assessment</h3>

          <div className="space-y-2">
            <Label htmlFor="subjects">Subjects of Interest</Label>
            <Input
              id="subjects"
              placeholder="Physics, Mathematics, Chemistry (comma separated)"
              value={formData.subjectsOfInterest}
              onChange={(e) => updateFormData("subjectsOfInterest", e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="currentYear">Current Year</Label>
            <Input
              id="currentYear"
              type="number"
              value={formData.currentYear}
              onChange={(e) => updateFormData("currentYear", e.target.value)}
            />
          </div>

          {/* Skill Levels for each subject */}
          {subjects.length > 0 && (
            <div className="space-y-4">
              <Label>Current Skill Level (Per Subject)</Label>
              {subjects.map((subject) => (
                <div key={subject} className="space-y-2">
                  <Label className="font-medium">{subject}</Label>
                  <RadioGroup
                    value={formData.skillLevels[subject] || ""}
                    onValueChange={(value) => updateSkillLevel(subject, value)}
                    className="flex gap-6"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="beginner" id={`${subject}-beginner`} />
                      <Label htmlFor={`${subject}-beginner`}>Beginner</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="intermediate" id={`${subject}-intermediate`} />
                      <Label htmlFor={`${subject}-intermediate`}>Intermediate</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="advanced" id={`${subject}-advanced`} />
                      <Label htmlFor={`${subject}-advanced`}>Advanced</Label>
                    </div>
                  </RadioGroup>
                </div>
              ))}
            </div>
          )}

          <div className="space-y-2">
            <Label>Preferred Learning Style</Label>
            <div className="grid grid-cols-2 gap-4">
              {["Visual", "Hands-On", "Theoretical", "Mixed"].map((style) => (
                <div key={style} className="flex items-center space-x-2">
                  <Checkbox
                    id={style}
                    checked={formData.learningStyle.includes(style)}
                    onCheckedChange={() => toggleLearningStyle(style)}
                  />
                  <Label htmlFor={style}>{style}</Label>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <Label>Do you have any learning disabilities or accommodations needed?</Label>
            <RadioGroup
              value={formData.hasLearningDisabilities.toString()}
              onValueChange={(value) => updateFormData("hasLearningDisabilities", value === "true")}
              className="flex gap-6"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="true" id="disabilities-yes" />
                <Label htmlFor="disabilities-yes">Yes</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="false" id="disabilities-no" />
                <Label htmlFor="disabilities-no">No</Label>
              </div>
            </RadioGroup>

            {formData.hasLearningDisabilities && (
              <div className="space-y-2">
                <Label htmlFor="disabilities-description">Please describe</Label>
                <Textarea
                  id="disabilities-description"
                  value={formData.learningDisabilitiesDescription}
                  onChange={(e) => updateFormData("learningDisabilitiesDescription", e.target.value)}
                />
              </div>
            )}
          </div>
        </div>
      )}

      {/* Navigation Buttons */}
      <div className="flex justify-between mt-8">
        <Button variant="outline" onClick={handleBack} disabled={currentStep === 1}>
          Back
        </Button>
        <Button onClick={handleNext} className="bg-black hover:bg-gray-800 text-white">
          {currentStep === 3 ? "Complete" : "Next"}
        </Button>
      </div>
    </div>
  )
}
