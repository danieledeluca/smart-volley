/*
  Warnings:

  - A unique constraint covering the columns `[starter_year,end_year]` on the table `Season` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Season_starter_year_end_year_key" ON "Season"("starter_year", "end_year");
