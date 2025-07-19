import Navbar from "@/components/navbar"
import Sidebar from "@/components/sidebar"
import FilterBar from "@/components/filter-bar"
import MentorCard from "@/components/mentor-card"

const mentors = [
  {
    id: 1,
    name: "Rahul Lavan",
    city: "Colombo",
    initials: "RL",
    avatarColor: "bg-blue-500",
    subjects: ["Science", "Physics", "Biology"],
    bio: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled",
    duration: "30 mins - 1 hour",
    language: "English, Tamil",
  },
  {
    id: 2,
    name: "Chathum Rahal",
    city: "Galle",
    initials: "CR",
    avatarColor: "bg-orange-500",
    subjects: ["Mathematics", "History", "English"],
    bio: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled",
    duration: "1 hour",
    language: "English",
  },
  {
    id: 3,
    name: "Malsha Fernando",
    city: "Colombo",
    initials: "MI",
    avatarColor: "bg-purple-500",
    subjects: ["Chemistry", "Art", "Commerce"],
    bio: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled",
    duration: "1 hour",
    language: "Sinhala",
  },
]

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 p-6 ml-16 lg:ml-20">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8">
              <h1 className="text-2xl lg:text-3xl font-semibold text-gray-900 mb-4 lg:mb-0">Discover</h1>
              <FilterBar />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {mentors.map((mentor) => (
                <MentorCard key={mentor.id} mentor={mentor} />
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
