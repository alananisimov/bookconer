import { relations, sql } from "drizzle-orm";
import { integer, serial, timestamp, varchar } from "drizzle-orm/pg-core";

import { pgTable } from "./_table";
import { users } from "./auth";
import { book } from "./book";
import { delivery } from "./delivery";

export const order = pgTable("order", {
  id: serial("id").primaryKey(),
  deliveryId: serial("deliveryId").notNull(),
  userId: varchar("userId", { length: 255 }).notNull(),
  status: varchar("status", { length: 255 })
    .$type<"succeeded" | "pending" | "failed">()
    .notNull(),
  createdAt: timestamp("created_at")
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedAt: timestamp("updatedAt").defaultNow(),
});

export const orderRelations = relations(order, ({ one, many }) => ({
  user: one(users, { fields: [order.userId], references: [users.id] }),
  delivery: one(delivery, {
    fields: [order.deliveryId],
    references: [delivery.id],
  }),
  orderedBooks: many(orderedBook),
}));

export const orderedBook = pgTable("orderedBook", {
  id: serial("id").primaryKey(),
  bookId: serial("bookId").notNull(),
  bookQuantity: integer("bookQuantity").notNull(),
  orderId: serial("orderId").notNull(),
});

export const orderedBookRelations = relations(orderedBook, ({ one }) => ({
  book: one(book, { fields: [orderedBook.bookId], references: [book.id] }),
  order: one(order, { fields: [orderedBook.orderId], references: [order.id] }),
}));
