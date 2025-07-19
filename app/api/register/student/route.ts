import { prisma } from "@/lib/prisma";
import bcrypt from "bcrypt";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const {
    fullName,
    email,
    password,
    age,
    contactNumber,
    educationLevel,
    school,
    currentYear,
    learningStyle,
    accommodations,
    languagePreference,
    learningGoals,
    preferredSessionDuration,
    specialRequests,
    subjects,
  } = body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        fullName,
        email,
        password: hashedPassword,
        role: "STUDENT",
        studentProfile: {
          create: {
            age,
            contactNumber,
            educationLevel,
            school,
            currentYear,
            learningStyle,
            accommodations,
            languagePreference,
            learningGoals,
            preferredSessionDuration,
            specialRequests,
            subjects: {
              create: subjects.map((subject: string) => ({ subject })),
            },
          },
        },
      },
    });

    return NextResponse.json(user, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
