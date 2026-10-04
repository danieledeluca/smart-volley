ALTER TABLE "activity" DROP CONSTRAINT "activity_key_unique";--> statement-breakpoint
ALTER TABLE "activity" DROP CONSTRAINT "activity_key_name_unique";--> statement-breakpoint
ALTER TABLE "activity" DROP COLUMN "key";--> statement-breakpoint
DROP TYPE "public"."activity_key";