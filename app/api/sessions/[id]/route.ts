import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  const { searchParams } = new URL(req.url);
  const role = searchParams.get("role"); // 'student' or 'mentor'

  if (!id || !role || (role !== "student" && role !== "mentor")) {
    return NextResponse.json(
      { error: "Invalid or missing parameters" },
      { status: 400 }
    );
  }

  try {
    const sessions = await prisma.session.findMany({
      where: role === "student" ? { studentId: id } : { mentorId: id },
      include: {
        student: {
          select: {
            user: {
              select: {
                fullName: true,
                email: true,
              },
            },
          },
        },
        mentor: {
          select: {
            user: {
              select: {
                fullName: true,
                email: true,
              },
            },
          },
        },
      },
    });

    return NextResponse.json(sessions, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
