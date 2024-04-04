import type { NeonQueryFunction } from "@neondatabase/serverless";
import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";

import { env } from "../env";
import * as auth from "./schema/auth";
import * as book from "./schema/book";
import * as delivery from "./schema/delivery";
import * as order from "./schema/order";
import * as post from "./schema/post";
import * as review from "./schema/review";

export const schema = {
  ...auth,
  ...post,
  ...book,
  ...review,
  ...order,
  ...delivery,
};

export { pgTable as tableCreator } from "./schema/_table";

export * from "drizzle-orm";

const pgClient: NeonQueryFunction<boolean, boolean> = neon(env.DATABASE_URL);

export const db = drizzle(pgClient, { schema });

export * from "./types";
