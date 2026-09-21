CREATE TABLE `visits` (
	`session_id` text PRIMARY KEY NOT NULL,
	`visitor_hash` text NOT NULL,
	`day` text NOT NULL,
	`created_at` text NOT NULL
);
--> statement-breakpoint
CREATE INDEX `idx_visits_day` ON `visits` (`day`);--> statement-breakpoint
CREATE INDEX `idx_visits_visitor` ON `visits` (`visitor_hash`);