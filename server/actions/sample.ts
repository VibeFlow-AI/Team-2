"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function addSample(formData: FormData) {
  const id = formData.get("id") as string;

  if (!id || !id.trim()) {
    return { error: "Sample ID is required" };
  }

  try {
    const sample = await prisma.sample.create({
      data: {
        id: id.trim(),
      },
    });

    revalidatePath("/");
    return { success: true, sample };
  } catch (error) {
    console.error("Error creating sample:", error);
    return { error: "Failed to create sample. ID might already exist." };
  }
}

export async function deleteSample(id: string) {
  try {
    await prisma.sample.delete({
      where: { id },
    });

    revalidatePath("/");
    return { success: true };
  } catch (error) {
    console.error("Error deleting sample:", error);
    return { error: "Failed to delete sample" };
  }
}
