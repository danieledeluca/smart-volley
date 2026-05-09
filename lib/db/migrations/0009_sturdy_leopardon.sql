ALTER TABLE "parent" DROP CONSTRAINT "parent_phoneNumber_unique";--> statement-breakpoint
ALTER TABLE "parent" DROP CONSTRAINT "parent_email_unique";--> statement-breakpoint
CREATE UNIQUE INDEX "parent_phone_number_index" ON "parent" USING btree ("phone_number") WHERE "parent"."phone_number" IS NOT NULL;--> statement-breakpoint
CREATE UNIQUE INDEX "parent_email_index" ON "parent" USING btree ("email") WHERE "parent"."email" IS NOT NULL;