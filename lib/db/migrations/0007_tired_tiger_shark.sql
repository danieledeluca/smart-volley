ALTER TABLE "activity" ADD COLUMN "icon" text DEFAULT 'i-lucide-zap' NOT NULL;
UPDATE "activity" SET "icon" = 'i-lucide-volleyball' WHERE "name" = 'Volley';--> statement-breakpoint
UPDATE "activity" SET "icon" = 'i-lucide-dumbbell' WHERE "name" = 'Ginnastica';
