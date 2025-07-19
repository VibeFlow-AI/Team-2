/*
  Warnings:

  - You are about to drop the column `time` on the `sessions` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_sessions" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "studentId" TEXT NOT NULL,
    "mentorId" TEXT NOT NULL,
    "date" DATETIME NOT NULL,
    "duration" INTEGER NOT NULL DEFAULT 120,
    "bankSlipUrl" TEXT NOT NULL,
    "fileType" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "sessions_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "student_profiles" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "sessions_mentorId_fkey" FOREIGN KEY ("mentorId") REFERENCES "mentor_profiles" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_sessions" ("bankSlipUrl", "createdAt", "date", "duration", "fileType", "id", "mentorId", "studentId", "updatedAt") SELECT "bankSlipUrl", "createdAt", "date", "duration", "fileType", "id", "mentorId", "studentId", "updatedAt" FROM "sessions";
DROP TABLE "sessions";
ALTER TABLE "new_sessions" RENAME TO "sessions";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
