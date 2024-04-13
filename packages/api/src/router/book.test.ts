import { expectTypeOf, test } from "vitest";

import type { book } from "@acme/db";

import { createCaller } from "..";
import dbMock from "../../__mocks__/drizzle.mock";
import { session } from "../../__mocks__/session.mock";
import { createInnerTRPCContext } from "../trpc";

test("get books types", async () => {
  const ctx = createInnerTRPCContext({ session });
  const caller = createCaller({ ...ctx, db: dbMock });

  const books = await caller.book.all();

  expectTypeOf(books).toMatchTypeOf<book[]>();
});
