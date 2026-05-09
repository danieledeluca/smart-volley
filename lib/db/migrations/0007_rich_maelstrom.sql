DROP TABLE "certificate" CASCADE;--> statement-breakpoint
DROP TABLE "payment" CASCADE;--> statement-breakpoint
ALTER TABLE "enrollment" ADD COLUMN "volley_account" numeric(10, 2);--> statement-breakpoint
ALTER TABLE "enrollment" ADD COLUMN "volley_balance" numeric(10, 2);--> statement-breakpoint
ALTER TABLE "enrollment" ADD COLUMN "volley_balance_secondary" numeric(10, 2);--> statement-breakpoint
ALTER TABLE "enrollment" ADD COLUMN "first_installment" numeric(10, 2);--> statement-breakpoint
ALTER TABLE "enrollment" ADD COLUMN "second_installment" numeric(10, 2);--> statement-breakpoint
ALTER TABLE "enrollment" ADD COLUMN "third_installment" numeric(10, 2);--> statement-breakpoint
ALTER TABLE "enrollment" ADD COLUMN "certificate_expiration_date" date NOT NULL;--> statement-breakpoint
ALTER TABLE "enrollment" ADD COLUMN "certificate_storage_key" text;