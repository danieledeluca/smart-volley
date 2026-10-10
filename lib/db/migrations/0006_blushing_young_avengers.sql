CREATE INDEX "athlete_parent_id_index" ON "athlete" USING btree ("parent_id");--> statement-breakpoint
CREATE INDEX "course_activity_id_index" ON "course" USING btree ("activity_id");--> statement-breakpoint
CREATE INDEX "enrollment_season_id_index" ON "enrollment" USING btree ("season_id");--> statement-breakpoint
CREATE INDEX "enrollment_course_id_index" ON "enrollment" USING btree ("course_id");