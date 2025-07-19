"use client";

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import EnhancedFilterBar from "@/components/enhanced-filter-bar";
import EnhancedMentorCard from "@/components/enhanced-mentor-card";
import MentorBookingModal from "@/components/mentor-booking-modal";
import BankSlipUploadModal from "@/components/bank-slip-upload-modal";
import EmptyState from "@/components/empty-state";
import { toast } from "react-hot-toast";

interface Mentor {
  id: number;
  name: string;
  city: string;
  country: string;
  initials: string;
  avatarColor: string;
  subjects: string[];
  bio: string;
  languages: string[];
  experience: string;
  gradeLevels: string[];
  rating: number;
  totalSessions: number;
  isBookmarked?: boolean;
}

interface FilterState {
  duration: string;
  subjects: string[];
  languages: string[];
  educationLevels: string[];
}

// Mock mentor data with enhanced details
const mentors: Mentor[] = [
  {
    id: 1,
    name: "Rahul Lavan",
    city: "Colombo",
    country: "Sri Lanka",
    initials: "RL",
    avatarColor: "bg-blue-500",
    subjects: ["Science", "Physics", "Biology"],
    bio: "Experienced physics teacher with 8+ years in education. Specializes in making complex concepts simple and engaging for students. Helped 200+ students improve their grades.",
    languages: ["English", "Tamil"],
    experience: "8+ years",
    gradeLevels: ["Grade 9", "Ordinary Level", "Advanced Level"],
    rating: 4.9,
    totalSessions: 156,
  },
  {
    id: 2,
    name: "Chathum Rahal",
    city: "Galle",
    country: "Sri Lanka",
    initials: "CR",
    avatarColor: "bg-orange-500",
    subjects: ["Mathematics", "History", "English"],
    bio: "Mathematics expert with a passion for problem-solving. University lecturer with extensive experience in preparing students for competitive exams.",
    languages: ["English", "Sinhala"],
    experience: "12+ years",
    gradeLevels: ["Ordinary Level", "Advanced Level", "University"],
    rating: 4.8,
    totalSessions: 203,
  },
  {
    id: 3,
    name: "Malsha Fernando",
    city: "Colombo",
    country: "Sri Lanka",
    initials: "MF",
    avatarColor: "bg-purple-500",
    subjects: ["Chemistry", "Art", "Commerce"],
    bio: "Creative chemistry teacher who combines art and science. Known for innovative teaching methods and excellent student engagement.",
    languages: ["Sinhala", "English"],
    experience: "6+ years",
    gradeLevels: ["Grade 9", "Ordinary Level"],
    rating: 4.7,
    totalSessions: 89,
  },
  {
    id: 4,
    name: "Priya Sharma",
    city: "Kandy",
    country: "Sri Lanka",
    initials: "PS",
    avatarColor: "bg-green-500",
    subjects: ["Biology", "Chemistry", "Science"],
    bio: "Medical graduate turned educator. Specializes in life sciences and helps students understand complex biological processes through real-world examples.",
    languages: ["English", "Hindi", "Sinhala"],
    experience: "5+ years",
    gradeLevels: ["Grade 9", "Ordinary Level", "Advanced Level"],
    rating: 4.9,
    totalSessions: 134,
  },
  {
    id: 5,
    name: "David Wilson",
    city: "Negombo",
    country: "Sri Lanka",
    initials: "DW",
    avatarColor: "bg-red-500",
    subjects: ["English", "Literature", "History"],
    bio: "Native English speaker with expertise in literature and creative writing. Helps students improve their language skills and critical thinking.",
    languages: ["English"],
    experience: "10+ years",
    gradeLevels: ["Ordinary Level", "Advanced Level"],
    rating: 4.8,
    totalSessions: 178,
  },
  {
    id: 6,
    name: "Anita Perera",
    city: "Jaffna",
    country: "Sri Lanka",
    initials: "AP",
    avatarColor: "bg-pink-500",
    subjects: ["Mathematics", "Physics", "Commerce"],
    bio: "Engineering background with strong analytical skills. Excellent at breaking down complex mathematical concepts into digestible parts.",
    languages: ["Tamil", "English"],
    experience: "7+ years",
    gradeLevels: ["Grade 9", "Ordinary Level", "Advanced Level"],
    rating: 4.6,
    totalSessions: 112,
  },
];

export default function Dashboard() {
  const router = useRouter();
  const [filters, setFilters] = useState<FilterState>({
    duration: "",
    subjects: [],
    languages: [],
    educationLevels: [],
  });

  const [selectedMentor, setSelectedMentor] = useState<Mentor | null>(null);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [sessionDetails, setSessionDetails] = useState<{
    mentorName: string;
    date: Date;
    time: string;
  } | null>(null);

  // Matching algorithm
  const filteredAndSortedMentors = useMemo(() => {
    const filtered = mentors.filter((mentor) => {
      // Duration filter (assuming all mentors offer 2-hour sessions)
      if (filters.duration && filters.duration !== "2hours") {
        return false;
      }

      // Subjects filter
      if (filters.subjects.length > 0) {
        const hasMatchingSubject = filters.subjects.some((subject) =>
          mentor.subjects.includes(subject)
        );
        if (!hasMatchingSubject) return false;
      }

      // Languages filter
      if (filters.languages.length > 0) {
        const hasMatchingLanguage = filters.languages.some((language) =>
          mentor.languages.includes(language)
        );
        if (!hasMatchingLanguage) return false;
      }

      // Education levels filter
      if (filters.educationLevels.length > 0) {
        const hasMatchingLevel = filters.educationLevels.some((level) =>
          mentor.gradeLevels.includes(level)
        );
        if (!hasMatchingLevel) return false;
      }

      return true;
    });

    // Sort by relevance score
    return filtered.sort((a, b) => {
      let scoreA = 0;
      let scoreB = 0;

      // Subject overlap score
      const subjectOverlapA = filters.subjects.filter((s) =>
        a.subjects.includes(s)
      ).length;
      const subjectOverlapB = filters.subjects.filter((s) =>
        b.subjects.includes(s)
      ).length;
      scoreA += subjectOverlapA * 10;
      scoreB += subjectOverlapB * 10;

      // Rating score
      scoreA += a.rating * 2;
      scoreB += b.rating * 2;

      // Experience bonus
      scoreA += a.totalSessions * 0.01;
      scoreB += b.totalSessions * 0.01;

      return scoreB - scoreA;
    });
  }, [filters]);

  const handleBookSession = (mentor: Mentor) => {
    setSelectedMentor(mentor);
    setShowBookingModal(true);
  };

  const handleScheduleConfirm = (date: Date, time: string) => {
    if (selectedMentor) {
      setSessionDetails({
        mentorName: selectedMentor.name,
        date,
        time,
      });
      setShowBookingModal(false);
      setShowPaymentModal(true);
    }
  };

  const handlePaymentConfirm = (file: File) => {
    // Here you would upload the file and process the booking
    setShowPaymentModal(false);
    setSelectedMentor(null);
    setSessionDetails(null);

    toast.promise(new Promise((resolve) => setTimeout(resolve, 2000)), {
      loading: "Booking session...",
      success: "Session Booked Successfully!",
      error: "Failed to book session.",
    });

    // Redirect to student dashboard
    router.push("/student-dashboard");
  };

  const handleBookmark = (mentorId: number) => {
    // Handle bookmark logic
    console.log("Bookmarked mentor:", mentorId);
  };

  const clearFilters = () => {
    setFilters({
      duration: "",
      subjects: [],
      languages: [],
      educationLevels: [],
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex">
        <main className="flex-1 p-6 ml-16 lg:ml-20">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8">
              <h1 className="text-2xl lg:text-3xl font-semibold text-gray-900 mb-4 lg:mb-0">
                Discover Mentors
              </h1>
              <EnhancedFilterBar
                filters={filters}
                onFiltersChange={setFilters}
                onClearFilters={clearFilters}
              />
            </div>

            {filteredAndSortedMentors.length === 0 ? (
              <EmptyState type="no-mentors" onAction={clearFilters} />
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredAndSortedMentors.map((mentor) => (
                  <EnhancedMentorCard
                    key={mentor.id}
                    mentor={mentor}
                    onBookSession={handleBookSession}
                    onBookmark={handleBookmark}
                  />
                ))}
              </div>
            )}
          </div>
        </main>
      </div>

      {/* Booking Modal */}
      {selectedMentor && (
        <MentorBookingModal
          mentor={selectedMentor}
          isOpen={showBookingModal}
          onClose={() => {
            setShowBookingModal(false);
            setSelectedMentor(null);
          }}
          onScheduleConfirm={handleScheduleConfirm}
        />
      )}

      {/* Payment Modal */}
      {sessionDetails && (
        <BankSlipUploadModal
          isOpen={showPaymentModal}
          onClose={() => {
            setShowPaymentModal(false);
            setSessionDetails(null);
          }}
          onConfirmPayment={handlePaymentConfirm}
          sessionDetails={sessionDetails}
        />
      )}
    </div>
  );
}
