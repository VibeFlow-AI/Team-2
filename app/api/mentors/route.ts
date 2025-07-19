import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  try {
    const mentors = await prisma.mentorProfile.findMany({
      include: {
        user: {
          select: {
            fullName: true,
            email: true,
          },
        },
        expertise: true,
        certifications: true,
        preferredLevels: true,
      },
    });

    return NextResponse.json(mentors, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
