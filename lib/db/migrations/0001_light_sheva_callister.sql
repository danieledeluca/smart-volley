ALTER TABLE "enrollment" ADD COLUMN "first_payment" numeric(10, 2);--> statement-breakpoint
ALTER TABLE "enrollment" ADD COLUMN "first_payment_date" date;--> statement-breakpoint
ALTER TABLE "enrollment" ADD COLUMN "first_payment_type" "enrollment_payment_type";--> statement-breakpoint
ALTER TABLE "enrollment" ADD COLUMN "second_payment" numeric(10, 2);--> statement-breakpoint
ALTER TABLE "enrollment" ADD COLUMN "second_payment_date" date;--> statement-breakpoint
ALTER TABLE "enrollment" ADD COLUMN "second_payment_type" "enrollment_payment_type";--> statement-breakpoint
ALTER TABLE "enrollment" ADD COLUMN "third_payment" numeric(10, 2);--> statement-breakpoint
ALTER TABLE "enrollment" ADD COLUMN "third_payment_date" date;--> statement-breakpoint
ALTER TABLE "enrollment" ADD COLUMN "third_payment_type" "enrollment_payment_type";