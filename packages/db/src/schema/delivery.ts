import { relations, sql } from "drizzle-orm";
import { integer, serial, timestamp, varchar } from "drizzle-orm/pg-core";

import { pgTable } from "./_table";
import { users } from "./auth";
import { order } from "./order";

export const delivery = pgTable("delivery", {
  id: serial("id").primaryKey(),
  userId: varchar("userId", { length: 255 })
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  location: varchar("location", { length: 512 }).notNull(),
  orderId: integer("orderId")
    .notNull()
    .references(() => order.id, { onDelete: "cascade" }),
  type: varchar("type", { length: 255 })
    .$type<"avito" | "pr" | "self">()
    .notNull(),
  createdAt: timestamp("created_at")
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedAt: timestamp("updatedAt").defaultNow(),
});

export const deliveryRelations = relations(delivery, ({ one }) => ({
  user: one(users, { fields: [delivery.userId], references: [users.id] }),
  order: one(order, { fields: [delivery.orderId], references: [order.id] }),
}));
