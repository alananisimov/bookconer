import { relations, sql } from "drizzle-orm";
import { integer, serial, timestamp, varchar } from "drizzle-orm/pg-core";

import { pgTable } from "./_table";
import { orderedBook } from "./order";
import { review } from "./review";

export const book = pgTable("book", {
  id: serial("id").primaryKey(),
  title: varchar("title", { length: 256 }).notNull(),
  description: varchar("description", { length: 256 }).notNull(),
  price: integer("price").notNull(),
  status: varchar("status", { length: 255 })
    .$type<"active" | "disabled" | "archived">()
    .default("active"),
  imageLink: varchar("image_link", { length: 256 }).notNull(),
  genre: varchar("genre", { length: 256 }).notNull(),
  author: varchar("author", { length: 256 }).notNull(),
  amount: integer("amount").notNull(),
  createdAt: timestamp("created_at")
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedAt: timestamp("updatedAt").defaultNow(),
});

export const bookRelations = relations(book, ({ many }) => ({
  orderedBooks: many(orderedBook),
  reviews: many(review),
}));
