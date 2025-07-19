"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import GetStartedModal from "@/components/get-started-modal"
import LandingNavbar from "@/components/landing-navbar"
import { ArrowRight, BookOpen, Users, Calendar, Star } from "lucide-react"

export default function LandingPage() {
  const [showGetStarted, setShowGetStarted] = useState(false)

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <LandingNavbar />

      {/* Hero Section */}
      <section className="pt-20 pb-16 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Connect with Expert
            <span className="text-blue-600"> Mentors</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Personalized 1-on-1 learning sessions with qualified mentors. Master any subject at your own pace with
            expert guidance.
          </p>

          <Dialog open={showGetStarted} onOpenChange={setShowGetStarted}>
            <DialogTrigger asChild>
              <Button size="lg" className="bg-black hover:bg-gray-800 text-white px-8 py-4 text-lg rounded-lg">
                Get Started
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <GetStartedModal onClose={() => setShowGetStarted(false)} />
            </DialogContent>
          </Dialog>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Why Choose EduVibe?</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <BookOpen className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Expert Mentors</h3>
              <p className="text-gray-600">Learn from qualified professionals with proven track records</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">1-on-1 Sessions</h3>
              <p className="text-gray-600">Personalized attention tailored to your learning style</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Calendar className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Flexible Scheduling</h3>
              <p className="text-gray-600">Book sessions that fit your schedule and availability</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="w-8 h-8 text-orange-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Proven Results</h3>
              <p className="text-gray-600">Track your progress and see measurable improvements</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-gray-900 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Start Learning?</h2>
          <p className="text-xl text-gray-300 mb-8">
            Join thousands of students who have transformed their learning journey with EduVibe
          </p>

          <Dialog open={showGetStarted} onOpenChange={setShowGetStarted}>
            <DialogTrigger asChild>
              <Button
                size="lg"
                variant="outline"
                className="bg-white text-gray-900 hover:bg-gray-100 px-8 py-4 text-lg"
              >
                Start Your Journey
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <GetStartedModal onClose={() => setShowGetStarted(false)} />
            </DialogContent>
          </Dialog>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex items-center justify-center mb-4">
            <div className="w-8 h-8 bg-white rounded flex items-center justify-center mr-3">
              <span className="text-gray-900 font-bold text-lg">E</span>
            </div>
            <span className="text-xl font-semibold">EduVibe</span>
          </div>
          <p className="text-gray-400">© 2024 EduVibe. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
