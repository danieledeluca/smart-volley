/*
  Warnings:

  - You are about to alter the column `volley_account` on the `Enrollment` table. The data in that column could be lost. The data in that column will be cast from `Decimal(10,2)` to `DoublePrecision`.
  - You are about to alter the column `volley_balance` on the `Enrollment` table. The data in that column could be lost. The data in that column will be cast from `Decimal(10,2)` to `DoublePrecision`.
  - You are about to alter the column `volley_balance_secondary` on the `Enrollment` table. The data in that column could be lost. The data in that column will be cast from `Decimal(10,2)` to `DoublePrecision`.
  - You are about to alter the column `first_installment` on the `Enrollment` table. The data in that column could be lost. The data in that column will be cast from `Decimal(10,2)` to `DoublePrecision`.
  - You are about to alter the column `second_installment` on the `Enrollment` table. The data in that column could be lost. The data in that column will be cast from `Decimal(10,2)` to `DoublePrecision`.
  - You are about to alter the column `third_installment` on the `Enrollment` table. The data in that column could be lost. The data in that column will be cast from `Decimal(10,2)` to `DoublePrecision`.

*/
-- AlterTable
ALTER TABLE "Enrollment" ALTER COLUMN "volley_account" SET DATA TYPE DOUBLE PRECISION,
ALTER COLUMN "volley_balance" SET DATA TYPE DOUBLE PRECISION,
ALTER COLUMN "volley_balance_secondary" SET DATA TYPE DOUBLE PRECISION,
ALTER COLUMN "first_installment" SET DATA TYPE DOUBLE PRECISION,
ALTER COLUMN "second_installment" SET DATA TYPE DOUBLE PRECISION,
ALTER COLUMN "third_installment" SET DATA TYPE DOUBLE PRECISION;
