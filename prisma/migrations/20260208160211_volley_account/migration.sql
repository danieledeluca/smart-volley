/*
  Warnings:

  - The `volley_account` column on the `Athlete` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Athlete" DROP COLUMN "volley_account",
ADD COLUMN     "volley_account" DECIMAL(10,2);
