import type { TRPCRouterRecord } from "@trpc/server";
import { z } from "zod";

import { desc, eq, schema } from "@acme/db";

import { adminProcedure, protectedProcedure } from "../trpc";

const createOrderSchema = z.object({
  books: z.array(
    z.object({
      bookId: z.number().positive(),
      bookQuantity: z.number().positive(),
    }),
  ),
});

export const orderRouter = {
  getByUser: protectedProcedure.query(async ({ ctx }) => {
    return ctx.db.query.order.findMany({
      where: eq(schema.order.userId, ctx.session.user.id),
      with: {
        orderedBooks: {
          with: {
            book: true,
          },
        },
      },
    });
  }),
  create: adminProcedure
    .input(createOrderSchema)
    .query(async ({ ctx, input }) => {
      return ctx.db.transaction(async (tx) => {
        const createMainOrder = await tx
          .insert(schema.order)
          .values({ userId: ctx.session.user.id, status: "pending" })
          .returning({ id: schema.order.id })
          .then((v) => v[0]!.id);
        return await tx.insert(schema.orderedBook).values([
          ...input.books.map((book) => {
            return { ...book, orderId: createMainOrder };
          }),
        ]);
      });
    }),
  getLastFive: adminProcedure.query(async ({ ctx }) => {
    return ctx.db.query.order.findMany({
      with: {
        user: true,
        orderedBooks: {
          with: {
            book: true,
          },
        },
      },
      orderBy: [desc(schema.order.id)],
      limit: 5,
    });
  }),
  getAll: adminProcedure.query(async ({ ctx }) => {
    const orders = await ctx.db.query.order.findMany({
      with: {
        orderedBooks: {
          with: {
            book: true,
          },
        },
        user: true,
        delivery: true,
      },
    });

    return orders.map((order) => ({
      ...order,
      totalPrice: order.orderedBooks.reduce((acc, orderedBook) => {
        return acc + orderedBook.book?.price * orderedBook.bookQuantity;
      }, 0),
    }));
  }),
} satisfies TRPCRouterRecord;
