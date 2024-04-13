import { expect, test } from "vitest";

import { createCaller } from "..";
import { session } from "../../__mocks__/session.mock";
import { createInnerTRPCContext } from "../trpc";

test("get books types", async () => {
  const ctx = createInnerTRPCContext({ session });
  const caller = createCaller({ ...ctx });

  const review = await caller.review.byBookId({ id: 16 });

  expect(review).toStrictEqual([]);
});
