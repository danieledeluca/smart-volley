-- DropIndex
DROP INDEX "Athlete_email_key";

-- DropIndex
DROP INDEX "Parent_email_key";

-- AlterTable
ALTER TABLE "Athlete" ALTER COLUMN "email" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Parent" ALTER COLUMN "email" DROP NOT NULL;
