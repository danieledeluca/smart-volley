CREATE TABLE "activity" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "activity_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"name" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "activity_name_unique" UNIQUE("name")
);
--> statement-breakpoint
CREATE TABLE "athlete" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "athlete_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"name" text NOT NULL,
	"birthday" date NOT NULL,
	"birthplace" text NOT NULL,
	"fiscal_code" char(16) NOT NULL,
	"city" text NOT NULL,
	"address" text NOT NULL,
	"phone_number" varchar(15),
	"email" varchar(255),
	"parent_id" integer,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "athlete_fiscalCode_unique" UNIQUE("fiscal_code"),
	CONSTRAINT "athlete_phoneNumber_unique" UNIQUE("phone_number"),
	CONSTRAINT "athlete_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE "certificate" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "certificate_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"enrollment_id" integer NOT NULL,
	"expiration_date" date NOT NULL,
	"storage_key" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "course" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "course_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"name" text NOT NULL,
	"description" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "course_name_unique" UNIQUE("name")
);
--> statement-breakpoint
CREATE TABLE "enrollment" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "enrollment_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"athlete_id" integer NOT NULL,
	"season_id" integer NOT NULL,
	"activity_id" integer NOT NULL,
	"course_id" integer NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "enrollment_athleteId_seasonId_activityId_courseId_unique" UNIQUE("athlete_id","season_id","activity_id","course_id")
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
	CONSTRAINT "parent_fiscalCode_unique" UNIQUE("fiscal_code"),
	CONSTRAINT "parent_phoneNumber_unique" UNIQUE("phone_number"),
	CONSTRAINT "parent_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE "payment" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "payment_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"enrollment_id" integer NOT NULL,
	"volley_account" numeric(10, 2),
	"volley_balance" numeric(10, 2),
	"volley_balance_secondary" numeric(10, 2),
	"first_installment" numeric(10, 2),
	"second_installment" numeric(10, 2),
	"third_installment" numeric(10, 2),
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
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
ALTER TABLE "athlete" ADD CONSTRAINT "athlete_parent_id_parent_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."parent"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "certificate" ADD CONSTRAINT "certificate_enrollment_id_enrollment_id_fk" FOREIGN KEY ("enrollment_id") REFERENCES "public"."enrollment"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "enrollment" ADD CONSTRAINT "enrollment_athlete_id_athlete_id_fk" FOREIGN KEY ("athlete_id") REFERENCES "public"."athlete"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "enrollment" ADD CONSTRAINT "enrollment_season_id_season_id_fk" FOREIGN KEY ("season_id") REFERENCES "public"."season"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "enrollment" ADD CONSTRAINT "enrollment_activity_id_activity_id_fk" FOREIGN KEY ("activity_id") REFERENCES "public"."activity"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "enrollment" ADD CONSTRAINT "enrollment_course_id_course_id_fk" FOREIGN KEY ("course_id") REFERENCES "public"."course"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "payment" ADD CONSTRAINT "payment_enrollment_id_enrollment_id_fk" FOREIGN KEY ("enrollment_id") REFERENCES "public"."enrollment"("id") ON DELETE no action ON UPDATE no action;