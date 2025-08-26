PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_food_log` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`food_id` integer NOT NULL,
	`serving` integer NOT NULL,
	`created_at` real DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`created_by` text NOT NULL,
	FOREIGN KEY (`food_id`) REFERENCES `food_table`(`id`) ON UPDATE no action ON DELETE no action,
	CONSTRAINT "serving_positive" CHECK("__new_food_log"."serving" > 0)
);
--> statement-breakpoint
INSERT INTO `__new_food_log`("id", "food_id", "serving", "created_at", "created_by") SELECT "id", "food_id", "serving", "created_at", "created_by" FROM `food_log`;--> statement-breakpoint
DROP TABLE `food_log`;--> statement-breakpoint
ALTER TABLE `__new_food_log` RENAME TO `food_log`;--> statement-breakpoint
PRAGMA foreign_keys=ON;--> statement-breakpoint
CREATE TABLE `__new_food_table` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text(50) NOT NULL,
	`serving_size` integer NOT NULL,
	`serving_unit` text NOT NULL,
	`protein` real NOT NULL,
	`carbs` real NOT NULL,
	`fat` real NOT NULL,
	`created_by` text DEFAULT 'system' NOT NULL,
	`barcode` text,
	CONSTRAINT "serving_size_positive" CHECK("__new_food_table"."serving_size" > 0),
	CONSTRAINT "protein_non_negative" CHECK("__new_food_table"."protein" >= 0),
	CONSTRAINT "carbs_non_negative" CHECK("__new_food_table"."carbs" >= 0),
	CONSTRAINT "fat_non_negative" CHECK("__new_food_table"."fat" >= 0)
);
--> statement-breakpoint
INSERT INTO `__new_food_table`("id", "name", "serving_size", "serving_unit", "protein", "carbs", "fat", "created_by", "barcode") SELECT "id", "name", "serving_size", "serving_unit", "protein", "carbs", "fat", "created_by", "barcode" FROM `food_table`;--> statement-breakpoint
DROP TABLE `food_table`;--> statement-breakpoint
ALTER TABLE `__new_food_table` RENAME TO `food_table`;