CREATE TYPE "public"."activity_key" AS ENUM('volley', 'gymnastics');--> statement-breakpoint
CREATE TYPE "public"."enrollment_payment_type" AS ENUM('cash', 'bank_transfer');--> statement-breakpoint
ALTER TABLE "enrollment" RENAME COLUMN "volley_balance_secondary" TO "volley_second_balance";--> statement-breakpoint
ALTER TABLE "enrollment" RENAME COLUMN "first_installment" TO "gymnastics_first_installment";--> statement-breakpoint
ALTER TABLE "enrollment" RENAME COLUMN "second_installment" TO "gymnastics_second_installment";--> statement-breakpoint
ALTER TABLE "enrollment" RENAME COLUMN "third_installment" TO "gymnastics_third_installment";--> statement-breakpoint
ALTER TABLE "activity" ADD COLUMN "key" "activity_key" NOT NULL;--> statement-breakpoint
ALTER TABLE "enrollment" ADD COLUMN "volley_account_date" date;--> statement-breakpoint
ALTER TABLE "enrollment" ADD COLUMN "volley_account_type" "enrollment_payment_type";--> statement-breakpoint
ALTER TABLE "enrollment" ADD COLUMN "volley_balance_date" date;--> statement-breakpoint
ALTER TABLE "enrollment" ADD COLUMN "volley_balance_type" "enrollment_payment_type";--> statement-breakpoint
ALTER TABLE "enrollment" ADD COLUMN "volley_second_balance_date" date;--> statement-breakpoint
ALTER TABLE "enrollment" ADD COLUMN "volley_second_balance_type" "enrollment_payment_type";--> statement-breakpoint
ALTER TABLE "enrollment" ADD COLUMN "gymnastics_first_installment_date" date;--> statement-breakpoint
ALTER TABLE "enrollment" ADD COLUMN "gymnastics_first_installment_type" "enrollment_payment_type";--> statement-breakpoint
ALTER TABLE "enrollment" ADD COLUMN "gymnastics_second_installment_date" date;--> statement-breakpoint
ALTER TABLE "enrollment" ADD COLUMN "gymnastics_second_installment_type" "enrollment_payment_type";--> statement-breakpoint
ALTER TABLE "enrollment" ADD COLUMN "gymnastics_third_installment_date" date;--> statement-breakpoint
ALTER TABLE "enrollment" ADD COLUMN "gymnastics_third_installment_type" "enrollment_payment_type";--> statement-breakpoint
ALTER TABLE "activity" ADD CONSTRAINT "activity_key_unique" UNIQUE("key");