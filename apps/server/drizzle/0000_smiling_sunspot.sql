CREATE TABLE `food_log` (
	`id` text PRIMARY KEY NOT NULL,
	`food_id` text NOT NULL,
	`serving` integer NOT NULL,
	`created_at` real DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`created_by` text NOT NULL,
	FOREIGN KEY (`food_id`) REFERENCES `food_table`(`id`) ON UPDATE no action ON DELETE no action,
	CONSTRAINT "serving_positive" CHECK("food_log"."serving" > 0)
);
--> statement-breakpoint
CREATE TABLE `food_table` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text(50) NOT NULL,
	`serving_size` integer NOT NULL,
	`serving_unit` text NOT NULL,
	`protein` real NOT NULL,
	`carbs` real NOT NULL,
	`fat` real NOT NULL,
	`created_by` text DEFAULT 'system' NOT NULL,
	`barcode` text,
	CONSTRAINT "serving_size_positive" CHECK("food_table"."serving_size" > 0),
	CONSTRAINT "protein_non_negative" CHECK("food_table"."protein" >= 0),
	CONSTRAINT "carbs_non_negative" CHECK("food_table"."carbs" >= 0),
	CONSTRAINT "fat_non_negative" CHECK("food_table"."fat" >= 0)
);
