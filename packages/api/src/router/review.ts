import type { TRPCRouterRecord } from "@trpc/server";
import { TRPCError } from "@trpc/server";
import { z } from "zod";

import type { review } from "@acme/db";
import { and, eq, schema } from "@acme/db";
import {
  createReviewSchema,
  deleteReviewSchema,
  updateReviewSchema,
} from "@acme/validators";

import { protectedProcedure, publicProcedure } from "../trpc";

export const reviewRouter = {
  byBookId: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(({ ctx, input }): Promise<review[] | undefined> => {
      return ctx.db
        .select()
        .from(schema.review)
        .where(eq(schema.review.bookId, input.id));
    }),
  create: protectedProcedure
    .input(createReviewSchema)
    .mutation(async ({ ctx, input }) => {
      return ctx.db.transaction(async (tx) => {
        // Проверка наличия существующего отзыва от пользователя
        const existingReview = await tx.query.review.findFirst({
          where: and(
            eq(schema.review.bookId, input.bookId),
            eq(schema.review.createdById, ctx.session.user.id),
          ),
        });

        if (existingReview) {
          throw new TRPCError({
            code: "FORBIDDEN",
            message: "You have already reviewed this book",
          });
        }
        // Проверка наличия книги в заказах пользователя
        const userOrderedBooks = await tx.query.order.findMany({
          where: eq(schema.order.userId, ctx.session.user.id),
          columns: {},
          with: {
            orderedBooks: {
              where: eq(schema.orderedBook.bookId, input.bookId),
            },
          },
        });
        const haveOrdered = userOrderedBooks.some(
          (order) => order.orderedBooks.length !== 0,
        );
        if (!haveOrdered) {
          throw new TRPCError({
            code: "UNAUTHORIZED",
            message: "You haven't buyed this book",
          });
        }
        // Создание нового отзыва
        return await tx
          .insert(schema.review)
          .values({ ...input, createdById: ctx.session.user.id });
      });
    }),
  // Метод для удаления отзыва
  delete: protectedProcedure
    .input(deleteReviewSchema)
    .mutation(async ({ ctx, input }) => {
      return ctx.db.transaction(async (tx) => {
        // Поиск отзыва по идентификатору
        const reviewToDelete = await tx.query.review.findFirst({
          where: eq(schema.review.id, input.id),
        });

        if (!reviewToDelete) {
          throw new TRPCError({
            code: "NOT_FOUND",
            message: "Review not found",
          });
        }
        // Проверка прав доступа к удалению отзыва
        if (
          reviewToDelete.createdById !== ctx.session.user.id &&
          !["admin", "moderator"].includes(ctx.session.user.role)
        ) {
          throw new TRPCError({
            code: "UNAUTHORIZED",
            message: "You are not authorized to delete this review",
          });
        }
        // Удаление отзыва
        return await tx
          .delete(schema.review)
          .where(eq(schema.review.id, input.id));
      });
    }),
  update: protectedProcedure
    .input(updateReviewSchema)
    .mutation(({ ctx, input }) => {
      if (input.createdById !== ctx.session.user.id) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "Not enough rights",
        });
      }
      return ctx.db
        .update(schema.review)
        .set(input)
        .where(eq(schema.review.id, input.id));
    }),
} satisfies TRPCRouterRecord;
