export function createStudentProfileText(student: any): string {
  const subjects = student.subjects?.map((s: any) => s.subject).join(', ') || '';
  
  return `Student: ${student.user.fullName}. Age: ${student.age}. Grade: ${student.currentYear}. Learning Style: ${student.learningStyle}. Subjects: ${subjects}. Language: ${student.languagePreference || 'English'}. Goals: ${student.learningGoals || 'General improvement'}.`;
}

export function createMentorProfileText(mentor: any): string {
  const subjects = mentor.expertise?.map((e: any) => e.subject).join(', ') || '';
  const levels = mentor.preferredLevels?.map((l: any) => l.level).join(', ') || '';
  
  return `Mentor: ${mentor.user.fullName}. Role: ${mentor.professionalRole}. Experience: ${mentor.teachingExperience} (${mentor.yearsExperience} years). Subjects: ${subjects}. Levels: ${levels}. Language: ${mentor.languagePreference || 'English'}. Location: ${mentor.location}. Bio: ${mentor.profileBio}.`;
}
