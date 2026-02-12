/*
  Warnings:

  - You are about to drop the column `course_name` on the `Athlete` table. All the data in the column will be lost.
  - You are about to drop the column `date_of_birth` on the `Athlete` table. All the data in the column will be lost.
  - You are about to drop the column `full_name` on the `Athlete` table. All the data in the column will be lost.
  - You are about to drop the column `parent_full_name` on the `Athlete` table. All the data in the column will be lost.
  - You are about to drop the column `parent_tax_code` on the `Athlete` table. All the data in the column will be lost.
  - You are about to drop the column `place_of_birth` on the `Athlete` table. All the data in the column will be lost.
  - You are about to drop the column `residence_city` on the `Athlete` table. All the data in the column will be lost.
  - Added the required column `activityId` to the `Athlete` table without a default value. This is not possible if the table is not empty.
  - Added the required column `birthday` to the `Athlete` table without a default value. This is not possible if the table is not empty.
  - Added the required column `birthplace` to the `Athlete` table without a default value. This is not possible if the table is not empty.
  - Added the required column `city` to the `Athlete` table without a default value. This is not possible if the table is not empty.
  - Added the required column `courseId` to the `Athlete` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `Athlete` table without a default value. This is not possible if the table is not empty.
  - Added the required column `year` to the `Athlete` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Athlete" DROP COLUMN "course_name",
DROP COLUMN "date_of_birth",
DROP COLUMN "full_name",
DROP COLUMN "parent_full_name",
DROP COLUMN "parent_tax_code",
DROP COLUMN "place_of_birth",
DROP COLUMN "residence_city",
ADD COLUMN     "activityId" INTEGER NOT NULL,
ADD COLUMN     "birthday" DATE NOT NULL,
ADD COLUMN     "birthplace" TEXT NOT NULL,
ADD COLUMN     "city" TEXT NOT NULL,
ADD COLUMN     "courseId" INTEGER NOT NULL,
ADD COLUMN     "name" TEXT NOT NULL,
ADD COLUMN     "parentId" INTEGER,
ADD COLUMN     "year" SMALLINT NOT NULL;

-- DropEnum
DROP TYPE "CourseName";

-- CreateTable
CREATE TABLE "Activity" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Activity_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Course" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Course_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Parent" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "tax_code" CHAR(16) NOT NULL,

    CONSTRAINT "Parent_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Athlete" ADD CONSTRAINT "Athlete_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "Parent"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Athlete" ADD CONSTRAINT "Athlete_activityId_fkey" FOREIGN KEY ("activityId") REFERENCES "Activity"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Athlete" ADD CONSTRAINT "Athlete_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
