CREATE TYPE "public"."user_role" AS ENUM('admin', 'manager', 'viewer');--> statement-breakpoint
ALTER TABLE "user" ADD COLUMN "role" "user_role";