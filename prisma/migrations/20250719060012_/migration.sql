/*
  Warnings:

  - You are about to drop the `mentor_languages` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `samples` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the column `level` on the `mentor_expertise` table. All the data in the column will be lost.
  - You are about to drop the column `linkedInProfile` on the `mentor_profiles` table. All the data in the column will be lost.
  - You are about to drop the column `portfolio` on the `mentor_profiles` table. All the data in the column will be lost.
  - You are about to drop the column `bankSlip` on the `sessions` table. All the data in the column will be lost.
  - Added the required column `linkedInProfileUrl` to the `mentor_profiles` table without a default value. This is not possible if the table is not empty.
  - Added the required column `bankSlipUrl` to the `sessions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fileType` to the `sessions` table without a default value. This is not possible if the table is not empty.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "mentor_languages";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "samples";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "mentor_preferred_levels" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "mentorId" TEXT NOT NULL,
    "level" TEXT NOT NULL,
    CONSTRAINT "mentor_preferred_levels_mentorId_fkey" FOREIGN KEY ("mentorId") REFERENCES "mentor_profiles" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_mentor_expertise" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "mentorId" TEXT NOT NULL,
    "subject" TEXT NOT NULL,
    CONSTRAINT "mentor_expertise_mentorId_fkey" FOREIGN KEY ("mentorId") REFERENCES "mentor_profiles" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_mentor_expertise" ("id", "mentorId", "subject") SELECT "id", "mentorId", "subject" FROM "mentor_expertise";
DROP TABLE "mentor_expertise";
ALTER TABLE "new_mentor_expertise" RENAME TO "mentor_expertise";
CREATE TABLE "new_mentor_profiles" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "age" INTEGER NOT NULL,
    "contactNumber" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "profileBio" TEXT NOT NULL,
    "professionalRole" TEXT NOT NULL,
    "teachingExperience" TEXT NOT NULL,
    "linkedInProfileUrl" TEXT NOT NULL,
    "gitHubUrl" TEXT,
    "portfolioUrl" TEXT,
    "profilePicture" TEXT,
    "languagePreference" TEXT,
    "yearsExperience" INTEGER NOT NULL,
    "maxMentees" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "mentor_profiles_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_mentor_profiles" ("age", "contactNumber", "createdAt", "id", "location", "maxMentees", "professionalRole", "profileBio", "profilePicture", "teachingExperience", "updatedAt", "userId", "yearsExperience") SELECT "age", "contactNumber", "createdAt", "id", "location", "maxMentees", "professionalRole", "profileBio", "profilePicture", "teachingExperience", "updatedAt", "userId", "yearsExperience" FROM "mentor_profiles";
DROP TABLE "mentor_profiles";
ALTER TABLE "new_mentor_profiles" RENAME TO "mentor_profiles";
CREATE UNIQUE INDEX "mentor_profiles_userId_key" ON "mentor_profiles"("userId");
CREATE TABLE "new_sessions" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "studentId" TEXT NOT NULL,
    "mentorId" TEXT NOT NULL,
    "date" DATETIME NOT NULL,
    "time" DATETIME NOT NULL,
    "duration" INTEGER NOT NULL DEFAULT 120,
    "bankSlipUrl" TEXT NOT NULL,
    "fileType" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "sessions_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "student_profiles" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "sessions_mentorId_fkey" FOREIGN KEY ("mentorId") REFERENCES "mentor_profiles" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_sessions" ("createdAt", "date", "duration", "id", "mentorId", "studentId", "time", "updatedAt") SELECT "createdAt", "date", "duration", "id", "mentorId", "studentId", "time", "updatedAt" FROM "sessions";
DROP TABLE "sessions";
ALTER TABLE "new_sessions" RENAME TO "sessions";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
