import { relations, sql } from "drizzle-orm";
import { integer, serial, timestamp, varchar } from "drizzle-orm/pg-core";

import { pgTable } from "./_table";
import { users } from "./auth";
import { book } from "./book";

export const review = pgTable("review", {
  id: serial("id").primaryKey(),
  content: varchar("content", { length: 512 }).notNull(),
  rating: integer("rating").notNull(),
  bookId: serial("bookId")
    .notNull()
    .references(() => book.id, { onDelete: "cascade" }),
  createdById: varchar("createdById", { length: 255 }).notNull(),
  createdAt: timestamp("created_at")
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedAt: timestamp("updatedAt").defaultNow(),
});

export const reviewRelations = relations(review, ({ one }) => ({
  createdBy: one(users, {
    fields: [review.createdById],
    references: [users.id],
  }),
  book: one(book, { fields: [review.bookId], references: [book.id] }),
}));
