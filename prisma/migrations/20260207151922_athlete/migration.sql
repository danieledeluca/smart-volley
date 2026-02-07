-- CreateTable
CREATE TABLE "Athlete" (
    "id" SERIAL NOT NULL,
    "full_name" TEXT NOT NULL,
    "date_of_birth" TIMESTAMP(3) NOT NULL,
    "place_of_birth" TEXT NOT NULL,
    "residence_city" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "tax_code" CHAR(16) NOT NULL,
    "parent_full_name" TEXT,
    "parent_tax_code" CHAR(16),
    "phone_number" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "course_name" TEXT NOT NULL,
    "volley_account" TEXT,
    "volley_balance" DECIMAL(10,2) NOT NULL,
    "volley_balance_secondary" DECIMAL(10,2),
    "first_installment" DECIMAL(10,2),
    "second_installment" DECIMAL(10,2),
    "third_installment" DECIMAL(10,2),
    "certificate_expiration_date" TIMESTAMP(3),
    "certificate_download_url" TEXT,

    CONSTRAINT "Athlete_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Athlete_email_key" ON "Athlete"("email");
