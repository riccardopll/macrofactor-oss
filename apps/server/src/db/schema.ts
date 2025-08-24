import { check, int, real, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { sql } from "drizzle-orm";
import { customAlphabet } from "nanoid";

const id = customAlphabet(
  "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz",
  12,
);

export const foodTable = sqliteTable(
  "food_table",
  {
    id: text()
      .$defaultFn(() => "food_" + id())
      .primaryKey(),
    name: text({ length: 50 }).notNull(),
    servingSize: int("serving_size").notNull(),
    servingUnit: text("serving_unit", { enum: ["g", "ml"] }).notNull(),
    protein: real().notNull(),
    carbs: real().notNull(),
    fat: real().notNull(),
    createdBy: text("created_by").notNull().default("system"),
    barcode: text("barcode"),
  },
  (table) => [
    check("serving_size_positive", sql`${table.servingSize} > 0`),
    check("protein_non_negative", sql`${table.protein} >= 0`),
    check("carbs_non_negative", sql`${table.carbs} >= 0`),
    check("fat_non_negative", sql`${table.fat} >= 0`),
  ],
);

export const foodLogTable = sqliteTable(
  "food_log",
  {
    id: text()
      .$defaultFn(() => "food_log_" + id())
      .primaryKey(),
    foodId: text("food_id")
      .notNull()
      .references(() => foodTable.id),
    serving: int().notNull(),
    createdAt: real("created_at")
      .notNull()
      .default(sql`CURRENT_TIMESTAMP`),
    createdBy: text("created_by").notNull(),
  },
  (table) => [check("serving_positive", sql`${table.serving} > 0`)],
);
