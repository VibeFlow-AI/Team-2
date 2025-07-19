import { prisma } from "@/lib/prisma";
import bcrypt from "bcrypt";
import { NextRequest, NextResponse } from "next/server";
import path from "path";
import fs from "fs/promises";
import { v4 as uuidv4 } from "uuid";
import { TeachingExperience } from "@/lib/generated/prisma";

const UPLOAD_DIR = path.join(
  process.cwd(),
  "public",
  "uploads",
  "profile-pictures"
);

export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const fullName = formData.get("fullName") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const age = parseInt(formData.get("age") as string, 10);
  const contactNumber = formData.get("contactNumber") as string;
  const location = formData.get("location") as string;
  const profileBio = formData.get("profileBio") as string;
  const professionalRole = formData.get("professionalRole") as string;
  const teachingExperience = formData.get(
    "teachingExperience"
  ) as string as TeachingExperience;
  const linkedInProfileUrl = formData.get("linkedInProfileUrl") as string;
  const gitHubUrl = formData.get("gitHubUrl") as string;
  const portfolioUrl = formData.get("portfolioUrl") as string;
  const languagePreference = formData.get("languagePreference") as string;
  const yearsExperience = parseInt(
    formData.get("yearsExperience") as string,
    10
  );
  const maxMentees = parseInt(formData.get("maxMentees") as string, 10);
  const expertise = JSON.parse(formData.get("expertise") as string);
  const certifications = JSON.parse(
    formData.get("certifications") as string
  ) as Array<{
    title: string;
    issuedBy: string;
    issuedAt: string;
  }>;
  const preferredLevels = JSON.parse(formData.get("preferredLevels") as string);
  const profilePicture = formData.get("profilePicture") as File;

  if (!profilePicture) {
    return NextResponse.json(
      { error: "Profile picture is required" },
      { status: 400 }
    );
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    // Ensure upload directory exists
    await fs.mkdir(UPLOAD_DIR, { recursive: true });

    // Save the uploaded profile picture
    const fileExtension = path.extname(profilePicture.name);
    const fileName = `${uuidv4()}${fileExtension}`;
    const filePath = path.join(UPLOAD_DIR, fileName);
    const fileBuffer = Buffer.from(await profilePicture.arrayBuffer());
    await fs.writeFile(filePath, fileBuffer);

    const user = await prisma.user.create({
      data: {
        fullName,
        email,
        password: hashedPassword,
        role: "MENTOR",
        mentorProfile: {
          create: {
            age,
            contactNumber,
            location,
            profileBio,
            professionalRole,
            teachingExperience,
            linkedInProfileUrl,
            gitHubUrl,
            portfolioUrl,
            profilePicture: `/uploads/profile-pictures/${fileName}`,
            languagePreference,
            yearsExperience,
            maxMentees,
            expertise: {
              create: expertise.map((subject: string) => ({ subject })),
            },
            certifications: {
              create: certifications.map(
                (cert: { title: string; issuedBy: string; issuedAt: string }) =>
                  cert
              ),
            },
            preferredLevels: {
              create: preferredLevels.map((level: string) => ({ level })),
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
