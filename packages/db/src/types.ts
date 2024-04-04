import type { InferSelectModel } from "drizzle-orm";

import type { users } from "./schema/auth";
import type { book } from "./schema/book";
import type { order, orderedBook } from "./schema/order";
import type { review } from "./schema/review";

export type book = InferSelectModel<typeof book>;
export type review = InferSelectModel<typeof review>;
export type order = InferSelectModel<typeof order>;
export type orderedBook = InferSelectModel<typeof orderedBook> & {
  book: book;
  order: order;
};
export type user = InferSelectModel<typeof users>;
