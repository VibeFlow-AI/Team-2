export interface Mentor {
  id: string;
  initials: string;
  name: string;
  location: string;
  subjects: string[];
  description: string;
  duration: string;
  preferredLanguage: string;
}

export const mentors: Mentor[] = [
  {
    id: "1",
    initials: "RL",
    name: "Rahul Lavan",
    location: "Colombo",
    subjects: ["Science", "Physics", "Biology"],
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled.",
    duration: "30 mins - 1 hour",
    preferredLanguage: "English, Tamil",
  },
  {
    id: "2",
    initials: "CR",
    name: "Chathum Rahal",
    location: "Galle",
    subjects: ["Mathematics", "History", "English"],
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled.",
    duration: "1 hour",
    preferredLanguage: "English",
  },
  {
    id: "3",
    initials: "MF",
    name: "Malsha Fernando",
    location: "Colombo",
    subjects: ["Chemistry", "Art", "Commerce"],
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled.",
    duration: "1 hour",
    preferredLanguage: "Sinhala",
  },
];
