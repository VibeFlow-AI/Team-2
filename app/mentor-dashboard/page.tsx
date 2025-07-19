"use client";

import { useState, useEffect, useMemo } from "react";
import Navbar from "@/components/navbar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Calendar,
  Clock,
  Users,
  Star,
  CheckCircle,
  XCircle,
  Video,
  AlertTriangle,
  TrendingUp,
  BarChart3,
  PieChart,
} from "lucide-react";
import {
  PieChart as RechartsPieChart,
  Cell,
  BarChart as RechartsBarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  Pie,
} from "recharts";
import { format, parseISO, isAfter, isBefore, addMinutes } from "date-fns";

interface Student {
  id: number;
  name: string;
  email: string;
  age: number;
  profilePicture: string;
  initials: string;
  avatarColor: string;
  subjectInterests: string[];
  location: string;
}

interface Session {
  id: number;
  student: Student;
  subject: string;
  date: string;
  startTime: string;
  endTime: string;
  status: "pending" | "confirmed" | "completed" | "cancelled";
  paymentStatus: "pending" | "confirmed";
  requestedAt: string;
  meetingLink?: string;
  notes?: string;
}

// Mock data with realistic student profiles
const students: Student[] = [
  {
    id: 1,
    name: "Maya Patel",
    email: "maya.patel@email.com",
    age: 16,
    profilePicture: "/placeholder.svg?height=40&width=40",
    initials: "MP",
    avatarColor: "bg-blue-500",
    subjectInterests: ["Physics", "Mathematics"],
    location: "Colombo",
  },
  {
    id: 2,
    name: "John Smith",
    email: "john.smith@email.com",
    age: 17,
    profilePicture: "/placeholder.svg?height=40&width=40",
    initials: "JS",
    avatarColor: "bg-green-500",
    subjectInterests: ["Mathematics", "Chemistry"],
    location: "Kandy",
  },
  {
    id: 3,
    name: "Sarah Johnson",
    email: "sarah.j@email.com",
    age: 15,
    profilePicture: "/placeholder.svg?height=40&width=40",
    initials: "SJ",
    avatarColor: "bg-purple-500",
    subjectInterests: ["Chemistry", "Biology"],
    location: "Galle",
  },
  {
    id: 4,
    name: "David Chen",
    email: "david.chen@email.com",
    age: 18,
    profilePicture: "/placeholder.svg?height=40&width=40",
    initials: "DC",
    avatarColor: "bg-orange-500",
    subjectInterests: ["Physics", "Mathematics", "Chemistry"],
    location: "Colombo",
  },
  {
    id: 5,
    name: "Emma Wilson",
    email: "emma.wilson@email.com",
    age: 16,
    profilePicture: "/placeholder.svg?height=40&width=40",
    initials: "EW",
    avatarColor: "bg-pink-500",
    subjectInterests: ["Biology", "Chemistry"],
    location: "Negombo",
  },
  {
    id: 6,
    name: "Michael Brown",
    email: "michael.b@email.com",
    age: 17,
    profilePicture: "/placeholder.svg?height=40&width=40",
    initials: "MB",
    avatarColor: "bg-red-500",
    subjectInterests: ["Mathematics", "Physics"],
    location: "Jaffna",
  },
];

const sessions: Session[] = [
  {
    id: 1,
    student: students[0],
    subject: "Physics",
    date: "2024-01-25",
    startTime: "14:00",
    endTime: "16:00",
    status: "pending",
    paymentStatus: "confirmed",
    requestedAt: "2024-01-20T10:30:00Z",
    notes: "Needs help with quantum mechanics",
  },
  {
    id: 2,
    student: students[1],
    subject: "Mathematics",
    date: "2024-01-26",
    startTime: "10:00",
    endTime: "12:00",
    status: "pending",
    paymentStatus: "pending",
    requestedAt: "2024-01-21T15:45:00Z",
  },
  {
    id: 3,
    student: students[2],
    subject: "Chemistry",
    date: "2024-01-24",
    startTime: "15:00",
    endTime: "17:00",
    status: "confirmed",
    paymentStatus: "confirmed",
    requestedAt: "2024-01-19T09:15:00Z",
    meetingLink: "https://meet.google.com/abc-def-ghi",
  },
  {
    id: 4,
    student: students[3],
    subject: "Physics",
    date: "2024-01-27",
    startTime: "11:00",
    endTime: "13:00",
    status: "confirmed",
    paymentStatus: "confirmed",
    requestedAt: "2024-01-22T14:20:00Z",
    meetingLink: "https://meet.google.com/xyz-abc-def",
  },
  {
    id: 5,
    student: students[4],
    subject: "Biology",
    date: "2024-01-28",
    startTime: "16:00",
    endTime: "18:00",
    status: "pending",
    paymentStatus: "confirmed",
    requestedAt: "2024-01-23T11:30:00Z",
  },
  {
    id: 6,
    student: students[5],
    subject: "Mathematics",
    date: "2024-01-26",
    startTime: "14:00",
    endTime: "16:00",
    status: "confirmed",
    paymentStatus: "confirmed",
    requestedAt: "2024-01-21T16:45:00Z",
    meetingLink: "https://meet.google.com/math-session-123",
  },
];

const COLORS = [
  "#0088FE",
  "#00C49F",
  "#FFBB28",
  "#FF8042",
  "#8884D8",
  "#82CA9D",
];

export default function MentorDashboard() {
  const [sessionsData, setSessionsData] = useState<Session[]>(sessions);
  const [lastUpdated, setLastUpdated] = useState(new Date());
  const [conflicts, setConflicts] = useState<Session[]>([]);

  // Analytics data processing
  const ageGroupData = useMemo(() => {
    const ageGroups = sessionsData.reduce(
      (acc, session) => {
        const age = session.student.age;
        let group = "";
        if (age <= 15) group = "13-15 years";
        else if (age <= 17) group = "16-17 years";
        else group = "18+ years";

        acc[group] = (acc[group] || 0) + 1;
        return acc;
      },
      {} as Record<string, number>
    );

    return Object.entries(ageGroups).map(([name, value]) => ({ name, value }));
  }, [sessionsData]);

  const subjectInterestData = useMemo(() => {
    const subjectCounts = sessionsData.reduce(
      (acc, session) => {
        acc[session.subject] = (acc[session.subject] || 0) + 1;
        return acc;
      },
      {} as Record<string, number>
    );

    return Object.entries(subjectCounts)
      .map(([subject, count]) => ({ subject, count }))
      .sort((a, b) => b.count - a.count);
  }, [sessionsData]);

  // Sort sessions by date and time
  const sortedSessions = useMemo(() => {
    return [...sessionsData].sort((a, b) => {
      const dateA = new Date(`${a.date}T${a.startTime}`);
      const dateB = new Date(`${b.date}T${b.startTime}`);
      return dateA.getTime() - dateB.getTime();
    });
  }, [sessionsData]);

  // Detect time conflicts
  useEffect(() => {
    const conflictingSessions = [];
    for (let i = 0; i < sortedSessions.length; i++) {
      for (let j = i + 1; j < sortedSessions.length; j++) {
        const sessionA = sortedSessions[i];
        const sessionB = sortedSessions[j];

        if (
          sessionA.date === sessionB.date &&
          (sessionA.status === "confirmed" || sessionA.status === "pending") &&
          (sessionB.status === "confirmed" || sessionB.status === "pending")
        ) {
          const startA = new Date(`${sessionA.date}T${sessionA.startTime}`);
          const endA = new Date(`${sessionA.date}T${sessionA.endTime}`);
          const startB = new Date(`${sessionB.date}T${sessionB.startTime}`);
          const endB = new Date(`${sessionB.date}T${sessionB.endTime}`);

          // Check for overlap
          if (startA < endB && endA > startB) {
            if (!conflictingSessions.find((s) => s.id === sessionA.id)) {
              conflictingSessions.push(sessionA);
            }
            if (!conflictingSessions.find((s) => s.id === sessionB.id)) {
              conflictingSessions.push(sessionB);
            }
          }
        }
      }
    }
    setConflicts(conflictingSessions);
  }, [sortedSessions]);

  const handleSessionAction = (
    sessionId: number,
    action: "accept" | "decline"
  ) => {
    setSessionsData((prev) =>
      prev.map((session) =>
        session.id === sessionId
          ? {
              ...session,
              status: action === "accept" ? "confirmed" : "cancelled",
              meetingLink:
                action === "accept"
                  ? `https://meet.google.com/session-${sessionId}`
                  : undefined,
            }
          : session
      )
    );
    setLastUpdated(new Date());
  };

  const getStudentIdentifier = (student: Student) => {
    return `${student.name} (${student.email.split("@")[0]}) - ${student.location}`;
  };

  const isConflicted = (session: Session) => {
    return conflicts.some((c) => c.id === session.id);
  };

  const stats = {
    totalStudents: new Set(sessionsData.map((s) => s.student.id)).size,
    thisWeekSessions: sortedSessions.filter((s) => {
      const sessionDate = parseISO(s.date);
      const now = new Date();
      const weekFromNow = addMinutes(now, 7 * 24 * 60);
      return isAfter(sessionDate, now) && isBefore(sessionDate, weekFromNow);
    }).length,
    totalHours: sessionsData.filter((s) => s.status === "completed").length * 2,
    averageRating: 4.9,
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="p-6">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  Welcome, Dr. Patel!
                </h1>
                <p className="text-gray-600">
                  Manage your mentoring sessions and student requests
                </p>
              </div>
              <div className="text-sm text-gray-500">
                Last updated: {format(lastUpdated, "MMM dd, yyyy HH:mm")}
              </div>
            </div>
          </div>

          {/* Conflicts Alert */}
          {conflicts.length > 0 && (
            <Alert className="mb-6 border-orange-200 bg-orange-50">
              <AlertTriangle className="h-4 w-4 text-orange-600" />
              <AlertDescription className="text-orange-800">
                <strong>Time Conflicts Detected:</strong> You have{" "}
                {conflicts.length} sessions with overlapping times. Please
                review and reschedule to avoid conflicts.
              </AlertDescription>
            </Alert>
          )}

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <Users className="h-8 w-8 text-blue-600" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">
                      Total Students
                    </p>
                    <p className="text-2xl font-bold text-gray-900">
                      {stats.totalStudents}
                    </p>
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
                    <p className="text-2xl font-bold text-gray-900">
                      {stats.thisWeekSessions}
                    </p>
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
                      Hours Taught
                    </p>
                    <p className="text-2xl font-bold text-gray-900">
                      {stats.totalHours}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <Star className="h-8 w-8 text-yellow-600" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Rating</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {stats.averageRating}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="analytics" className="space-y-6">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger
                value="analytics"
                className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4" />
                Analytics
              </TabsTrigger>
              <TabsTrigger value="sessions" className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                Sessions
              </TabsTrigger>
              <TabsTrigger value="requests" className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                Pending Requests
              </TabsTrigger>
            </TabsList>

            {/* Analytics Tab */}
            <TabsContent value="analytics" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Age Distribution Pie Chart */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <PieChart className="w-5 h-5" />
                      Student Age Distribution
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <RechartsPieChart>
                        <Pie
                          data={ageGroupData}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          label={({ name, percent }) =>
                            `${name} ${(percent * 100).toFixed(0)}%`
                          }
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value">
                          {ageGroupData.map((entry, index) => (
                            <Cell
                              key={`cell-${index}`}
                              fill={COLORS[index % COLORS.length]}
                            />
                          ))}
                        </Pie>
                        <Tooltip />
                        <Legend />
                      </RechartsPieChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>

                {/* Subject Interests Bar Chart */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <BarChart3 className="w-5 h-5" />
                      Subject Interest Breakdown
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <RechartsBarChart
                        data={subjectInterestData}
                        layout="horizontal">
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis type="number" />
                        <YAxis dataKey="subject" type="category" width={80} />
                        <Tooltip />
                        <Bar dataKey="count" fill="#8884d8" />
                      </RechartsBarChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </div>

              {/* Insights */}
              <Card>
                <CardHeader>
                  <CardTitle>Key Insights</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="p-4 bg-blue-50 rounded-lg">
                      <h4 className="font-semibold text-blue-900">
                        Most Popular Subject
                      </h4>
                      <p className="text-blue-700">
                        {subjectInterestData[0]?.subject || "N/A"}
                      </p>
                      <p className="text-sm text-blue-600">
                        {subjectInterestData[0]?.count || 0} sessions
                      </p>
                    </div>
                    <div className="p-4 bg-green-50 rounded-lg">
                      <h4 className="font-semibold text-green-900">
                        Primary Age Group
                      </h4>
                      <p className="text-green-700">
                        {ageGroupData[0]?.name || "N/A"}
                      </p>
                      <p className="text-sm text-green-600">
                        {ageGroupData[0]?.value || 0} students
                      </p>
                    </div>
                    <div className="p-4 bg-purple-50 rounded-lg">
                      <h4 className="font-semibold text-purple-900">
                        Growth Opportunity
                      </h4>
                      <p className="text-purple-700">
                        {subjectInterestData.length > 1
                          ? subjectInterestData[subjectInterestData.length - 1]
                              ?.subject
                          : "Expand subjects"}
                      </p>
                      <p className="text-sm text-purple-600">
                        Consider focusing here
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* All Sessions Tab */}
            <TabsContent value="sessions" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>All Sessions (Sorted by Date)</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {sortedSessions.map((session) => (
                      <div
                        key={session.id}
                        className={`border rounded-lg p-4 ${isConflicted(session) ? "border-orange-300 bg-orange-50" : ""}`}>
                        {isConflicted(session) && (
                          <div className="flex items-center gap-2 mb-2 text-orange-700">
                            <AlertTriangle className="w-4 h-4" />
                            <span className="text-sm font-medium">
                              Time Conflict
                            </span>
                          </div>
                        )}

                        <div className="flex items-start gap-4">
                          <Avatar className="w-12 h-12">
                            <AvatarImage
                              src={
                                session.student.profilePicture ||
                                "/placeholder.svg"
                              }
                              alt={session.student.name}
                            />
                            <AvatarFallback
                              className={session.student.avatarColor}>
                              {session.student.initials}
                            </AvatarFallback>
                          </Avatar>

                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between mb-2">
                              <div>
                                <h4 className="font-semibold">
                                  {getStudentIdentifier(session.student)}
                                </h4>
                                <p className="text-sm text-gray-600">
                                  {session.subject}
                                </p>
                                {session.notes && (
                                  <p className="text-sm text-gray-500 italic mt-1">
                                    {session.notes}
                                  </p>
                                )}
                              </div>
                              <div className="flex gap-2">
                                <Badge
                                  variant={
                                    session.status === "confirmed"
                                      ? "default"
                                      : session.status === "pending"
                                        ? "secondary"
                                        : session.status === "completed"
                                          ? "outline"
                                          : "destructive"
                                  }>
                                  {session.status}
                                </Badge>
                                <Badge
                                  variant={
                                    session.paymentStatus === "confirmed"
                                      ? "default"
                                      : "secondary"
                                  }>
                                  {session.paymentStatus}
                                </Badge>
                              </div>
                            </div>

                            <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                              <span className="flex items-center gap-1">
                                <Calendar className="w-4 h-4" />
                                {format(parseISO(session.date), "MMM dd, yyyy")}
                              </span>
                              <span className="flex items-center gap-1">
                                <Clock className="w-4 h-4" />
                                {session.startTime} - {session.endTime}
                              </span>
                              <span className="text-xs text-gray-500">
                                Requested:{" "}
                                {format(
                                  parseISO(session.requestedAt),
                                  "MMM dd, HH:mm"
                                )}
                              </span>
                            </div>

                            <div className="flex gap-2">
                              {session.status === "confirmed" &&
                                session.meetingLink && (
                                  <Button
                                    size="sm"
                                    className="bg-blue-600 hover:bg-blue-700 text-white">
                                    <Video className="w-4 h-4 mr-1" />
                                    Start Session
                                  </Button>
                                )}
                              {session.status === "pending" && (
                                <>
                                  <Button
                                    size="sm"
                                    className="bg-green-600 hover:bg-green-700 text-white"
                                    onClick={() =>
                                      handleSessionAction(session.id, "accept")
                                    }>
                                    <CheckCircle className="w-4 h-4 mr-1" />
                                    Accept
                                  </Button>
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    className="text-red-600 border-red-600 hover:bg-red-50 bg-transparent"
                                    onClick={() =>
                                      handleSessionAction(session.id, "decline")
                                    }>
                                    <XCircle className="w-4 h-4 mr-1" />
                                    Decline
                                  </Button>
                                </>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Pending Requests Tab */}
            <TabsContent value="requests" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Pending Session Requests</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {sortedSessions
                      .filter((s) => s.status === "pending")
                      .map((session) => (
                        <div
                          key={session.id}
                          className={`border rounded-lg p-4 ${isConflicted(session) ? "border-orange-300 bg-orange-50" : ""}`}>
                          {isConflicted(session) && (
                            <div className="flex items-center gap-2 mb-2 text-orange-700">
                              <AlertTriangle className="w-4 h-4" />
                              <span className="text-sm font-medium">
                                Time Conflict - Review Carefully
                              </span>
                            </div>
                          )}

                          <div className="flex items-start gap-4">
                            <Avatar className="w-12 h-12">
                              <AvatarImage
                                src={
                                  session.student.profilePicture ||
                                  "/placeholder.svg"
                                }
                                alt={session.student.name}
                              />
                              <AvatarFallback
                                className={session.student.avatarColor}>
                                {session.student.initials}
                              </AvatarFallback>
                            </Avatar>

                            <div className="flex-1 min-w-0">
                              <div className="flex items-start justify-between mb-2">
                                <div>
                                  <h4 className="font-semibold">
                                    {getStudentIdentifier(session.student)}
                                  </h4>
                                  <p className="text-sm text-gray-600">
                                    {session.subject}
                                  </p>
                                  {session.notes && (
                                    <p className="text-sm text-gray-500 italic mt-1">
                                      Note: {session.notes}
                                    </p>
                                  )}
                                </div>
                                <Badge
                                  variant={
                                    session.paymentStatus === "confirmed"
                                      ? "default"
                                      : "secondary"
                                  }>
                                  Payment {session.paymentStatus}
                                </Badge>
                              </div>

                              <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                                <span className="flex items-center gap-1">
                                  <Calendar className="w-4 h-4" />
                                  {format(
                                    parseISO(session.date),
                                    "MMM dd, yyyy"
                                  )}
                                </span>
                                <span className="flex items-center gap-1">
                                  <Clock className="w-4 h-4" />
                                  {session.startTime} - {session.endTime}
                                </span>
                                <span className="text-xs text-gray-500">
                                  Requested:{" "}
                                  {format(
                                    parseISO(session.requestedAt),
                                    "MMM dd, HH:mm"
                                  )}
                                </span>
                              </div>

                              <div className="flex gap-2">
                                <Button
                                  size="sm"
                                  className="bg-green-600 hover:bg-green-700 text-white"
                                  onClick={() =>
                                    handleSessionAction(session.id, "accept")
                                  }>
                                  <CheckCircle className="w-4 h-4 mr-1" />
                                  Accept
                                </Button>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  className="text-red-600 border-red-600 hover:bg-red-50 bg-transparent"
                                  onClick={() =>
                                    handleSessionAction(session.id, "decline")
                                  }>
                                  <XCircle className="w-4 h-4 mr-1" />
                                  Decline
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}

                    {sortedSessions.filter((s) => s.status === "pending")
                      .length === 0 && (
                      <div className="text-center py-8 text-gray-500">
                        <Clock className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                        <p>No pending requests at the moment</p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
