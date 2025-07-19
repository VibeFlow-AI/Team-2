"use client";

import Navbar from "@/components/navbar";
import Sidebar from "@/components/sidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, User, BookOpen } from "lucide-react";
import { useRouter } from "next/navigation";
import { EmptyState } from "@/components/empty-state";

const bookedSessions = [
  {
    id: 1,
    mentorName: "Rahul Lavan",
    mentorInitials: "RL",
    subject: "Physics",
    date: "2024-01-25",
    time: "2:00 PM - 4:00 PM",
    status: "upcoming",
    meetingLink: "https://meet.google.com/abc-def-ghi",
  },
  {
    id: 2,
    mentorName: "Chathum Rahal",
    mentorInitials: "CR",
    subject: "Mathematics",
    date: "2024-01-22",
    time: "10:00 AM - 12:00 PM",
    status: "completed",
    rating: 5,
  },
  {
    id: 3,
    mentorName: "Malsha Fernando",
    mentorInitials: "MF",
    subject: "Chemistry",
    date: "2024-01-28",
    time: "4:00 PM - 6:00 PM",
    status: "pending",
    meetingLink: "https://meet.google.com/xyz-abc-def",
  },
];

const upcomingAssignments = [
  {
    id: 1,
    title: "Physics Lab Report",
    subject: "Physics",
    dueDate: "2024-01-26",
    mentor: "Rahul Lavan",
  },
  {
    id: 2,
    title: "Calculus Problem Set",
    subject: "Mathematics",
    dueDate: "2024-01-30",
    mentor: "Chathum Rahal",
  },
];

export default function StudentDashboard() {
  const router = useRouter();
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex">
        <main className="flex-1 p-6 ml-16 lg:ml-20">
          <div className="max-w-7xl mx-auto">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Welcome back, Maya!
              </h1>
              <p className="text-gray-600">
                Here's what's happening with your learning journey
              </p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center">
                    <BookOpen className="h-8 w-8 text-blue-600" />
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-600">
                        Total Sessions
                      </p>
                      <p className="text-2xl font-bold text-gray-900">12</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center">
                    <Calendar className="h-8 w-8 text-green-600" />
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-600">
                        This Week
                      </p>
                      <p className="text-2xl font-bold text-gray-900">3</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center">
                    <Clock className="h-8 w-8 text-orange-600" />
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-600">
                        Hours Learned
                      </p>
                      <p className="text-2xl font-bold text-gray-900">24</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center">
                    <User className="h-8 w-8 text-purple-600" />
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-600">
                        Active Mentors
                      </p>
                      <p className="text-2xl font-bold text-gray-900">3</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Booked Sessions */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-center text-xl">
                    Booked Sessions
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {bookedSessions.length === 0 ? (
                    <EmptyState
                      type="no-sessions"
                      onAction={() => router.push("/dashboard")}
                    />
                  ) : (
                    <div className="space-y-4">
                      {bookedSessions.map((session) => (
                        <div
                          key={session.id}
                          className="flex items-center gap-4 p-4 border rounded-lg">
                          <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center flex-shrink-0">
                            <span className="text-gray-600 font-semibold">
                              {session.mentorInitials}
                            </span>
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="h-4 bg-gray-200 rounded mb-2"></div>
                            <div className="h-16 bg-gray-200 rounded"></div>
                          </div>
                          <Button
                            variant="outline"
                            className="flex-shrink-0 bg-transparent">
                            View Session Details
                          </Button>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Upcoming Assignments */}
              <Card>
                <CardHeader>
                  <CardTitle>Upcoming Assignments</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {upcomingAssignments.map((assignment) => (
                      <div
                        key={assignment.id}
                        className="border rounded-lg p-4">
                        <h4 className="font-semibold mb-1">
                          {assignment.title}
                        </h4>
                        <p className="text-sm text-gray-600 mb-2">
                          {assignment.subject}
                        </p>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-600">
                            Due: {assignment.dueDate}
                          </span>
                          <span className="text-sm text-gray-600">
                            by {assignment.mentor}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
