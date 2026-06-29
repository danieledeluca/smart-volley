CREATE TYPE "public"."activity_key" AS ENUM('volley', 'gymnastics');--> statement-breakpoint
CREATE TYPE "public"."user_role" AS ENUM('admin', 'manager', 'viewer');--> statement-breakpoint
CREATE TYPE "public"."enrollment_payment_type" AS ENUM('cash', 'bank_transfer');--> statement-breakpoint
CREATE TABLE "activity" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "activity_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"key" "activity_key" NOT NULL,
	"name" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "activity_key_unique" UNIQUE("key"),
	CONSTRAINT "activity_name_unique" UNIQUE("name"),
	CONSTRAINT "activity_key_name_unique" UNIQUE("key","name")
);
--> statement-breakpoint
CREATE TABLE "athlete" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "athlete_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"name" text NOT NULL,
	"birthdate" date NOT NULL,
	"birthplace" text NOT NULL,
	"fiscal_code" char(16) NOT NULL,
	"city" text NOT NULL,
	"address" text NOT NULL,
	"phone_number" varchar(15),
	"email" varchar(255),
	"parent_id" integer,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"deleted_at" timestamp,
	CONSTRAINT "athlete_fiscalCode_unique" UNIQUE("fiscal_code")
);
--> statement-breakpoint
CREATE TABLE "account" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "account_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"account_id" text NOT NULL,
	"provider_id" text NOT NULL,
	"user_id" integer NOT NULL,
	"access_token" text,
	"refresh_token" text,
	"id_token" text,
	"access_token_expires_at" timestamp,
	"refresh_token_expires_at" timestamp,
	"scope" text,
	"password" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp NOT NULL
);
--> statement-breakpoint
CREATE TABLE "session" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "session_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"expires_at" timestamp NOT NULL,
	"token" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp NOT NULL,
	"ip_address" text,
	"user_agent" text,
	"user_id" integer NOT NULL,
	CONSTRAINT "session_token_unique" UNIQUE("token")
);
--> statement-breakpoint
CREATE TABLE "user" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "user_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"name" text NOT NULL,
	"email" text NOT NULL,
	"email_verified" boolean DEFAULT false NOT NULL,
	"image" text,
	"role" "user_role",
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "user_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE "verification" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "verification_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"identifier" text NOT NULL,
	"value" text NOT NULL,
	"expires_at" timestamp NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "course" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "course_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"name" text NOT NULL,
	"description" text,
	"activity_id" integer NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "course_name_unique" UNIQUE("name")
);
--> statement-breakpoint
CREATE TABLE "enrollment" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "enrollment_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"athlete_id" integer NOT NULL,
	"season_id" integer NOT NULL,
	"course_id" integer NOT NULL,
	"volley_account" numeric(10, 2),
	"volley_account_date" date,
	"volley_account_type" "enrollment_payment_type",
	"volley_balance" numeric(10, 2),
	"volley_balance_date" date,
	"volley_balance_type" "enrollment_payment_type",
	"volley_second_balance" numeric(10, 2),
	"volley_second_balance_date" date,
	"volley_second_balance_type" "enrollment_payment_type",
	"gymnastics_first_installment" numeric(10, 2),
	"gymnastics_first_installment_date" date,
	"gymnastics_first_installment_type" "enrollment_payment_type",
	"gymnastics_second_installment" numeric(10, 2),
	"gymnastics_second_installment_date" date,
	"gymnastics_second_installment_type" "enrollment_payment_type",
	"gymnastics_third_installment" numeric(10, 2),
	"gymnastics_third_installment_date" date,
	"gymnastics_third_installment_type" "enrollment_payment_type",
	"certificate_expiration_date" date,
	"certificate_storage_key" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"deleted_at" timestamp,
	CONSTRAINT "enrollment_athleteId_seasonId_courseId_unique" UNIQUE("athlete_id","season_id","course_id")
);
--> statement-breakpoint
CREATE TABLE "parent" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "parent_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"name" text NOT NULL,
	"fiscal_code" char(16) NOT NULL,
	"phone_number" varchar(15),
	"email" varchar(255),
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "parent_fiscalCode_unique" UNIQUE("fiscal_code")
);
--> statement-breakpoint
CREATE TABLE "season" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "season_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"start_year" integer NOT NULL,
	"end_year" integer NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "season_startYear_endYear_unique" UNIQUE("start_year","end_year")
);
--> statement-breakpoint
ALTER TABLE "athlete" ADD CONSTRAINT "athlete_parent_id_parent_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."parent"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "account" ADD CONSTRAINT "account_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "session" ADD CONSTRAINT "session_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "course" ADD CONSTRAINT "course_activity_id_activity_id_fk" FOREIGN KEY ("activity_id") REFERENCES "public"."activity"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "enrollment" ADD CONSTRAINT "enrollment_athlete_id_athlete_id_fk" FOREIGN KEY ("athlete_id") REFERENCES "public"."athlete"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "enrollment" ADD CONSTRAINT "enrollment_season_id_season_id_fk" FOREIGN KEY ("season_id") REFERENCES "public"."season"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "enrollment" ADD CONSTRAINT "enrollment_course_id_course_id_fk" FOREIGN KEY ("course_id") REFERENCES "public"."course"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
CREATE UNIQUE INDEX "athlete_phone_number_index" ON "athlete" USING btree ("phone_number") WHERE "athlete"."phone_number" IS NOT NULL;--> statement-breakpoint
CREATE UNIQUE INDEX "athlete_email_index" ON "athlete" USING btree ("email") WHERE "athlete"."email" IS NOT NULL;--> statement-breakpoint
CREATE INDEX "account_user_id_index" ON "account" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "session_user_id_index" ON "session" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "verification_identifier_index" ON "verification" USING btree ("identifier");--> statement-breakpoint
CREATE UNIQUE INDEX "parent_phone_number_index" ON "parent" USING btree ("phone_number") WHERE "parent"."phone_number" IS NOT NULL;--> statement-breakpoint
CREATE UNIQUE INDEX "parent_email_index" ON "parent" USING btree ("email") WHERE "parent"."email" IS NOT NULL;