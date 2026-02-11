/*
  Warnings:

  - You are about to drop the `Post` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.
  - Changed the type of `course_name` on the `Athlete` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "CourseName" AS ENUM ('M', 'TB');

-- DropForeignKey
ALTER TABLE "Post" DROP CONSTRAINT "Post_authorId_fkey";

-- AlterTable
ALTER TABLE "Athlete" ALTER COLUMN "date_of_birth" SET DATA TYPE DATE,
DROP COLUMN "course_name",
ADD COLUMN     "course_name" "CourseName" NOT NULL,
ALTER COLUMN "volley_balance" DROP NOT NULL,
ALTER COLUMN "certificate_expiration_date" SET DATA TYPE DATE;

-- DropTable
DROP TABLE "Post";

-- DropTable
DROP TABLE "User";
