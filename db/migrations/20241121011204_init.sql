CREATE TABLE `company` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`createdAt` text DEFAULT (datetime(CURRENT_TIMESTAMP, '+9 hours')) NOT NULL,
	`updatedAt` text DEFAULT (datetime(CURRENT_TIMESTAMP, '+9 hours')) NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `company_name_unique` ON `company` (`name`);--> statement-breakpoint
CREATE TABLE `user` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text,
	`email` text NOT NULL,
	`createdAt` text DEFAULT (datetime(CURRENT_TIMESTAMP, '+9 hours')) NOT NULL,
	`updatedAt` text DEFAULT (datetime(CURRENT_TIMESTAMP, '+9 hours')) NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `user_email_unique` ON `user` (`email`);