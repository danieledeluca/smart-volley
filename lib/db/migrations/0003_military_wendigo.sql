ALTER TABLE "account" ALTER COLUMN "access_token" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "account" ALTER COLUMN "refresh_token" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "account" ALTER COLUMN "id_token" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "account" ALTER COLUMN "access_token_expires_at" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "account" ALTER COLUMN "refresh_token_expires_at" DROP NOT NULL;