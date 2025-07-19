import { PrismaClient } from '@prisma/client';
import { generateEmbedding, cosineSimilarity } from './openai';
import { createStudentProfileText, createMentorProfileText } from './profileUtils';

const prisma = new PrismaClient();

export async function findMatchingMentorsByStudentId(studentId: string) {
  try {
    // Get student profile
    const student = await prisma.studentProfile.findUnique({
      where: { id: studentId },
      include: {
        user: true,
        subjects: true,
      },
    });

    if (!student) {
      throw new Error('Student not found');
    }

    // Get all mentors
    const mentors = await prisma.mentorProfile.findMany({
      include: {
        user: true,
        expertise: true,
        preferredLevels: true,
      },
    });

    if (mentors.length === 0) {
      return [];
    }

    // Generate student embedding
    const studentProfileText = createStudentProfileText(student);
    const studentEmbedding = await generateEmbedding(studentProfileText);

    const mentorMatches = [];

    // Process each mentor
    for (const mentor of mentors) {
      const mentorProfileText = createMentorProfileText(mentor);
      const mentorEmbedding = await generateEmbedding(mentorProfileText);
      
      // Calculate base similarity
      let similarityScore = cosineSimilarity(studentEmbedding, mentorEmbedding);

      // Apply matching boosts
      // Language preference boost
      if (student.languagePreference && mentor.languagePreference &&
          student.languagePreference === mentor.languagePreference) {
        similarityScore += 0.1;
      }

      // Grade level matching boost
      const isLevelMatch = mentor.preferredLevels.some(level => {
        const studentYear = student.currentYear;
        switch (level.level) {
          case 'GRADE_3_TO_5':
            return studentYear >= 3 && studentYear <= 5;
          case 'GRADE_6_TO_9':
            return studentYear >= 6 && studentYear <= 9;
          case 'GRADE_10_TO_11':
            return studentYear >= 10 && studentYear <= 11;
          case 'ADVANCED_LEVEL':
            return studentYear >= 12;
          default:
            return true;
        }
      });

      if (isLevelMatch) {
        similarityScore += 0.15;
      }

      // Subject overlap boost
      const studentSubjects = student.subjects.map(s => s.subject.toLowerCase());
      const mentorSubjects = mentor.expertise.map(e => e.subject.toLowerCase());
      const subjectOverlap = studentSubjects.filter(s => 
        mentorSubjects.some(m => m.includes(s) || s.includes(m))
      ).length;

      if (subjectOverlap > 0) {
        similarityScore += (subjectOverlap * 0.05);
      }

      // Experience boost for advanced students
      if (student.currentYear >= 10 && mentor.yearsExperience >= 5) {
        similarityScore += 0.05;
      }

      // Format mentor data
      mentorMatches.push({
        name: mentor.user.fullName,
        bio: mentor.profileBio,
        avatarUrl: mentor.profilePicture || '/default-avatar.png',
        location: mentor.location,
        subjects: mentor.expertise.map(e => e.subject),
        grades: mentor.preferredLevels.map(l => l.level.replace('_', ' ')),
        languages: mentor.languagePreference ? [mentor.languagePreference] : ['English'],
        sessionDurations: ['60 minutes', '90 minutes', '120 minutes'],
        similarityScore: Math.round(similarityScore * 100) / 100, // Round to 2 decimal places
      });

      // Small delay to avoid rate limiting
      await new Promise(resolve => setTimeout(resolve, 100));
    }

    // Sort by similarity score in descending order
    return mentorMatches
      .sort((a, b) => b.similarityScore - a.similarityScore);

  } catch (error) {
    console.error('Error finding matching mentors:', error);
    throw error;
  }
}
