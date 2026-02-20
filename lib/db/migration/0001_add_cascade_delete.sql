-- Drop the old constraint and recreate with cascade delete
-- SQLite doesn't support ALTER CONSTRAINT, so we need to recreate the table

-- Create new locationLog table with cascade delete
CREATE TABLE `locationLog_new` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`started_at` integer NOT NULL,
	`ended_at` integer NOT NULL,
	`slug` text NOT NULL,
	`description` text,
	`lat` real NOT NULL,
	`long` real NOT NULL,
	`user_id` integer NOT NULL,
	`location_id` integer NOT NULL,
	`created_at` integer NOT NULL,
	`updated_at` integer NOT NULL,
	FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`location_id`) REFERENCES `location`(`id`) ON UPDATE no action ON DELETE cascade
);

-- Copy data from old table
INSERT INTO `locationLog_new` SELECT * FROM `locationLog`;

-- Drop old table
DROP TABLE `locationLog`;

-- Rename new table to old name
ALTER TABLE `locationLog_new` RENAME TO `locationLog`;

-- Recreate unique index
CREATE UNIQUE INDEX `locationLog_slug_unique` ON `locationLog` (`slug`);
