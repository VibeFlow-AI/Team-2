"use client";

import React from "react";
import { BookOpen, Users, Award, Clock } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="flex-1 max-w-5xl mx-auto py-8 px-4">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold mb-4">About EduVibe</h1>
        <p className="text-gray-600 max-w-3xl mx-auto">
          Connecting students with experienced mentors for personalized learning
          experiences. Our platform makes it easy to discover, schedule, and
          manage mentoring sessions.
        </p>
      </div>

      {/* Mission Section */}
      <section className="mb-16">
        <div className="bg-white rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
          <p className="text-gray-600 mb-6">
            We believe that personalized mentorship can transform educational
            experiences. Our platform bridges the gap between students seeking
            knowledge and experts willing to share their expertise, creating
            opportunities for growth and learning beyond traditional educational
            boundaries.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
            <div className="text-center p-4">
              <div className="bg-indigo-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-indigo-600" />
              </div>
              <h3 className="font-bold mb-2">Community</h3>
              <p className="text-sm text-gray-600">
                Building connections between students and mentors worldwide
              </p>
            </div>
            <div className="text-center p-4">
              <div className="bg-indigo-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <BookOpen className="h-8 w-8 text-indigo-600" />
              </div>
              <h3 className="font-bold mb-2">Knowledge</h3>
              <p className="text-sm text-gray-600">
                Sharing expertise across diverse subjects and disciplines
              </p>
            </div>
            <div className="text-center p-4">
              <div className="bg-indigo-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="h-8 w-8 text-indigo-600" />
              </div>
              <h3 className="font-bold mb-2">Excellence</h3>
              <p className="text-sm text-gray-600">
                Promoting quality education through verified mentors
              </p>
            </div>
            <div className="text-center p-4">
              <div className="bg-indigo-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="h-8 w-8 text-indigo-600" />
              </div>
              <h3 className="font-bold mb-2">Flexibility</h3>
              <p className="text-sm text-gray-600">
                Learn at your own pace with flexible scheduling options
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold mb-8 text-center">How It Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="bg-indigo-600 text-white w-10 h-10 rounded-full flex items-center justify-center mb-4">
              1
            </div>
            <h3 className="font-bold mb-2">Discover Mentors</h3>
            <p className="text-gray-600">
              Browse through our diverse collection of mentors specializing in
              various subjects. Filter by duration, language, and subject to
              find your perfect match.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="bg-indigo-600 text-white w-10 h-10 rounded-full flex items-center justify-center mb-4">
              2
            </div>
            <h3 className="font-bold mb-2">Schedule Sessions</h3>
            <p className="text-gray-600">
              Choose a convenient date and time for your mentoring session. Our
              calendar system makes it easy to find available time slots.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="bg-indigo-600 text-white w-10 h-10 rounded-full flex items-center justify-center mb-4">
              3
            </div>
            <h3 className="font-bold mb-2">Learn & Grow</h3>
            <p className="text-gray-600">
              Attend your scheduled session and get personalized guidance from
              your mentor. Track your progress and book follow-up sessions as
              needed.
            </p>
          </div>
        </div>
      </section>

      {/* Team Section (Optional) */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold mb-8 text-center">Our Team</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="w-24 h-24 bg-gray-200 rounded-full mx-auto mb-4"></div>
              <h3 className="font-bold">Team Member {i}</h3>
              <p className="text-sm text-gray-500 mb-2">Position</p>
              <p className="text-xs text-gray-600">
                Brief description about the team member and their role in
                creating EduVibe.
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Contact Section */}
      <section>
        <div className="bg-indigo-600 text-white rounded-lg shadow-md p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">Get in Touch</h2>
          <p className="mb-6">
            Have questions or suggestions? We'd love to hear from you!
          </p>
          <div className="inline-block">
            <button className="bg-white text-indigo-600 px-6 py-3 rounded-md font-medium hover:bg-gray-100 transition-colors">
              Contact Us
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
