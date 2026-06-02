ALTER TABLE "athlete" DROP CONSTRAINT "athlete_parent_id_parent_id_fk";
--> statement-breakpoint
ALTER TABLE "athlete" ADD CONSTRAINT "athlete_parent_id_parent_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."parent"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "parent" DROP COLUMN "deleted_at";