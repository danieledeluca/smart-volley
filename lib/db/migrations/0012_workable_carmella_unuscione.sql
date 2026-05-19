ALTER TABLE "activity" ADD COLUMN "deleted_at" timestamp;--> statement-breakpoint
ALTER TABLE "athlete" ADD COLUMN "deleted_at" timestamp;--> statement-breakpoint
ALTER TABLE "course" ADD COLUMN "deleted_at" timestamp;--> statement-breakpoint
ALTER TABLE "enrollment" ADD COLUMN "deleted_at" timestamp;--> statement-breakpoint
ALTER TABLE "parent" ADD COLUMN "deleted_at" timestamp;--> statement-breakpoint
ALTER TABLE "season" ADD COLUMN "deleted_at" timestamp;