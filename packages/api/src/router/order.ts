import type { TRPCRouterRecord } from "@trpc/server";
import { z } from "zod";

import { desc, eq, schema } from "@acme/db";
import { createOrderSchema } from "@acme/validators";

import { adminProcedure, protectedProcedure } from "../trpc";

export const orderRouter = {
  byUser: protectedProcedure.query(async ({ ctx }) => {
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
  delete: adminProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ ctx, input }) => {
      return ctx.db.delete(schema.order).where(eq(schema.order.id, input.id));
    }),
  create: adminProcedure
    .input(createOrderSchema)
    .mutation(async ({ ctx, input }) => {
      const { deliveryAddress, deliveryType } = input;
      const createNewDelivery = await ctx.db
        .insert(schema.delivery)
        .values({
          userId: ctx.session.user.id,
          type: deliveryType,
          location: `${deliveryAddress.lat} ${deliveryAddress.lng}`,
        })
        .returning({ id: schema.delivery.id })
        .then((v) => v[0]!.id);
      const createMainOrder = await ctx.db
        .insert(schema.order)
        .values({
          userId: ctx.session.user.id,
          status: "pending",
          deliveryId: createNewDelivery,
        })
        .returning({ id: schema.order.id })
        .then((v) => v[0]!.id);
      return await ctx.db.insert(schema.orderedBook).values([
        ...input.books.map((book) => {
          return { ...book, orderId: createMainOrder };
        }),
      ]);
    }),
  lastFive: adminProcedure.query(async ({ ctx }) => {
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
  all: adminProcedure.query(async ({ ctx }) => {
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
        return acc + orderedBook.book.price * orderedBook.bookQuantity;
      }, 0),
    }));
  }),
} satisfies TRPCRouterRecord;
