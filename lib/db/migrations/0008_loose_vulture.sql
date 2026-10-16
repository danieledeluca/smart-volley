ALTER TABLE "enrollment" DROP CONSTRAINT "enrollment_athlete_id_athlete_id_fk";
--> statement-breakpoint
ALTER TABLE "enrollment" ADD CONSTRAINT "enrollment_athlete_id_athlete_id_fk" FOREIGN KEY ("athlete_id") REFERENCES "public"."athlete"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "athlete" DROP COLUMN "deleted_at";--> statement-breakpoint
ALTER TABLE "enrollment" DROP COLUMN "deleted_at";