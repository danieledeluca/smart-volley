/*
  Warnings:

  - You are about to drop the column `volleyBalance_secondary` on the `Athlete` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Athlete" DROP COLUMN "volleyBalance_secondary",
ADD COLUMN     "volleyBalanceSecondary" DECIMAL(10,2);
