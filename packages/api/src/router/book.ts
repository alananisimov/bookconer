import type { TRPCRouterRecord } from "@trpc/server";
import { z } from "zod";

import { desc, eq, max, min, schema } from "@acme/db";
import {
  createBookSchema,
  updateBookSchema,
  updateBookStatusSchema,
} from "@acme/validators";

import { adminProcedure, publicProcedure } from "../trpc";

export const bookRouter = {
  all: publicProcedure.query(({ ctx }) => {
    return ctx.db.query.book.findMany({
      orderBy: desc(schema.book.id),
      limit: 10,
    });
  }),
  byId: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(({ ctx, input }) => {
      return ctx.db.query.book.findFirst({
        where: eq(schema.book.id, input.id),
      });
    }),
  updateStatus: adminProcedure
    .input(updateBookStatusSchema)
    .mutation(({ ctx, input }) => {
      return ctx.db
        .update(schema.book)
        .set({ status: input.status })
        .where(eq(schema.book.id, input.id));
    }),
  create: adminProcedure.input(createBookSchema).mutation(({ ctx, input }) => {
    return ctx.db.insert(schema.book).values(input);
  }),
  delete: adminProcedure.input(z.number()).mutation(({ ctx, input }) => {
    return ctx.db.delete(schema.book).where(eq(schema.book.id, input));
  }),
  update: adminProcedure.input(updateBookSchema).mutation(({ ctx, input }) => {
    return ctx.db
      .update(schema.book)
      .set(input)
      .where(eq(schema.book.id, input.id));
  }),
  allAuthors: adminProcedure.query(async ({ ctx }) => {
    const authors = await ctx.db.query.book.findMany({
      columns: {
        author: true,
      },
    });

    return [...new Map(authors.map((item) => [item.author, item])).values()];
  }),
  allGenres: adminProcedure.query(async ({ ctx }) => {
    const genres = await ctx.db.query.book.findMany({
      columns: {
        genre: true,
      },
    });

    return [...new Map(genres.map((item) => [item.genre, item])).values()];
  }),
  minAndMaxPrice: publicProcedure.query(async ({ ctx }) => {
    const minimum = await ctx.db
      .select({ values: min(schema.book.price) })
      .from(schema.book);
    const maximum = await ctx.db
      .select({ values: max(schema.book.price) })
      .from(schema.book);
    return { min: minimum[0]?.values ?? 0, max: maximum[0]?.values ?? 0 };
  }),
} satisfies TRPCRouterRecord;
