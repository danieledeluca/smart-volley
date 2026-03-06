/*
  Warnings:

  - A unique constraint covering the columns `[tax_code]` on the table `Athlete` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[tax_code]` on the table `Parent` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Athlete_tax_code_key" ON "Athlete"("tax_code");

-- CreateIndex
CREATE UNIQUE INDEX "Parent_tax_code_key" ON "Parent"("tax_code");
