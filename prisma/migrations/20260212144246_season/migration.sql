/*
  Warnings:

  - You are about to drop the column `certificate_download_url` on the `Athlete` table. All the data in the column will be lost.
  - You are about to drop the column `certificate_expiration_date` on the `Athlete` table. All the data in the column will be lost.
  - You are about to drop the column `first_installment` on the `Athlete` table. All the data in the column will be lost.
  - You are about to drop the column `phone_number` on the `Athlete` table. All the data in the column will be lost.
  - You are about to drop the column `second_installment` on the `Athlete` table. All the data in the column will be lost.
  - You are about to drop the column `tax_code` on the `Athlete` table. All the data in the column will be lost.
  - You are about to drop the column `third_installment` on the `Athlete` table. All the data in the column will be lost.
  - You are about to drop the column `volley_account` on the `Athlete` table. All the data in the column will be lost.
  - You are about to drop the column `volley_balance` on the `Athlete` table. All the data in the column will be lost.
  - You are about to drop the column `volley_balance_secondary` on the `Athlete` table. All the data in the column will be lost.
  - You are about to drop the column `year` on the `Athlete` table. All the data in the column will be lost.
  - You are about to drop the column `tax_code` on the `Parent` table. All the data in the column will be lost.
  - Added the required column `phoneNumber` to the `Athlete` table without a default value. This is not possible if the table is not empty.
  - Added the required column `seasonId` to the `Athlete` table without a default value. This is not possible if the table is not empty.
  - Added the required column `taxCode` to the `Athlete` table without a default value. This is not possible if the table is not empty.
  - Added the required column `taxCode` to the `Parent` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Athlete" DROP COLUMN "certificate_download_url",
DROP COLUMN "certificate_expiration_date",
DROP COLUMN "first_installment",
DROP COLUMN "phone_number",
DROP COLUMN "second_installment",
DROP COLUMN "tax_code",
DROP COLUMN "third_installment",
DROP COLUMN "volley_account",
DROP COLUMN "volley_balance",
DROP COLUMN "volley_balance_secondary",
DROP COLUMN "year",
ADD COLUMN     "certificateDownloadUrl" TEXT,
ADD COLUMN     "certificateExpirationDate" DATE,
ADD COLUMN     "firstInstallment" DECIMAL(10,2),
ADD COLUMN     "phoneNumber" TEXT NOT NULL,
ADD COLUMN     "seasonId" INTEGER NOT NULL,
ADD COLUMN     "secondInstallment" DECIMAL(10,2),
ADD COLUMN     "taxCode" CHAR(16) NOT NULL,
ADD COLUMN     "thirdInstallment" DECIMAL(10,2),
ADD COLUMN     "volleyAccount" DECIMAL(10,2),
ADD COLUMN     "volleyBalance" DECIMAL(10,2),
ADD COLUMN     "volleyBalance_secondary" DECIMAL(10,2);

-- AlterTable
ALTER TABLE "Parent" DROP COLUMN "tax_code",
ADD COLUMN     "taxCode" CHAR(16) NOT NULL;

-- CreateTable
CREATE TABLE "Season" (
    "id" SERIAL NOT NULL,
    "starterYear" SMALLINT NOT NULL,
    "endYear" SMALLINT NOT NULL,

    CONSTRAINT "Season_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Athlete" ADD CONSTRAINT "Athlete_seasonId_fkey" FOREIGN KEY ("seasonId") REFERENCES "Season"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
