ALTER TABLE "athlete" DROP CONSTRAINT "athlete_phoneNumber_unique";--> statement-breakpoint
ALTER TABLE "athlete" DROP CONSTRAINT "athlete_email_unique";--> statement-breakpoint
CREATE UNIQUE INDEX "athlete_phone_number_index" ON "athlete" USING btree ("phone_number") WHERE "athlete"."phone_number" IS NOT NULL;--> statement-breakpoint
CREATE UNIQUE INDEX "athlete_email_index" ON "athlete" USING btree ("email") WHERE "athlete"."email" IS NOT NULL;