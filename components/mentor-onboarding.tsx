"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Textarea } from "@/components/ui/textarea"
import { DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Progress } from "@/components/ui/progress"
import { Upload, X, AlertCircle } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"

interface MentorOnboardingProps {
  onComplete: () => void
}

interface MentorFormData {
  // Part 1: Personal Information
  fullName: string
  age: string
  email: string
  contactNumber: string
  preferredLanguage: string
  currentLocation: string
  shortBio: string
  professionalRole: string

  // Part 2: Areas of Expertise
  subjects: string[]
  teachingExperience: string
  preferredStudentLevels: string[]

  // Part 3: Social & Professional Links
  linkedinProfile: string
  githubPortfolio: string
  profilePicture: File | null
  profilePicturePreview: string
}

const STORAGE_KEY = "mentor_onboarding_data"
const SUBJECTS_OPTIONS = [
  "Mathematics",
  "Physics",
  "Chemistry",
  "Biology",
  "English",
  "History",
  "Geography",
  "Art",
  "Commerce",
  "Computer Science",
  "Economics",
  "Psychology",
]

const STUDENT_LEVELS = ["Grade 3-5", "Grade 6-9", "Grade 10-11", "Advanced Level", "University Level"]

export default function MentorOnboarding({ onComplete }: MentorOnboardingProps) {
  const [currentStep, setCurrentStep] = useState(1)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [hasExistingSubmission, setHasExistingSubmission] = useState(false)

  const [formData, setFormData] = useState<MentorFormData>({
    fullName: "",
    age: "",
    email: "",
    contactNumber: "",
    preferredLanguage: "",
    currentLocation: "",
    shortBio: "",
    professionalRole: "",
    subjects: [],
    teachingExperience: "",
    preferredStudentLevels: [],
    linkedinProfile: "",
    githubPortfolio: "",
    profilePicture: null,
    profilePicturePreview: "",
  })

  // Load saved data on component mount
  useEffect(() => {
    const savedData = localStorage.getItem(STORAGE_KEY)
    if (savedData) {
      try {
        const parsedData = JSON.parse(savedData)
        setFormData((prev) => ({ ...prev, ...parsedData }))

        // Check if this is a resubmission
        if (parsedData.fullName && parsedData.email) {
          setHasExistingSubmission(true)
        }
      } catch (error) {
        console.error("Error loading saved data:", error)
      }
    }
  }, [])

  // Save data to localStorage whenever formData changes
  useEffect(() => {
    const dataToSave = { ...formData }
    delete dataToSave.profilePicture // Don't save file object
    localStorage.setItem(STORAGE_KEY, JSON.stringify(dataToSave))
  }, [formData])

  const progress = (currentStep / 3) * 100

  const updateFormData = (field: keyof MentorFormData, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }))
    }
  }

  const toggleSubject = (subject: string) => {
    setFormData((prev) => ({
      ...prev,
      subjects: prev.subjects.includes(subject)
        ? prev.subjects.filter((s) => s !== subject)
        : [...prev.subjects, subject],
    }))
  }

  const toggleStudentLevel = (level: string) => {
    setFormData((prev) => ({
      ...prev,
      preferredStudentLevels: prev.preferredStudentLevels.includes(level)
        ? prev.preferredStudentLevels.filter((l) => l !== level)
        : [...prev.preferredStudentLevels, level],
    }))
  }

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      // Validate file type
      if (!file.type.startsWith("image/")) {
        setErrors((prev) => ({ ...prev, profilePicture: "Please upload an image file" }))
        return
      }

      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setErrors((prev) => ({ ...prev, profilePicture: "File size must be less than 5MB" }))
        return
      }

      const reader = new FileReader()
      reader.onload = (e) => {
        setFormData((prev) => ({
          ...prev,
          profilePicture: file,
          profilePicturePreview: e.target?.result as string,
        }))
      }
      reader.readAsDataURL(file)
    }
  }

  const validateStep = (step: number): boolean => {
    const newErrors: Record<string, string> = {}

    if (step === 1) {
      if (!formData.fullName.trim()) newErrors.fullName = "Full name is required"
      if (!formData.age) newErrors.age = "Age is required"
      if (!formData.email.trim()) newErrors.email = "Email is required"
      else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Invalid email format"
      if (!formData.contactNumber.trim()) newErrors.contactNumber = "Contact number is required"
      if (!formData.preferredLanguage) newErrors.preferredLanguage = "Preferred language is required"
      if (!formData.currentLocation.trim()) newErrors.currentLocation = "Current location is required"
      if (!formData.shortBio.trim()) newErrors.shortBio = "Short bio is required"
      else if (formData.shortBio.length < 50) newErrors.shortBio = "Bio should be at least 50 characters"
      if (!formData.professionalRole.trim()) newErrors.professionalRole = "Professional role is required"
    }

    if (step === 2) {
      if (formData.subjects.length === 0) newErrors.subjects = "Please select at least one subject"
      if (!formData.teachingExperience) newErrors.teachingExperience = "Teaching experience is required"
      if (formData.preferredStudentLevels.length === 0)
        newErrors.preferredStudentLevels = "Please select at least one student level"
    }

    if (step === 3) {
      if (!formData.linkedinProfile.trim()) newErrors.linkedinProfile = "LinkedIn profile is required"
      else if (!formData.linkedinProfile.includes("linkedin.com"))
        newErrors.linkedinProfile = "Please enter a valid LinkedIn URL"

      if (formData.githubPortfolio && !formData.githubPortfolio.startsWith("http")) {
        newErrors.githubPortfolio = "Please enter a valid URL"
      }
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleNext = () => {
    if (validateStep(currentStep)) {
      if (currentStep < 3) {
        setCurrentStep(currentStep + 1)
      } else {
        handleSubmit()
      }
    }
  }

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSubmit = async () => {
    if (!validateStep(3)) return

    setIsSubmitting(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // Clear saved data after successful submission
      localStorage.removeItem(STORAGE_KEY)

      onComplete()
    } catch (error) {
      setErrors({ submit: "Failed to submit application. Please try again." })
    } finally {
      setIsSubmitting(false)
    }
  }

  const clearExistingData = () => {
    localStorage.removeItem(STORAGE_KEY)
    setFormData({
      fullName: "",
      age: "",
      email: "",
      contactNumber: "",
      preferredLanguage: "",
      currentLocation: "",
      shortBio: "",
      professionalRole: "",
      subjects: [],
      teachingExperience: "",
      preferredStudentLevels: [],
      linkedinProfile: "",
      githubPortfolio: "",
      profilePicture: null,
      profilePicturePreview: "",
    })
    setHasExistingSubmission(false)
    setCurrentStep(1)
  }

  return (
    <div className="p-6 max-w-2xl mx-auto max-h-[80vh] overflow-y-auto">
      <DialogHeader className="text-center mb-6">
        <DialogTitle className="text-2xl font-semibold">Mentor Application</DialogTitle>
        <Progress value={progress} className="mt-4" />
      </DialogHeader>

      {hasExistingSubmission && (
        <Alert className="mb-6">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            We found a previous application. You can continue where you left off or start fresh.
            <Button variant="link" onClick={clearExistingData} className="p-0 ml-2 h-auto">
              Start Fresh
            </Button>
          </AlertDescription>
        </Alert>
      )}

      {/* Part 1: Personal Information */}
      {currentStep === 1 && (
        <div className="space-y-6">
          <h3 className="text-lg font-semibold">Part 1: Personal Information</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="fullName">Full Name *</Label>
              <Input
                id="fullName"
                value={formData.fullName}
                onChange={(e) => updateFormData("fullName", e.target.value)}
                className={errors.fullName ? "border-red-500" : ""}
              />
              {errors.fullName && <p className="text-red-500 text-sm">{errors.fullName}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="age">Age *</Label>
              <Input
                id="age"
                type="number"
                value={formData.age}
                onChange={(e) => updateFormData("age", e.target.value)}
                className={errors.age ? "border-red-500" : ""}
              />
              {errors.age && <p className="text-red-500 text-sm">{errors.age}</p>}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email Address *</Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => updateFormData("email", e.target.value)}
              className={errors.email ? "border-red-500" : ""}
            />
            {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="contactNumber">Contact Number *</Label>
            <Input
              id="contactNumber"
              type="tel"
              value={formData.contactNumber}
              onChange={(e) => updateFormData("contactNumber", e.target.value)}
              className={errors.contactNumber ? "border-red-500" : ""}
            />
            {errors.contactNumber && <p className="text-red-500 text-sm">{errors.contactNumber}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="preferredLanguage">Preferred Language *</Label>
            <Select
              value={formData.preferredLanguage}
              onValueChange={(value) => updateFormData("preferredLanguage", value)}
            >
              <SelectTrigger className={errors.preferredLanguage ? "border-red-500" : ""}>
                <SelectValue placeholder="Select preferred language" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="english">English</SelectItem>
                <SelectItem value="sinhala">Sinhala</SelectItem>
                <SelectItem value="tamil">Tamil</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
            {errors.preferredLanguage && <p className="text-red-500 text-sm">{errors.preferredLanguage}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="currentLocation">Current Location *</Label>
            <Input
              id="currentLocation"
              value={formData.currentLocation}
              onChange={(e) => updateFormData("currentLocation", e.target.value)}
              placeholder="e.g., Colombo, Sri Lanka"
              className={errors.currentLocation ? "border-red-500" : ""}
            />
            {errors.currentLocation && <p className="text-red-500 text-sm">{errors.currentLocation}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="shortBio">Short Bio *</Label>
            <Textarea
              id="shortBio"
              value={formData.shortBio}
              onChange={(e) => updateFormData("shortBio", e.target.value)}
              placeholder="Introduce yourself in 2-3 sentences. Tell us about your background and what makes you passionate about teaching."
              rows={4}
              className={errors.shortBio ? "border-red-500" : ""}
            />
            <p className="text-sm text-gray-500">{formData.shortBio.length}/200 characters</p>
            {errors.shortBio && <p className="text-red-500 text-sm">{errors.shortBio}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="professionalRole">Professional Role *</Label>
            <Input
              id="professionalRole"
              value={formData.professionalRole}
              onChange={(e) => updateFormData("professionalRole", e.target.value)}
              placeholder="e.g., Mathematics Teacher, Software Engineer, Research Scientist"
              className={errors.professionalRole ? "border-red-500" : ""}
            />
            {errors.professionalRole && <p className="text-red-500 text-sm">{errors.professionalRole}</p>}
          </div>
        </div>
      )}

      {/* Part 2: Areas of Expertise */}
      {currentStep === 2 && (
        <div className="space-y-6">
          <h3 className="text-lg font-semibold">Part 2: Areas of Expertise</h3>

          <div className="space-y-2">
            <Label>Subjects you are planning to teach *</Label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {SUBJECTS_OPTIONS.map((subject) => (
                <div key={subject} className="flex items-center space-x-2">
                  <Checkbox
                    id={subject}
                    checked={formData.subjects.includes(subject)}
                    onCheckedChange={() => toggleSubject(subject)}
                  />
                  <Label htmlFor={subject} className="text-sm">
                    {subject}
                  </Label>
                </div>
              ))}
            </div>
            {errors.subjects && <p className="text-red-500 text-sm">{errors.subjects}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="teachingExperience">Teaching/Training Experience *</Label>
            <Select
              value={formData.teachingExperience}
              onValueChange={(value) => updateFormData("teachingExperience", value)}
            >
              <SelectTrigger className={errors.teachingExperience ? "border-red-500" : ""}>
                <SelectValue placeholder="Select your experience level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="none">None</SelectItem>
                <SelectItem value="1-3">1-3 years</SelectItem>
                <SelectItem value="3-5">3-5 years</SelectItem>
                <SelectItem value="5+">5+ years</SelectItem>
              </SelectContent>
            </Select>
            {errors.teachingExperience && <p className="text-red-500 text-sm">{errors.teachingExperience}</p>}
          </div>

          <div className="space-y-2">
            <Label>Preferred Level of Students *</Label>
            <div className="space-y-3">
              {STUDENT_LEVELS.map((level) => (
                <div key={level} className="flex items-center space-x-2">
                  <Checkbox
                    id={level}
                    checked={formData.preferredStudentLevels.includes(level)}
                    onCheckedChange={() => toggleStudentLevel(level)}
                  />
                  <Label htmlFor={level}>{level}</Label>
                </div>
              ))}
            </div>
            {errors.preferredStudentLevels && <p className="text-red-500 text-sm">{errors.preferredStudentLevels}</p>}
          </div>
        </div>
      )}

      {/* Part 3: Social & Professional Links */}
      {currentStep === 3 && (
        <div className="space-y-6">
          <h3 className="text-lg font-semibold">Part 3: Social & Professional Links</h3>

          <div className="space-y-2">
            <Label htmlFor="linkedinProfile">LinkedIn Profile *</Label>
            <Input
              id="linkedinProfile"
              type="url"
              value={formData.linkedinProfile}
              onChange={(e) => updateFormData("linkedinProfile", e.target.value)}
              placeholder="https://linkedin.com/in/your-profile"
              className={errors.linkedinProfile ? "border-red-500" : ""}
            />
            {errors.linkedinProfile && <p className="text-red-500 text-sm">{errors.linkedinProfile}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="githubPortfolio">GitHub or Portfolio (Optional)</Label>
            <Input
              id="githubPortfolio"
              type="url"
              value={formData.githubPortfolio}
              onChange={(e) => updateFormData("githubPortfolio", e.target.value)}
              placeholder="https://github.com/username or https://yourportfolio.com"
              className={errors.githubPortfolio ? "border-red-500" : ""}
            />
            {errors.githubPortfolio && <p className="text-red-500 text-sm">{errors.githubPortfolio}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="profilePicture">Upload Profile Picture</Label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
              {formData.profilePicturePreview ? (
                <div className="space-y-4">
                  <img
                    src={formData.profilePicturePreview || "/placeholder.svg"}
                    alt="Profile preview"
                    className="w-24 h-24 rounded-full mx-auto object-cover"
                  />
                  <Button type="button" variant="outline" onClick={() => updateFormData("profilePicturePreview", "")}>
                    <X className="w-4 h-4 mr-2" />
                    Remove
                  </Button>
                </div>
              ) : (
                <div>
                  <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                  <Input
                    id="profilePicture"
                    type="file"
                    accept="image/*"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                  <Label htmlFor="profilePicture" className="cursor-pointer">
                    <span className="text-blue-600 hover:text-blue-800">Choose file</span>
                    <span className="text-gray-600 ml-1">or drag and drop</span>
                  </Label>
                  <p className="text-xs text-gray-500 mt-1">PNG, JPG up to 5MB</p>
                </div>
              )}
            </div>
            {errors.profilePicture && <p className="text-red-500 text-sm">{errors.profilePicture}</p>}
          </div>
        </div>
      )}

      {errors.submit && (
        <Alert className="mt-4">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{errors.submit}</AlertDescription>
        </Alert>
      )}

      {/* Navigation Buttons */}
      <div className="flex justify-between mt-8">
        <Button variant="outline" onClick={handleBack} disabled={currentStep === 1}>
          Back
        </Button>
        <Button onClick={handleNext} disabled={isSubmitting} className="bg-black hover:bg-gray-800 text-white">
          {isSubmitting ? "Submitting..." : currentStep === 3 ? "Submit Application" : "Next"}
        </Button>
      </div>
    </div>
  )
}
