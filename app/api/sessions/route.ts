import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { v4 as uuidv4 } from "uuid";
import path from "path";
import fs from "fs/promises";

const UPLOAD_DIR = path.join(process.cwd(), "public", "uploads");

export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const studentId = formData.get("studentId") as string;
  const mentorId = formData.get("mentorId") as string;
  const date = formData.get("date") as string;
  const duration = parseInt(formData.get("duration") as string, 10);
  const file = formData.get("bankSlip") as File;

  if (!studentId || !mentorId || !date || !duration || !file) {
    return NextResponse.json(
      { error: "Missing required fields" },
      { status: 400 }
    );
  }

  try {
    // Ensure upload directory exists
    await fs.mkdir(UPLOAD_DIR, { recursive: true });

    // Save the uploaded file
    const fileExtension = path.extname(file.name);
    const fileName = `${uuidv4()}${fileExtension}`;
    const filePath = path.join(UPLOAD_DIR, fileName);
    const fileBuffer = Buffer.from(await file.arrayBuffer());
    await fs.writeFile(filePath, fileBuffer);

    // Create session in the database
    const session = await prisma.session.create({
      data: {
        studentId,
        mentorId,
        date: new Date(date),
        duration,
        bankSlipUrl: `/uploads/${fileName}`,
        fileType: file.type,
      },
    });

    return NextResponse.json(session, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
