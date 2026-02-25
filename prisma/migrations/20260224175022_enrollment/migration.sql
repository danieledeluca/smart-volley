/*
  Warnings:

  - You are about to drop the column `activityId` on the `Athlete` table. All the data in the column will be lost.
  - You are about to drop the column `certificateDownloadUrl` on the `Athlete` table. All the data in the column will be lost.
  - You are about to drop the column `certificateExpirationDate` on the `Athlete` table. All the data in the column will be lost.
  - You are about to drop the column `courseId` on the `Athlete` table. All the data in the column will be lost.
  - You are about to drop the column `firstInstallment` on the `Athlete` table. All the data in the column will be lost.
  - You are about to drop the column `parentId` on the `Athlete` table. All the data in the column will be lost.
  - You are about to drop the column `phoneNumber` on the `Athlete` table. All the data in the column will be lost.
  - You are about to drop the column `seasonId` on the `Athlete` table. All the data in the column will be lost.
  - You are about to drop the column `secondInstallment` on the `Athlete` table. All the data in the column will be lost.
  - You are about to drop the column `taxCode` on the `Athlete` table. All the data in the column will be lost.
  - You are about to drop the column `thirdInstallment` on the `Athlete` table. All the data in the column will be lost.
  - You are about to drop the column `volleyAccount` on the `Athlete` table. All the data in the column will be lost.
  - You are about to drop the column `volleyBalance` on the `Athlete` table. All the data in the column will be lost.
  - You are about to drop the column `volleyBalanceSecondary` on the `Athlete` table. All the data in the column will be lost.
  - You are about to drop the column `taxCode` on the `Parent` table. All the data in the column will be lost.
  - You are about to drop the column `endYear` on the `Season` table. All the data in the column will be lost.
  - You are about to drop the column `starterYear` on the `Season` table. All the data in the column will be lost.
  - You are about to drop the `Profile` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[email]` on the table `Parent` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `phone_number` to the `Athlete` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tax_code` to the `Athlete` table without a default value. This is not possible if the table is not empty.
  - Added the required column `email` to the `Parent` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tax_code` to the `Parent` table without a default value. This is not possible if the table is not empty.
  - Added the required column `end_year` to the `Season` table without a default value. This is not possible if the table is not empty.
  - Added the required column `starter_year` to the `Season` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Athlete" DROP CONSTRAINT "Athlete_activityId_fkey";

-- DropForeignKey
ALTER TABLE "Athlete" DROP CONSTRAINT "Athlete_courseId_fkey";

-- DropForeignKey
ALTER TABLE "Athlete" DROP CONSTRAINT "Athlete_parentId_fkey";

-- DropForeignKey
ALTER TABLE "Athlete" DROP CONSTRAINT "Athlete_seasonId_fkey";

-- AlterTable
ALTER TABLE "Athlete" DROP COLUMN "activityId",
DROP COLUMN "certificateDownloadUrl",
DROP COLUMN "certificateExpirationDate",
DROP COLUMN "courseId",
DROP COLUMN "firstInstallment",
DROP COLUMN "parentId",
DROP COLUMN "phoneNumber",
DROP COLUMN "seasonId",
DROP COLUMN "secondInstallment",
DROP COLUMN "taxCode",
DROP COLUMN "thirdInstallment",
DROP COLUMN "volleyAccount",
DROP COLUMN "volleyBalance",
DROP COLUMN "volleyBalanceSecondary",
ADD COLUMN     "parent_id" INTEGER,
ADD COLUMN     "phone_number" TEXT NOT NULL,
ADD COLUMN     "tax_code" CHAR(16) NOT NULL;

-- AlterTable
ALTER TABLE "Parent" DROP COLUMN "taxCode",
ADD COLUMN     "email" TEXT NOT NULL,
ADD COLUMN     "tax_code" CHAR(16) NOT NULL;

-- AlterTable
ALTER TABLE "Season" DROP COLUMN "endYear",
DROP COLUMN "starterYear",
ADD COLUMN     "end_year" SMALLINT NOT NULL,
ADD COLUMN     "starter_year" SMALLINT NOT NULL;

-- DropTable
DROP TABLE "Profile";

-- DropEnum
DROP TYPE "Role";

-- CreateTable
CREATE TABLE "Enrollment" (
    "id" SERIAL NOT NULL,
    "athlete_id" INTEGER NOT NULL,
    "season_id" INTEGER NOT NULL,
    "activity_id" INTEGER NOT NULL,
    "course_id" INTEGER NOT NULL,
    "volley_account" DECIMAL(10,2),
    "volley_balance" DECIMAL(10,2),
    "volley_balance_secondary" DECIMAL(10,2),
    "first_installment" DECIMAL(10,2),
    "second_installment" DECIMAL(10,2),
    "third_installment" DECIMAL(10,2),
    "certificate_expiration_date" DATE,
    "certificate_download_url" TEXT,

    CONSTRAINT "Enrollment_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Enrollment_athlete_id_season_id_activity_id_course_id_key" ON "Enrollment"("athlete_id", "season_id", "activity_id", "course_id");

-- CreateIndex
CREATE UNIQUE INDEX "Parent_email_key" ON "Parent"("email");

-- AddForeignKey
ALTER TABLE "Athlete" ADD CONSTRAINT "Athlete_parent_id_fkey" FOREIGN KEY ("parent_id") REFERENCES "Parent"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Enrollment" ADD CONSTRAINT "Enrollment_athlete_id_fkey" FOREIGN KEY ("athlete_id") REFERENCES "Athlete"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Enrollment" ADD CONSTRAINT "Enrollment_season_id_fkey" FOREIGN KEY ("season_id") REFERENCES "Season"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Enrollment" ADD CONSTRAINT "Enrollment_activity_id_fkey" FOREIGN KEY ("activity_id") REFERENCES "Activity"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Enrollment" ADD CONSTRAINT "Enrollment_course_id_fkey" FOREIGN KEY ("course_id") REFERENCES "Course"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
