import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret";
const COOKIE_NAME = "auth_token";

export async function POST(req: NextRequest) {
  const { email, password } = await req.json();

  try {
    // Find user by email
    const user = await prisma.user.findUnique({
      where: { email },
      include: {
        studentProfile: {
          select: {
            id: true,
          },
        },
        mentorProfile: {
          select: {
            id: true,
            profilePicture: true,
          },
        },
      },
    });

    if (!user) {
      return NextResponse.json(
        { error: "Invalid email or password" },
        { status: 401 }
      );
    }

    // Compare passwords
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return NextResponse.json(
        { error: "Invalid email or password" },
        { status: 401 }
      );
    }

    // Generate JWT token
    const token = jwt.sign({ id: user.id, role: user.role }, JWT_SECRET, {
      expiresIn: "7d",
    });

    // Set HTTP-only cookie
    const response = NextResponse.json({
      message: "Login successful",
      user: {
        id: user.id,
        fullName: user.fullName,
        role: user.role,
        studentProfileId: user.studentProfile?.id || null,
        mentorProfileId: user.mentorProfile?.id || null,
        profilePicture: user.mentorProfile?.profilePicture || null,
      },
    });

    response.cookies.set(COOKIE_NAME, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 7 * 24 * 60 * 60, // 7 days
      path: "/",
    });

    return response;
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
