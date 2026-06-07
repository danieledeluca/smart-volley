ALTER TABLE "enrollment" DROP CONSTRAINT "enrollment_athleteId_seasonId_activityId_courseId_unique";--> statement-breakpoint
ALTER TABLE "enrollment" DROP CONSTRAINT "enrollment_activity_id_activity_id_fk";
--> statement-breakpoint
ALTER TABLE "course" ADD COLUMN "activity_id" integer NOT NULL;--> statement-breakpoint
ALTER TABLE "course" ADD CONSTRAINT "course_activity_id_activity_id_fk" FOREIGN KEY ("activity_id") REFERENCES "public"."activity"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "enrollment" DROP COLUMN "activity_id";--> statement-breakpoint
ALTER TABLE "enrollment" ADD CONSTRAINT "enrollment_athleteId_seasonId_courseId_unique" UNIQUE("athlete_id","season_id","course_id");